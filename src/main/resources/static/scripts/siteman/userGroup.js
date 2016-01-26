var UserGroup = {};

UserGroup.List = {
	tableId : "usergroup-list-table",
	userTableId : "user-list-table",
	init : function() {

		var dt = $("#" + UserGroup.List.tableId).dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			},null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#" + UserGroup.List.tableId
				+ "-container", tableObj);
	},
	
	initUserTable : function() {

		var dt = $("#" + UserGroup.List.userTableId).dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			},null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#" + UserGroup.List.userTableId
				+ "-container", tableObj);
	},
	editRedirect : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#" + UserGroup.List.userTableId
				+ "-container");

			if (row) {
				var id = row[0];
				window.open(contextPath + "/user/edit?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
	},
	edit : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#"
				+ UserGroup.List.tableId + "-container");
			
			if (row) {
				var id = row[0];
				window.open(contextPath + "/usergroup/edit?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
	},
	remove : function() {
		var toDelete = confirm("Are you sure to delete the selected usergroup ?");
		if(toDelete){
			var row = SiteMAN.getSelectedRowFromDataTable("#"
					+ UserGroup.List.tableId + "-container");
			if (row) {
				var id = row[0];
				window.open(contextPath + "/usergroup/remove?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
		}
	}
};

UserGroup.Create = {
	init : function() {
		$('#roles').multiselect({
			enableFiltering : true,
			includeSelectAllOption : true,
			 maxHeight: 300
		});
		$("#btnRole").off('click');
		$("#btnRole").on('click',function(){
			
			window.open(contextPath + "/role/create", '_self');
		});
		UserGroup.Create.automateCode();
	},
	automateCode : function(){
		$("#name").on("keyup change", function(){
			var str = SiteMAN.camelCase($(this).val());
			$("#objectCode").val(str);
		});
	}
};

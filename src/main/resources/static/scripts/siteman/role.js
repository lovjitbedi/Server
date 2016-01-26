var Role = {};
Role.List = {
	tableId : "role-list-table",
	userGroupTableId : "usergroup-list-table",
	init : function() {
		var dt = $("#" + Role.List.tableId).dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [{
				"visible" : false
			},null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#" + Role.List.tableId
				+ "-container", tableObj);
		
	},
	initUserGroup : function() {

		var dt = $("#" + Role.List.userGroupTableId).dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			},null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#" + Role.List.userGroupTableId
				+ "-container", tableObj);
	},
	editUserGroup : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#"
				+ Role.List.userGroupTableId + "-container");
			
			if (row) {
				var id = row[0];
				window.open(contextPath + "/usergroup/edit?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
	},
	edit : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#"
				+ Role.List.tableId + "-container");
		
		if (row) {
			var id = row[0];
			window.open(contextPath + "/role/edit?id=" + id, '_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
	remove : function() {
		var toDelete = confirm("Are you sure to delete the selected role ?");
		if(toDelete){
			var row = SiteMAN.getSelectedRowFromDataTable("#"
					+ Role.List.tableId + "-container");
			
			if (row) {
				var id = row[0];
				window.open(contextPath + "/role/remove?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
		}
	}
};

Role.Create = {
	init : function() {
		$('#privilegeMasks').multiselect({
			enableFiltering: true,
			includeSelectAllOption: true,
			 maxHeight: 300
		});
		
		$("#addprivilege").off('click');
		$("#addprivilege").on('click',function(){
			
			window.open(contextPath + "/privilegemask/create", '_self');
		});
		Role.Create.automateCode();
	},
	
	automateCode : function(){
		$("#name").on("keyup change", function(){
			var str = SiteMAN.camelCase($(this).val());
			$("#objectCode").val(str);
		});
	}
	
//	selectValidation : function() {
//		var value = $('#privilegeMasks').val();
//		if(value == null){
//			document.getElementById("privilegeMasks").focus();
//			$('select').first().focus();
//			alert("Privilege Mask cannot be empty. Please select one...!!")
//		}
//	}
};

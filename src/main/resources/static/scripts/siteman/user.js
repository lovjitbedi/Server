var User = {};

User.List = {
	tableId : "user-list-table",
	init : function() {

		var dt = $("#" + User.List.tableId).dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			},null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#" + User.List.tableId
				+ "-container", tableObj);
	},
	edit : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#" + User.List.tableId
				+ "-container");

			if (row) {
				var id = row[0];
				window.open(contextPath + "/user/edit?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
	},
	remove : function() {
		var toDelete = confirm("Are you sure to delete the selected user ?");
		if(toDelete){
			var row = SiteMAN.getSelectedRowFromDataTable("#" + User.List.tableId
					+ "-container");
			
			if (row) {
				var id = row[0];
				window.open(contextPath + "/user/remove?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
		}
	},
	assignWFGroup : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#" + User.List.tableId
				+ "-container");

			if (row) {
				var id = row[0];
				window.open(contextPath + "/assignwf?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
	}
};

User.Create = {
	init : function() {
		$('#resourceId').multiselect({
			enableFiltering: true,
			includeSelectAllOption : false,
			  maxHeight: 300
		});
		$('#roles').multiselect({
			enableFiltering : true,
			includeSelectAllOption : true,
			 maxHeight: 300
		});
		$('#userGroups').multiselect({
			enableFiltering : true,
			includeSelectAllOption : true,
			 maxHeight: 300
		});
		
		$("#btnRole").off('click');
		$("#btnRole").on('click',function(){
			window.open(contextPath + "/role/create", '_self');
		});
			$("#btnUserGroup").off('click');
			$("#btnUserGroup").on('click',function(){
				window.open(contextPath + "/usergroup/create", '_self');
				});
		
	}
};

User.WFGroup = {
	tableId : "user-wfgroup-list-table",
	init : function(){
		User.WFGroup.assign();
		User.WFGroup.renderGrid();
	},
	assign : function(){
		$('#wfGroups').multiselect({
			enableFiltering : true,
			includeSelectAllOption : true
		});
	},
	renderGrid : function(){
		var dt = $("#" + User.WFGroup.tableId).dataTable({
			dom : '<"toolbar">frtip'
		});
	}
};

User.Workflow = {
		tableId : "workflow-list-table",
		init : function(){
			User.Workflow.renderGrid();
		},
		renderGrid : function(){
			var dt = $("#" + User.Workflow.tableId).dataTable({
				dom : '<"toolbar">frtip'
			});
			
		}
}
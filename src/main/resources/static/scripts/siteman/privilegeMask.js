var PrivilegeMask = {};
PrivilegeMask.List = {
	init : function(){
		
		var dt = $("#privilegemask-list-table").dataTable({
					dom : '<"toolbar">frtip',
					"columns" : [ {
						"visible" : false
					},null, null, null ]
				});
		var tableObj = dt.api();	
	
	SiteMAN.bindDataTableSingleRowSelection("#privilegemask-list-table-container",
			tableObj);
	},
	initRoleTable : function() {
		var dt = $("#role-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [{
				"visible" : false
			},null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#role-list-table-container"
				, tableObj);
		
	},
	editRoleTableRow : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#role-list-table-container");
			
		
		if (row) {
			var id = row[0];
			window.open(contextPath + "/role/edit?id=" + id, '_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
	edit: function(){
		var row = SiteMAN.getSelectedRowFromDataTable("#privilegemask-list-table-container");
		
		if (row) {
			var id = row[0];
			window.open(contextPath + "/privilegemask/edit?id=" + id,'_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
	remove: function(){
		var toDelete = confirm("Are you sure to delete the selected privilege mask ?");
		if(toDelete){
			var row = SiteMAN.getSelectedRowFromDataTable("#privilegemask-list-table-container");
			if (row) {
				var id = row[0];
				window.open(contextPath + "/privilegemask/remove?id=" + id,'_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
		}
	}
	
};

PrivilegeMask.Create = {
	init : function(){
		$('#criteriaId').multiselect({
			enableFiltering: true
		});
		$('#privilegeId').multiselect({
			enableFiltering: true
		});
		
		PrivilegeMask.Create.automateCode();
	},
	automateCode : function(){
		$("#name").on("keyup change", function(){
			var str = SiteMAN.camelCase($(this).val());
			$("#objectCode").val(str);
		});
	}
};

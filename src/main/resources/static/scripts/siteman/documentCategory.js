var DocumentCategory = {};
DocumentCategory.List = {
	tableId : "dc-list-table",
	init : function() {
		var dt = $("#" + DocumentCategory.List.tableId).dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			},null, null ]
		});
		var tableObj = dt.api();
		SiteMAN.bindDataTableSingleRowSelection("#"
				+ DocumentCategory.List.tableId + "-container", tableObj);
	},
	assignWorkflow : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#"
				+ DocumentCategory.List.tableId + "-container");
		if (row) {
			var id = row[0];
			window.open(contextPath + "/wfmapping/create?id=" + id, '_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
	edit : function() {
		var row = SiteMAN.getSelectedRowFromDataTable("#"
				+ DocumentCategory.List.tableId + "-container");

		var id = row[0];
		if (id)
			window.open(contextPath + "/docCategory/edit?id=" + id, '_self');
	}
};

DocumentCategory.Create = {
	init : function() {
		DocumentCategory.Create.automateCode();
	},
	automateCode : function(){
		$("#name").on("keyup change", function(){
			var str = SiteMAN.camelCase($(this).val());
			$("#objectCode").val(str);
		});
	}

};

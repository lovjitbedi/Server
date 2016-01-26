var Job = {};
Job.List = {
	init : function() {

		var dt = $("#job-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			}, null, null, null, null, null, null, null]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#job-list-table-container",
				tableObj);

	},

edit : function() {
	var row = SiteMAN
			.getSelectedRowFromDataTable("#job-list-table-container");

	if (row) {
		var id = row[0];
		window.open(contextPath + "/job/edit?id=" + id, '_self');
	} else {
		SiteMAN.showNotification("Please select a row",
				SiteMAN.NotificationType.error);
	}
}

};

Job.Create = {
		init : function() {
			$("#projectList").multiselect({
				enableFiltering : true
			});
		}
	};
	
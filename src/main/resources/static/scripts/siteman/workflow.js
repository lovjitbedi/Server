var Workflow = {};
Workflow.Mapping = {
	tableId : "wfmapping-list-table",
	init : function() {
		Workflow.Mapping.assign();
		Workflow.Mapping.renderGrid();
	},
	assign : function() {
		$('#workflowSqlId').multiselect({
			enableFiltering : true,
			includeSelectAllOption : true,
			maxHeight: 300
		});
	},
	renderGrid : function() {
		var dt = $("#" + Workflow.Mapping.tableId).dataTable({
			dom : '<"toolbar">frtip'
		});
	}
};

var Privilege = {};

Privilege.init = function(){
// SiteMAN.populateList("user/getprivilegelist","#privilegeMasks");
};
	
Privilege.save = function(){
	var json = {};
	var elements = $('form *').not(
	".handsontable").filter(function() {
		return $(this).attr('class') == "form-control";
	});
	$.each(elements, function(index, element) {
		var elementName = $(element).prop("name");
		if (elementName) {
			var val = $(element).val();
			json[elementName] = val;
		}
	});
	
	
		passwordValid=true;
		SiteMAN.doAjax("privilege/saveprivilege",
				SiteMAN.AjaxMethod.post, undefined, JSON
				.stringify(json),
				"application/json;charset=utf-8");
	
};

Privilege.List = {
	tableId : "privilege-list-table",
	init : function(){
		var dt = $("#"+Privilege.List.tableId).dataTable({
					dom : '<"toolbar">frtip',
					"columns" : [ {
						"visible" : false
					},null, null, null ]
				});
		var tableObj = dt.api();	
	SiteMAN.bindDataTableSingleRowSelection("#"+Privilege.List.tableId+"-container",
			tableObj);
	},
	edit: function(){
		var row = SiteMAN.getSelectedRowFromDataTable("#"+Privilege.List.tableId+"-container");
			
			if (row) {
				var id = row[0];
				window.open(contextPath + "/privilege/edit?id=" + id,'_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
	}
};

Privilege.Create = {
	init : function(){
	}
};

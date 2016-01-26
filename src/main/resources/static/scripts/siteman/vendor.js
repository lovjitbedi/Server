var Vendor = {};
Vendor.List = {
		contactUrl : "http://localhost:9001/sem/contact/create",
	init : function() {

		var dt = $("#vendor-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			}, null, null, null, null, null, null, null,null]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#vendor-list-table-container",
				tableObj);

	},
//
//	initPM : function() {
//		var dt = $("#contact-list-table").dataTable({
//			dom : '<"toolbar">frtip',
//			"columns" : [ {
//				"visible" : false
//			}, null, null, null ]
//		});
//		var tableObj = dt.api();
//
//		SiteMAN.bindDataTableSingleRowSelection(
//				"#contact-list-table-container", tableObj);
//
//	},
	edit : function() {
		var row = SiteMAN
				.getSelectedRowFromDataTable("#vendor-list-table-container");

		if (row) {
			var id = row[0];
			window.open(contextPath + "/vendor/edit?id=" + id, '_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
//	editRedirect : function() {
//		var row = SiteMAN
//				.getSelectedRowFromDataTable("#contact-list-table-container");
//
//		if (row) {
//			var id = row[0];
//			window.open(contextPath + "/contact/edit?id=" + id, '_self');
//		} else {
//			SiteMAN.showNotification("Please select a row",
//					SiteMAN.NotificationType.error);
//		}
//	},

	remove : function() {
		var toDelete = confirm("Are you sure to delete the selected vendor ?");
		if (toDelete) {
			var row = SiteMAN
					.getSelectedRowFromDataTable("#vendor-list-table-container");
			if (row) {
				var id = row[0];
				window.open(contextPath + "/vendor/remove?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
		}
	}
};

Vendor.Create = {
	
	init : function() {
		$("#primaryContact").multiselect({
			enableFiltering : true,
			 maxHeight: 300
		});
		
		$("#addContactButton").off('click');
		$("#addContactButton").on('click',function(){
			
			window.open(contextPath + "/contact/create", '_self');
			
			
			//SiteMAN.doAjax(Vendor.List.contactUrl,SiteMAN.AjaxMethod.get,_self,null,null,null,null)
			
		});	
		
		
		
	}
};
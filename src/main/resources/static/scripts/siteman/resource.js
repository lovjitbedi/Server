var Resource = {};
Resource.List = {
	init : function() {

		var dt = $("#resource-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			}, null, null, null, null, null,null]
		});
		var tableObj = dt.api();

//		SiteMAN.bindDataTableSingleRowSelection("#resource-list-table-container",
//				tableObj);

	}
}
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
//	edit : function() {
//		var row = SiteMAN
//				.getSelectedRowFromDataTable("#resource-list-table-container");
//
//		if (row) {
//			var id = row[0];
//			window.open(contextPath + "/resource/edit?id=" + id, '_self');
//		} else {
//			SiteMAN.showNotification("Please select a row",
//					SiteMAN.NotificationType.error);
//		}
//	},
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

//	remove : function() {
//		var toDelete = confirm("Are you sure to delete the selected contact ?");
//		if (toDelete) {
//			var row = SiteMAN
//					.getSelectedRowFromDataTable("#resource-list-table-container");
//			if (row) {
//				var id = row[0];
//				window.open(contextPath + "/resource/remove?id=" + id, '_self');
//			} else {
//				SiteMAN.showNotification("Please select a row",
//						SiteMAN.NotificationType.error);
//			}
//		}
//	}
//};

//Resource.Create = {
//	init : function() {
////		$("#primaryContact").multiselect({
////			enableFiltering : true
////		});
//	}
//};
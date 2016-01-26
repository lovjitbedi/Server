var Lists = {};
Lists.List = {
	TableField : {
		Code : {
			"name" : "code",
			"index" : 0,
			"visible":true
		},
		Value : {
			"name" : "value",
			"index" : 1,
			"visible":true
		}
	},
	init : function() {

		var dt = $("#lists-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			}, null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection("#lists-list-table-container",
				tableObj);

	},

	view : function() {
		debugger;
		var row = SiteMAN.getSelectedRowFromDataTable("#lists-list-table-container");
		console.log(row);
		if (row) {
			var id = row[0];
			console.log("id", id);
			window.open(contextPath + "/lists/view", '_self');
			Lists.List.codeValuetable(id);
		
		} else {
			SiteMAN.showNotification("please select a row",
					SiteMAN.NotificationType.error);
		}
	},

	codeValuetable : function(id) {
		var table = $("#simple-lists-list-table").dataTable({
	         "aLengthMenu" : [ 5, 10, 25, 50, 100 ],
	         "iDisplayLength" : 5
	        });
		var field = Lists.List.TableField;
		
		var rowsA = [];
		var rowFinal = [];
		var tableObj = table.api();
		var callback = function(data) {
			console.log(data);
			var parsedData = JSON.parse(data);
			var list = parsedData["list"];
			console.log(list);
			$
					.each(
							list,
							function(index, obj) {
								rowsA[field.Code.index] = obj[field.Code.name] ? obj[field.Code.name]
										: '';
								rowsA[field.Value.index] = obj[field.Value.name] ? obj[field.Value.name]
										: '';
								rowsFinal.push(rowsA);
							});

			tableObj.rows.add(rows).draw();
			$("#simple-lists-list-table").show();
		};
		SiteMAN.doAjax(contextPath + "/lists/codevaluelist?id=" + id,
				SiteMAN.AjaxMethod.get, undefined, undefined, undefined,
				callback);

	}

};
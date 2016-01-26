var Criteria = {};

Criteria.List = {
	init : function() {

		var dt = $("#criteria-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			}, null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection(
				"#criteria-list-table-container", tableObj);
		
	},
	
	initPM : function(){
		var dt = $("#privilegemask-list-table").dataTable({
			dom : '<"toolbar">frtip',
			"columns" : [ {
				"visible" : false
			}, null, null, null ]
		});
		var tableObj = dt.api();

		SiteMAN.bindDataTableSingleRowSelection(
				"#privilegemask-list-table-container", tableObj);
		
		
	},
	edit : function() {
		var row = SiteMAN
				.getSelectedRowFromDataTable("#criteria-list-table-container");

		if (row) {
			var id = row[0];
			window.open(contextPath + "/criteria/edit?id=" + id, '_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
	editRedirect : function() {
		var row = SiteMAN
				.getSelectedRowFromDataTable("#privilegemask-list-table-container");

		if (row) {
			var id = row[0];
			window.open(contextPath + "/privilegemask/edit?id=" + id, '_self');
		} else {
			SiteMAN.showNotification("Please select a row",
					SiteMAN.NotificationType.error);
		}
	},
	remove : function() {
		var toDelete = confirm("Are you sure to delete the selected criteria ?");
		if (toDelete) {
			var row = SiteMAN
					.getSelectedRowFromDataTable("#criteria-list-table-container");
			if (row) {
				var id = row[0];
				window.open(contextPath + "/criteria/remove?id=" + id, '_self');
			} else {
				SiteMAN.showNotification("Please select a row",
						SiteMAN.NotificationType.error);
			}
		}
	}
};

Criteria.Create = {
		Url: contextPath+"/nav/listattributes",
		row:0,
	init : function() {
		$("#moduleName").multiselect({
			enableFiltering : true,
			 maxHeight: 300
		});
		
		Criteria.Create.automateCode();
		
		$("#btnQuery").off("click");
		$("#btnQuery").on("click",
				function(){
// Schedule.SubActivity.addResourceRow(this);
			$("#sub-activity-assignment-form").modal("show");
		});
	},
	
	moduleList: function(){
		var url = undefined;
// $("#ddlModule").on('change',function(){
			
		var module = $("#ddlModule").val();
			
			if(module==="project"){
				url =Criteria.Create.Url+"?module=project";
			}else if(module==="document"){
				url = Criteria.Create.Url+"?module=document";
			}else if(module==="transmittal"){
				url = Criteria.Create.Url+"?module=transmittal";
			}else if(module==="submittal"){
				url = Criteria.Create.Url+"?module=submittal";
			}else if (module==="discussions"){
				url = Criteria.Create.Url+"?module=discussions";
			}
			
			var callback  = function(data){
				console.log(data);
				$("#ddlAttribute").empty();
				var dataJson = JSON.parse(data);
				console.log(dataJson);
				var keys = Object.keys(dataJson);
// $.each(data, function(key,value) {
				for(var i=0;i<keys.length;i++){
					console.log(keys);
					console.log(dataJson[keys[i]]);
					$("#ddlAttribute").append(
							$('<option></option>').val(keys[i]).html(dataJson[keys[i]]));
				}
				
				
			};
			
			SiteMAN.doAjax(url,SiteMAN.AjaxMethod.get,undefined,undefined,undefined,callback);
			
// });
		
	},
	
		addResourceRow : function(obj){
			var parent = $(obj).parents(".resource-assignment-row");
			var clonedRow = parent.clone().attr("id","resource-assignment-row"+Criteria.Create.row);
			parent.after(clonedRow);
			Criteria.Create.bindAddAndRemoveRowEvent();
		},
		bindAddAndRemoveRowEvent : function(){
			
			$("#sub-activity-assignment-form .add-resource-row").off("click");
			$("#sub-activity-assignment-form .add-resource-row").on("click",
					function(){
				Criteria.Create.row = Criteria.Create.row +1;
// console.log(Criteria.Create.row++);
				Criteria.Create.addResourceRow(this);
			});
			
			$("#sub-activity-assignment-form .remove-resource-row").off("click");
			$("#sub-activity-assignment-form .remove-resource-row").on("click",
					function(){
						if($("#sub-activity-assignment-form .resource-assignment-row").length>1){
							$(this).parents(".resource-assignment-row").remove();
							Criteria.Create.row = Criteria.Create.row - 1;
						}else{
							SiteMAN.showNotification("Cannot remove row!",
									SiteMAN.NotificationType.error);
						}
					});
		},
		
		createCriteriaJson:function(){
			var operation = undefined;
			var criteriaJson = undefined;
			var type = "Normal";
			if($("#sub-activity-assignment-form .resource-assignment-row").length>1){
				var module = $("#ddlModule").val();
				 
			}else{
				var module = $("#ddlModule").val();
				var attribute = $("#ddlAttribute").val();
				var operator ='"'+ $("#ddlOperator").val()+'"';
				var values = $("#txtValue").val();
				var  valuesArr = [];
				valuesArr = values.split(",");
				var quot = '"';
				var quot2 = '",';
				var count = 0;
				var value = undefined;
				do{
					if(count === 0){
					value = quot+valuesArr[count]+quot2;
					}else if(count === valuesArr.length-1){
						value=value+quot+valuesArr[count]+quot;
					}else{
						value=value+quot+valuesArr[count]+quot2;
					}
					count++;
				}while(count<valuesArr.length)
//				if(valuesArr.length>1){
//					for(var i=0;i<valuesArr.length;i++){
//							value = value+quot+valuesArr[i]+quot;
//						
//					}
//					
//				}else{value = '"'+$("#txtValue").val()+'"';}
				operation  = "Flat";
				criteriaJson = '{"operation":'+'"'+operation+'"'+','+ '"criteria":{"operator:"'+operator+','+'"key":'+attribute+','+'"value":{"type:"'+'"'+type+'"'+','+'"val":['+value+']}}}';
				console.log("criteriaJson",criteriaJson);
				$("#txtArea").val(criteriaJson) ;
				
			}
			 
		},
	
	automateCode : function(){
		$("#name").on("keyup change", function(){
			var str = SiteMAN.camelCase($(this).val());
			$("#objectCode").val(str);
		});
	}
};
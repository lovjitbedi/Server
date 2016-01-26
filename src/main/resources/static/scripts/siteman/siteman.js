var SiteMAN = {
	cacheArr : [],
	// index page is considered as last request on start
	lastRequest : {
		url : "sem",
		method : "GET",
		container : "#main-content"
	},
	buttonsHTMLUrl : "navigation/getbuttonshtml",
	dataTableConfig : {
		"dom" : 'T<"clear">lfrtip',
		"oTableTools" : {
			"aButtons" : [ "copy", "xls" ],
			"sSwfPath" : "components/dataTables/extensions/TableTools/swf/copy_csv_xls.swf"
		}
	},
	Module: {
		dataId : undefined
	},
	ajaxHandles : [],
	ajaxCounter : 0,
	cachedRequest : false, // boolean to check whether the request is created using back button or not
	viewUrl : "navigation/getviewhtml",
	viewWithoutButtonsUrl : "navigation/getviewhtmlwithoutbuttons",
	containerArr : [ "#main-content", "#main-content-lvl-1"],// "#main-content",
	init : function() {

		var gOldOnError = window.onerror;
		// Override previous handler.uploadAttachment
		window.onerror = function(errorMsg, url, lineNumber) {
			// Call previous handler.
			if (gOldOnError) {
				return gOldOnError(errorMsg, url, lineNumber);
			}
			SiteMAN.hideProgress();
			SiteMAN.showNotification(errorMsg, SiteMAN.NotificationType.error);
			// Just let default handler run.
			return false;
		}
		if (window['loggedInUser'] != undefined)
			document.getElementById('userNameButton').innerHTML = loggedInUser;

		function errorHandler() {
		}
		SiteMAN.initTopBar();
		SiteMAN.initSideBar();
		SiteMAN.initFooter();
		SiteMAN.blockUIInit();
		
		SiteMAN.GlobalSearch.init();
		
		$(document).off("click","ul.nav-tabs>li>a");
		$(document).on("click","ul.nav-tabs>li>a", function(){SiteMAN.initFooter();});

		// fullscreen btn global binding
		$(document).on("click", '.tab_fullscreen', function() {
			$('.fullscreen_container').toggleClass('fullscreen');
			$('.tab_fullscreen i').toggleClass('fa-expand ,  fa-close', 200);
		});
	},
	AjaxMethod : {
		get : "GET",
		post : "POST"
	},
	NotificationType : {
		info : "info",
		success : "success",
		warn : "warn",
		error : "error"
	},
	/**
	 * This method initialize ajax loader for every ajax call on the page
	 */
	ajaxLoaderInit : function() {
		$(document).ajaxStart(function() {
			$("#loading").addClass("show");
		});

		$(document).ajaxComplete(function() {
			$("#loading").removeClass("show");
		});

		var tid = setInterval(function() {
			if (document.readyState !== 'complete')
				return;
			clearInterval(tid);
			// do your work
			SiteMAN.initFooter();
		}, 100);

	},
	bindDataTableSingleRowSelection : function(selector, dtObj) {
		$(selector + ' table.dataTable tbody').off('click', 'tr');
		$(selector + ' table.dataTable tbody').on('click', 'tr', function() {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			} else {
				dtObj.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
		});
	},
	bindDataToElements : function(containerId, data) {
		if (!SiteMAN.isEmpty(data)) {
			var elements = $(containerId + ' *').not(".handsontable").filter(
					function() {
						return $(this).data('type') == "control";
					});

			$.each(elements, function(index, element) {
				var elementName = $(element).attr("name");
				if (elementName) {
					if (element.nodeName == "DIV")
						$(element).text(data[elementName]);
					else
						$(element).val(data[elementName]);
				}
			});

			elements = $(containerId).find(".handsontable").filter(function() {
				return $(this).data('type') == "control";
			});

			$.each(elements, function(index, element) {
				var elementId = $(element).prop("id");
				if (elementId) {
					var htable = eval(elementId);
					htable.loadData(data[elementId]);
				}
			});
		}
	},
	bindListWithData : function(data, elementId, displayFieldName,
			ValueFieldName, defaultText, defaultValue, callback) {
		if (defaultText == undefined)
			defaultText = 'Select...';
		if (defaultValue == undefined)
			defaultValue = '';
		var html = '<option value="' + defaultValue + '">' + defaultText
				+ '</option>';
		$.each(data, function(index, element) {
			html += '<option value="' + element[ValueFieldName] + '">';
			html += element[displayFieldName];
			html += '</option>';
		});
		$(elementId).html(html);
		if (callback && (typeof callback == "function")) {
			callback();
		}

	},
	blockUIInit : function() {
		var blockUI = document.createElement("div");
		blockUI.setAttribute("id", "blocker");
		blockUI.innerHTML = $("#loader").html();
		document.body.appendChild(blockUI);
		document.getElementById("blocker").style.display = "none";
	},
	blockUI : function() {
		document.getElementById("blocker").style.display = "";
	},
	unBlockUI : function() {
		document.getElementById("blocker").style.display = "none";
	},
	camelCase : function(str){
		var camelCaseStr = str;
		if(str){
			var arr = str.split(" ");
			if(arr.length>1){
				var strCopy = arr.filter(Boolean).join("-");
				camelCaseStr = $.camelCase(strCopy);
			}
		}
		return camelCaseStr;
	},
	/**
	 * Used for back button functionality
	 * Every request that has container id matched within SiteMAN.containerArr is cached
	 * in cacheArr.
	 * 
	 * On pressing back last request object is taken from the cacheArr and required ajax
	 * has been made
	 * 
	 * For the implementation of caching the last active tab an attribute named "activeTab"
	 * has been added during the ajax request and on clicking back last request active tab
	 * can be shown by triggering click event 
	 */
	doBack : function() {
		var len = SiteMAN.cacheArr.length;
		SiteMAN.cachedRequest = true;
		if (len > 0) {
			var obj = SiteMAN.cacheArr.pop();
			SiteMAN.doAjax(obj.url, obj.method, obj.container, obj.data,
					obj.contentType, obj.callback);
			$(document).ajaxStop(function() {
				if(obj["activeTab"]){
					var refId = $(obj["activeTab"]).attr("href");
					var element = $("#tab-container").find("a").filter(function(){
						return $(this).attr('href') == refId;
						});
					if(element && element.length > 0){
						$(element[0]).trigger("click");
					}
				}
				$(document).off("ajaxStop");
			});
		} 
		else {
			SiteMAN.lastRequest = {
				url : "sem",
				method : "GET",
				container : "#main-content"
			};
		}
	},
	doAjax : function(url, method, container, data, contentType, callback,
			calltoken) {
		if (calltoken === undefined)
			calltoken = url;
		// console.log(calltoken);
		var running = SiteMAN.findAjaxRunning(calltoken);
		// console.log(calltoken,running);

		if (running) {
			// if(ajaxType=="singlefail")return 0;
			// else if(ajaxType=="singlethis")SiteMAN.removeAjaxHandle(url,0);
			// console.log("returning");
			return 0;
		}
		// go to index page
		if (url == "sem") {
			window.location = "sem"
		}

		var newHandle = Array();
		newHandle[0] = calltoken;
		newHandle[1] = SiteMAN.ajaxCounter++;
		newHandle[2] = "";
		SiteMAN.ajaxHandles.push(newHandle);

		// console.log(SiteMAN.ajaxHandles);
		SiteMAN.showProgress();
		if (typeof data === 'undefined') {
			data = [];
		}
		if (typeof contentType === 'undefined') {
			contentType = "application/x-www-form-urlencoded; charset=UTF-8";// "application/json;charset=utf-8";
		}
		newHandle[2] = $.ajax({
			url : url,
			type : method,
			data : data,
			contentType : contentType,
			success : function(response) {
				var flag = false;
				if (container) {
					flag = true;
					// Store the request in cache if container is contained in the containerArr
					// and request is not a cached request i.e. using back button
					if (($.inArray(container, SiteMAN.containerArr) > -1)
							&& !SiteMAN.cachedRequest) {
						var obj = {
							"url" : url,
							"method" : method,
							"container" : container,
							"data" : data,
							"contentType" : contentType,
							"callback" : callback
						};
						SiteMAN.cacheArr.push(SiteMAN.lastRequest);
						SiteMAN.lastRequest = obj;
						SiteMAN.cachedRequest = false;
					}
					$(container).html(response);
					$(document).ready(function() {
						var tabContainer = $("#main-content-lvl-2 #tab-container");
						// if page contains tabs get the active tab and store in the
						// last requesed object SiteMAN.lastRequest
						if(flag && tabContainer){
							if(SiteMAN.lastRequest){
								var activeTab = tabContainer.find("li.active a");
								if(activeTab && activeTab.length>0)
									SiteMAN.lastRequest["activeTab"] = activeTab[0]; 
							}
						}
						SiteMAN.initFooter();
					});
				}
			},
			error : function(xhr, status, err) {
				// console.log(status + ":" + xhr.statusText);
				SiteMAN.showNotification(status + ":" + xhr.statusText,
						SiteMAN.NotificationType.error, true);
			},
			complete : function(response) {

				SiteMAN.removeAjaxHandle(newHandle[1], 1);
				SiteMAN.hideProgress();
				if (callback && (typeof callback == "function")) {
					callback(response.responseText, arguments[1]);
				}
			}
		});
		SiteMAN.updateAjaxHandle(newHandle[1], 1, newHandle[2]);
	},
	findAjaxRunning : function(handleStr) {
		var retval = 0;
		$.each(SiteMAN.ajaxHandles, function(key, value) {
			// console.log("cosole.log ",value[0],value[1],
			// value[2].readyState);
			try {
				if (value[0] == handleStr && value[2].readyState != 4) {
					retval = 1;
					return 1;
				}
				if (value[2].readyState == 4)
					SiteMAN.ajaxHandles.splice(key, 1);
			} catch (e) {
			}
		});
		// console.log("returning " , handleStr,retval);
		return retval;
	},
	removeAjaxHandle : function(handleStr, idx) {
		$.each(SiteMAN.ajaxHandles, function(key, value) {
			try {
				if (value[idx] == handleStr) {
					// console.log("found removing " + value[0]);
					if (value[2].readyState != 4)
						value[2].abort();
					SiteMAN.ajaxHandles.splice(key, 1);
				}
			} catch (e) {
			}
		});
		return;
	},
	updateAjaxHandle : function(handleStr, idx, ajaxobj) {
		$.each(SiteMAN.ajaxHandles, function(key, value) {
			try {
				if (value[idx] == handleStr) {
					// console.log("found updating " + value[0]);
					SiteMAN.ajaxHandles[key][2] = ajaxobj;
				}
			} catch (e) {
			}
		});
		return;
	},
	emptyDataTable : function(tableId) {
		if ($.fn.DataTable.isDataTable(tableId)) {
			$(tableId).DataTable().clear().destroy();
		} else {
			$(tableId + " tbody").empty();
			if ($(tableId + "_wrapper").length > 0) {
				$(tableId + "_wrapper").before($(tableId).remove());
				$(tableId + "_wrapper").remove();
			}
		}
	},
	hasKey : function(obj, key) {
		return obj.hasOwnProperty(key);
	},
	hideProgress : function() {
		$(".notifyjs-wrapper").trigger('notify-hide');
	},
	initDateBox : function(elementId, dtFormat) {
		if (dtFormat == undefined)
			dtFormat = 'mm-dd-yyyy';
		$(elementId).datepicker({
			format : dtFormat
		// inline : true,
		// changeYear : true,
		// selectOtherMonths : true,
		// yearRange : '1945:2035'
		});
	},
	initFooter : function() {
		if ($("body").height() < $(window).height()) {
			$(".footer").addClass("fixed");
		} else {
			$(".footer").removeClass("fixed");
		}
		$(window).off("resize");
		$(window).on("resize", function() {
			if ($("body").height() < $(window).height()) {
				$(".footer").addClass("fixed");
			} else {
				$(".footer").removeClass("fixed");
			}
		});
	},
	initModalDialog : function(headerText) {
		$("#searchModalWindow #modalLable").text(headerText);
	},
	initSideBar : function() {
		$(".leftside-navigation .sub-menu > a").click(function() {
			var o = ($(this).offset());
			var diff = 80 - o.top;
			if (diff > 0)
				$(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
			else
				$(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
		});

		$('.sidebar-toggle-box').click(function(e) {
			$(".leftside-navigation").niceScroll({
				cursorcolor : "#959595",
				cursorborder : "0px solid #fff",
				cursorborderradius : "0px",
				cursorwidth : "3px"
			});

			$('#sidebar').toggleClass('hide-left-bar');
			if ($(window).width() < 750) {
				$('#sidebar').toggleClass('show-left-bar');
				$('#main-content').toggleClass('merge-right');
				$('#sidebar').toggleClass('hidden-xs');

			}
			if ($('#sidebar').hasClass('hide-left-bar')) {
				$(".leftside-navigation").getNiceScroll().hide();
			}
			$(".leftside-navigation").getNiceScroll().show();
			$('#main-content').toggleClass('merge-left');
			e.stopPropagation();

		});
	},
	initTopBar : function() {
		$("#show-header-bar").on("click", function() {
			if ($("#show-header-bar").hasClass("open")) {
				$(".header-bar").attr("style", "top: -200px");
				$("#show-header-bar").removeClass("open");
			} else {
				$(".header-bar").attr("style", "top: 42px");
				$("#show-header-bar").addClass("open");
			}
		});
		$("#show-right-info-bar").on("click", function() {
			if ($("#show-right-info-bar").hasClass("move")) {
				$(".right-info-bar").attr("style", "right: -250px");
				$("#show-right-info-bar").removeClass("move");
			} else {
				$(".right-info-bar").attr("style", "right: 0px");
				$("#show-right-info-bar").addClass("move");
			}
		});
	},
	isArray : function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},
	isEmpty : function(obj, nameSpace) {
		if (nameSpace) {
			if (eval("typeof " + nameSpace) === "undefined") {
				return true;
			}
			return false;
		}
		if (SiteMAN.isArray(obj)) {
			if (obj.length > 0)
				return false;
			else
				return true;
		} else {
			for ( var prop in obj) {
				// if(obj.hasOwnProperty(prop))
				return false;
			}
			return true;
		}
	},
	loadListFromServer : function(url, elementId, displayFieldName,
			ValueFieldName, defaultText, defaultValue, params, callback) {

		SiteMAN.doAjax(url, SiteMAN.AjaxMethod.get, undefined, params,
				undefined, function(response) {

					var data = JSON.parse(response);
					SiteMAN
							.bindListWithData(data, elementId,
									displayFieldName, ValueFieldName,
									defaultText, defaultValue, callback);
				});
	},
	reInitializeTableWithDownload : function(id) {
		var dt = undefined;
		if ($.fn.DataTable.isDataTable(id)) {
			dt = $(id).dataTable();
			var oSettings = dt.fnSettings();
			oSettings["sDom"] = SiteMAN.dataTableConfig["dom"];
			oSettings["oTableTools"] = SiteMAN.dataTableConfig["oTableTools"];
			SiteMAN.emptyDataTable(id);
			dt = $(id).dataTable(oSettings);
		} else {
			dt = $(id).dataTable(SiteMAN.dataTableConfig);
		}
		return dt;
	},
	reRenderDataGrid : function(data, tableselector) {
		var dt = $(tableselector).dataTable();
		  dt.fnClearTable();
		  dt.fnAddData(data);
		  dt.fnDraw();
	},
	showNotification : function(message, type, autoHide) {
		if (typeof data === 'undefined') {
			autoHide = true;
		}
		$.notify(message, {
			className : type,
			globalPosition : 'top right',
			autoHide : autoHide,
			showAnimation : "fadeIn",
			hideAnimation : "fadeOut",
			hideDuration : 6000
		});
	},
	showProgress : function() {
		$("#header").notify("Loading, please wait...", {
			className : "info",
			elementPosition : 'bottom left',
			globalPosition : 'top left',
			autoHide : false,
			showAnimation : "fadeIn",
			hideAnimation : "fadeOut",
			hideDuration : 1000
		});
	},
	showLoader : function(modalObj) {
		if (!modalObj) {
			SiteMAN.blockUI();
		} else {
			$("#loader").show();
		}
	},
	hideLoader : function(modalObj) {
		$("#loader").hide();
		SiteMAN.unBlockUI();
		if (modalObj) {
			modalObj.hideDialog();
		}
	},
	getSelectedRowFromDataTable : function(bindId) {
		var dt = $(bindId + " table.dataTable").DataTable();
		var rowId = dt.rows('.selected')[0][0];
		var data = undefined
		if (rowId != undefined) {
			data = dt.row(rowId).data();
		}
		return data;
	},
	formatDate : function(date) {
		if (Object.prototype.toString.call(date) === '[object Date]') {
			month = '' + (date.getMonth() + 1), day = '' + date.getDate(),
					year = date.getFullYear();
			// console.log("month : ",month," day : ",day," year : ",year);
			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;
			// console.log("in if part : ",[month, day, year].join('-'));
			return [ month, day, year ].join('-');
		} else {
			return date;
		}
	},
	toggleModuleMenuStrip : function(toggleMenuId, obj) {

		if ($('#collapse_open2') != undefined) {
			$(toggleMenuId).slideToggle(
					'fast',
					function() {
						$($(obj)).toggleClass(
								'fa-angle-double-up , fa-angle-double-down',
								200);
					});
		}
	},
	createClone : function(container, prefix) {
		var objPostfix = Math.random().toString(36).substring(7);
		var sourceDiv = $(container).clone(true);
		var clonedContainerId = (prefix + objPostfix);
		// sourceDiv.appendTo("body");
		$(sourceDiv).attr("id", clonedContainerId);
		return sourceDiv;
	}
	,
	populateList: function(url, id, populateAry){
		callback = function(response){
			var result = JSON.parse(response);
			Roles.tokenResult = result;
			console.log("populate Array : ",populateAry);
			 $(id).tokenInput(result, {
                 theme: "facebook",
                 tokenValue: "_id",
                 prePopulate: populateAry
             });
		}
		SiteMAN.doAjax(url, undefined, undefined, undefined, undefined, callback);
	},
};

SiteMAN.LoggedUSER = {
	user : {},
	getLoggedUserDetailByKey : function(key) {
		if (SiteMAN.isEmpty(SiteMAN.LoggedUSER.user))
			return "";
		if (SiteMAN.hasKey(SiteMAN.LoggedUSER.user, key))
			return SiteMAN.LoggedUSER.user[key];
		return "";
	},
	getLoggedUserEmail : function() {
		return SiteMAN.LoggedUSER.getLoggedUserDetailByKey("userEmail");
	},
	getLoggedUserUUID : function() {
		return SiteMAN.LoggedUSER.getLoggedUserDetailByKey("userUUID");
	}
};

String.prototype.escape = function() {
	return this.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/])/g, '\\$1');
};

function customDropdownRenderer(instance, td, row, col, prop, value,
		cellProperties) {
	var optionsList = cellProperties.select2Options.data;
	var selectedId;
	for (var index = 0; index < optionsList.length; index++) {
		if (value == optionsList[index].id) {
			selectedId = optionsList[index].id;
			value = optionsList[index].text;
		}
	}
	Handsontable.TextCell.renderer.apply(this, arguments);
	// you can use the selectedId for posting to the DB or server
}

// for runtime validations
// SiteMAN.Forms = {};
// SiteMAN.Forms.Validations = {
// init : function() {
// console.log("Initiating Validations")
// },
//
// requiredField : function(elementName, value) {
// if (value)
// return false;
// else
// return true;
// }
// };
// for runtime validations

SiteMAN.GlobalSearch = {
		dataUrl : 'dms/search',
		viewUrl : 'dms/searchglobal',
		tblObj : '',
		module : '',
		bindId : '',
		searchKey: undefined,
		moduleName : undefined,
		init : function() {
			$(".global-search-list").off("click");
			$(".global-search-list").on("click", function() {
				$(".global-search-list").removeClass("active");
				$(this).addClass("active");
				$("#search-select-module").text($(this).text());
			});
			$(document).off("click", ".globel_search .search_icon");
			$(document).on("click", ".globel_search .search_icon",
					function() {
						SiteMAN.GlobalSearch.loadSearchResults();
					});
		},

		loadSearchResults : function() {
			var searchKey = $('#global-searchbox').val();
			var collectionName = $("#global-searchbox-container a.active").data(
					"value");
			if (!collectionName) {
				SiteMAN.showNotification("Please select a module",
						SiteMAN.NotificationType.error);
				return false;
			}
			if (!searchKey) {
				SiteMAN.showNotification("Please enter a string to search",
						SiteMAN.NotificationType.error, true);
				return false;
			}
			SiteMAN.GlobalSearch.searchKey = searchKey;
			SiteMAN.GlobalSearch.moduleName = collectionName;
			var callback = function() {
				$("#project-list-select").hide();
				var data = {
					collectionName : collectionName, // $('#module').val()
					searchKey : searchKey
				};

				SiteMAN.doAjax(SiteMAN.GlobalSearch.dataUrl,
						SiteMAN.AjaxMethod.get, undefined, data, undefined,
						SiteMAN.GlobalSearch.renderGrid);
			};
			SiteMAN.doAjax(SiteMAN.GlobalSearch.viewUrl, SiteMAN.AjaxMethod.get,
					"#main-content-lvl-1", undefined, undefined, callback);
		},
		renderGrid : function(response) {
			var data = JSON.parse(response);

			var htmlToolbar = "";
			htmlToolbar += "<button type='button' class='btn btn-primary' onclick='SiteMAN.GlobalSearch.viewModule();'> View</button>";

			var table = $("#search-results-table").dataTable({
				dom : '<"toolbar">frtip',
				columns : [ {
					data : 'title',
					defaultContent : ''
				}, {
					data : 'objectCode',
					defaultContent : ''
				} ],
				data : data
			});
			
			var table = $("#search-results-table").dataTable();
			var tableObj = table.api();
			$("div.toolbar").html(htmlToolbar);
			$(".main_heading").text("Searched Result"); 

			SiteMAN.bindDataTableSingleRowSelection("#search-results-table"
					+ '-container', tableObj);
			 table.fnClearTable();
			 table.fnAddData(data);
			 table.fnDraw();
		},

		viewModule : function() {
			var moduleName = SiteMAN.GlobalSearch.moduleName;
			if(!moduleName) {
				SiteMAN.showNotification("Module not selected!",
						SiteMAN.NotificationType.error);
				return false;
			}
			var row = SiteMAN.getSelectedRowFromDataTable("#search-results-table"
					+ '-container');
			if (row) {
				var data = {
					"id" : row["_id"]
				};
				var modules = Object.keys(SiteMAN.Constants.Modules);
				var selectedModule = undefined;
				$.each(modules, function(index, moduleKey){
					var module = SiteMAN.Constants.Modules[moduleKey];
					if(module["name"] && module["name"]===moduleName){
						selectedModule = module;
						return false;
					}
				});
				SiteMAN.Module.dataId = row["_id"];
				if(selectedModule){
					var callback = function(){
						Dashboard.DMS.Menus.setHeader(selectedModule);
					};
					SiteMAN.doAjax(selectedModule["viewUrl"], SiteMAN.AjaxMethod.get,
							"#main-content-lvl-1", data,
							undefined, callback);
				}else{
					SiteMAN.showNotification("Module not found!",
							SiteMAN.NotificationType.error);
				}
			}else{
				SiteMAN.showNotification("Please select a row!", 
						SiteMAN.NotificationType.error);
			}
		}
	};

SiteMAN.Constants = {
	Modules : {
		Project : {
			name : "project",
			viewUrl : "project/projectview",
			listId : "87d8d675-efa9-4323-b7ca-cf15c679828d",
			readId : "4ee52031-7999-4191-bcad-3222bf588d67",
			editId : "09ad172a-6042-4515-9479-dcf2dc5b916e",
			displayName : "Project"
		},
		Transmittal : {
			name : "transmittal",
			viewUrl : "dms/transmittals/view",
			listId : "90b456d9-a75b-4075-882e-ee4d41c77452",
			readId : "13c8b404-e099-4427-a65c-9286ea431a5f",
			editId : "43fbaa87-307f-4d87-b90d-a31e58159dd8",
			displayName : "Transmittal"
		},
		Submittal : {
			name : "submittal",
			viewUrl : "dms/submittal/view",
			listId : "9bd92906-00d5-4d25-90bf-21a977b497a4",
			readId : "00ed5cca-faf3-4005-a8a3-6a3a2ce212ad",
			editId : "24563e5c-189f-4f11-a27d-7776343073fd",
			displayName : "Submittal"
		},
		Discussions : {
			name : "discussions",
			viewUrl : "",
			listId : "c375f673-76d2-44ff-90fa-868ebbbc5ea9",
			readId : "",
			editId : "",
			displayName : "Discussion"
		},
		Alerts : {
			name : "alerts",
			viewUrl : "",
			listId : "03fff13b-9823-4a00-afa8-d44540ff834b",
			readId : "",
			editId : "",
			displayName : "Alerts"
		},
		Favorite : {
			name : "favorite",
			viewUrl : "",
			listId : "2797cc8f-9201-44aa-b56f-0f679e233963",
			readId : "",
			editId : "",
			displayName : "Favorite"
		},
		Document : {
			name : "document",
			viewUrl : "dms/documentview",
			listId : "",
			createId : "9e22340e-7bd1-4acd-b2cb-7d06f3784735",
			readId : "1bbfc902-36cf-405c-945b-a96de976e2da",
			editId : "552e0129-7c37-436b-ad72-e54ed6a9bf12",
			displayName : "Document"
		}
	}
};
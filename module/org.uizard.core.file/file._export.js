/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module file
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class _export
 * @extends file
 **/
org.uizard.core.file._export = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 **/
	this.dialog = null;
	
	/**
	 * The array object that contains the information about buttons on the bottom of a dialog 
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.buttons = null;
	
	/**
	 * This presents the current browser version
	 * @property tabView
	 **/
	this.tabView = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
	this.treeView = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
	this.layout = null;
};

org.uizard.core.file._export.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 **/
	init: function () { 
		
		var handleOk = function() { 
			if ($("#fileExportProjectPath").attr("value")=="Not selected") {
				alert("Please, select project");
				return false;
			}
			else {
				alert("Ok!");
			}

			var postdata = {
				selectProjectName: $("#fileExportProjectName").attr("value"),
				selectProjectPath: $("#fileExportProjectPath").attr("value"),
				fileExportType: $("#fileExportType").attr("value")
			};
			
			$.post("module/org.uizard.core.file/file._export.php", postdata, function (data) {
				var receivedData = eval("("+data+")");

				if(receivedData.errCode==0) {
					window.open(receivedData.downloadPath,'downloading','height=100px, width=100px');
					alert("Ok!");
				}

			});
		
			//alert("Ok!");
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.file._export.dialog();
		this.dialog.init({
			title:"Export", 
			path:"../../config/dialog/org.uizard.core.file/file._export.html",
			width:595,
			height:400,
			modal:true,
			yesText:"Open",
			noText:"Cancel",
			buttons:this.buttons,
			success: function () {
				self.layout = new YAHOO.widget.Layout("fileExportDialogMiddle", {
		            units: [
						{ position: 'left', width: 180, body: 'fileExportDialogLeft', scroll: true, zIndex: 1, resize: true, gutter: '0px 3px 0px 0px' },
						{ position: 'center', body: 'fileExportDialogCenter', scroll: true}
					]
		        });

				//$("#projectOpenDialogLeft").css("border","1px solid #000");

	            self.layout.render();
			}
		});
		this.dialog = this.dialog.dialog;
		
		//this.dialog.panel.setBody("AA");
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		this.addProjectList();
		this.dialog.panel.show();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectList 
	 **/	
	addProjectList: function () {
		var postdata = {
			kind: "project",
			projectName: ""
		};
		
		$.post("module/org.uizard.core.file/file.getNodes.php", postdata, function (data) {
			
			var sortJsonData = function (x,y) {
				return ((x.cls > y.cls) ? -1 : ((x.cls < y.cls) ? 1 : 0 ));
			};
			
			var sortProjectTreeview = function (sortingData) { 				
				sortingData.sort(sortJsonData);
				
				for(i=0; i<sortingData.length; i++) {
					if(sortingData[i].children) {
						sortProjectTreeview(sortingData[i].children);
					}
				}
			};
			
			var sortingData = eval(data);
			
			for(var name in sortingData) {
				if(sortingData[name].cls=="folder") {
					var iconStr = "";
					iconStr += "<div id='selector_"+sortingData[name].filename+"' class='selector_project'>";
					iconStr += sortingData[name].filename;
					iconStr += "</div>";

					$("#fileExportProjectList").append(iconStr);
					
					//alert("selector_"+sortingData[name].filename);
				}
			}
			
			$(".selector_project").click(function() {
				$("#fileExportProjectName").attr("value", "");
				$("#fileExportProjectPath").attr("value", "");
			
				$(".selector_project").removeClass("selectedButton");
				$(this).addClass("selectedButton");
				
				$("#fileExportProjectPath").attr("value", $(this).html());
			
				$.ajax({
					type: "GET",
					dataType: "xml",
					async :false,
					url: "../../project/"+$(this).html()+"/project.xml",
					success: function(xml) {
						$("#fileExportProjectInformation").empty();
						$("#fileExportProjectInformation").append("<b>project Type : </b>");
						$("#fileExportProjectInformation").append($(xml).find("TYPE").text()+"<br/>");
						$("#fileExportProjectInformation").append("<b>project Author : </b>");
						$("#fileExportProjectInformation").append($(xml).find("AUTHOR").text()+"<br/>");
						$("#fileExportProjectInformation").append("<b>project Name : </b>");
						$("#fileExportProjectInformation").append($(xml).find("NAME").text()+"<br/>");
						$("#fileExportProjectInformation").append("<b>project About : </b>");
						$("#fileExportProjectInformation").append($(xml).find("ABOUT").text()+"<br/>");
						$("#fileExportProjectInformation").append("<b>project Date : </b>");
						$("#fileExportProjectInformation").append($(xml).find("DATE").text()+"<br/>");
						
						$("#fileExportProjectName").attr("value", $(xml).find("NAME").text());
					}
					, error: function(xhr, status, error) {alert(error);}
				});
			});
		});
	}
};
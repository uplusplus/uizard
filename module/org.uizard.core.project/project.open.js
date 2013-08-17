/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module project
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class open
 * @extends project
 **/
org.uizard.core.project.open = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 * @type Object
	 * @default null
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
	 * The array object that contains the information about buttons on the bottom of a dialog 
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.layout = null;
};

org.uizard.core.project.open.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 **/
	init: function () {
		
		var self = this;
				
		var handleOpen = function() { 
			// project open
			if ($("#divProjectPath").attr("value")=="Not selected") {
				alert("Please, select project");
				return false;
			}
			else {
				alert("Ok!");
			}
			
			core.currentProjectPath = $("#divProjectPath").attr("value");
			core.currentProjectName = $("#divProjectName").attr("value");
			core.currentProjectType = $("#divProjectType").attr("value");
			
			
			var postdata = {
				kind: "project",
				projectName: core.currentProjectPath
			};
			core.mainLayout.refreshProjectExplorer(postdata);
			core.dialogProjectProperty.addPluginsToolBox(0);
			/////////// noo-ri
			
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"Open", handler:handleOpen, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.project.open.dialog();
		this.dialog.init({
			title:"Open Project", 
			path:"../../config/dialog/org.uizard.core.project/project.open.html",
			width:600,
			height:400,
			modal:true,
			buttons:this.buttons,
			success: function () {
				self.layout = new YAHOO.widget.Layout("projectOpenDialogMiddle", {
		            units: [
						{ position: 'left', width: 180, body: 'projectOpenDialogLeft', scroll: true, zIndex: 1, resize: true, gutter: '0px 3px 0px 0px' },
						{ position: 'center', body: 'projectOpenDialogCenter', scroll: true}
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

					$("#projectList").append(iconStr);
				}
			}
			
			$(".selector_project").click(function() {
				$(".selector_project").removeClass("selectedButton");
				$(this).addClass("selectedButton");
				
				$("#divProjectPath").attr("value", $(this).html());

				$.ajax({
					type: "GET",
					dataType: "xml",
					async :false,
					url: "project/"+$(this).html()+"/project.xml",
					success: function(xml) {
						$("#divProjectInformation").empty();
						$("#divProjectInformation").append("<b>project Type : </b>");
						$("#divProjectInformation").append($(xml).find("TYPE").text()+"<br/>");
						$("#divProjectInformation").append("<b>project detailed Type : </b>");
						$("#divProjectInformation").append($(xml).find("DETAILEDTYPE").text()+"<br/>");
						$("#divProjectInformation").append("<b>project Author : </b>");
						$("#divProjectInformation").append($(xml).find("AUTHOR").text()+"<br/>");
						$("#divProjectInformation").append("<b>project Name : </b>");
						$("#divProjectInformation").append($(xml).find("NAME").text()+"<br/>");
						$("#divProjectInformation").append("<b>project About : </b>");
						$("#divProjectInformation").append($(xml).find("ABOUT").text()+"<br/>");
						$("#divProjectInformation").append("<b>project Date : </b>");
						$("#divProjectInformation").append($(xml).find("DATE").text()+"<br/>");
						
						$("#divProjectName").attr("value", $(xml).find("NAME").text());
						$("#divProjectType").attr("value", $(xml).find("TYPE").text());
					}
					, error: function(xhr, status, error) {alert(error);}
				});
			});
		});
	}
};
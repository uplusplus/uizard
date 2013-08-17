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
 * @class _new
 * @extends project
 **/
org.uizard.core.project._new = function () {
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
	 * This presents the current browser version
	 * @property dialog
	 * @type Object
	 * @default null
	 **/
	this.tabView = null;
};

org.uizard.core.project._new.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		var self = this;
		
		var handleOk = function() { 
			// project create
			if ($("#inputProjectType").attr("value")=="") {
				alert("Please, select the project type");
				return false;
			}
			else if ($("#inputProjectSource").attr("value")=="") {
				alert("Please, select the project source");
				return false;
			}
			else if ($("#inputProjectSource").attr("value")=="SVN" && ($("#inputProjectSVNURL").attr("value")=="" || $("#inputProjectSVNID").attr("value")=="" || $("#inputProjectSVNPW").attr("value")=="")) {
				alert("Please, select the project source");
				return false;
			}
			else if ($("#inputProjectDetailedType").attr("value")=="") {
				alert("Please, select the project detailed type");
				return false;
			}
			else if ($("#inputProjectAuthor").attr("value")=="") {
				alert("Please, input the project author");
				return false;
			}
			else if ($("#inputProjectName").attr("value")=="") {
				alert("Please, input the project name");
				return false;
			}
			else if ($("#inputProjectAbout").attr("value")=="") {
				alert("Please, input the project about");
				return false;
			}
			
			
			var postdata = {
				inputProjectSource: $("#inputProjectSource").attr("value"),
				inputProjectSVNURL: $("#inputProjectSVNURL").attr("value"),
				inputProjectSVNID: $("#inputProjectSVNID").attr("value"),
				inputProjectSVNPW: $("#inputProjectSVNPW").attr("value"),
				inputProjectType: $("#inputProjectType").attr("value"),
				inputProjectDetailedType: $("#inputProjectDetailedType").attr("value"),
				inputProjectAuthor: $("#inputProjectAuthor").attr("value"),
				inputProjectName: $("#inputProjectName").attr("value"),
				inputProjectAbout: $("#inputProjectAbout").attr("value")
			};
						
			$.post("module/org.uizard.core.project/project._new.php", postdata, function (data) {

				var receivedData = eval("("+data+")");

				if(receivedData.errCode==0) {
				
					core.currentProjectPath = receivedData.author+"_"+receivedData.projectName;
					core.currentProjectName = receivedData.projectName;
					core.currentProjectType = receivedData.type;

					// call newProject plugin
					core.pluginManager.newProject(core.currentProjectName, receivedData.author, core.currentProjectType, core.currentProjectPath);

					var postdata = {
						kind: "project",
						projectName: core.currentProjectPath
					};

					core.mainLayout.refreshProjectExplorer(postdata);
					core.dialogProjectProperty.addPluginsToolBox(0);

					alert("Ok!");
				}
			});						
			/////////// noo-ri
			
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.project._new.dialog();
		this.dialog.init({
			title:"New Project", 
			path:"../../config/dialog/org.uizard.core.project/project._new.html",
			width:600,
			height:400,
			modal:true,
			buttons:this.buttons,
			success: function () {
				self.addProjectItem();
			},		
			kind:"newProject"
		});
				
		this.dialog = this.dialog.dialog;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		//count the total step of wizard dialog 
		this.dialog.totalStep = $("div[id='projectNew']").find(".wizardStep").size();
		
		// Add click event on dialog select item
		$(".projectWizardFirstButton").click(function () {
			$(".projectWizardSecondButton").removeClass("selectedButton");
			
			$("#inputProjectType").attr("value", "");
			$("#inputProjectDetailedType").attr("value", "");
			
			$("#textProjectDescription").empty();
		
			$(".projectWizardFirstButton").removeClass("selectedButton");
			$(this).addClass("selectedButton");
						
			$(".all").css("display", "none");
			$("."+$(this).attr("project-type")).css("display", "block");
		});
		
		$(".projectWizardSecondButton").click(function () {
			$(".projectWizardSecondButton").removeClass("selectedButton");
			$(this).addClass("selectedButton");
			
			$("#inputProjectType").attr("value", $(this).attr("projecttype"));
			$("#inputProjectDetailedType").attr("value", $(this).text());
			
			$("#textProjectDescription").empty();
			$("#textProjectDescription").append($(this).attr('description'));
		});
		
		$("#inputProjectSource").change(function () {
			if ($(this).attr("value")=="SVN") {
				$("#projectNewSVNProperties").css("display","block");
			}
			else {
				$("#projectNewSVNProperties").css("display","none");
			}
		});

		// 20110710. noo-ri
		this.dialog.panel.show();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectItem
	 **/
	addProjectItem: function () {
		// for step 1
		$("div[id='projectNew']").find(".projectTypes").append("<div class='projectWizardFirstButton' project-type='all' style='height:40px; padding:8px; border-bottom:1px solid #ccc; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizard.png' style='width:40px; height:40px; vertical-align:middle;' /><span style='margin-left:5px;'>All</span></div>");
		
		$("div[id='projectNew']").find(".projectTypes").append("<div class='projectWizardFirstButton' project-type='uizardp' style='height:40px; padding:8px; border-bottom:1px solid #ccc; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizard.png' style='width:40px; height:40px; vertical-align:middle;' /><span style='margin-left:5px;'>UIzard Projects</span></div>");
		
		$("div[id='projectNew']").find(".projectItems").append("<div class='projectWizardSecondButton all uizardp' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;' description='  UIzard Customization을 위한 프로젝트를 생성합니다.' projecttype='UIzard'><img src='config/image/org.uizard.core.project/uizardCustomization.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br /><a>UIzard Customization</a></div>");
		$("div[id='projectNew']").find(".projectItems").append("<div class='projectWizardSecondButton all uizardp' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;' description='  UIzard Plugin을 위한 프로젝트를 생성합니다.' projecttype='UIzard'><img src='config/image/org.uizard.core.project/uizardPlugin.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br /><a>UIzard Plugin</a></div>");
		$("div[id='projectNew']").find(".projectItems").append("<div class='projectWizardSecondButton all uizardp' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;' description='  UIzard Theme를 위한 프로젝트를 생성합니다.' projecttype='UIzard'><img src='config/image/org.uizard.core.project/uizardTheme.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br /><a>UIzard Theme</a></div>");
	}	
};
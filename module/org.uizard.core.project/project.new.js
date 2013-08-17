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
 * @class new
 * @extends project
 **/
org.uizard.core.project.new = function () {
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

org.uizard.core.project.new.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		var self = this;
		
		var handleOk = function() { 
			alert("Ok!");
			
			// project create 
				var postdata = {
				inputProjectAuthor: "uizard",
				inputProjectName: "testproject"
			};
			
			$.post("module/org.uizard.core.project/project.new.php", postdata, function (data) {
				var receivedData = eval("("+data+")");
								
				if(receivedData.errCode==0) {
									
					var postdata = {
						kind: "project",
						projectName: receivedData.author+"/"+receivedData.projectName
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
						//sortProjectTreeview(sortingData);
						
						//alert(sortingData.toSource());
						
						//console.log(data);
						self.treeviewProject = new YAHOO.widget.TreeView("projectExplorer", sortingData);
			
						//this.projectProperties.files = sortingData;
						
			
						self.treeviewProject.subscribe("dblClickEvent", function(nodedata) {	
							if(nodedata.node.data.cls == "file") {
								var filename = nodedata.node.data.filename;
								var filetype = nodedata.node.data.filetype;
								var filepath = nodedata.node.data.parentLabel;
								
								self.windowManager.open(filepath, filename, filetype);
							}
						});
						
			
						self.treeviewProject.render();
						//self.treeviewProject.expandAll();
						
						$("#projectExplorer").prepend("<div class='projectName'>Project Name</div>");
						
						var fileContextMenu = new org.uizard.core.menu.context();
						
						//for SVN Plugin			
						fileContextMenu.init("../../config/menu/org.uizard.core.project/project.explorer.file.html", "project.explorer.file", $("#projectExplorer").find(".ygtvcell"), null, null, function() {
							$("a[action=commit]").click(function () {
								core.dialogCommitFile.show();
							});
							$("a[action=revert]").click(function () {
								core.dialogRevertFile.show();
							});
						});
			
						$("#projectExplorer").find(".ygtvcell").mousedown(function (e) {
							if (e.which == 3) {
								core.selectedFile = $(this).find(".fullpath").html();
							}
						});
			
						var projectContextMenu = new org.uizard.core.menu.context();
						projectContextMenu.init("../../config/menu/org.uizard.core.project/project.explorer.html", "project.explorer", "projectExplorer", null);
					});
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
						 
		this.dialog = new org.uizard.core.project.new.dialog();
		this.dialog.init({
			title:"New Project", 
			path:"../../config/dialog/org.uizard.core.project/project.new.html",
			width:600,
			height:400,
			modal:true,
			buttons:this.buttons,
			success: function () {
				self.addProjectItem();
			}			
		});
				
		this.dialog = this.dialog.dialog;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		//count the total step of wizard dialog 
		this.dialog.totalStep = $(".wizardStep").size();
		// 20110710. noo-ri
		this.dialog.panel.show();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectItem
	 **/
	addProjectItem: function () {
		// for step 1
		$("div[id='project.new']").find(".projectTypes").append("<div style='height:40px; padding:8px; border-bottom:1px solid #ccc; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizard.png' style='width:40px; height:40px; vertical-align:middle;' /><span style='margin-left:5px;'>All</span></div>");
		
		$("div[id='project.new']").find(".projectTypes").append("<div style='height:40px; padding:8px; border-bottom:1px solid #ccc; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizard.png' style='width:40px; height:40px; vertical-align:middle;' /><span style='margin-left:5px;'>UIzard Projects</span></div>");
		
		$("div[id='project.new']").find(".projectItems").append("<div style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizardCustomization.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br />UIzard Customization</div>");
		$("div[id='project.new']").find(".projectItems").append("<div style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizardPlugin.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br />UIzard Plugin</div>");
		$("div[id='project.new']").find(".projectItems").append("<div style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizardTheme.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br />UIzard Theme</div>");
		
		// for step 2
		$("div[id='project.new']").find(".projectAuthor").append("Project Author<br/><input type='text' id='inputProjectAuthor'>");
		$("div[id='project.new']").find(".projectName").append("Project Name<br/><input type='text' id='inputProjectName'>");
		$("div[id='project.new']").find(".projectAbout").append("Project About<br/><input type='text' id='inputProjectAbout'>");
	}	
};
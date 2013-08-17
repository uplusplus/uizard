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
 * @class open
 * @extends file
 **/
org.uizard.core.file.open = function () {
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
	 * @property layout
	 **/
	this.layout = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
	this.treeView = null;
	
	/**
	 * This presents the current browser version
	 * @property filename
	 **/
	this.filename = null;

	/**
	 * This presents the current browser version
	 * @property filetype
	 **/
	this.filetype = null;

	/**
	 * This presents the current browser version
	 * @property filepath
	 **/
	this.filepath = null;
	
	/**
	 * This presents the current browser version
	 * @property filepath
	 **/
	this.currentPath = null;
};

org.uizard.core.file.open.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		
		var self = this;
				
		var handleOk = function() { 

			if(filepath=="" || filename=="" || filetype=="") {
				alert("None seleted file.");
				return false;
			}

			core.mainLayout.windowManager.open(filepath, filename, filetype);
					
			alert("Ok!");
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 

		this.dialog = new org.uizard.core.file.open.dialog();
		this.dialog.init({
			title:"Open file", 
			path:"../../config/dialog/org.uizard.core.file/file.open.html",
			width:600,
			height:400,
			modal:true,
			buttons:this.buttons, 
			success: function () {

				self.layout = new YAHOO.widget.Layout("openDialogMiddle", {
		            units: [
						{ position: 'left', width: 180, body: 'openDialogLeft', scroll: true, zIndex: 1, resize: true, gutter: '0px 3px 0px 0px' },
						{ position: 'center', body: 'openDialogCenter', scroll: true}
					]
		        });

	            self.layout.render();
			}
		});
		this.dialog = this.dialog.dialog;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
	
		this.currentPath = core.currentProjectPath;
	
		var postdata = {
			kind: "project",
			projectName: this.currentPath
		};
		
		this.addProjectExplorer(postdata);
		this.addProjectItem(postdata);

		this.dialog.panel.show();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectExplorer 
	 **/	
	addProjectExplorer: function(postdata) {		
		var self = this;

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
			
			var newData = new Array();

			for(var name in sortingData) {
				if(sortingData[name].cls=="folder") {
					newData.push(sortingData[name]);
				}
			}

			self.treeView = new YAHOO.widget.TreeView("fileOpenTreeview", newData);

		    self.treeView.subscribe("expand", function(nodedata) {
		        return false;
		    });

			self.treeView.subscribe("dblClickEvent", function(nodedata) {	
				if(nodedata.node.data.cls == "folder") {
					var postdata = {
						kind: "project",
						projectName: nodedata.node.data.filename
					};
					self.addProjectItem(postdata);
				}
			});
						
			self.treeView.render();
			
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectItem
	 **/	
	addProjectItem: function (postdata) {
	
		$("#fileOpeninputLocationPath").attr("value", postdata.projectName);
	
		$("#openDialogCenter").empty();
	
		var self = this;
		
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

			// back icon add
			if(postdata.projectName!="./" && postdata.projectName.indexOf("..") < 0) {
				var iconStr = "";
				iconStr += "<div class='openDialogCenter_item openDialogCenter_folder'";
				iconStr +=" filename='/..' filetype='' filepath=''>";
				iconStr += "..";
				iconStr += "</div>";
			
				$("#openDialogCenter").append(iconStr);
			}
			
			for(var name in sortingData) {
				var iconStr = "";
				if(sortingData[name].cls=="folder") {
					iconStr += "<div class='openDialogCenter_item openDialogCenter_folder'";
				}
				else {
					iconStr += "<div class='openDialogCenter_item openDialogCenter_file'";
				}
				
				iconStr +=" filename='"+sortingData[name].filename+"' filetype='"+sortingData[name].filetype+"' filepath='"+sortingData[name].parentLabel+"'>";
				iconStr += "<img style='width: 40px; height: 40px; vertical-align: middle; margin-bottom: 3px;' src='config/image/org.uizard.core.project/uizardCustomization.png'>";
				iconStr += "<br/>";
				iconStr += sortingData[name].filename;
				iconStr += "</div>";
				iconStr += "</div>";
				
				$("#openDialogCenter").append(iconStr);
			}
			
			$(".openDialogCenter_folder").dblclick(function() {

				if ($(this).attr("filename")=="/..") {
					var tempi = 0;
					tempi = self.currentPath.lastIndexOf("/");
					self.currentPath = self.currentPath.substr(0, tempi);

					var postdata = {
						kind: "project",
						projectName: self.currentPath
					};
				}
				else {
					self.currentPath = self.currentPath+"/"+$(this).attr("filename");

					var postdata = {
						kind: "project",
						projectName: self.currentPath
					};
				}
				self.addProjectItem(postdata);
				self.addProjectExplorer(postdata);
			});
			
			$(".openDialogCenter_item").click(function() {
				$(".openDialogCenter_item").removeClass("selectedButton");
				$(this).addClass("selectedButton");
			});
			
			$(".openDialogCenter_file").dblclick(function() {
				core.mainLayout.windowManager.open($(this).attr("filepath"), $(this).attr("filename"), $(this).attr("filetype"));
				this.hide(); 
			});

			$(".openDialogCenter_file").click(function() {			
				$("#fileOpenInputFileName").attr("value", $(this).attr("filename"));
				
				filename = $(this).attr("filename");
				filetype = $(this).attr("filetype");
				filepath = $(this).attr("filepath");
			});

		});
	}
};
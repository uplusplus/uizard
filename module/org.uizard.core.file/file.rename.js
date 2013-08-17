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
 * @class rename
 * @extends file
 **/
org.uizard.core.file.rename = function () {
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
};

org.uizard.core.file.rename.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		
		var self = this;
		
		var handleOk = function() { 
		
			if ($("#inputRenameNewFileName").attr("value")=="") {
				alert("Please, input the file name");
				return false;
			}
		
			var postdata = {
				selectedFilePath: $("#inputRenameOldFilePath").attr("value"),
				selectedFileName: $("#inputRenameOldFileName").attr("value"),
				inputFileName: $("#inputRenameNewFileName").attr("value")
			};
						
			$.post("module/org.uizard.core.file/file.rename.php", postdata, function (data) {
				var receivedData = eval("("+data+")");
								
				if(receivedData.errCode==0) {
					core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].filename=$("#inputRenameNewFileName").attr("value");
					core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].title=$("#inputRenameNewFileName").attr("value");
					alert("Ok!");
				}
				
				var postdata = {
					kind: "project",
					projectName: core.currentProjectPath
				};
				core.mainLayout.refreshProjectExplorer(postdata);

			});
			
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
		
		this.dialog = new org.uizard.core.file.rename.dialog();
		this.dialog.init({
			title:"Rename", 
			path:"../../config/dialog/org.uizard.core.file/file.rename.html",
			width:450,
			height:120,
			modal:true,
			buttons:this.buttons,
			success: function () {
				
			}
		});
		this.dialog = this.dialog.dialog;
		
		//this.dialog.panel.setBody("AA");
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function (file) {		
		if(file) {
			var renameFileArray = file.split("/");
			var renameFileName = renameFileArray.pop();
			var oldFilePath = "";

			for (var i=0; i < renameFileArray.length-1; i++) {
				oldFilePath += (renameFileArray[i]+"/");
			}
			
			$("#inputRenameNewFileName").attr("value", renameFileName);
			$("#inputRenameOldFilePath").attr("value", oldFilePath);
			$("#inputRenameOldFileName").attr("value", renameFileName);
			
			this.dialog.panel.show();
		}
		else {
			var isAliveWindow = false;	
	
			for (var i = 0; i < core.mainLayout.windowManager.index; i++) {
				if(core.mainLayout.windowManager.window[i].alive) {
					isAliveWindow = true;
				}
			}
		
			if(isAliveWindow) {
				$("#inputRenameNewFileName").attr("value", core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].filename);
				$("#inputRenameOldFilePath").attr("value", core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].filepath);
				$("#inputRenameOldFileName").attr("value", core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].filename);
				
				this.dialog.panel.show();
			}
		}
	}	
};
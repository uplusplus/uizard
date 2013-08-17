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
 * @class saveAs
 * @extends file
 **/
org.uizard.core.file.saveAs = function () {
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

org.uizard.core.file.saveAs.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		
		var handleSave = function() { 
			alert("Save!");
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"Save", handler:handleSave, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}];
						 
		this.dialog = new org.uizard.core.file.saveAs.dialog();
		this.dialog.init({
			title:"Save as", 
			path:"../../config/dialog/org.uizard.core.file/file.saveAs.html",
			width:600,
			height:400,
			modal:true,
			buttons:this.buttons,
			success: function () {
				//TabView Init
				//self.tabView = new YAHOO.widget.TabView('fileSaveAsContents');
				
				//TreeView Init
				self.treeView = new YAHOO.widget.TreeView("fileSaveAsTreeview");
				self.treeView.render();
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
		this.dialog.panel.show();
	}	
};
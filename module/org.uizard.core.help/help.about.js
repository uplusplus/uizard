/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module help
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class about
 * @extends help
 **/
org.uizard.core.help.about = function () {
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

org.uizard.core.help.about.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * @method init 
	 **/
	
	init: function () {
		var self = this;
		
		var handleOk = function() { 
			alert("Ok!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true}]; 
						 
		this.dialog = new org.uizard.core.help.about.dialog();
		this.dialog.init({
			title:"About UIzard 3", 
			path:"../../config/dialog/org.uizard.core.help/help.about.html",
			width:700,
			height:500,
			modal:true,
			buttons:this.buttons,
			success: function () {
				
			}			
		});
		this.dialog = this.dialog.dialog;
	}, 
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show
	 **/
	show: function () {
		this.dialog.panel.show();
	}
};

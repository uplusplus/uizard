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
 * @class tipsAndTricks
 * @extends help
 **/
org.uizard.core.help.tipsAndTricks = function () {
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
};

org.uizard.core.help.tipsAndTricks.prototype = {
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

/*
		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
*/
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true} ]

						 
		this.dialog = new org.uizard.core.help.tipsAndTricks.dialog();
		this.dialog.init({
			title:"Tips_and_Tricks", 
			path:"../../config/dialog/org.uizard.core.help/help.tipsAndTricks.html",
			width:700,
			height:400,
		 	modal:true,
			buttons:this.buttons,
			success: function () {

			},
			kind:"tipsAndTricks"			
		});
		this.dialog = this.dialog.dialog;

		this.dialog.buttons[0].handler = handleOk;

		//alert(this.dialog.buttons[0].handler.toSource());
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		this.dialog.totalStep = $("div[id='tipAndTricksContents']").find(".tipsandTricksStep").size();
		this.dialog.panel.show();
	}
};

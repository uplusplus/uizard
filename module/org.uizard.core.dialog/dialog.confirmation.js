/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module dialog
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class confirmation
 * @extends dialog
 **/
org.uizard.core.dialog.confirmation = function () {
	/**
	 * This presents the current browser version
	 * @property panel
	 **/
	this.panel = null;
	
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 **/
	this.contextMenu = null;
	
	/**
	 * This presents the current browser version
	 * @property path
	 **/
	this.path = null;
	
	/**
	 * This presents the current browser version
	 * @property title
	 **/
	this.title = null;
	
	/**
	 * This presents the current browser version
	 * @property type
	 **/
	this.type = null;
	
	/**
	 * This presents the current browser version
	 * @property left
	 **/
	this.left = null;
	
	/**
	 * This presents the current browser version
	 * @property top
	 **/
	this.top = null;
	
	/**
	 * This presents the current browser version
	 * @property width
	 **/
	this.width = null;
	
	/**
	 * This presents the current browser version
	 * @property height
	 **/
	this.height = null;
	
	/**
	 * This presents the current browser version
	 * @property yesText
	 **/
	this.yesText = null;
	
	/**
	 * This presents the current browser version
	 * @property noText
	 **/
	this.noText = null;
	
	/**
	 * This presents the current browser version
	 * @property yes
	 **/
	this.yes = null;
	
	/**
	 * This presents the current browser version
	 * @property no
	 **/
	this.no = null;
};

org.uizard.core.dialog.confirmation.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @Constructor 
	 * @param {String} option The option about contents to be set into the dialog.
	 **/
	init: function (option) {
		var self = this;

		this.title = option["title"];
		this.message = option["message"];
		
		this.yesText = option["yesText"];
		this.noText = option["noText"];
		
		this.yes = option["yes"];
		this.no = option["no"];
		
		
		var handleYes = function() { 
			if ( typeof self.yes == "function" )
				self.yes();
			this.hide(); 
		};
		
		var handleNo = function() { 
			if ( typeof self.no == "function" )
				self.no();
			this.hide(); 
		};
		
		if ($("#uizardDialogContainer").find("#panelContainer_" + this.title)) {
			$("#uizardDialogContainer").find("#panelContainer_" + this.title).remove();
		}
		
		$("#uizardDialogContainer").append("<div id='panelContainer_" + this.title + "'></div>");
		
		this.panel = new YAHOO.widget.SimpleDialog(
			"panelContainer_" + this.title, { 
				width: '400px',
				visible: false, 
				underlay: "shadow",
				close: true,
				draggable: false,
				text: this.message,
				constraintoviewport: true,
				fixedcenter: true,
				buttons: [ 
					{ text:self.yesText, handler:handleYes, isDefault:true },
					{ text:self.noText,  handler:handleNo } 
				] 
			} 
		);
		
		this.panel.setHeader(this.title);
		this.panel.setBody("Loading Data...");
		this.panel.render();
	}
	
};
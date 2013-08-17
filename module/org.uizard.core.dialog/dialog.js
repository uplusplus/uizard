/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module dialog
 **/

/**
 * This is an UIzard dialog.  
 * @class dialog
 **/
org.uizard.core.dialog = function () {
	/**
	 * This presents the current browser version
	 * @property panel
	 **/
	this.panel = null;
	
	/**
	 * This presents the current browser version
	 * @property panel
	 **/
	this.containerID = null;
	
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
	 * @property yes
	 **/	
	this.yes = null;
	
	/**
	 * This presents the current browser version
	 * @property no
	 **/
	this.no = null;
	
	/**
	 * The array object that contains the information about buttons on the bottom of a dialog 
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.buttons = null;
	
	/**
	 * This presents the current browser version
	 * @property success
	 **/
	this.success = null;
};

org.uizard.core.dialog.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {String} option The option about contents to be set into the dialog.
	 **/
	init: function (option) {
		var self = this;

		this.title = option["title"];
		this.path = option["path"];		
		this.width = option["width"];
		this.height = option["height"];
		this.modal = option["modal"];
		
		// this.yesText = option["yesText"];
		// this.noText = option["noText"];	
		this.buttons = option["buttons"];
		// this.yes = option["yes"];
		// this.no = option["no"];
		
		this.success = option["success"];
		
		this.title = this.title.split(" ").join("_");
		this.timestamp = new Date().getTime();
		
		
		if ($("#uizardDialogContainer").find("#panelContainer_" + this.title)) {
			$("#uizardDialogContainer").find("#panelContainer_" + this.title).remove();
		}
		
		
		this.containerID = "panelContainer_" + this.title + "_" + this.timestamp;
		
		
		
		$("#uizardDialogContainer").append("<div id='" + this.containerID + "'></div>");
		
		this.panel = new YAHOO.widget.Dialog(
			this.containerID, { 
				width: self.width+'px',
				height: self.height+'px', 
				visible: false, 
				underlay: "shadow",
				close: true,
				autofillheight: "body",
				draggable: false,
				constraintoviewport: true,
				modal: self.modal,
				fixedcenter: true,
				buttons:  this.buttons
					// [ { text:self.yesText, handler:handleYes, isDefault:true },
					// { text:self.noText,  handler:handleNo }] 
				 
			} 
		);
		
		this.panel.setHeader(this.title);
		this.panel.setBody("Loading Data...");
		this.panel.render();
		
		
		var url = "module/org.uizard.core.file/file.getContents.php";	
		
		$.ajax({
			url: url,			
			type: "POST",
			data: "path="+self.path,
			success: function(data) {

				self.panel.setBody(data);
				
				if ( typeof self.success == "function" )
					self.success();			
				
				
				core.dialogLoadingCount++;
				
				if (core.dialogLoadingCount == core.dialogCount) {
					$(core).trigger("coreDialogLoaded");
				}
				
				$(core).trigger("uizardLoading");
			}
		});
		
		
		return this;
	}
	
};
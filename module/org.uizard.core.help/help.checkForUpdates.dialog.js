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
 * @class checkForUpdates.dialog
 * @extends checkForUpdates
 **/
org.uizard.core.help.checkForUpdates.dialog = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 **/
	this.dialog = null;
};

org.uizard.core.help.checkForUpdates.dialog.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @constructor
	 * @param {String} option The option. 
	 **/
	init: function (option) {
		this.dialog = new org.uizard.core.dialog();
		this.dialog.init(option);
		
		return this;
	}
};

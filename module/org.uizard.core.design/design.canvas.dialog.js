/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module preference
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class preference.dialog
 * @extends preference
 **/
org.uizard.core.design.canvas.dialog = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 * @type Obejct
	 * @default null
	 **/
	this.dialog = null;
};

org.uizard.core.design.canvas.dialog.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} option The option.
	 **/
	init: function (option) {
		this.dialog = new org.uizard.core.dialog();
		this.dialog.init(option);
		
		return this;
	}
};
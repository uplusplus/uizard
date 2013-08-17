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
 * @class open.dialog
 * @extends open
 **/
org.uizard.core.scm.svn.revision.dialog = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 **/
	this.dialog = null;
};

org.uizard.core.scm.svn.revision.dialog.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 * @param {String} option The option.
	 **/
	init: function (option) {
		this.dialog = new org.uizard.core.dialog();
		this.dialog.init(option);
		
		return this;
	}
};
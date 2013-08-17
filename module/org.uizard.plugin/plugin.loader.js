/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module plugin
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class loader
 * @extends plugin
 **/
org.uizard.plugin.loader = function () {
	
};

org.uizard.plugin.loader.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () {
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method load 
	 * @param {String} path The path.
	 **/
	load: function (path) {
		$.getScript('plugins/' + 'org.uizard.core.design.uml' + '/plug.js', function () {
			var plug = new org.uizard.core.design.uml();
			
			plug.init();
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method attach 
	 **/
	attach: function () {
	
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method detach 
	 **/
	detach: function () {
		
	}
	
};
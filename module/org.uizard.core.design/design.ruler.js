/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module design
 **/

/**
 * This is an UIzard code generator.  
 * <br>UIzard starts with this code generator.
 * @class ruler
 * @extends design
 **/
org.uizard.core.design.ruler = function () {
	/**
	 * This presents the current browser version
	 * @property target
	 **/
	this.target = null;
	
	/**
	 * This presents the current browser version
	 * @property value
	 **/
	this.value = null;
	
	/**
	 * This presents the current browser version
	 * @property unit
	 **/
	this.unit = null;
	
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 **/
	this.contextMenu = new Array();
	
};

org.uizard.core.design.ruler.prototype = {
	
	/**
	 * The constructor function of the ruler class.
	 * @constructor 
	 * @param {String} target The target.
	 * @param {String} value The value.
	 * @param {String} unit The unit.
	 * @param {String} title The title of the ruler.
	 **/
	init: function (target, value, unit, title) {
		this.target = target;
		this.title = title;
		
		$(target).append("<div class='ruler'></div>");
		$(target).append("<div class='ruler_x'></div>");
		$(target).append("<div class='ruler_y'></div>");

		
		this.setUnit(value, unit);
		
		this.contextMenu[0] = new org.uizard.core.menu.context();
		this.contextMenu[0].init("../../config/menu/org.uizard.core.design/design.ruler.html", "design.ruler", $(target).find(".ruler"), this.title);
		
		this.contextMenu[1] = new org.uizard.core.menu.context();
		this.contextMenu[1].init("../../config/menu/org.uizard.core.design/design.ruler_x.html", "design.ruler_x", $(target).find(".ruler_x"), this.title);		
		
		this.contextMenu[2] = new org.uizard.core.menu.context();
		this.contextMenu[2].init("../../config/menu/org.uizard.core.design/design.ruler_y.html", "design.ruler_y", $(target).find(".ruler_y"), this.title);		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setUnit 
	 * @param {String} value The value.
	 * @param {String} unit The unit.
	 **/
	setUnit: function (value, unit) {
		this.value = value;
		this.unit = unit;
		
	}
};
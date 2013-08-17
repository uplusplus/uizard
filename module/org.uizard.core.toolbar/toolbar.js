/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module toolbar
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class toolbar
 **/
org.uizard.core.toolbar = function () {
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 * @type Object
	 * @default null
	 **/
	this.contextMenu = null;
};

org.uizard.core.toolbar.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {String} path The path.
	 * @param {String} name The name.
	 * @param {String} container The container.
	 **/
	add: function (path, name, container) {
		var self = this;
		
		var url = "module/org.uizard.core.file/file.getContents.php";

		$.ajax({
			url: url,			
			type: "POST",
			data: "path="+path,
			success: function(data) {

				$("#"+container).append(data);
				
				//self.contextMenu = 
				//self.contextMenu = new org.uizard.core.menu.context();
				//self.contextMenu.init("../../config/menu/org.uizard.core.window/window.panel.titlebar.html", "window.panel.titlebar", $("#"+container).find(".titlebar"), this.title);
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method remove 
	 **/
	remove: function () {
		//this.contextMenu.remove();
	
		delete this;
	}
};
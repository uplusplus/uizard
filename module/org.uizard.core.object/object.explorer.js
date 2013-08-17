/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module object
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class object
 **/
org.uizard.core.object.explorer = function () {
	/**
	 * This presents the current browser version
	 * @property treeviewObject
	 * @type Object
	 * @default null
	 **/
	this.target = null;
	
	/**
	 * This presents the current browser version
	 * @property treeviewObject
	 * @type Object
	 * @default null
	 **/
	this.treeviewObject = null;
};

org.uizard.core.object.explorer.prototype = {
	init: function (target, objects) {
		
		var self = this;
		
		this.target = target;
		
		self.treeviewObject = new YAHOO.widget.TreeView(this.target, objects);

		/*
		self.treeviewProject.subscribe("dblClickEvent", function(nodedata) {	
			if(nodedata.node.data.cls == "file") {
				var filename = nodedata.node.data.filename;
				var filetype = nodedata.node.data.filetype;
				var filepath = nodedata.node.data.parentLabel;
					
				self.windowManager.open(filepath, filename, filetype);
			}
		});
		*/
		
		
		self.treeviewProject.render();
		
	}
};
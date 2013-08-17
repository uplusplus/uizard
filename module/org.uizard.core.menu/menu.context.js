/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module menu
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class context
 * @extends menu
 **/
org.uizard.core.menu.context = function () {
	/**
	 * This presents the current browser version
	 * @property menu
	 * @type Object
	 * @default null
	 **/
	this.menu = null;
};

org.uizard.core.menu.context.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {String} path The path.
	 * @param {String} name The name.
	 * @param {String} trigger The trigger.
	 * @param {String} fingerprint The fingerprint.
	 * @param {String} target The target.
	 * @param {String} fn The fn.
	 * 
	 **/
	init: function (path, name, trigger, fingerprint, target, fn) {
		var self = this;
		
		if (name == "none") {
			$(trigger).bind("contextmenu", function(e) {
				return false;
			});
		}
		else {
			var url = "module/org.uizard.core.file/file.getContents.php";
			
			if (trigger == "") {
				trigger = null;
			}
	
			$.ajax({
				url: url,			
				type: "POST",
				data: "path="+path,
				success: function(data) {
					if(fingerprint != null && fingerprint != "") {
						while (data.indexOf("[{@FINGERPRINT}]") != -1) {
							data = data.replace("[{@FINGERPRINT}]", fingerprint);							
						}
	
						name = name + "_" + fingerprint;
					}
					
					$("#uizardMenuContainer").append(data);
					
					self.menu = new YAHOO.widget.ContextMenu( 
						name,  
						{ 
							trigger: trigger, 
							lazyload: true                                     
						}
					);

					
					//m.s("asdf" + fn, "asdf");
					
					if(fn) {
						fn.call(self);
					}

					/*
					if(fingerprint == "treeview") { //Does fingerprint div have a treeview?
		
						$("#"+trigger).find(".ygtvcell").bind("contextmenu", function (e) {

							var targetEl = e.target;
			 
							//m.s($(targetEl).html(), "menu.context");
							
							var currentNode = target.getNodeByElement(targetEl);
			 
			 				//m.s(currentNode.toSource(), "menu.context");
							
							if (currentNode) {
								m.s("show" + currentNode, "asdf");
								self.menu.show();
							}
							
							return false;
			 
						});
					}
					*/
				}
			});			
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method blur 
	 **/
	blur: function () {
		if (this.menu) {
			this.menu.blur();
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method remove 
	 **/
	remove: function () {
		$(this.menu.element).remove();
		
		delete this;
	}
};

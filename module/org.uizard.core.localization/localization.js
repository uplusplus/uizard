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
 * @class menu
 **/
org.uizard.core.localization = function () {
	/**
	 * This presents the current browser version
	 * @property language
	 * @type Object
	 * @default null
	 **/
	this.language = null;
	
	/**
	 * This presents the current browser version
	 * @property data
	 * @type Object
	 * @default null

	 **/
	this.data = null;
};

org.uizard.core.localization.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function (language) {
		var self = this;
		
		//Get a stencil and adapt it to div
		var url = "module/org.uizard.core.file/file.getContents.php";
		
		$.ajax({
			url: url,			
			type: "POST",
			data: "path=../../config/language/"+language+".json",
			success: function(data) {
				self.data = eval(data);
				
				self.apply(self.data[0]);
			}
		});
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	apply: function (data) {
		var self = this;
		
		if (data != null) {
			$.each(data, function (key, value) {
				$("[localizationKey='" + key + "']").html(this.value);
				if(this.children) {
					self.apply(this.children);
				}
			});
		}
	}
};

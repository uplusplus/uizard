/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module debug
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class debug
 **/
org.uizard.core.debug = function () {
	//this.ready = 1;
	this.func = null;
};

org.uizard.core.debug.prototype = {
	
	shell: function (cmd,func) {
		var self = this;
		var url = "module/org.uizard.core.debug/debug.shell.php";
		this.func = func;
		$.ajax({
			url: url,			
			type: "POST",
			data: "cmd="+cmd,
			success: function(data) {
				$("#debug").prepend("<pre>"+data+"</pre>");
				
				if ( typeof self.func == "function" )
					self.func();
			}
		});
	}
};
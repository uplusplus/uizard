/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module code-generator
 **/


/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class codeGenerator
 **/
org.uizard.core.codeGenerator = function () {

};

org.uizard.core.codeGenerator.prototype = {

	init: function () { 
		var self = this;
	},
	
	generate: function() {
		var postdata = {
			projectPath: core.currentProjectPath
		};
		
		$.post("module/org.uizard.core.codeGenerator/codeZenerator.php", postdata, function (data) {
			var receivedData = eval("("+data+")");

			if(receivedData.errCode==0) {
				alert("Generate is done.");
				alert(receivedData.test);
			}
			else {
				alert(receivedData.errCode+" : "+receivedData.message);
			}
		});
	}
		
};
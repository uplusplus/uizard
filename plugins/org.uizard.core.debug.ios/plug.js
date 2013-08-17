/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/

org.uizard.core.debug.ios = function () {
	this.name = "debug.ios";

};

org.uizard.core.debug.ios.prototype = {
		init: function (project) {
			this.debug = new org.uizard.core.debug();
			this.debug.message = new org.uizard.core.debug.message();
			
		},

		/**
		 * This function is an UIzard core initializating function.  
		 * <br>This operates the initialization tasks for layout, actions, plugins...
		 * @method build 
		 * @param {String} project The project to build.
		 **/
		build: function (project) {
			this.path_project = "../../project/"+project;
			var cmd = "cd "+this.path_project+";" +
					"projectName=" + project + ";"+
					"xcodebuild -project $projectName.xcodeproj -configuration DIST clean build;"+
					"cd build/DIST-iphoneos/;";
			this.debug.shell(cmd);
			//alert(cmd);
		},
		
		/**
		 * This function is an UIzard core initializating function.  
		 * <br>This operates the initialization tasks for layout, actions, plugins...
		 * @method remoteRun 
		 * @param {String} project The project to run.
		 * @param {String} ip The ip address to connect device.
		 * @param {String} port The port to connect device.
		 **/
		remoteRun: function (project, ip, port) {
			
		}		
};
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/

org.uizard.core.debug.android = function () {
	this.name = "debug.android";
	this.path_android = "";//org.uizard.core.preference.ini['path.android'];
	this.path_adb = "/Applications/WORK/eclipse/android-sdk-mac_86/platform-tools/";
	this.path_ant = "";
	this.path_project = "";
};

org.uizard.core.debug.android.prototype = {
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
		var self=this;
		this.path_project = "../../project/"+project;
		
		var cmd1 = "cd "+this.path_project+";"+this.path_android+"android update project --path ./;";
		var cmd2 =  "cd "+this.path_project+";"+this.path_ant+"ant release;";

		// build keystore
		var cmd3 =  "cd "+this.path_project+"/bin;"
		+ "keytool -keystore debug.keystore -genkey -dname 'cn=Android Debug, O=Android, C=US' -alias androiddebugkey -storepass key1234 -keyalg RSA -validity 10000;"
		+ "\n;";

		// sign
		var cmd4 = "cd "+this.path_project+"/bin;"
		+ "jarsigner -verbose -keystore debug.keystore -keypass key1234 -storepass key1234 -signedjar "+project+"-sigend.apk "+project+"-unsigned.apk androiddebugkey;";

		self.debug.shell(cmd1,function(){
			self.debug.shell(cmd2,function(){
				self.debug.shell(cmd3,function(){
					self.debug.shell(cmd4,function(){
					});
				});
			});
		});

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
		var self = this;
		this.path_project = "../../project/"+project;
		
		this.debug.message.m("try to connect to remote device","debug");
		
		var cmd1 = "";//this.path_adb+"adb connect "+ip+":"+port+";";

		var cmd2 =  "cd "+this.path_project+"/bin;"
			+this.path_adb+"adb install "+project+"-signed.apk;";
			
		self.debug.shell(cmd1,function(){
			self.debug.message.m(cmd1,"debug");
			self.debug.shell(cmd2,function(){
				self.debug.message.m(cmd2,"debug");
			});
		});
	}
};
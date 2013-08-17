/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/

org.uizard.core.project.iphone = function () {
	this.name = "project.iphone";

};

org.uizard.core.project.iphone.prototype = {
	init: function () {
		//filelist = ["testprojectAppDelegate2.h","testprojectAppDelegate2.m"];
		//this.addXcodeProj("testproject", "moyara", "testproject",filelist);
	},
	newProject: function(projectName, projectAuthor, projectType, projectPath){
		
	},
	generateXcodeProj : function(projectName, projectAuthor, projectPath){
		var data = {
	    		"projectName" : projectName,
	    		"projectAuthor" : projectAuthor,
	    		"projectPath" : projectPath
	    };

	    var dataString = YAHOO.lang.JSON.stringify(data);
	    
	    $.ajax({
			url: "plugins/org.uizard.core.project.iphone/generateXcodeProj.php",			
			type: "POST",
			data: {myJson:dataString},
			//async:false,
			success: function() {
				var postdata = {
						kind: "project",
						projectName: core.currentProjectPath
					};
				core.mainLayout.refreshProjectExplorer(postdata);
			}
			, error: function(xhr, status, error) {alert(error); }
		});
	},
	addXcodeProj : function(projectName, projectAuthor, projectPath, fileList){
		var data = {
	    		"projectName" : projectName,
	    		"projectAuthor" : projectAuthor,
	    		"projectPath" : projectPath,
	    		"fileList" : fileList
	    };

	    var dataString = YAHOO.lang.JSON.stringify(data);
	    
	    $.ajax({
			url: "plugins/org.uizard.core.project.iphone/addXcodeProj.php",			
			type: "POST",
			data: {myJson:dataString},
			//async:false,
			success: function(data){
				var postdata = {
						kind: "project",
						projectName: core.currentProjectPath
					};
				core.mainLayout.refreshProjectExplorer(postdata);
			}
			, error: function(xhr, status, error) {alert(error); }
		});
	}
};
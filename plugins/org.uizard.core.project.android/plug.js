/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/

org.uizard.core.project.android = function () {
	this.name = "project.android";

};

org.uizard.core.project.android.prototype = {
	init: function () {
		
	},
	newProject : function(projectName, projectAuthor, projectType, projectPath){
		var data = {
	    		"projectName" : projectName,
	    		"projectAuthor" : projectAuthor,
	    		"projectPath" : projectPath
	    };

	    var dataString = YAHOO.lang.JSON.stringify(data);
	    
	    $.ajax({
			url: "plugins/org.uizard.core.project.android/newProject.php",			
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
	}
};
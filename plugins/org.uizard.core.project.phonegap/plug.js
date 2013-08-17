/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/

org.uizard.core.project.phonegap = function () {
	this.name = "project.phonegap";

};

org.uizard.core.project.phonegap.prototype = {
	init: function () {
		//Add Project Item
		this.addProjectItem();
	},
	
		/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addProjectItem() 
	 * @return void
	 **/
	addProjectItem: function () {
		$("div[id='project.new']").find(".wizardStep").find(".projectTypes").append("<div class='projectWizardFirstButton' project-type='phonegapP' style='height:40px; padding:8px; border-bottom:1px solid #ccc; cursor:pointer;'><img src='plugins/org.uizard.core.design.uml/image/icon_uml.png' style='width:40px; height:40px; vertical-align:middle;' /><span style='margin-left:5px;'>Phonegap Project</span></div>");
		
		$("div[id='project.new']").find(".wizardStep").find(".projectItems").append("<div class='projectWizardSecondButton all phonegapP' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;'><img src='config/image/org.uizard.core.project/uizardTheme.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br />Phonegap based Project</div>");
	}
};
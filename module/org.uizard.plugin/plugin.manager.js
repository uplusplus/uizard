/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module plugin
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class manager
 * @extends plugin
 **/
org.uizard.plugin.manager = function () {
	/**
	 * This presents the current browser version
	 * @property plugins
	 * @type Object
	 * @default null
	 **/
	this.plugins = null;
	
	/**
	 * This presents the current browser version
	 * @property pluginList
	 * @type Object
	 * @default null
	 **/
	this.pluginList = null;
	
	/**
	 * This presents the current browser version
	 * @property interval
	 * @type Object
	 * @default null
	 **/
	this.interval = null;
	
	/**
	 * This presents the current browser version
	 * @property preference
	 * @type Object
	 * @default null
	 **/
	this.preference = null;
};

org.uizard.plugin.manager.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () {
		this.plugins = new Object();
		this.pluginList = $.makeArray();
		this.getAllPlugins();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method getAllPlugins 
	 **/
	getAllPlugins: function () {
		var self = this;
		
		var url = "module/org.uizard.plugin/plugin.getPluginList.php";
				
		var i = 0;
		this.interval = window.setInterval(function () { if(i<100) { statusbar.progressbar.set('value', i+=10); } else { window.clearInterval(self.interval); } }, 100);
		
		statusbar.startLoading();
		
		$.ajax({
			url: url,			
			type: "POST",
			async: false,
			success: function(data) {
				self.pluginList = eval(data);
				
				statusbar.progressbar.set('value', 100);
				
				if(self.interval) {
					window.clearInterval(self.interval);
				}

				//alert(self.pluginList[4].pluginName);
				//alert(self.pluginList[5].pluginName);
				//alert(self.pluginList[6].pluginName);
				
				statusbar.stopLoading();
				
				$(core).trigger("pluginLoaded");
				
				$(core).trigger("uizardLoading");
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method loadAllPlugins 
	 * @param {Number} index The index.
	 **/
	loadAllPlugins: function (index) {
		var self = this;
		
		
		if (index == this.pluginList.length) {
			return false;
		}
		
		var pluginName = this.pluginList[index].pluginName;
				
		$.getScript('plugins/' + pluginName + '/plug.js', function () {
			
			if (pluginName != "undefined") {			
				//Plugin initialization
				eval("self.plugins['"+pluginName+"'] = new " + pluginName + "();");
				//console.log(pluginName);
				self.plugins[pluginName].init();
								
				index++;
				self.loadAllPlugins(index);
				
				$(core).trigger("uizardLoading");
			}
		});			
	},
	
	newProject : function (projectName, projectAuthor, projectType, projectPath){
		if(projectType="UIzard"){
		}
		else if(eval("typeof this.plugins['org.uizard.core.project."+projectType+"'].newProject") == "function"){
			eval("this.plugins['org.uizard.core.project."+projectType+"'].newProject('"+projectName+"','"+ projectAuthor+"','"+projectType+"','"+projectPath+"')");
		};
	}
};
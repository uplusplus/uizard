/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module project
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class property
 * @extends project
 **/
org.uizard.core.project.property = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 * @type Object
	 * @default null
	 **/
	this.dialog = null;
	
	/**
	 * This presents the current browser version
	 * @property tabView
	 * @type Object
	 * @default null
	 **/
	this.tabView = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 * @type Object
	 * @default null
	 **/

	this.treeView = null;
	/**
	 * The array object that contains the information about buttons on the bottom of a dialog 
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.buttons = null;
	
	this.manager = null;
	
	this.property = null;
};

org.uizard.core.project.property.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 **/
	init: function () { 
		var self = this;
		this.manager = new org.uizard.core.project.property.manager();
		this.manager.xmlParser("config/project/property/default.xml");
		this.xml=this.manager.xml;
		
		this.property = new Object();
		
		this.dialog = new org.uizard.core.project.property.dialog();
		
		// Handler for OK button
		var handleOk = function() {
			var valid = 1;
			var postdata = new Object();
			
			// For input elements, validate values and put them into 'postdata'
			$("#propertyTabview").find("input").each(function(){
				
				var input = $(this);
				
				if ($(this).attr("validate")){
					var validate = $(this).attr("validate").split(',');
					
					// Check validation criteria
					for (var i=0;i<validate.length;i++){
						if (valid) valid = self.manager.validate(input, validate[i]);
					}
				}
				
				if(valid){
					
					// If it's valid, save it.
					if($(this).attr("name") == "type") {
						postdata.inputProjectType = $(this).val();
					}
					else if($(this).attr("name") == "detailedType") {
						postdata.inputProjectDetailedType = $(this).val();
					}
					else if($(this).attr("name") == "author") {
						postdata.inputProjectAuthor = $(this).val();
					}
					else if($(this).attr("name") == "name") {
						postdata.inputProjectName = $(this).val();
					}
					else if($(this).attr("name") == "date") {
						postdata.inputProjectDate = $(this).val();
					}
				}
			});
			
			// For textarea elements, validate values and put them into 'postdata'
			$("#propertyTabview").find("textarea").each(function(){
				
				var input = $(this);
				
				if ($(this).attr("validate")){
					var validate = $(this).attr("validate").split(',');
					
					// Check validation criteria
					for (var i=0;i<validate.length;i++){
						if (valid) valid = self.manager.validate(input, validate[i]);
					}
				}
				
				if(valid){
					// If it's valid, save it.
					if($(this).attr("name") == "about") {
						postdata.inputProjectAbout = $(this).val();
					}
				}
			});
			
			// If all values are valid, call php function to save them in project.xml
			if(valid) {
				$.post("module/org.uizard.core.project/project.property.ok.php", postdata, function (data) {
		
					var receivedData = eval("("+data+")");
					//console.log(data);								
					if(receivedData.errCode==0) {
					
						core.currentProjectPath = receivedData.author+"_"+receivedData.projectName;
						core.currentProjectName = receivedData.projectName;
						core.currentProjectType = receivedData.type;
						
						var postdata = {
							kind: "project",
							projectName: core.currentProjectPath
						};
						core.mainLayout.refreshProjectExplorer(postdata);
						core.dialogProjectProperty.addPluginsToolBox(0);
						alert("Ok!");
					}
				});
				this.hide();
			}
		};

		var handleCancel = function() { 
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.project.property.dialog();
		this.dialog.init({
			title:"Project Property", 
			path:"../../config/dialog/org.uizard.core.project/project.property.html",
			width:700,
			height:500,
			modal:true,
			buttons:this.buttons,
			success: function () {
				
				// On the right side of dialog
				self.manager.createTreeView(self.xml);
				
				// On the left side of dialog
				self.manager.createTabView(self.xml, "System");

				// TreeView labelClick function
				self.manager.treeView.subscribe("labelClick",function(node){
					var valid=1;
					
					// Get the contents of project.xml and put them into repective HTML elements
					$.ajax({
						
						type: "GET",
						dataType: "xml",
						url: "project/"+"asdf_asdf"+"/project.xml",
						success: function(xml) {

							self.manager.createTabView(self.xml, node.label);

							$("#propertyTabview").find("input").each(function() {
								if ($(this).attr("name") == "type") {
									$(this).val($(xml).find("TYPE").text());
								}
								else if ($(this).attr("name") == "detailedType") {
									$(this).val($(xml).find("DETAILEDTYPE").text());
								}
								else if ($(this).attr("name") == "author") {
									$(this).val($(xml).find("AUTHOR").text());
								}
								else if ($(this).attr("name") == "name") {
									$(this).val($(xml).find("NAME").text());
								}
								else if ($(this).attr("name") == "date") {
									$(this).val($(xml).find("DATE").text());
								}
							});
							
							$("#propertyTabview").find("textarea").each(function() {
								if ($(this).attr("name") == "about") {
									$(this).val($(xml).find("ABOUT").text());
								}
							});
						}
					});
				});
			}
		});
		this.dialog = this.dialog.dialog;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		this.dialog.panel.show();
	},
	/**
	 * This function is an UIzard core initializating function.  
	 * @method loadAllPlugins 
	 * @param {Number} index The index.
	 **/
	addPluginsToolBox: function (index) {
		var self = this;
		
		if (index == 0) {
			$("#toolBox").empty();
		}
		
		if (index == core.pluginManager.pluginList.length) {
			return false;
		}
		
		var pluginName = core.pluginManager.pluginList[index].pluginName;
				
		if(("org.uizard.core.design."+core.currentProjectType.toLowerCase())==core.pluginManager.pluginList[index].pluginName) {
			core.pluginManager.plugins[core.pluginManager.pluginList[index].pluginName].addToolBox();
		}
		
		index++;
		self.addPluginsToolBox(index);
	}
};
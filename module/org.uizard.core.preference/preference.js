/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module preference
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class preference
 **/
org.uizard.core.preference = function () {
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
	 * This presents the current browser version
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.buttons = null;
	
	this.manager = null;
	
	this.ini = null;
	
	this.plugin = null;
	
	this.preference = null;
};

org.uizard.core.preference.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 **/
	init: function () {
		var self = this;
		this.manager = new org.uizard.core.preference.manager();
		//this.manager.init();
			
		this.manager.iniParser();
		this.ini = this.manager.ini;
		
		this.manager.xmlParser("config/preference/default.xml");
		this.xml=this.manager.xml;
		
		this.plugin = new Object();
		
		this.preference = new Object();
		
		this.getPreference(this.xml);
		
		this.dialog = new org.uizard.core.preference.dialog();
		var handleOk = function() {
			var valid=1;
			$("#preferenceTabview").find("input").each(function(){
				
				var input = $(this);
				
				if ($(this).attr("validate")){
					var validate = $(this).attr("validate").split(',');
					
					// �� ��ȿ���˻�
					for (var i=0;i<validate.length;i++){
						if (valid) valid = self.manager.validate(input, validate[i]);
					}
				}
				
				if(valid){
					// ����
					localStorage.setItem($(this).attr("name"),$(this).val());
				}
			});
			
			// Save changes of the information about file types into filetype.json
			
			$.post("module/org.uizard.core.preference/preference.saveFileTypes.php", 
				//{ data: JSON.stringify(core.fileTypes) }, 
				{ data: core.fileTypes },
				function (data) {
				
				//console.log(data);
				
			});
			
			
			if(valid) this.hide();
		};

		var handleCancel = function() { 
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}];
						 
		this.dialog.init({
			title:"Preference", 
			path:"../../config/dialog/org.uizard.core.preference/preference.html",
			width:700,
			height:500,
			modal:true,
			buttons:this.buttons,
			success: function () {
								
				self.manager.createTreeView(self.xml);
				
				// �ʱ�ȭ�� ���� 
				self.manager.createTabView(self.xml);
				
				var pluginNode = self.manager.treeView.getNodeByProperty("label","Plugin"); 
				//= new YAHOO.widget.TextNode("Plugin", self.manager.treeView.getRoot(), false);
				
				// �÷����� �߰�
				for (var i=0;i < core.pluginManager.pluginList.length; i++){
										
					var pluginName=core.pluginManager.pluginList[i].pluginName;
	
					self.manager.xmlParser('plugins/' + pluginName + '/config.xml');

					pluginName = $(self.manager.xml).find("plugin").attr("name");
					
					self.plugin[pluginName] = new self.manager.plugin(core.pluginManager.pluginList[i].pluginName);
					self.plugin[pluginName].xml = self.manager.xml;
					
					
					if ($(self.manager.xml).find("preference").length > 0) {
						$(self.manager.xml).find("preference").each(function(){
							if(localStorage.getItem($(this).attr("name")) != null){
								self.plugin[pluginName].preference[$(this).attr("name")] = localStorage.getItem($(this).attr("name"));
							}
							else {
								self.plugin[pluginName].preference[$(this).attr("name")] = $(this).attr("default");
							}
						});
					}
					
					self.plugin[pluginName].version = $(self.manager.xml).find("version").text();
					self.plugin[pluginName].url = $(self.manager.xml).find("url").text();
					
					self.manager.addTreeView(pluginNode,self.plugin[pluginName].xml);
					self.manager.treeView.render();
					//self.manager.createTabView(self.manager.xml);
					
				}
				
								
				
				// ���� �������� �ҷ���
				$("#preferenceTabview").find("input").each(function(){
					if(localStorage.getItem($(this).attr("name"))!=null)
						$(this).val(localStorage.getItem($(this).attr("name")));
				});
				
				$("#preferenceTabview .yui-content")
				.css("border-top","1px #ccc solid")
				.css("border-left","1px #ccc solid")
				.css("border-bottom","1px #ccc solid")
				.css("border-right","1px #ccc solid")
				.css("height","400px")
				.css("background-color","white")
				.css("padding","5px");
				
						
				// TreeView labelClick function
				self.manager.treeView.subscribe("labelClick", function(node){
					$("#preferenceTabview").children().hide();
					$("#preferenceTabview #"+node.label).show();
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
	getPreference: function (xml) {
		var self=this;
		if ($(xml).find("preference").length > 0) {
			$(xml).find("preference").each(function(){
				if(localStorage.getItem($(this).attr("name")) != null){
					self.preference[$(this).attr("name")] = localStorage.getItem($(this).attr("name"));
				}
				else {
					self.preference[$(this).attr("name")] = $(this).attr("default");
				}
			});
		}
	},
	
};
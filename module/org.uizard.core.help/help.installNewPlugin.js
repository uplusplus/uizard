/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module help
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class installNewPlugin
 * @extends help
 **/
org.uizard.core.help.installNewPlugin = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 **/
	this.dialog = null;
	
	/**
	 * The array object that contains the information about buttons on the bottom of a dialog 
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.buttons = null;
	
	/**
	 * This presents the current browser version
	 * @property tabView
	 **/
	this.tabView = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
	this.treeView = null;
};

org.uizard.core.help.installNewPlugin.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	
	init: function () {
		var self = this;
		
		var handleOk = function() { 
			alert("Ok!");
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.help.installNewPlugin.dialog();
		this.dialog.init({
			title:"Install New Plugins", 
			path:"../../config/dialog/org.uizard.core.help/help.installNewPlugin.html",
			width:600,
			height:400,
			modal:true,
			yesText: "OK",
			noText: "Close",
			buttons:this.buttons,
			success: function () {
				//TabView Init
				// self.tabView = new YAHOO.widget.TabView('helpInstallNewPluginContents');
// 				
				// //TreeView Init
				// self.treeView = new YAHOO.widget.TreeView("helpInstallNewPluginTreeview");
				// self.treeView.render();
			}			
		});
		this.dialog = this.dialog.dialog;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @method show 
	 * @return void
	 **/
	show: function () {
		var self=this;
		this.dialog.panel.show();
		$("#btInstallNewPlugin").click(function(){
			$("#divInstallNewPluginList input:checkbox:checked").each(function(){
				self.installPlugin($(this).val());
			});
		});
	},
	installPlugin:function(pluginUrl){
		var url = "module/org.uizard.core.file/file.getContents.php";
		var path = pluginUrl+"/config.xml";
		var fileList = new Array();
		var folderList = new Array();
		$.ajax({
			url: url,			
			type: "POST",
			data: "path="+path,
			success: function(data) {
				
			    var xml = $.parseXML(data);
			    var packageName =  $(xml).find("package").text();
			    
			    $(xml).find("resources").each(function(){
			    	$(this).find("file").each(function(){
			    		var pos = $(this);
			    		var name=pos.text();
			    		
			    		pos= pos.parent();
			    					    		
			    		while(pos[0].tagName != "resources"){
			    			name = pos.attr("name")+"/"+name;
			    			pos= pos.parent();
			    		}
			    		
			    		fileList.push(name);
			    	});
			    	$(this).find("folder").each(function(){
			    		var pos = $(this);
			    		var name=pos.attr("name");
			    		
			    		pos = pos.parent();
			    		
			    		while(pos[0].tagName != "resources"){
			    			name = pos.attr("name")+"/"+name;
			    			pos= pos.parent();
			    		}
			    		folderList.push(name);
			    	});
			    	
			    });
			    
			    
			    var data = {
			    		"pluginUrl" : pluginUrl,
			    		"packageName" : packageName,
			    		"fileList" : fileList,
			    		"folderList" : folderList
			    };
			    YAHOO.lang.JSON.useNativeStringify = true;
			    var dataString = YAHOO.lang.JSON.stringify(data);
			    
			    $.ajax({
					url: "module/org.uizard.core.help/help.installNewPlugin.php",			
					type: "POST",
					data: {myJson:dataString},
					//async:false,
					success: function() {
						alert("Install Success");
					}
					, error: function(xhr, status, error) {alert(error); }
				});
			    
			}
			, error: function(xhr, status, error) {alert(error); }
		});
	}
};

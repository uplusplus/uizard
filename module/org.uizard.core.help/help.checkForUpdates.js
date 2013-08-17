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
 * @class checkForUpdates
 * @extends help
 **/
org.uizard.core.help.checkForUpdates = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 * @type Number
	 * @default null
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
	this.currentVersion = null;
	
	this.officialVersion = null;
	this.officialUrl = null;
};

org.uizard.core.help.checkForUpdates.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 * @param {Object} input This is input. 
	 **/
	
	init: function () {
		var self = this;
		
		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.help.checkForUpdates.dialog();
		this.dialog.init({
			title:"Checking updates", 
			path:"../../config/dialog/org.uizard.core.help/help.checkForUpdates.html",
			width:500,
			height:300,
			modal:true,
			yesText: "OK",
			noText: "Close",
			buttons:this.buttons,
			success: function () {
				
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
		this.checkUpdate();
		
	},
	checkUpdate : function (){
		var url = "module/org.uizard.core.file/file.getContents.php";
		var path = "http://skima.skku.edu/~moyara/uizard.xml";
		$("#divCheckForUpdate").html("");
		
		// Get official version
		$.ajax({
			url: url,			
			type: "POST",
			data: "path="+path,
			async:false,
			success: function(data) {
			    var xml = $.parseXML(data);
			    self.officialVersion =  $(xml).find("version").text();
			    self.officialUrl =  $(xml).find("url").text();
			    
			    // Get current version
			    $.ajax({
					type: "POST",
					dataType: "xml",
					url: "config/uizard.xml",
					async:false,
					success: function(xml) {
						self.currentVersion = $(xml).find("version").text();
						$("#divCheckForUpdate").append(
								"&lt;Uizard&gt; Current Version : "+self.currentVersion+" / "
								+"Official Version : <span style='color:red;'>"+self.officialVersion+"</span><br>"
								);
						if(self.currentVersion != self.officialVersion){
							$("#divCheckForUpdate").append("Update : <a href="+self.officialUrl+">"+self.officialUrl+"<br>");
						}
					}
					, error: function(xhr, status, error) {alert(error); }
				});
			}
			, error: function(xhr, status, error) {alert(error); }
		});
		
		// Get plugin version
		for (var name in core.dialogPreference.plugin){
			var plugin = core.dialogPreference.plugin[name];
			
			$.ajax({
				url: url,		
				type: "POST",
				data: "path="+plugin.url+"/config.xml",
				async:false,
				success: function(data) {
					
				    var xml = $.parseXML(data);
				    var officialVersion =  $(xml).find("version").text();
				    var officialUrl =  $(xml).find("url").text();
				    
				    if(officialVersion != plugin.version && officialVersion){
				    	$("#divCheckForUpdate").append(
				    		"&lt;Plugin&gt; " + name
			    			+ "("+plugin.version+") : new version "
							+"<span style='color:red;'>"+officialVersion+"</span><br>"
							+"<a href="+officialUrl+">"+officialUrl+"</a><br>"
				    	);
				    }
				}
				, error: function(xhr, status, error) {alert(error);}
			});
		}
	}
};

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
 * @class contents
 * @extends help
 **/
org.uizard.core.help.contents = function () {
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

org.uizard.core.help.contents.prototype = {
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
						 
		this.dialog = new org.uizard.core.help.contents.dialog();
		this.dialog.init({
			title:"Help Contents", 
			path:"../../config/dialog/org.uizard.core.help/help.contents.html",
			width:700,
			height:500,
			modal:true,
			yesText: "OK",
			noText: "Close",
			buttons:this.buttons,
			success: function () {
				//TabView Init
				//self.tabView = new YAHOO.widget.TabView('helpContentsContents');
				
				//TreeView Init
				var treeviewUrl = "help/help.treeview";	
				
				$.ajax({
					url: treeviewUrl,			
					type: "POST",
					data: "path="+self.path,
					success: function(data) {
						var sortingData = eval(data);
						self.treeView = new YAHOO.widget.TreeView("helpContentsTreeview", sortingData);
						self.treeView.render();
						
				
						
						
						
						
						
						
						
						
						
						//$(".yui-content").append(sortingData[i].url.text());
						
								
					}
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
		
		
		
		
		this.treeView.subscribe("clickEvent", function(nodedata) {	

			var contentsUrl = nodedata.node.data.url;
						
			
					
			$.ajax({
				url: contentsUrl,			
				type: "POST",
				data: "path="+self.path,
				success: function(data) {
					$("#helpContents").empty();
					$("#helpContents").append(data);	
							
				}
			});
				
			
			
			//alert(label);

			/*if(nodedata.node.data.cls == "file") {
				var filename = nodedata.node.data.filename;
				var filetype = nodedata.node.data.filetype;
				var filepath = nodedata.node.data.parentLabel;
				
				self.windowManager.open(filepath, filename, filetype);
			}*/
		});
		
		
		
	}
	
	
};

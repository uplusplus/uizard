/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module org.uizard.core.scm.svn
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class org.uizard.core.scm.svn
 **/
org.uizard.core.scm.svn = function () {
	/**
	 * This presents the current browser version
	 * @property name
	 **/
	this.name = "scm.svn";
	
	/**
	 * This presents the current browser version
	 * @property windowManager
	 **/
	this.windowManager = null;
	
	/**
	 * This presents the current browser version
	 * @property windowManager
	 **/
	this.mainMenu = null;
	
	this.dialogCommitFile = null; 
	this.dialogUpdateFile = null;
	this.dialogRevertFile = null;
	this.dialogAccount = null;
	this.dialogRevisionFile = null;
	
};

org.uizard.core.scm.svn.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @constructor
	 **/
	init: function () {
		
		var self = this;
		
		this.windowManager = core.mainLayout.windowManager;
		this.mainMenu = core.mainLayout.mainMenu;
		
		
		//Loading CSS
		this.loadCSS();
		
		//Add Project Item
		this.addProjectItem();
		
		//Add Toolbar
		this.addToolbar();
		
		//Add Main Menu
		this.addMainMenu();
		
		//Add Context Menu
		this.addContextMenu();
				
				
						
		$.getScript('plugins/org.uizard.core.scm.svn/module/file.commit.js', function () {											
			self.dialogCommitFile = new org.uizard.core.scm.svn.commit(); 
			self.dialogCommitFile.init();
		});
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/file.update.js', function () {											
			self.dialogUpdateFile = new org.uizard.core.scm.svn.update(); 
			self.dialogUpdateFile.init();
		});
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/file.revert.js', function () {											
			self.dialogRevertFile = new org.uizard.core.scm.svn.revert(); 
			self.dialogRevertFile.init();
		});
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/account.js', function () {											
			self.dialogAccount = new org.uizard.core.scm.svn.account(); 
			self.dialogAccount.init();
		});
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/file.revision.js', function () {											
			self.dialogRevisionFile = new org.uizard.core.scm.svn.revision(); 
			self.dialogRevisionFile.init();
		});
		
		
		 
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @method loadCSS
	 **/
	loadCSS: function () {

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

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addToolbar() 
	 * @return void
	 **/
	addToolbar: function () {
		
	},
	
	commit: function(){
		this.dialogCommitFile.show();
	},
	
	update: function(){
		this.dialogUpdateFile.show();
	},
	
	revert: function(){
		this.dialogRevertFile.show();
	},
	account: function(){
		this.dialogAccount.show();
	},
	revision: function(){
		this.dialogRevisionFile.show();
	},
	add: function(){
		var self = this;
		var url = "plugins/org.uizard.core.scm.svn/file.svn.php";
			
		statusbar.startLoading();
		
		$.ajax({				
			url: url,
			type: "POST",
			data: "cmd=add&localFileName="+core.selectedFile,
			success: function(data) {
				self.resultPrint(data);	
				statusbar.stopLoading();
			}	
		});					

	},
	del: function(){
		
		var self = this;
		var url = "plugins/org.uizard.core.scm.svn/file.svn.php";
			
		statusbar.startLoading();
		
		$.ajax({				
			url: url,
			type: "POST",
			data: "cmd=del&localFileName="+core.selectedFile,
			success: function(data) {
				//console.log("data");
				self.resultPrint(data);	
				statusbar.stopLoading();
			}	
		});					

	},
	resultPrint: function (data) {
		//c.m(data,"file");
		//var jsondata = JSON.parse(data);
		
		
		data=data.replace(/\\/g,"\\\\");
		var jsondata = eval("["+data+"]");
		
		c.m(jsondata[0].requestedCommand+" "+jsondata[0].result, "file");
		if(jsondata[0].result=="success"){			
			c.m("message : "+jsondata[0].message, "file");			
		}
		
		//c.m(jsondata[0].message, "file.commit");
	},	
	chekcout: function(){
		
	},
	
	
	
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addMainMenu() 
	 * @return void
	 **/
	addMainMenu: function () {
		this.mainMenu.addItems([{ 
	                    text: "SCM",
	                    submenu: { 
	                        id: "SCM",  
	                        itemdata: [ [
	                            { text: "SVN Checkout" }, 
	                            { text: "SVN Update" }, 
	                            { text: "SVN Commit" }, 
	                            { text: "SVN Cleanup" } 
							], [
	                            { text: "Configuration" }
							]]
	                    } 
	                }]);
					
		this.mainMenu.render();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addContextMenu() 
	 * @return void
	 **/
	addContextMenu: function () {
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addToolBox() 
	 * @return void
	 **/
	addToolBox: function () {
		
	}
};
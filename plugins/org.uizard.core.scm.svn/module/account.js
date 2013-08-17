/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module file
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class open
 * @extends file
 **/
org.uizard.core.scm.svn.account = function () {
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
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
//	this.resultMessage = null;
};

org.uizard.core.scm.svn.account.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		


		var self = this;
		
		var handleOk = function() { 
			//alert(core.selectedFile);

			var url = "plugins/org.uizard.core.scm.svn/file.svn.php";
			
			statusbar.startLoading();			
			var username=$('#username').val();
			var password=$('#password').val();				
			
			
			$.ajax({				
				url: url,
				type: "POST",
				data: "cmd=account&username="+username+"&password="+password,				
				success: function(data) {			
					self.resultPrint(data);	
					//$("#debug").prepend("<pre>"+data+"</pre>");
					//if ( typeof self.func == "function" )
						//self.test=self.func();					
					statusbar.stopLoading();
				}	
			});					
		
			
			this.hide();			
			
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/account.dialog.js', function () {
		
			self.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
							 {text:"Cancel",  handler:handleCancel}]; 

			self.dialog = new org.uizard.core.scm.svn.account.dialog();
			self.dialog.init({
				title:"Account", 
				path:"../../plugins/org.uizard.core.scm.svn/dialog/account.html",
				width:250,
				height:120,
				modal:true,
				buttons:self.buttons, 
				success: function () {
					
				}
			});
			self.dialog = self.dialog.dialog;	
			
		});
		
		//this.dialog.panel.setBody("AA");

		
	},
	

	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		//alert(1);
		//console.log(core.selectedFile);
		$.getJSON("plugins/org.uizard.core.scm.svn/svn.config.json", function(data) {
			var configData = eval(data);
			$('#username').val(configData[0].username);
			$('#password').val(configData[0].password);
			//		data: "cmd=commit&localFileName="+core.selectedFile+"&logMsg="+logMsg+"&userName="++"&password="+,			
		});
		this.dialog.panel.show();		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	resultPrint: function (data) {
		if(data == "1")
			c.m("account change : success","account");
		else
			c.m("account change : fail ","account");		
	}	
	
};
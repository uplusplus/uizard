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
org.uizard.core.scm.svn.commit = function () {
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

org.uizard.core.scm.svn.commit.prototype = {
	
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
			var logMsg=$('#commitLog').val();
				
			
			$.getJSON("plugins/org.uizard.core.scm.svn/svn.config.json", function(data) {
				var configData = eval(data);
				$.ajax({				
					url: url,
					type: "POST",
					data: "cmd=commit&localFileName="+core.selectedFile+"&logMsg="+logMsg+"&username="+configData[0].username+"&password="+configData[0].password,
					//data: "cmd=commit&localFileName="+core.selectedFile+"&logMsg="+logMsg+"&userName=parkcheolhyun&password=selab7220",
					success: function(data) {			
						self.resultPrint(data);
						
						//$("#debug").prepend("<pre>"+data+"</pre>");
						//if ( typeof self.func == "function" )
							//self.test=self.func();					
						statusbar.stopLoading();
					}	
				});					
			});
			
			this.hide();			
			
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/file.commit.dialog.js', function () {
		
			self.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
							 {text:"Cancel",  handler:handleCancel}]; 

			self.dialog = new org.uizard.core.scm.svn.commit.dialog();
			self.dialog.init({
				title:"Commit", 
				path:"../../plugins/org.uizard.core.scm.svn/dialog/file.commit.html",
				width:600,
				height:210,
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
		
		$('#commitFileName').html("Commit to: " + core.selectedFile);
		$('#commitLog').val("<Click here to enter a commit comment>");
		this.dialog.panel.show();
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	resultPrint: function (data) {
		//c.m(data,"file.commit");
		//var jsondata = JSON.parse(data);
		
		data=data.replace(/\\/g,"\\\\");
		var jsondata = eval("["+data+"]");				
		c.m("commit "+jsondata[0].result, "file.commit");
		if(jsondata[0].result=="success"){			
			c.m("message : "+jsondata[0].message, "file.commit");			
		}
		
		
		
		
		//c.m(jsondata[0].message, "file.commit");
	}	
	
};
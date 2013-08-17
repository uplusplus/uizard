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
org.uizard.core.scm.svn.revision = function () {
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

org.uizard.core.scm.svn.revision.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		
		var self = this;		
			
		//var logMsg=$('#commitLog').val();
		/*
		$('#SelectButton').button({				
			create: function(event, ui) {
				console.log("asdf");
			}	
		});
		*/
		
		
  		
		var handleOk = function() { 			
			var url = "plugins/org.uizard.core.scm.svn/file.svn.php";
			
			var version=$('#version').val();
			
			if($('#head').is(':checked')){
				version=-1;
			}						
			
			statusbar.startLoading();
			
			$.ajax({				
				url: url,
				type: "POST",
				data: "cmd=revision&localFileName="+core.selectedFile+"&version="+version,
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
			//var logMsg=$('#commitLog').val();
			//document.getElementById("myButton1").value="New Button Text";
		};		
		
		$.getScript('plugins/org.uizard.core.scm.svn/module/file.revision.dialog.js', function () {
			
			self.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
							 {text:"Cancel",  handler:handleCancel}]; 
	
			self.dialog = new org.uizard.core.scm.svn.revision.dialog();
			self.dialog.init({
				title:"Show Revision", 
				path:"../../plugins/org.uizard.core.scm.svn/dialog/file.revision.html",
				width:600,
				height:150,
				modal:true,
				buttons:self.buttons, 
				success: function () {
					
					$('#head').change(function(){
						if($('#head').is(':checked')){
							$('#version').attr('disabled', true);
						} else {
							$('#version').removeAttr('disabled');
						}
					});
					
					$('#selectButton').click(function(){
						//this.dialog = new org.uizard.core.file.showrevision.dialog();
	    				//core.dialogShowrevisionFile.show();
	    				//alert("Cancel!");
	    				
	  				} );
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
		var myDataSource = new YAHOO.util.DataSource(YAHOO.util.Dom.get("myTable"));
	
		var myColumnDefs = [
		    { key: "r", resizeable:false,width:50,height:10},
		    { key: "Date" , resizeable:false,width:100},
		    { key: "Author" , resizeable:false,width:100},
		    { key: "Comment" , resizeable:false,width:100}
		];
		
		var myDataTable = new YAHOO.widget.DataTable("myMarkedUpContainer", myColumnDefs, myDataSource, {   
    		height: "400px" // height as a string value
			});
		myDataTable.subscribe("rowClickEvent", myDataTable.onEventSelectRow);
		
		var data = {r:"23",Date:"2011-06-23 15:45:18 +0900 (2011-06-23, 목)",Author:"pch851130@gmail.com",Comment:"ddddddddddddddddddddddddddddddddddddd"}; 
		var record = YAHOO.widget.DataTable._cloneObject(data);		 
		myDataTable.addRow(record); 
		myDataTable.addRow(record);
		myDataTable.addRow(record);
		myDataTable.addRow(record);
		myDataTable.addRow(record);
		myDataTable.addRow(record);
		myDataTable.addRow(record);
		
		this.dialog.panel.show();
	},
	
		/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	resultPrint: function (data) {
//		c.m(data,"file.commit");
		//var jsondata = JSON.parse(data);
		data=data.replace(/\\/g,"\\\\");
		var jsondata = eval("["+data+"]");
		c.m("revision "+jsondata[0].result, "file.revision");
		if(jsondata[0].result=="success"){			
			c.m("message : "+jsondata[0].message, "file.revision");			
		}
		//c.m(jsondata[0].message, "file.commit");
	}	
};
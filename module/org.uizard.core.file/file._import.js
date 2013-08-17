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
 * @class _import
 * @extends file
 **/
org.uizard.core.file._import = function () {
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
	this.layout = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
	this.treeView = null;
};

org.uizard.core.file._import.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.
	 * @constructor
	 **/
	init: function () { 
		
		var self = this;
		
		var handleOk = function() { 
			$('#myForm').submit();
			this.hide(); 
		};

		var handleCancel = function() { 
			alert("Cancel!");
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.file._import.dialog();
		this.dialog.init({
			title:"Import", 
			path:"../../config/dialog/org.uizard.core.file/file._import.html",
			width:595,
			height:400,
			modal:true,
			buttons:this.buttons,
			kind:"import",
			success: function () {
				//TreeView Init
				self.treeView = new YAHOO.widget.TreeView("importSourceTreeview");
				self.treeView.render();
				
				self.layout = new YAHOO.widget.Layout("importDialogMiddle", {
		            units: [
						{ position: 'left', width: 180, body: 'importDialogLeft', scroll: true, zIndex: 1, resize: true, gutter: '0px 3px 0px 0px' },
						{ position: 'center', body: 'importDialogCenter', scroll: true}
					]
		        });
			
			var formOptions = {
				target: "#uploadOutput",
				success: function(data) {
					alert("ok");
				}
			}
            $('#myForm').ajaxForm(formOptions);
			
			$('#myForm').submit(function() { 
			    // submit the form 
			    $(this).ajaxSubmit(); 
			    // return false to prevent normal browser submit and page navigation 
			    return false; 
			});

	            self.layout.render();
			}
		});
		this.dialog = this.dialog.dialog;
		
		//this.dialog.panel.setBody("AA");
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		//count the total step of wizard dialog 
		this.dialog.totalStep = $("div[id='fileImport']").find(".wizardStep").size();
		
		var postdata = {
			kind: "project",
			projectName: core.currentProjectPath
		};
		
		this.addProjectExplorer(postdata);
		this.addProjectItem(postdata);
	
		this.dialog.panel.show();
	},
	
		/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectExplorer 
	 **/	
	addProjectExplorer: function(postdata) {		
		$.post("module/org.uizard.core.file/file.getNodes.php", postdata, function (data) {

			var sortJsonData = function (x,y) {
				return ((x.cls > y.cls) ? -1 : ((x.cls < y.cls) ? 1 : 0 ));
			};
			
			var sortProjectTreeview = function (sortingData) { 				
				sortingData.sort(sortJsonData);
				
				for(i=0; i<sortingData.length; i++) {
					if(sortingData[i].children) {
						sortProjectTreeview(sortingData[i].children);
					}
				}
			};

			var sortingData = eval(data);
			
			var newData = new Array();

			for(var name in sortingData) {
				if(sortingData[name].cls=="folder") {
					newData.push(sortingData[name]);
				}
			}

			self.treeView = new YAHOO.widget.TreeView("fileImportTreeview", newData);

		    self.treeView.subscribe("expand", function(nodedata) {
		        return false;
		    });

			self.treeView.subscribe("dblClickEvent", function(nodedata) {	
				if(nodedata.node.data.cls == "folder") {
					var postdata = {
						kind: "project",
						projectName: nodedata.node.data.filename
					};
					self.addProjectItem(postdata);
				}
			});
						
			self.treeView.render();
			
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addProjectItem
	 **/	
	addProjectItem: function (postdata) {
	
		$("#fileImportSelectPath").attr("value", postdata.projectName);
	
		$("#importDialogCenter").empty();
	
		var self = this;
		
		$.post("module/org.uizard.core.file/file.getNodes.php", postdata, function (data) {
			
			var sortJsonData = function (x,y) {
				return ((x.cls > y.cls) ? -1 : ((x.cls < y.cls) ? 1 : 0 ));
			};
			
			var sortProjectTreeview = function (sortingData) { 				
				sortingData.sort(sortJsonData);
				
				for(i=0; i<sortingData.length; i++) {
					if(sortingData[i].children) {
						sortProjectTreeview(sortingData[i].children);
					}
				}
			};
			
			var sortingData = eval(data);

			// back icon add
			if(postdata.projectName!="./" && postdata.projectName.indexOf("..") < 0) {
				var iconStr = "";
				iconStr += "<div class='importDialogCenter_item importDialogCenter_folder'";
				iconStr +=" filename='"+postdata.projectName+"/..' filetype='' filepath=''>";
				iconStr += "..";
				iconStr += "</div>";
			
				$("#importDialogCenter").append(iconStr);
			}
			
			for(var name in sortingData) {
				var iconStr = "";
				if(sortingData[name].cls=="folder") {
					iconStr += "<div class='importDialogCenter_item importDialogCenter_folder'";
				}
				else {
					iconStr += "<div class='importDialogCenter_item importDialogCenter_file'";
				}
				
				iconStr +=" filename='"+sortingData[name].filename+"' filetype='"+sortingData[name].filetype+"' filepath='"+sortingData[name].parentLabel+"'>";
				iconStr += "<img style='width: 40px; height: 40px; vertical-align: middle; margin-bottom: 3px;' src='config/image/org.uizard.core.project/uizardCustomization.png'>";
				iconStr += "<br/>";
				iconStr += sortingData[name].filename;
				iconStr += "</div>";
				iconStr += "</div>";
				
				$("#importDialogCenter").append(iconStr);
			}
			
			$(".importDialogCenter_folder").dblclick(function() {
				var postdata = {
					kind: "project",
					projectName: $(this).attr("filename")
				};
				self.addProjectItem(postdata);
				self.addProjectExplorer(postdata);
			});
			
			$(".importDialogCenter_item").click(function() {
				$(".importDialogCenter_item").removeClass("selectedButton");
				$(this).addClass("selectedButton");
			});
		});
	}
};
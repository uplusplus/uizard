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
 * @class open.dialog
 * @extends project
 * 
 **/
org.uizard.core.shortcut.manager = function () {

};

org.uizard.core.shortcut.manager.prototype = {
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} option The option for dialog.
	 **/
	init: function () {
		//////////////////////////////////////////////////
		//Main Menu : File
		//////////////////////////////////////////////////
			
		//New Project
		$(document).bind('keydown', 'Alt+N', function (e) {

			core.dialogNewProject.show();

			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Open Project
		$(document).bind('keydown', 'Ctrl+O', function (e) {
			
			core.dialogOpenProject.show();
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Open File
		$(document).bind('keydown', 'Ctrl+Shift+O', function (e) {
			
			core.dialogOpenFile.show();
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});

		//Close
		$(document).bind('keydown', 'Alt+X', function (e) {

			console.log("doClose");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Close All
		$(document).bind('keydown', 'Alt+Shift+X', function (e) {

			console.log("doCloseAll");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Save
		$(document).bind('keydown', 'Ctrl+S', function (e) {
			var windowManager = core.mainLayout.windowManager;
		
			if (windowManager.window[windowManager.activeWindow].designer) {
				windowManager.window[windowManager.activeWindow].designer.save();
			}
			else if (windowManager.window[windowManager.activeWindow].editor) {
				windowManager.window[windowManager.activeWindow].editor.save();
			}

			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Save as File
		$(document).bind('keydown', 'Ctrl+Shift+S', function (e) {

			core.dialogSaveAsFile.show();
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Save All
		$(document).bind('keydown', 'Alt+Ctrl+S', function (e) {

			console.log("doSaveAll");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Move
		$(document).bind('keydown', 'Ctrl+Shift+M', function (e) {

			console.log("doMove");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
	
		//Rename
		$(document).bind('keydown', 'Ctrl+Shift+R', function (e) {

			core.dialogRenameFile.show("");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Refresh
		$(document).bind('keydown', 'Ctrl+R', function (e) {

			console.log("doRefresh");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Print
		$(document).bind('keydown', 'Ctrl+P', function (e) {

			console.log("doPrint");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
				
		//////////////////////////////////////////////////
		//Main Menu : Edit
		//////////////////////////////////////////////////
		
		//Undo
		$(document).bind('keydown', 'Ctrl+Z', function (e) {

			var windowManager = core.mainLayout.windowManager;
			
			if (windowManager.window[windowManager.activeWindow].designer) {
				windowManager.window[windowManager.activeWindow].designer.canvas.undo();
			}

			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Redo
		$(document).bind('keydown', 'Ctrl+Y', function (e) {

			var windowManager = core.mainLayout.windowManager;
			
			if (windowManager.window[windowManager.activeWindow].designer) {
				windowManager.window[windowManager.activeWindow].designer.canvas.redo();
			}

			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		
		//Cut
		$(document).bind('keydown', 'Ctrl+X', function (e) {

			console.log("doCut");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		//Copy
		$(document).bind('keydown', 'Ctrl+C', function (e) {

			console.log("doCopy");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		//Paste
		$(document).bind('keydown', 'Ctrl+V', function (e) {

			console.log("doPaste");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		//Delete
		$(document).bind('keydown', 'Del', function (e) {

			console.log("doDelete");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});

		//Select All
		$(document).bind('keydown', 'Ctrl+A', function (e) {

			console.log("doSelectAll");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
				
		//Find and Replace
		$(document).bind('keydown', 'Ctrl+F', function (e) {

			var windowManager = core.mainLayout.windowManager;
			
			if (windowManager.window[windowManager.activeWindow].editor) {
				core.dialogFindReplace.show();
			}

			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Find Next
		$(document).bind('keydown', 'Ctrl+G', function (e) {

			console.log("doFindNext");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Find Previous
		$(document).bind('keydown', 'Ctrl+Shift+G', function (e) {

			console.log("doFindPrevious");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
	
		//Open Preference
		$(document).bind('keydown', 'Alt+P', function (e) {

			core.dialogPreference.show();
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
				
		//////////////////////////////////////////////////
		//Main Menu : Collaboration
		//////////////////////////////////////////////////
		
		//Open Join the Project
		$(document).bind('keydown', 'Ctrl+J', function (e) {

			core.dialogJoinProject.show();
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
				
		//////////////////////////////////////////////////
		//Main Menu : Window
		//////////////////////////////////////////////////
			
		//Previous Window
		$(document).bind('keydown', 'Alt+Shift+up', function (e) {
			
			console.log("previousWindow");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
			
		//Next Window
		$(document).bind('keydown', 'Alt+Shift+down', function (e) {
			
			console.log("nextWindow");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
			
		//Previous Tab
		$(document).bind('keydown', 'Alt+Shift+left', function (e) {
			
			console.log("previousTab");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
			
		//Next Tab
		$(document).bind('keydown', 'Alt+Shift+right', function (e) {
			
			console.log("nextTab");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Left Layout Show/Hide
		$(document).bind('keydown', 'Alt+Shift+1', function (e) {
			
			console.log("leftLayoutShow/Hide");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Left Layout Toggle Project Explorer
		$(document).bind('keydown', 'Alt+Shift+2', function (e) {
			
			console.log("leftLayoutToggleProjectExplorer");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Left Layout Toggle Toolbox
		$(document).bind('keydown', 'Alt+Shift+3', function (e) {
			
			console.log("leftLayoutToggleToolbox");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Right Layout Show/Hide
		$(document).bind('keydown', 'Alt+Shift+4', function (e) {
			
			console.log("rightLayoutShow/Hide");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Right Layout Toggle Properties
		$(document).bind('keydown', 'Alt+Shift+5', function (e) {
			
			console.log("rightLayoutToggleProperties");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Right Layout Toggle Object Explorer
		$(document).bind('keydown', 'Alt+Shift+6', function (e) {
			
			console.log("rightLayoutToggleObjectExplorer");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Bottom Layout Show/Hide
		$(document).bind('keydown', 'Alt+Shift+7', function (e) {
			
			console.log("bottomLayoutShow/Hide");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Bottom Layout Toggle Messages
		$(document).bind('keydown', 'Alt+Shift+8', function (e) {
			
			console.log("bottomLayoutToggleMessages");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Bottom Layout Toggle Generator
		$(document).bind('keydown', 'Alt+Shift+9', function (e) {
			
			console.log("bottomLayoutToggleGenerator");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		//Bottom Layout Toggle Chat
		$(document).bind('keydown', 'Alt+Shift+0', function (e) {
			
			console.log("bottomLayoutToggleChat");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
				
		//Toggle Full Workspace
		$(document).bind('keydown', 'Alt+Shift+W', function (e) {
			
			console.log("toggleFullWorkspace");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
				
		//Hide All Window
		$(document).bind('keydown', 'Alt+Shift+_', function (e) {
			
			console.log("hideAllWindow");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
				
		//Show All Window
		$(document).bind('keydown', 'Alt+Shift++', function (e) {
			
			console.log("showAllWindow");
			
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
		
		
		
	}
};
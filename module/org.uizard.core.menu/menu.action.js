/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module menu
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class action
 * @extends menu
 **/
org.uizard.core.menu.action = function () {
	
};

org.uizard.core.menu.action.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () {

		//////////////////////////////////////////////////
		//Main Menu : File
		//////////////////////////////////////////////////
		$("a[action=newProject]").click(function () {
			core.dialogNewProject.show();
		});
		
		$("a[action=newFile_file]").click(function () {
			core.dialogNewFile.show();
		});
		
		$("a[action=openProject]").click(function () {
			core.dialogOpenProject.show();
		});		
		
		$("a[action=exit]").click(function () {
			
			confirmation.init({
				title: "Do you want exit?", 
				message: "Do you want exit?",
				yesText: "Yes",
				noText: "No",
				yes: function () {
					alert("success!");
				}, no: function () {
					alert("failure!");
				}
			});
			
			confirmation.panel.show();
		});
		
		$("a[action=openFile]").click(function () {
			core.dialogOpenFile.show();
		});		
		
		$("a[action=openURL]").click(function () {
			core.dialogOpenURL.show();
		});
		
		$("a[action=saveAsFile]").click(function () {
			core.dialogSaveAsFile.show();
		});
		
		$("a[action=renameFile]").click(function () {
			core.dialogRenameFile.show("");
		});
		
		$("a[action=switchWorkspace]").click(function () {
			core.dialogSwitchWorkspace.show();
		});
		
		$("a[action=importFile]").click(function () {
			core.dialogImportFile.show();
		});
		
		$("a[action=exportFile]").click(function () {
			core.dialogExportFile.show();
		});
		
		$("a[action=property]").click(function () {
			core.dialogProperty.show();
		});
		
		
		//////////////////////////////////////////////////
		//Main Menu : Edit
		//////////////////////////////////////////////////
		$("a[action=doUndo]").click(function () {
			var windowManager = core.mainLayout.windowManager;
			
			if (windowManager.window[windowManager.activeWindow].designer) {
				windowManager.window[windowManager.activeWindow].designer.canvas.undo();
			}
		});		
		
		$("a[action=doRedo]").click(function () {
			var windowManager = core.mainLayout.windowManager;
			
			if (windowManager.window[windowManager.activeWindow].designer) {
				windowManager.window[windowManager.activeWindow].designer.canvas.redo();
			}
		});
		
		$("a[action=doCut]").click(function () {
			console.log("doCut");
		});		
		
		$("a[action=doCopy]").click(function () {
			console.log("doCopy");
		});
		
		$("a[action=doPaste]").click(function () {
			console.log("doPaste");
		});		
		
		$("a[action=doDelete]").click(function () {
			console.log("doDelete");
		});
				
		$("a[action=preference]").click(function () {
			core.dialogPreference.show();
		});		
		
		$("a[action=doFind]").click(function () {
			core.dialogFindReplace.show();
		});
		
		
		//////////////////////////////////////////////////
		//Main Menu : Design
		//////////////////////////////////////////////////
		$("a[action=alignLeft]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.alignLeft();			
			}
		});		
		
		$("a[action=alignRight]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.alignRight();			
			}
		});
		
		$("a[action=alignTop]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.alignTop();			
			}
		});		
		
		$("a[action=alignBottom]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.alignBottom();			
			}
		});
		
		$("a[action=alignHorizontallyCenter]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.alignHorizontallyCenter();			
			}
		});		
		
		$("a[action=alignVerticallyCenter]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.alignVerticallyCenter();			
			}
		});
		
		$("a[action=bringToFront]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.bringToFront();			
			}
		});		
		
		$("a[action=sendToBack]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.sendToBack();			
			}
		});
		
		$("a[action=bringForward]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.bringForward();			
			}
		});		
		
		$("a[action=sendBackward]").click(function () {
			if (core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer) {
				core.mainLayout.windowManager.window[core.mainLayout.windowManager.activeWindow].designer.canvas.sendBackward();			
			}
		});
		
		
		
		//////////////////////////////////////////////////
		//Main Menu : Project
		//////////////////////////////////////////////////
		
		$("a[action=generate]").click(function () {
			core.codeGenerator.generate();
		});		

		$("a[action=generateAll]").click(function () {
			alert("Not yet!");
		});		
		
		$("a[action=buildProject]").click(function () {
			/* IOS debug code
			var debug = new org.uizard.core.debug.ios();
			debug.init();
			debug.build("TestProject");
			*/
			/* Android debug code
			*/
			var debug = core.pluginManager.plugins['org.uizard.core.debug.android'];
			//debug.init();
//			debug.build("TestActivity");
			debug.remoteRun("TestActivity","192.168.0.226","5554");
			
		});
		
		$("a[action=showProperties]").click(function () {
			core.dialogProjectProperty.show();
		});		
		
		//////////////////////////////////////////////////
		//Main Menu : Collaboration
		//////////////////////////////////////////////////
		$("a[action=joinProject]").click(function () {
			core.dialogJoinProject.show();
		});		
		
		$("a[action=collaborationSettings]").click(function () {
			core.dialogCollaborationSettings.show();
		});	
		
		$("a[action=chatOnOff]").click(function () {
			if (core.isCollaborationON) {
				core.isCollaborationON = false;
				core.mainLayout.chat.setChatOff();
				$("a[action=chatOnOff]").find("img").removeClass("toolbarButtonPressed");
			}
			else {
				core.isCollaborationON = true;
				core.mainLayout.chat.setChatOn();
				$("a[action=chatOnOff]").find("img").addClass("toolbarButtonPressed");
			}
		});
		
		//////////////////////////////////////////////////
		//Main Menu : Window
		//////////////////////////////////////////////////
		$("a[action=cascade]").click(function () {
			core.mainLayout.windowManager.cascade();
		});

		$("a[action=tileVertically]").click(function () {
			core.mainLayout.windowManager.tileVertically();
		});

		$("a[action=tileHorizontally]").click(function () {
			core.mainLayout.windowManager.tileHorizontally();
		});
		
		//////////////////////////////////////////////////
		//Main Menu : Help
		//////////////////////////////////////////////////
		$("a[action=helpContents]").click(function () {
			core.dialogHelpContents.show();
		});
		
		$("a[action=helpSearch]").click(function () {
			core.dialogHelpSearch.show();
		});
		
		$("a[action=helpTipsAndTricks]").click(function () {
			core.dialogHelpTipsAndTricks.show();
		});

		$("a[action=helpCheckForUpdates]").click(function () {
			core.dialogHelpCheckForUpdates.show();
		});
		
		$("a[action=helpInstallNewPlugin]").click(function () {
			core.dialogHelpInstallNewPlugin.show();
		});
		
		$("a[action=helpAbout]").click(function () {
			core.dialogHelpAbout.show();
		});
		
		
		//////////////////////////////////////////////////
		//Main Menu : Language (for test)
		//////////////////////////////////////////////////
		
		$("a[action=languageKor]").click(function () {
			core.localization.init("kor");
		});
		
		$("a[action=languageEng]").click(function () {
			core.localization.init("us");
		});
	}
}
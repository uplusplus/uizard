/**
 * @description <p>Copyright Sung-tae Ryu. All rights reserved.</p>
 * <p>Code licensed under the GPL v2 License:</p>
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module core
 **/

var org = function() {
	var uizard = null;
};

org.uizard = function() {
	var core = null;
};

/**
 * @description This is an UIzard core.  
 * <p>UIzard starts with this core.</p>
  * @class core
 **/
org.uizard.core = function() {
	
	/**
	 * This presents the current browser version
	 * @property browser
	 **/
	this.browser = name;
	
	/**
	 * This presents the current browser version
	 * @property browserVesrion
	 **/
	this.browserVersion = 0;
	
	/**
	 * This presents the current uizard version
	 * @property vesrion
	 **/
	this.version = 3.0;

	/**
	 * This presents whether the current device is iPad
	 * @property isiPad
	 **/
	this.isiPad = false;
	
	/**
	 * Plugin Manager
	 * @property pluginManager
	 **/
	this.pluginManager = null;
	
	/**
	 * Div container
	 * @property container
	 **/
	this.container = "";
	
	/**
	 * Customized skin name
	 * @property skinName
	 **/
	this.skinName = "";
	
	/**
	 * Whether this browser is available on HTML5
	 * @property html5Available
	 **/
	this.html5Available = false;
	
	/**
	 * Child object for authorization
	 * @property authorization 
	 **/
	this.authorization = null;
	
	/**
	 * Child object for codeGenerator
	 * @property codeGenerator 
	 **/
	this.codeGenerator = null;
	
	/**
	 * Child object for collaboration
	 * @property collaboration 
	 **/
	this.collaboration = null;
	
	/**
	 * Child object for debug
	 * @property debug 
	 **/
	this.debug = null;
	
	/**
	 * Child object for debug
	 * @property dialog 
	 **/
	this.dialog = null;
	
	/**
	 * Child object for debug
	 * @property editor 
	 **/
	this.editor = null;
	
	/**
	 * Child object for debug
	 * @property file 
	 **/
	this.file = null;
	
	/**
	 * Child object for debug
	 * @property selectedFile 
	 **/
	this.selectedFile = null;
	
	/**
	 * Child object for debug
	 * @property keylistener 
	 **/
	this.keylistener = null;
	
	/**
	 * Child object for debug
	 * @property mainLayout 
	 **/
	this.mainLayout = "";
	
	/**
	 * Child object for debug
	 * @property localization 
	 **/
	this.localization = null;

	/**
	 * Child object for debug
	 * @property preference 
	 **/
	this.preference = null;
	
	/**
	 * Child object for debug
	 * @property xml 
	 **/
	this.xml = null;
	
	/**
	 * Child object for debug
	 * @property loadingPanel 
	 **/	
	this.loadingPanel = null;
	
	/**
	 * Child object for debug
	 * @property action 
	 **/
	this.action = null;
	
	/**
	 * Child object for debug
	 * @property dialogNewProject 
	 **/
	this.dialogNewProject = null;
	
	/**
	 * Child object for debug
	 * @property dialogOpenProject 
	 **/
	this.dialogOpenProject = null;
	
	/**
	 * Child object for debug
	 * @property dialogNewFile 
	 **/
	this.dialogNewFile = null;

	/**
	 * Child object for debug
	 * @property dialogOpenFile 
	 **/
	this.dialogOpenFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogOpenURL 
	 **/
	this.dialogOpenURL = null;
	
	/**
	 * Child object for debug
	 * @property dialogSaveAsFile 
	 **/
	this.dialogSaveAsFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogRenameFile 
	 **/
	this.dialogRenameFile = null;
		
	/**
	 * Child object for debug
	 * @property dialogSwitchWorkspace 
	 **/
	this.dialogSwitchWorkspace = null;

	/**
	 * Child object for debug
	 * @property dialogImportFile 
	 **/
	this.dialogImportFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogExportFile 
	 **/
	this.dialogExportFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogCommitFile
	 **/
	//this.dialogCommitFile = null;

	/**
	 * Child object for debug
	 * @property dialogCheckoutFile
	 **/
	//this.dialogCheckoutFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogShowRevisionFile
	 **/
	//this.dialogShowrevisionFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogRevertFile
	 **/
	//this.dialogRevertFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogUpdateFile
	 **/
	//this.dialogUpdateFile = null;
	
	/**
	 * Child object for debug
	 * @property dialogProperty 
	 **/
	this.dialogProperty = null;
	
	/**
	 * Child object for preference
	 * @property dialogfindReplace 
	 **/
	this.dialogFindReplace = null;
			
	/**
	 * Child object for preference
	 * @property dialogPreference 
	 **/
	this.dialogPreference = null;
	
	/**
	 * Child object for preference
	 * @property dialogPreference 
	 **/
	this.dialogProjectProperty = null;
	
	/**
	 * Child object for preference
	 * @property dialogJoinProject 
	 **/
	this.dialogJoinProject = null;
	
	/**
	 * Child object for preference
	 * @property dialogJoinProject 
	 **/
	this.dialogCollaborationSettings = null;
	
	/**
	 * Child object for preference
	 * @property dialogHelpContents 
	 **/
	this.dialogHelpContents = null;
	
	/**
	 * Child object for preference
	 * @property dialogHelpSearch
	 **/
	this.dialogHelpSearch = null;

	/**
	 * Child object for preference
	 * @property dialogHelpTipsAndTricks
	 **/
	this.dialogHelpTipsAndTricks = null;

	/**
	 * Child object for preference
	 * @property dialogHelpCheckForUpdates
	 **/
	this.dialogHelpCheckForUpdates = null;
	
	/**
	 * Child object for preference
	 * @property dialogHelpInstallNewPlugin
	 **/
	this.dialogHelpInstallNewPlugin = null;
	
	/**
	 * Child object for preference
	 * @property dialogHelpAbout
	 **/
	this.dialogHelpAbout = null;
	
	/**
	 * Child object for preference
	 * @property isChatOn
	 **/
	this.isChatOn = false;
	
	/**
	 * Child object for preference
	 * @property currentProjectPath
	 **/
	this.currentProjectPath = "./";

	/**
	 * Child object for preference
	 * @property currentProjectName
	 **/
	this.currentProjectName = "";
	
	/**
	 * Child object for preference
	 * @property currentProjectName
	 **/
	this.currentProjectType = "";
	
	/**
	 * Child object for preference
	 * @property dialogLoadingCount
	 **/
	this.dialogLoadingCount = 0;	
	
	/**
	 * Child object for preference
	 * @property dialogCount
	 **/
	this.dialogCount = 23;	
	
	/**
	 * Child object for preference
	 * @property dialogCount
	 **/
	this.shorcutManager = null;	
	
	/**
	 * Child object for preference
	 * @property loadingCount
	 **/
	this.loadingCount = 0;	
	
	/**
	 * Child object for preference
	 * @property fileTypes 
	 **/
	this.fileTypes = null;	

};

org.uizard.core.prototype = {

	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @constructor
	 * @param {String} container The container
	 **/
	init: function(container) {
		
		var self = this;
		
		$("#uizardDialogContainer").append("<div id='loadingPanelContainer'></div>");
		
		this.loadingPanel = new YAHOO.widget.Overlay(
			"loadingPanelContainer", { 
				width: '600px',
				height: '400px', 
				visible: true, 
				underlay: "none",
				autofillheight: "body",
				constraintoviewport: true,
				modal: false,
				fixedcenter: true
			} 
		);
		
		this.loadingPanel.setBody("<div style='background-image:url(config/image/org.uizard.core/loading.png); height:400px;'><div id='uizardLoadingStatusBar' style='width:0px; height:30px; background-color:red;'></div></div>");
		this.loadingPanel.render();
		
		this.loadingPanel.show();
		this.fileTypes = $.makeArray();
		
		
		 
							
		//console.log(self.fileTypes);
		
		/*
		//Set Loading indicator
		var loading = $("").appendTo(document.body).hide();
		$(window).ajaxStart(loading.show);
		$(window).ajasStop(loading.hide);
		*/
		
		
		$(this).bind("coreDialogLoaded", function () {
	
			this.pluginManager.loadAllPlugins(0);
	
		});
		
		
		$(this).bind("pluginLoaded", function () {

			this.main();
			
		});		
		
		
		
		var userAgent = navigator.userAgent.toLowerCase();
 
		// Figure out what browser is being used
		$.browser = {
			version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
			chrome: /chrome/.test( userAgent ),
			safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
			opera: /opera/.test( userAgent ),
			msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
			mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
		};
		
		
		if($.browser.mozilla)
			this.browser = "Firefox";
		else if($.browser.msie)
			this.browser = "IE";
		else if($.browser.opera)
			this.browser = "Opera";
		else if($.browser.chrome)
			this.browser = "Chrome";
		else if($.browser.safari)
			this.browser = "Safari";
		else
			this.browser = "Unknown";
			

		this.browserVersion = $.browser.version;
				
		  
		$('.browserName').html(this.browser + " " + this.browserVersion);
		

		//For Array
		$.fn.reverse = function() {
			return this.pushStack(this.get().reverse(), arguments);
		};
		
		//I forgot why I needed this function... fuck 
		$.fn.formatForDisplay = function() {
			if (this.size()==0) return "<em>wrapped set is empty</em>"
			var text = '';
			this.each(function(){
				text += '<div>' + this.tagName;
				if (this.id) text += '#' + this.id;
				text += '</div>';
			});
		  return text;
		}; 
		
		//This function is some customized complementive function for Google Chrome which does not have a .toSource function 		 
		/*
		$.toSource = function(target) {
			if (typeof target.toSource !== 'undefined' && typeof target.callee === 'undefined') {
				return target.toSource().slice(1, -1);
			}
			switch (typeof target) {
				case 'number':
				case 'boolean':
				case 'function':
					return target;
					break;
				case 'string':
					return '\'' + target + '\'';
					break;
				case 'object':
					var result;
					if (target instanceof Date) {
						result = 'new Date('+target.getTime()+')';
					}
					else if (target.constructor === Array || typeof target.callee !== 'undefined') {
						result = '[';
						var i, length = target.length;
						for (i = 0; i < length-1; i++) { result += $.toSource(target[i]) + ','; }
						result += $.toSource(target[i]) + ']';
					}
					else {
						result = '{';
						var key;
						for (key in target) { result += key + ':' + $.toSource(target[key]) + ','; }
						result = result.replace(/\,$/, '') + '}';
					}
					return result;
					break;
				default:
					return '?unsupported-type?';
					break;
			}
		};
		*/

		
		
		//Need for device identification
		this.isiPad = navigator.userAgent.match(/iPad/i) != null;
		
/*
		if(this.isiPad) {
			alert("iPad!");
			
			
		
			
			
		}
		else {
*/


////////////////////////////////////////////////////////////////////////////////// for touch event
	function touchHandler(event) {
		var touches = event.changedTouches,
		    first = touches[0],
		    type = "";
		     switch(event.type)
		{
		    case "touchstart": type = "mousedown"; break;
		    case "touchmove":  type="mousemove"; break;        
		    case "touchend":   type="mouseup"; break;
		    default: return;
		}
		
		//initMouseEvent(type, canBubble, cancelable, view, clickCount, 
		//           screenX, screenY, clientX, clientY, ctrlKey, 
		//           altKey, shiftKey, metaKey, button, relatedTarget);
		
		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1, 
		                          first.screenX, first.screenY, 
		                          first.clientX, first.clientY, false, 
		                          false, false, false, 0/*left*/, null);
		
		first.target.dispatchEvent(simulatedEvent);
		//event.preventDefault();
	}
	
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);    
////////////////////////////////////////////////////////////////////////////////// for touch event
			
			$(this).bind("preferenceLoadingComplete", function () {
				self.mainLayout = new org.uizard.core.layout();
				self.mainLayout.init(container);
				
				self.mainLayout.windowManager.open("../../project/", "test.uml", "uml");
				//self.mainLayout.windowManager.open("../../project/", "untitled1.html", "html");
			});
			
			////////////////////////////////////////////////////////////
			//Load preference settings...
			////////////////////////////////////////////////////////////
			$.getJSON("filetype/filetype.json", function(data) {
				core.fileTypes = eval(data);
				$(self).trigger("preferenceLoadingComplete");
			});
			
			
			
			this.action = new org.uizard.core.menu.action();
			this.action.init();
			
			$(document).bind("contextmenu", function(e) {
                e.preventDefault();
            });
			
			
			

/*
		}
*/
		
			
		
		//Plugin Loading Aspects
		this.pluginManager = new org.uizard.plugin.manager();
		this.pluginManager.init();


		//Shortcuts
		this.shortcutManager = new org.uizard.core.shortcut.manager();
		this.shortcutManager.init();
		


		$(this).bind("uizardLoading", function () {
			if(self.loadingCount < 20) {
				self.loadingCount++;
				$("#uizardLoadingStatusBar").width($("#uizardLoadingStatusBar").width()+20);
			}
			else {
				$(self).trigger("uizardLoadingComplete");
			}
		});
		
		$(this).bind("uizardLoadingComplete", function () {
			this.loadingPanel.hide();
		});		
	},
	
	/**
	 * UIzard main process.  
	 * @method main 
	 **/
	main: function() {
		
		this.dialogNewProject = new org.uizard.core.project._new();
		this.dialogNewProject.init();
		
		this.dialogOpenProject = new org.uizard.core.project.open();
		this.dialogOpenProject.init();
		
		this.dialogNewFile = new org.uizard.core.file._new();
		this.dialogNewFile.init();
		
		this.dialogOpenFile = new org.uizard.core.file.open();
		this.dialogOpenFile.init();
		
		this.dialogOpenURL = new org.uizard.core.file.openURL();
		this.dialogOpenURL.init();
		
		this.dialogSaveAsFile = new org.uizard.core.file.saveAs();
		this.dialogSaveAsFile.init();
		
		this.dialogRenameFile = new org.uizard.core.file.rename();
		this.dialogRenameFile.init();
		
		this.dialogSwitchWorkspace = new org.uizard.core.file.switchWorkspace();
		this.dialogSwitchWorkspace.init();

		this.dialogImportFile = new org.uizard.core.file._import();
		this.dialogImportFile.init();
		
		this.dialogExportFile = new org.uizard.core.file._export();
		this.dialogExportFile.init();
		
		//this.dialogCommitFile = new org.uizard.core.file.commit();
		//this.dialogCommitFile.init();
		
		//this.dialogCheckoutFile = new org.uizard.core.file.checkout();
		//this.dialogCheckoutFile.init();
		
		//this.dialogShowrevisionFile = new org.uizard.core.file.showrevision();
		//this.dialogShowrevisionFile.init();
		
		//this.dialogRevertFile = new org.uizard.core.file.revert();
		//this.dialogRevertFile.init();
		
		//this.dialogUpdateFile = new org.uizard.core.file.update();
		//this.dialogUpdateFile.init();
		
		this.dialogProperty = new org.uizard.core.file.property();
		this.dialogProperty.init();
		
		this.dialogFindReplace = new org.uizard.core.edit.findReplace();
		this.dialogFindReplace.init();
		
		this.dialogPreference = new org.uizard.core.preference();
		this.dialogPreference.init();
		
		this.dialogProjectProperty = new org.uizard.core.project.property();
		this.dialogProjectProperty.init();
		
		this.dialogJoinProject = new org.uizard.core.collaboration.joinProject();
		this.dialogJoinProject.init();
		
		this.dialogCollaborationSettings = new org.uizard.core.collaboration.settings();
		this.dialogCollaborationSettings.init();
		
		this.dialogHelpContents = new org.uizard.core.help.contents();
		this.dialogHelpContents.init();
		
		this.dialogHelpSearch = new org.uizard.core.help.search();
		this.dialogHelpSearch.init();
		
		this.dialogHelpTipsAndTricks = new org.uizard.core.help.tipsAndTricks();
		this.dialogHelpTipsAndTricks.init();
		
		this.dialogHelpCheckForUpdates = new org.uizard.core.help.checkForUpdates();
		this.dialogHelpCheckForUpdates.init();
		
		this.dialogHelpInstallNewPlugin = new org.uizard.core.help.installNewPlugin();
		this.dialogHelpInstallNewPlugin.init();
			
		this.dialogHelpAbout = new org.uizard.core.help.about();
		this.dialogHelpAbout.init();
		
		
		this.codeGenerator = new org.uizard.core.codeGenerator();
		this.codeGenerator.init();
		
		this.localization = new org.uizard.core.localization();
		//this.localization.init("kor");
		//$(core).trigger("coreDialogLoaded");
		
	},

	/**
	 * UIzard load process.  
	 * <br>(Why does this function exist?! I think this fuction will contains some code for loading dynamically javascript and stylesheet)
	 * @method load 
	 **/
	load: function() {

	},

	/**
	 * UIzard skin function.  
	 * <br>This fuction change the skin of UIzard for User's preference
	 * @method skin() 
	 **/	
	skin: function(skinName) {
		this.getCSS(skinName);
	},
	
	/**
	 * getCSS function 
	 * <br>This function get remotely stylesheet files 
	 * @method getCSS
	 **/
	getCSS: function(url) {
		$("head").append("<link>");
		css = $("head").children(":last");
		css.attr({
		  rel:  "stylesheet",
		  type: "text/css",
		  href: url
		});
	}

};
/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module window
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class manager
 * @extends window
 **/
org.uizard.core.window.manager = function () {
	/**
	 * This presents the current browser version
	 * @property window
	 * @type Object
	 * @default null
	 **/
	this.window = null;
	
	/**
	 * This presents the current browser version
	 * @property tab
	 * @type Object
	 * @default null
	 **/
	this.tab = null;
	
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 * @type Object
	 * @default null
	 **/
	this.contextMenu = null;
	
	/**
	 * This presents the current browser version
	 * @property listmenu
	 * @type Object
	 * @default null
	 **/
	this.listmenu = null;
	
	/**
	 * This presents the current browser version
	 * @property windowListMenu
	 * @type Object
	 * @default null
	 **/
	this.windowListMenu = null;
	
	/**
	 * This presents the current browser version
	 * @property workspaceContainer
	 * @type Object
	 * @default null
	 **/	
	this.workspaceContainer = null;
	
	/**
	 * This presents the current browser version
	 * @property windowListContainer
	 * @type Object
	 * @default null
	 **/
	this.windowListContainer = null;
	
	/**
	 * This presents the current browser version
	 * @property index
	 * @type Number
	 * @default 0
	 **/		
	this.index = 0;
	
	/**
	 * This presents the current browser version
	 * @property windowTabView
	 * @type Object
	 * @default null
	 **/
	this.windowTabView = null;
	
	/**
	 * This presents the current browser version
	 * @property activeWindow
	 * @type Number
	 * @default -1
	 **/
	this.activeWindow = -1;
};

org.uizard.core.window.manager.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} container
	 **/
	init: function(container) {
		var self = this;
		
		this.window = $.makeArray();
		this.tab = $.makeArray();
		this.contextMenu = $.makeArray();
		this.windowListMenu = $.makeArray();
		
		this.workspaceContainer = container;
		$("#" + container).append("<div id='" + container + "WindowList'><div style='float:right;'><img class='windowList button' src='config/image/org.uizard.core.window/list.png' style='margin-top:3px; margin-right:3px;' /></div></div>");
		
		this.windowListContainer = container + "WindowList";
		
		this.windowTabView = new YAHOO.widget.TabView(this.windowListContainer);

		this.listmenu = new YAHOO.widget.Menu("windowListMenu");
		this.listmenu.render(document.body);
		
		this.contextMenu[0] = new org.uizard.core.menu.context();
		this.contextMenu[0].init("../../config/menu/org.uizard.core.window/window.manager.html", "window.manager", container);
		
		this.contextMenu[1] = new org.uizard.core.menu.context();
		this.contextMenu[1].init("../../config/menu/org.uizard.core.window/window.manager.tabView.html", "window.manager.tabView", container + "WindowList");
		
		//testCode
		/*
		$("#" + container + "WindowList").dblclick(function() {
			self.add("designer"); //type : designer or editor
		});
		*/
		
		/*
		$("#workspace").append("<button id='addWindowButton'>add a window</button>");
		
		var self = this;
		$("#addWindowButton").click(function() {
			self.add();
			m.s("added a window", "window manager");
		});
		*/
		
		//////////////////////////////////////////////////////////////////////////////////////////
		// Window events
		//////////////////////////////////////////////////////////////////////////////////////////

		$("#" + container).click(function () {
			self.contextMenu[0].blur();
			self.contextMenu[1].blur();
			
			for(i=0; i<self.index; i++) {
				if (self.window[i].contextMenu) {
					self.window[i].contextMenu.blur();
				}
				
				if (self.tab[i].contextMenu) {
					self.tab[i].contextMenu.blur();					
				}
			}
			
		});
				
		$("#" + container + "WindowList").find(".windowList").click(function () {
			self.listmenu.show();
			
			$("#windowListMenu").css("z-index", 5);
			$("#windowListMenu").css("left", $("#" + container + "WindowList").find(".windowList").offset().left - $("#windowListMenu").width() + 10);
			$("#windowListMenu").css("top", $("#" + container + "WindowList").find(".windowList").offset().top + 10);	
		
			return false;
		});
	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method open 
	 * @param {String} filepath The path of the file.
	 * @param {String} filename The name of the file.
	 * @param {String} filetype The type of the file.
	 **/
	open: function(filepath, filename, filetype) {

		var i = this.isOpened(filepath, filename);
		
		if(i >= 0) {
			this.window[i].activate();
		}
		else {
			this.add(filepath, filename, filetype);
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method isOpened 
	 * @param {String} filepath The path of the file.
	 * @param {String} filename The name of the file.
	 * @return {Number} The index of the window.
	 **/
	isOpened: function (filepath, filename) {
		var self = this;
		var windowIndex = -1;
		var emptyWindows = $.makeArray();
		
		$(this.window).each(function (i) {
			if (this.filepath == null && this.filename == null) {
				emptyWindows.push(i);
			}
		});
		
		$(emptyWindows).each(function (i) {
			self.window.pop(this);
		});
		
		$(this.window).each(function (i) {
			if (this.filepath == filepath && this.filename == filename) {
				windowIndex = i;
			}
		});
		
		//console.log(this.window[windowIndex].toSource());
		
		return windowIndex;
	},	

	/**
	 * This function is an UIzard core initializating function.  
	 * @method add 
	 * @param {String} filepath The path of the file.
	 * @param {String} filename The name of the file.
	 * @param {String} filetype The type of the file.
	 **/
	add: function(filepath, filename, filetype) {
		if(this.checkAlreadyOpened()) {
			m.s("warning", "This file is already opened!!", "windowManager");
		}
		else {			
			var self = this;
			this.activeWindow = this.index;
			
			var title = filename;

			$("#"+this.workspaceContainer).append("<div id='fileWindow"+this.index+"'></div>");
			
			this.window[this.index] = new org.uizard.core.window.panel();
			this.window[this.index].init("fileWindow"+this.index, title, this.workspaceContainer, filepath, filename, filetype);	
			
			this.tab[this.index] = new org.uizard.core.window.tab();
			this.tab[this.index].init("fileWindow"+this.index, title, this.windowTabView, this.listmenu);			
			
			this.window[this.index].connect(this.tab[this.index]);
			this.tab[this.index].connect(this.window[this.index]);
			
			this.window[this.index].activate();				
			this.tab[this.index].activate();
			
			//For Test
			this.window[this.index].maximize();
			
			this.index++;
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method checkAlreadyOpened 
	 * @param {String} filepath The path of the file.
	 * @param {String} filename The name of the file.
	 **/
	checkAlreadyOpened: function(fullpath, filename) {
	},
		
	/**
	 * This function is an UIzard core initializating function.  
	 * @method previousWindow 
	 * @param {Number} i The index.
	 **/
	previousWindow: function (i) {			

	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method nextWindow 
	 * @param {Number} i The index.
	 **/
	nextWindow: function (i) {
	
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method hideAllWindows 
	 **/
	hideAllWindows: function () {

	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method showAllWindows 
	 **/
	showAllWindows: function () {
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method cascade 
	 **/
	cascade: function () {
				var count = 0;
		var widthRatio = 0.6;
		var heightRatio = 0.7;

		for (var i = 0; i < this.index; i++) {
			if(this.window[i].alive) {
				this.window[i].panel.left	= 4+(24*count);
				this.window[i].panel.top	= 29+(24*count);
				this.window[i].panel.width = $('#workspace').width() * widthRatio;
				this.window[i].panel.height = $('#workspace').height() * heightRatio;
				
				//m.s(this.window[i].designer.toSource());
				//if($('#fileWindow'+i+'_c').find(".codeEditor") != null) {
				if(this.window[i].designer){
					m.s(this.window[i].type);
					$('#fileWindow'+i+'_c').find(".canvasContainer").css('width', this.window[i].panel.width - 14 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".canvasContainer").css('height', this.window[i].panel.height - 68 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".ruler_x").css('width', this.window[i].panel.width - 15 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".ruler_y").css('height', this.window[i].panel.height - 65 + 'px');
				}
								
				$('#fileWindow'+i+'_c').css('left', this.window[i].panel.left + 'px');
				$('#fileWindow'+i+'_c').css('top', this.window[i].panel.top + 'px');
				$('#fileWindow'+i+'_c').css('width', this.window[i].panel.width + 'px');
				$('#fileWindow'+i+'_c').css('height', this.window[i].panel.height + 'px');
				$('#fileWindow'+i+'_c').css('z-index', i);

				this.window[i].panel.cfg.setProperty('left', this.window[i].panel.left + 'px');
				this.window[i].panel.cfg.setProperty('top', this.window[i].panel.top + 'px');

				$('#fileWindow'+i+'_c').find('.yui-panel').css('width', this.window[i].panel.width + 'px');
				$('#fileWindow'+i+'_c').find('.yui-panel').css('height', this.window[i].panel.height-22 + 'px');
				$('#fileWindow'+i+'_c').find(".bd").height(this.window[i].panel.height - 50);
				$('#fileWindow'+i+'_c').find(".windowContainer").find(".CodeMirror").height(this.window[i].panel.height - 50);
				
				count++;
			}
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method tileVertically 
	 **/
	tileVertically: function () {
		var count = 0;
		var eachWidth = Math.floor(($('#workspace').width()-9) / this.countTheAliveWindows());
		var eachHeight = $('#workspace').height()-33;
			
		for (var i = 0; i < this.index; i++) {
			if(this.window[i].alive) {
				this.window[i].panel.left	= 4+(eachWidth*count);
				this.window[i].panel.top	= 29;
				this.window[i].panel.width	= eachWidth;
				this.window[i].panel.height	= eachHeight;
				
				if(this.window[i].designer){
					$('#fileWindow'+i+'_c').find(".canvasContainer").css('width', this.window[i].panel.width - 14 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".canvasContainer").css('height', this.window[i].panel.height - 68 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".ruler_x").css('width', this.window[i].panel.width - 15 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".ruler_y").css('height', this.window[i].panel.height - 65 + 'px');
				}
				
				$('#fileWindow'+i+'_c').css('left', this.window[i].panel.left + 'px');
				$('#fileWindow'+i+'_c').css('top', this.window[i].panel.top + 'px');
				$('#fileWindow'+i+'_c').css('width', this.window[i].panel.width + 'px');
				$('#fileWindow'+i+'_c').css('height', this.window[i].panel.height + 'px');
				$('#fileWindow'+i+'_c').css('z-index', i);

				this.window[i].panel.cfg.setProperty('left', this.window[i].panel.left + 'px');
				this.window[i].panel.cfg.setProperty('top', this.window[i].panel.top + 'px');

				$('#fileWindow'+i+'_c').find('.yui-panel').css('width', this.window[i].panel.width + 'px');
				$('#fileWindow'+i+'_c').find('.yui-panel').css('height', this.window[i].panel.height-22 + 'px');
				$('#fileWindow'+i+'_c').find(".bd").height(this.window[i].panel.height - 50);
				$('#fileWindow'+i+'_c').find(".windowContainer").find(".CodeMirror").height(this.window[i].panel.height - 50);
				
				count++;
			}
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method tileHorizontally 
	 **/
	tileHorizontally: function() {
		var count = 0;
		var eachWidth = $('#workspace').width()-9;
		var eachHeight = Math.floor(($('#workspace').height()-33) / this.countTheAliveWindows());
			
		for (var i = 0; i < this.index; i++) {
			if(this.window[i].alive) {
				this.window[i].panel.left	= 4;
				this.window[i].panel.top	= 29+(eachHeight*count);
				this.window[i].panel.width	= eachWidth;
				this.window[i].panel.height	= eachHeight;
				
				if(this.window[i].designer){
					m.s(this.window[i].type);
					$('#fileWindow'+i+'_c').find(".canvasContainer").css('width', this.window[i].panel.width - 14 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".canvasContainer").css('height', this.window[i].panel.height - 68 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".ruler_x").css('width', this.window[i].panel.width - 15 + 'px');
			  	 	$('#fileWindow'+i+'_c').find(".ruler_y").css('height', this.window[i].panel.height - 65 + 'px');
				}
				
				$('#fileWindow'+i+'_c').css('left', this.window[i].panel.left + 'px');
				$('#fileWindow'+i+'_c').css('top', this.window[i].panel.top + 'px');
				$('#fileWindow'+i+'_c').css('width', this.window[i].panel.width + 'px');
				$('#fileWindow'+i+'_c').css('height', this.window[i].panel.height + 'px');
				$('#fileWindow'+i+'_c').css('z-index', i);

				this.window[i].panel.cfg.setProperty('left', this.window[i].panel.left + 'px');
				this.window[i].panel.cfg.setProperty('top', this.window[i].panel.top + 'px');

				$('#fileWindow'+i+'_c').find('.yui-panel').css('width', this.window[i].panel.width + 'px');
				$('#fileWindow'+i+'_c').find('.yui-panel').css('height', this.window[i].panel.height-22 + 'px');
				$('#fileWindow'+i+'_c').find(".bd").height(this.window[i].panel.height - 50);
				$('#fileWindow'+i+'_c').find(".windowContainer").find(".CodeMirror").height(this.window[i].panel.height - 50);
				
				count++;
			}
		}	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method countTheAliveWindows
	 * @return {Number} The count. 
	 **/
	countTheAliveWindows: function() {
		var count = 0;
		
		for (var i = 0; i < this.index; i++) {
			if(this.window[i].alive) {
				count++;
			}
		}
		
		return count;
	}
};
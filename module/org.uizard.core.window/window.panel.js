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
 * @class panel
 * @extends window
 **/
org.uizard.core.window.panel = function () {
	/**
	 * This presents the current browser version
	 * @property panel
	 * @type Object
	 * @default null
	 **/
	this.panel = null;
	
	/**
	 * This presents the current browser version
	 * @property resize
	 * @type Object
	 * @default null
	 **/
	this.resize = null;
	
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 * @type Object
	 * @default null
	 **/
	this.contextMenu = null;
	
	/**
	 * This presents the current browser version
	 * @property container
	 * @type Object
	 * @default null
	 **/	
	this.container = null;
	
	/**
	 * This presents the current browser version
	 * @property workspaceContainer
	 * @type Object
	 * @default null
	 **/
	this.workspaceContainer = null;
	
	/**
	 * This presents the current browser version
	 * @property tab
	 * @type Object
	 * @default null
	 **/
	this.tab = null;
	
	/**
	 * This presents the current browser version
	 * @property editor
	 * @type Object
	 * @default null
	 **/
	this.editor = null;
	
	/**
	 * This presents the current browser version
	 * @property designer
	 * @type Object
	 * @default null
	 **/
	this.designer = null;
	
	/**
	 * This presents the current browser version
	 * @property title
	 * @type Object
	 * @default null
	 **/	
	this.title = null;
	
	/**
	 * This presents the current browser version
	 * @property type
	 * @type Object
	 * @default null
	 **/
	this.type = null;
	
	/**
	 * This presents the current browser version
	 * @property status
	 * @type Object
	 * @default null
	 **/
	this.status = null;
	
	/**
	 * This presents the current browser version
	 * @property filepath
	 * @type String
	 * @default null
	 **/
	this.filepath = null;
	
	/**
	 * This presents the current browser version
	 * @property filename
	 * @type String
	 * @default null
	 **/
	this.filename = null;
	
	/**
	 * This presents the current browser version
	 * @property filetype
	 * @type String
	 * @default null
	 **/
	this.filetype = null;
	
	/**
	 * This presents the current browser version
	 * @property left
	 * @type Object
	 * @default null
	 **/	
	this.left = null;
	
	/**
	 * This presents the current browser version
	 * @property top
	 * @type Object
	 * @default null
	 **/
	this.top = null;
	
	/**
	 * This presents the current browser version
	 * @property width
	 * @type Object
	 * @default null
	 **/
	this.width = null;
	
	/**
	 * This presents the current browser version
	 * @property height
	 * @type Object
	 * @default null
	 **/
	this.height = null;
	
	/**
	 * This presents the current browser version
	 * @property alive
	 * @type Object
	 * @default null
	 **/	
	this.alive = null;
};

org.uizard.core.window.panel.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} container The container.
	 * @param {String} title The title.
	 * @param {Object} workspaceContainer The workspaceContainer.
	 * @param {String} filepath The path of the file.
	 * @param {String} filename The name of the file.
	 * @param {String} filetype The type of the file.
	 **/
	init: function(container, title, workspaceContainer, filepath, filename, filetype) {
		
		var self = this;
		
		this.container = container;
		this.workspaceContainer = workspaceContainer;
		
		this.filepath = filepath;
		this.filename = filename;
		this.filetype = filetype;
		
		this.alive = true;

		if(filetype == "url"){
			this.type = "codeMirrorEditor";
			this.filename = filepath;
		}
		
		this.panel = new YAHOO.widget.Panel(
			container, { 
				x: $(".yui-layout-unit-center").position().left + 5, 
				y: $(".yui-layout-unit-center").position().top + 30, 
				width: "800px",
				height: "600px", 
				visible: true, 
				underlay: "none",
				close: false,
				autofillheight: "body",
				draggable: true,
				constraintoviewport: true,
				context: ["showbtn", "tl", "bl"]
			} 
		);
	
		
		//////////////////////////////////////////////////////////////////////////////////////////
		// Window setting
		//////////////////////////////////////////////////////////////////////////////////////////	
		
		this.title = title;
		this.panel.setHeader("<div style='overflow:auto' class='titlebar'><div style='float:left'>"+this.title+"</div><div style='width:40px; text-align:right; float:right'><img src='config/image/icons/context/minimizebutton.png' class='minimize button' /> <img src='config/image/icons/context/maximizebutton.png' class='maximize button' /> <img src='config/image/icons/context/closebutton.png' class='close button' /></div></div>");
		this.panel.setBody("<div class='windowContainer'></div>");
		this.panel.setFooter("<div class='.footer'>footer</div>");
		this.panel.render();
		this.status = "unmaximized";
		//this.filename = filename;
		this.left = $("#"+container).css("left");
		this.top = $("#"+container).css("top");
		this.width = $("#"+container).width();
		this.height = $("#"+container).height();
		
		// Due to file type, create proper tool.
		if (this.inArray(this.filetype) > -1) {
			this.type = core.fileTypes[this.inArray(this.filetype)].editor;
			 	
			if (this.type == "Editor") {
				this.editor = new org.uizard.core.edit();
				this.editor.init($("#"+container).find(".windowContainer"));
				this.editor.load(this.filepath, this.filename, this.filetype);
			}
			else if (this.type == "Designer") {
				this.designer = new org.uizard.core.design();
				this.designer.init($("#"+container).find(".windowContainer")[0], this.title);
				this.designer.load(this.filepath, this.filename, this.filetype);
			}
		}

		this.setFooter(); //native function to call the this.panel.setFooter()		
		
		this.resizeAll();
		
		
		this.contextMenu = new org.uizard.core.menu.context();
		this.contextMenu.init("../../config/menu/org.uizard.core.window/window.panel.titlebar.html", "window.panel.titlebar", $("#"+container).find(".titlebar"), this.title);
		
		this.resize = new YAHOO.util.Resize(container+"_c", {
			handles: 'all',
			minWidth: 100,
            minHeight: 100,
			status: false,
			proxy: false, 
		});
		
		this.resize.on("startResize", function(args) {
			if (this.cfg.getProperty("constraintoviewport")) { 
				var D = YAHOO.util.Dom; 
				
				var clientRegion = D.getClientRegion(); 
				var elRegion = D.getRegion(this.element); 
				
				self.resize.set("maxWidth", clientRegion.right - elRegion.left - YAHOO.widget.Overlay.VIEWPORT_OFFSET); 
				self.resize.set("maxHeight", clientRegion.bottom - elRegion.top - YAHOO.widget.Overlay.VIEWPORT_OFFSET); 
			} 
			else { 
				self.resize.set("maxWidth", null); 
				self.resize.set("maxHeight", null); 
			} 
			
			self.onStartResize();
		}, this.panel, true);
		
		this.resize.on("resize", function(args) {
			var panelWidth = args.width;
			var panelHeight = args.height;
	
			if(panelWidth != 0) {
            	this.cfg.setProperty("width", panelWidth + "px");
			}
			if(panelHeight != 0) {
            	this.cfg.setProperty("height", panelHeight + "px");
			}
			
			self.resizeAll()
			
			self.onResize();	
		}, this.panel, true);
		
		this.resize.on("endResize", function(args) {
			
			self.resizeAll();

		}, this.panel, true);
		

		//////////////////////////////////////////////////////////////////////////////////////////
		// Window events
		//////////////////////////////////////////////////////////////////////////////////////////
		
		//window body click event assign
		$("#"+container).click(function() {
			self.windowBodyClick();
			
			return false;
		});
		
		//title bar click event assign
		$("#"+container).find(".titlebar").click(function() {
			
			return false;
		});
		
		//title bar mousedown event assign
		$("#"+container).find(".titlebar").mousedown(function() {
			self.titlebarClick();
		});
		
		//title bar dbl click event assign
		$("#"+container).find(".titlebar").dblclick(function() {
			self.titlebarDblclick();
			
			return false;
		});
		
		//minimize button click event assign
		$("#"+container).find(".minimize").click(function() {
			self.minimize();
			
			return false;
		});

		//maxmize button click event assign
		$("#"+container).find(".maximize").click(function() {
			self.maximize();
			
			return false;
		});
				
		//cloase button click event assign
		$("#"+container).find(".close").click(function() {
			self.close();
			
			return false;
		});
		
		
		
		this.plug();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method connect 
	 * @param {Object} tab The tab
	 **/
	connect: function(tab) {
		this.tab = tab;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method windowBodyClick 
	 **/
	windowBodyClick: function() {
		this.activate();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method titlebarClick 
	 **/
	titlebarClick: function() {
		this.activate();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method titlebarDblclick 
	 **/
	titlebarDblclick: function() {
		this.maximize();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method maximize 
	 **/
	maximize: function () {
		var self = this;
		
		if(this.status != "maximized") {			
			this.left = $("#" + this.container + "_c").offset().left;
			this.top = $("#" + this.container + "_c").offset().top;
			this.width = $("#" + this.container + "_c").width();
			this.height = $("#" + this.container + "_c").height();
			
			$("#" + this.container + "_c").offset({left:$("#" + this.workspaceContainer).offset().left - 1, top:$("#" + this.workspaceContainer).offset().top + 24});
			$("#" + this.container + "_c").width($("#" + this.workspaceContainer).width());
			$("#" + this.container + "_c").height($("#" + this.workspaceContainer).height() - 24);
			
            this.panel.cfg.setProperty("width", $("#" + this.workspaceContainer).width() + "px");
            this.panel.cfg.setProperty("height", $("#" + this.workspaceContainer).height() - 24 + "px");
			
			this.status = "maximized";
			
			this.resize.lock();
			
			$("#" + this.container + "_c").find(".yui-resize-handle").hide();
		}
		else {
			$("#" + this.container + "_c").offset({left:self.left, top:self.top});
			$("#" + this.container + "_c").width(this.width);
			$("#" + this.container + "_c").height(this.height);
			
			this.panel.cfg.setProperty("width", this.width + "px");
            this.panel.cfg.setProperty("height", this.height - 3 + "px");
			
			this.status = null;
			
			this.resize.unlock();
			
			$("#" + this.container + "_c").find(".yui-resize-handle").show();
		}
		
		this.resizeAll();
		
		this.activate();
	},	

	/**
	 * This function is an UIzard core initializating function.  
	 * @method minimize 
	 **/
	minimize: function () {
		var self = this;
		
		if(this.status != "minimized") {			
			$("#" + self.container + "_c").hide("fast");
			
			this.status = "minimized";	
		}
		else {
			$("#" + self.container + "_c").show("slow");
			
			this.status = null;
		}
		
		this.resizeAll();
				
		this.activate();				
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method close 
	 **/
	close: function() {

		this.alive = false;
		this.filename = null;
		this.filetype = null;

		$("#" + this.container).parent().remove();

		this.contextMenu.remove();

		if(this.tab) {
			this.tab.window = null;
			this.tab.close();
		}
		
		delete this;

		for (var i = core.mainLayout.windowManager.index-1; i > -1; i--) {
			if(core.mainLayout.windowManager.window[i].alive) {
				core.mainLayout.windowManager.window[i].activate();
				break;
			}
		}

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function() {
		$("#" + this.container + "_c").show();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method hide 
	 **/
	hide: function() {
		$("#" + this.container + "_c").hide();
	},	
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method activate 
	 **/
	activate: function() {
		$("#"+this.workspaceContainer).find(".activated").each(function(i) {
			$(this).removeClass("activated");
		});
		
		$("#"+this.workspaceContainer).find(".yui-panel-container").each(function(i) {
			$(this).css("z-index", "2");
		});
		
		$("#" + this.container).find(".hd").addClass("activated");	
		$("#" + this.container).parent().css("z-index", "3");	

		this.tab.activate();

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setHeader
	 * @param {Object} contents The contents. 
	 **/
	setHeader: function(contents) {

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setBody
	 * @param {Object} contents The contents. 
	 **/
	setBody: function(contents) {

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setFooter 
	 * @param {Object} contents The contents.
	 **/
	setFooter: function(contents) {
		if(this.type == "Editor") {
			this.panel.setFooter("<div class='editorMessage'>" + this.filepath + "/" + this.filename + "</div>");
		}
		else if(this.type == "Designer") {
			this.panel.setFooter("<div class='designerMessage'>Welcome to the UIzard Designer Panel!</div><div class='mousePositionView'>(0, 0)</div>");
		}
		else if(this.filetype == "url") {
			this.panel.setFooter("<div class='editorMessage'>" + this.filepath + "</div>");
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method onStartResize 
	 **/
	onStartResize: function () {
		this.activate();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method onDrag 
	 **/
	onDrag: function () {

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method onResize 
	 **/
	onResize: function () {
		this.activeWindow = i;
					
		if(this.panel.status != "maximized") {		
			this.width = this.panel.cfg.getProperty("width");
			this.height = this.panel.cfg.getProperty("height");
		}
		var windowContentHeight = $("#fileWindow"+i+"_c").height() - 47;
		$("#fileWindow"+i+"_c").find(".yui-content").height(windowContentHeight);
		
		/*
		if($("#codeEditor_fileWindow"+i+"Container").get(0)) {
			codeEditor_load_callback("codeEditor_fileWindow"+i+"Container");
		}
		
		if($("#codeViewer_fileWindow"+i+"Container").get(0)) {
			codeViewer_load_callback("codeViewer_fileWindow"+i+"Container");
		}
		
		if($("#generatedCode_fileWindow"+i+"Container").get(0)) {
			generatedCode_load_callback("generatedCode_fileWindow"+i+"Container");
		}
		*/
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method resizeAll 
	 **/
	resizeAll: function() {
		if(this.type == "Editor") {
			$("#"+this.container).find(".windowContainer").height($("#"+this.container).height() - 53);
			$("#"+this.container).find(".windowContainer").find(".CodeMirror").height($("#"+this.container).height() - 53);
		}
		else if(this.type == "Designer") {
			this.designer.resizeAll();
		}
	},
	
	/**
	 * This function get the index of pre-defined file type.   
	 * @method inArray
	 * @param {String} file type (Extension). 
	 **/
	inArray: function(keyword) {
		for (var i = 0; i < core.fileTypes.length; i++) {
			if (core.fileTypes[i].fileExtention == keyword){
				return i;
			}
		}
		return -1;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method plug 
	 **/
	plug: function() {
		
	}
};
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
 * @class tab
 * @extends window
 **/
org.uizard.core.window.tab = function () {
	/**
	 * This presents the current browser version
	 * @property tabView
	 * @type Object
	 * @default null
	 **/
	this.tabView = null;
	
	/**
	 * This presents the current browser version
	 * @property listmenu
	 * @type Object
	 * @default null
	 **/
	this.listmenu = null;
	
	/**
	 * This presents the current browser version
	 * @property tab
	 * @type Object
	 * @default null
	 **/
	this.tab = null;
	
	/**
	 * This presents the current browser version
	 * @property menuitem
	 * @type Object
	 * @default null
	 **/
	this.menuitem = null;
	
	/**
	 * This presents the current browser version
	 * @property window
	 * @type Object
	 * @default null
	 **/
	this.window = null;
	
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 * @type Object
	 * @default null
	 **/
	this.contextMenu = null;
	
	/**
	 * This presents the current browser version
	 * @property title
	 * @type Object
	 * @default null
	 **/
	this.title = null;
};

org.uizard.core.window.tab.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} container The container.
	 * @param {Object} title The title.
	 * @param {Object} tabView The tabView.
	 * @param {Object} listmenu The listmenu.
	 **/
	init: function(container, title, tabView, listmenu) {
		var self = this;
		
		this.tabView = tabView;
		this.listmenu = listmenu;
		
		this.title = title;
		
		this.tab = new YAHOO.widget.Tab({ label: this.title + " <img src='config/image/icons/context/closebutton.png' class='close button' />", content: "" });
		
		this.tabView.addTab(this.tab);
		this.tabView.selectTab(this.tabView.getTabIndex(this.tab));
				
		//For window list menu
		var activateDummy = function () {
			self.activate();
		};
		
		this.menuitem = new YAHOO.widget.MenuItem("windowListMenu", {text: this.title, onclick: {fn: activateDummy}});
		
		this.listmenu.addItem(this.menuitem);
		this.listmenu.render();
		
		this.contextMenu = new org.uizard.core.menu.context();
		this.contextMenu.init("../../config/menu/org.uizard.core.window/window.tab.html", "window.tab", this.tab.get("labelEl"), this.title);
		
		
		//////////////////////////////////////////////////////////////////////////////////////////
		// Window tab events
		//////////////////////////////////////////////////////////////////////////////////////////
		
		//tab click event assign
		$(this.tab.get("labelEl")).click(function() {
			self.activate();
			
			return false;
		});	
		
		//close button click event assign
		$(this.tab.get("labelEl")).find(".close").click(function() {
			self.close();
			
			return false;
		});	
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method connect 
	 * @param {Object} window The window.
	 **/
	connect: function(window) {
		this.window = window;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method close 
	 **/
	close: function () {

		this.tabView.removeTab(this.tab);
		this.listmenu.removeItem(this.menuitem);
		
		this.contextMenu.remove();
		
		if(this.window) {
			this.window.tab = null;
			this.window.close();
		}
		
		delete this;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method activate 
	 **/
	activate: function() {
		this.tabView.selectTab(this.tabView.getTabIndex(this.tab));
		
		
		$("#windowListMenu").find(".yuimenuitem-checked").each(function(i) {
			$(this).removeClass("yuimenuitem-checked");
		});
		
		$(this.menuitem.element).addClass("yuimenuitem-checked");	
		
		this.window.show();
		
		if (!$("#" + this.window.container).find(".hd").hasClass("activated")) {
			this.window.activate();
		}
	}
	
};
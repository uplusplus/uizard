/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module design
 **/

/**
 * This is an UIzard code generator.  
 * <br>UIzard starts with this code generator.
 * @class canvas
 * @extends design
 **/
org.uizard.core.design.canvas = function () {
	/**
	 * This presents the current browser version
	 * @property target
	 **/
	this.target = null;
	
	/**
	 * This presents the current browser version
	 * @property title
	 **/
	this.title = null;

	/**
	 * This presents the current browser version
	 * @property toolbar
	 **/
	this.toolbar = null;
		
	/**
	 * This presents the current browser version
	 * @property width
	 **/
	this.width = null;
	
	/**
	 * This presents the current browser version
	 * @property height
	 **/
	this.height = null;
	
	/**
	 * This presents the current browser version
	 * @property width
	 **/
	this.skinWidth = null;
	
	/**
	 * This presents the current browser version
	 * @property height
	 **/
	this.skinHeight = null;
	
	/**
	 * This presents the current browser version
	 * @property height
	 **/
	this.snapToGrid = false;
	
	/**
	 * This presents the current browser version
	 * @property contextMenu
	 **/
	this.contextMenu = null;
	
	/**
	 * This presents the current browser version
	 * @property objects
	 **/
	this.objects = null;
	
	/**
	 * This presents the current browser version
	 * @property objectManager
	 **/
	this.objectManager = null;
	
	/**
	 * This presents the current browser version
	 * @property focus
	 * @type Number
	 * @default -1
	 **/
	this.focus = -1;
	
	/**
	 * This presents the current browser version
	 * @property hoveredIndex
	 **/
	this.hoveredIndex = null;
	
	/**
	 * This presents the current browser version
	 * @property selectedIndex
	 **/
	this.selectedIndex = null;
	
	/**
	 * This presents the current browser version
	 * @property isDrawing
	 **/
	this.isDrawing = false;
	
	/**
	 * This presents the current browser version
	 * @property isAdding
	 **/
	this.isAdding = -1;
	
	/**
	 * This presents the current browser version
	 * @property isModifying
	 **/
	this.isModifying = false;
	
	/**
	 * This presents the current browser version
	 * @property prevX
	 **/
	this.prevX = null;
	
	/**
	 * This presents the current browser version
	 * @property prevY
	 **/
	this.prevY = null;
	
	/**
	 * This presents the current browser version
	 * @property sx
	 **/
	this.sx = null;
	
	/**
	 * This presents the current browser version
	 * @property sy
	 **/
	this.sy = null;
	
	/**
	 * This presents the current browser version
	 * @property ex
	 **/
	this.ex = null;
	
	/**
	 * This presents the current browser version
	 * @property ey
	 **/
	this.ey = null;
	
	/**
	 * This presents the current browser version
	 * @property copiedObjects
	 **/
	this.copiedObjects = null;
	
	/**
	 * This presents the current browser version
	 * @property copiedObjectsUndo
	 **/
	this.copiedObjectsUndo = null;
	
	/**
	 * This presents the current browser version
	 * @property copiedObjectsRedo
	 **/
	this.copiedObjectsRedo = null;
	
	/**
	 * This presents the current browser version
	 * @property undoManager
	 **/	
	this.undoManager = null;
		
	/**
	 * This presents the current browser version
	 * @property dialog
	 **/	
	this.dialog = null;	
	
	/**
	 * This presents the current browser version
	 * @property preview
	 **/	
	this.preview = null;
	
	/**
	 * This presents the current browser version
	 * @property collaboration
	 **/
	this.collaboration = null;
	
	/**
	 * This presents the current browser version
	 * @property objectexplorer
	 **/
	this.objectexplorer = null;
};

org.uizard.core.design.canvas.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @constructor
	 * @param {String} target The target.
	 * @param {String} width The width of the canvas.
	 * @param {String} height The height of the canvas.
	 * @param {String} title The title of the canvas. 
	 **/
	init: function (target, width, height, title, parent) {
		var self = this;
		
		//adding html container
		$(target).append("<div class='space'></div>"); //This is a margin when parent window is smaller than canvas size
		$(target).append("<div class='skin'></div>"); //This is a canvas layer
		$(target).append("<div class='canvas'></div>"); //This is a canvas layer
		$(target).find(".canvas").append("<div class='grid'></div>"); //This is a grid layer which has grid background image and opacity
		$(target).find(".canvas").append("<div class='shapes'></div>"); //This is a grid layer which has grid background image and opacity
		$(target).find(".canvas").append("<canvas width='"+width+"' height='"+height+"'></canvas>"); //This is a canvas element which is supported in HTML5
		$(target).find(".canvas").append("<canvas width='"+width+"' height='"+height+"'></canvas>"); //This is a canvas element which is supported in HTML5
		
		
		//Set Properties
		this.target = target;
		this.title = title;
		this.parent = parent;
		
		this.objects = $.makeArray();
		this.copiedObjects = $.makeArray();
		this.copiedObjectsUndo = $.makeArray();
		this.copiedObjectsRedo = $.makeArray();
		
		this.isAdding = -1;
		this.isModifying = false;
		
		this.objectManager = new org.uizard.core.object.manager();
		this.objectManager.init("", this);
		
		//objectexplorer Initialization
		this.objectExplorer = new org.uizard.core.design.canvas.objectexplorer();
		this.objectExplorer.init(this);

		//Toolbar Initialization		
		this.toolbar = new org.uizard.core.design.canvas.toolbar();
		this.toolbar.init(this);
		
		//preview Initialization		
		this.preview = new org.uizard.core.design.canvas.preview();
		this.preview.init($(target).find(".designPreviewContainer"), width, height, 0.1, this);

		//Blocking Context Menus for Empty Space		
		var emptyContextMenu = new org.uizard.core.menu.context();
		emptyContextMenu.init("", "none", $(target).find(".designPreviewContainer"), "");

		//Set Dialog
		var handleOk = function() { 
			var width = $("#" + self.dialog.containerID).find(".designCanvasSetting").find(".canvasWidth").val();
			var height = $("#" + self.dialog.containerID).find(".designCanvasSetting").find(".canvasHeight").val();
			
			self.setSize(width, height);
			parent.resizeAll();
		
			this.hide(); 
		};

		var handleCancel = function() { 

			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handleOk, isDefault:true},
						 {text:"Cancel",  handler:handleCancel}]; 
						 
		this.dialog = new org.uizard.core.design.canvas.dialog();
		this.dialog.init({
			title:"Canvas", 
			path:"../../config/dialog/org.uizard.core.design/design.canvas.html",
			width:595,
			height:400,
			modal:false,
			draggable:true,
			buttons:this.buttons,
			success: function () {

				var tabView = new YAHOO.widget.TabView($("#" + self.dialog.containerID).find(".designCanvasSetting").get(0));
				
				
				var width = self.width;
				$("#" + self.dialog.containerID).find(".designCanvasSetting").find(".canvasWidth").val(width);
				var height = self.height;
				$("#" + self.dialog.containerID).find(".designCanvasSetting").find(".canvasHeight").val(height);
			}
		});
		this.dialog = this.dialog.dialog;
				
		//Set scoll menu and set preview
		$(this.target).scroll(function () {
		
			var movedLeft = $(this).scrollLeft();
			var movedTop = $(this).scrollTop();

			//// fixed!!
			$(this).find(".designToolbarContainer").css("left", movedLeft+30);
			$(this).find(".designToolbarContainer").css("top", movedTop+30);
			$(this).find(".designPreviewContainer").css("left", movedLeft+70);
			$(this).find(".designPreviewContainer").css("top", movedTop+120);
			$(this).find(".designStatusContainer").css("left", movedLeft+70);
			$(this).find(".designStatusContainer").css("top", movedTop+30);
			//// fixed!!
			console.log(movedTop+"//"+$(self.target).height());
			
			if(movedLeft-50<0) {
				$(self.target).find(".previewCanvasIndicator").css("left", 0);
			}
			else if(movedLeft-50+$(self.target).width()>817) {
			}
			else {
				$(self.target).find(".previewCanvasIndicator").css("left", (movedLeft-50)*0.1);
			}
			
			if(movedTop-50<0) {
				$(self.target).find(".previewCanvasIndicator").css("top", 0);
			}
			else if(movedTop-50+$(self.target).height()>1017) {
			}
			else {
				$(self.target).find(".previewCanvasIndicator").css("top", (movedTop-50)*0.1);
			}
			
			
		});
		
		
		//Set Undo Manager
		this.undoManager = new UndoManager();
		
		
		this.selectedIndex = $.makeArray();
		
		//Set canvas size
		this.setSize(width, height);
		
		//Set Context Menu
		this.contextMenu = new org.uizard.core.menu.context();
		this.contextMenu.init("../../config/menu/org.uizard.core.design/design.canvas.html", "design.canvas", $(target).find(".canvas").find("canvas"), this.title);
		
				
		//Set Mouse Down Event in Canvas
		$(target).find(".canvas").find("canvas").mousedown(function (e) {
			
			if (e.which == 1) {
				
				
				self.sx = 0;
				self.sy = 0;
				self.ex = 0;
				self.ey = 0;				
				
				//self.deselect();
				//self.objectManager.unset();
				
				//Calculate the position (x, y) in Canvas Axis
				var parentOffset = $(this).parent().offset(); 	
				var x = Math.floor(e.pageX - parentOffset.left);
				var y = Math.floor(e.pageY - parentOffset.top);
				
				
				if (!($(self.target).find(".canvas").hasClass("statusDrawingLine")) && 
					!($(self.target).find(".canvas").hasClass("statusDrawingSquare")) &&
					!($(self.target).find(".canvas").hasClass("statusMove")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeTopLeft")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeTopRight")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeBottomLeft")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeBottomRight")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeTop")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeBottom")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeLeft")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeRight")) &&
					!self.isDrawing ) {
					//Set the start position for selection layer
					self.sx = x;
					self.sy = y;
				
					$(self.target).find(".canvas").find(".grid").append("<div class='selection' style='display:none;'></div>");
				}
				
				
				var selectSomething = false;


				//Set Status with Drawing Mode
				if($(self.target).find(".canvas").hasClass("statusDrawingLine")) {			
					$(self.target).parent().find(".designStatusContainer").find(".lineDrawing").addClass("toolbarButtonPressed");
				}
				//If square mode
				else if($(self.target).find(".canvas").hasClass("statusDrawingSquare")) {
					$(self.target).parent().find(".designStatusContainer").find(".squareDrawing").addClass("toolbarButtonPressed");
				}
				else {
					$(self.target).parent().find(".designStatusContainer").find(".lineDrawing").removeClass("toolbarButtonPressed");
					$(self.target).parent().find(".designStatusContainer").find(".squareDrawing").removeClass("toolbarButtonPressed");
				}
				
				
				
				
				
				
				//Objects
				$(self.objects).each(function (i) {
					

					
					
					if (this.properties.selectedNode == "body") {
						self.prevX = x;
						self.prevY = y;					
					}
					
					if (this.shape) {
						this.shape.move(x, y, x+1, y+1);
					}
					
					if (this.type == "line") {
					
						//sx, sy : Line Start Position,
						//ex, ey : Line End Position
						var sx=0, sy=0, ex=0, ey=0;
						
						if ($(this)[0].properties.sx) {
							sx = parseInt($(this)[0].properties.sx);
						}
						
						if ($(this)[0].properties.sy) {
							sy = parseInt($(this)[0].properties.sy);	
						}
			
						if ($(this)[0].properties.ex) {
							ex = parseInt($(this)[0].properties.ex);
						}
			
						if ($(this)[0].properties.ey) {					
							ey = parseInt($(this)[0].properties.ey);
						}
						
						if ( ( (sx - 5 <= x && x <= ex + 5) || (ex - 5 <= x && x <= sx + 5) ) && ( (sy - 5 <= y && y <= ey + 5) || (ey - 5 <= y && y <= sy + 5) ) ) {
						
							//Calculate the constant for Line Function : y = ax + b
							var a;
							var b1, b2;
							var c = 5;
							
							if ( $(this)[0].properties.ex - $(this)[0].properties.sx != 0) {
								a = ($(this)[0].properties.ey - $(this)[0].properties.sy) / ($(this)[0].properties.ex - $(this)[0].properties.sx);
								
								c = Math.round(5 * Math.sqrt(a * a + 1) * 1000)/1000; // +- 5px
								
								b1 = $(this)[0].properties.sy - a * $(this)[0].properties.sx - c;
								b2 = $(this)[0].properties.sy - a * $(this)[0].properties.sx + c;
								
								
								if ( Math.round((Math.abs(a)*1000))/1000 < 0.01 || Math.round((Math.abs(1/a)*1000))/1000 < 0.01 ) {
									self.selectItem(i);
									
									selectSomething = true;
									//return false; //exit the each function, because the cursor status can be changed by the other object	
								}
								else {
									//if a mouse cursor is in line selection coverage,
									if (a * x + b1 <= y && y <= a * x + b2 && (((y - b1) / a <= x && x <=  (y - b2) / a) || ((y - b2) / a <= x && x <=  (y - b1) / a))) {
										self.selectItem(i);
										
										selectSomething = true;
										//return false; //exit the each function, because the cursor status can be changed by the other object		
									}
									else {
										//self.deselectItem(i);										
									}
								}
							}
							else {
								self.selectItem(i);								
								
								selectSomething = true;	
								//return false; //exit the each function, because the cursor status can be changed by the other object
							}
						}
						else {
							//self.deselectItem(i);
						}	
					}
					else if (this.type == "square") {
					
						//sx, sy : Line Start Position,
						//ex, ey : Line End Position
						var sx=0, sy=0, ex=0, ey=0;
						
						if ($(this)[0].properties.sx) {
							sx = parseInt($(this)[0].properties.sx);
						}
						
						if ($(this)[0].properties.sy) {
							sy = parseInt($(this)[0].properties.sy);	
						}
			
						if ($(this)[0].properties.ex) {
							ex = parseInt($(this)[0].properties.ex);
						}
			
						if ($(this)[0].properties.ey) {					
							ey = parseInt($(this)[0].properties.ey);
						}
						
						if ( ( (sx - 5 <= x && x <= ex + 5) || (ex - 5 <= x && x <= sx + 5) ) && ( (sy - 5 <= y && y <= ey + 5) || (ey - 5 <= y && y <= sy + 5) ) ) {
							self.selectItem(i);
							
							selectSomething = true;	
							//return false; //exit the each function, because the cursor status can be changed by the other object		
						}
						else {
							//self.deselectItem(i);							
						}
					}
				});	
				


				
				if (!selectSomething) {
					self.deselect();
					self.objectManager.unset();
				}
			
				self.draw();
				
				self.contextMenu.blur();
				

			}
			
		});
		
		//Mouse Move Event in Canvas
		$(target).find(".canvas").find("canvas").mousemove(function (e) {
			
			//Calculate the position (x, y) in Canvas Axis
			var parentOffset = $(this).parent().offset(); 	
			var x = Math.floor(e.pageX - parentOffset.left);
			var y = Math.floor(e.pageY - parentOffset.top);
			
			//Print the current position (x, y) to right bottom space of parent window. (window footer)
			$(target).parent().parent().parent().find(".ft").find(".mousePositionView").html("(" + x + ", " + y + ")");
			
			
			//Selection Layer
			if ($(self.target).find(".canvas").find(".grid").find(".selection")) {
				//Set the end position for selection layer
				self.ex = x;
				self.ey = y;
				
				if(self.ex - self.sx < 0) {
					$(self.target).find(".canvas").find(".grid").find(".selection").css("left", self.ex);
				}
				else {
					$(self.target).find(".canvas").find(".grid").find(".selection").css("left", self.sx);
				}
				
				if(self.ey - self.sy < 0) {
					$(self.target).find(".canvas").find(".grid").find(".selection").css("top", self.ey);
				}
				else {
					$(self.target).find(".canvas").find(".grid").find(".selection").css("top", self.sy);
				}
				
				$(self.target).find(".canvas").find(".grid").find(".selection").width(Math.abs(self.ex - self.sx)-4);
				$(self.target).find(".canvas").find(".grid").find(".selection").height(Math.abs(self.ey - self.sy)-4);
				
				$(self.target).find(".canvas").find(".grid").find(".selection").show();
			}
			
			
			
			
			self.hoveredIndex = null; //Canvas has no hovered object
							
			//If user has selected the line drawing tool, keep the cursor is crosshair, unless, chanage the cursor is default
			if (!(($(self.target).find(".canvas").hasClass("statusDrawingLine")) || ($(self.target).find(".canvas").hasClass("statusDrawingSquare")))) {
				self.changeStatus("statusDefault");
			}
			
			
			//Set Status with Drawing Mode
			if($(self.target).find(".canvas").hasClass("statusDrawingLine")) {			
				$(self.target).parent().find(".designStatusContainer").find(".lineDrawing").addClass("toolbarButtonPressed");
			}
			//If square mode
			else if($(self.target).find(".canvas").hasClass("statusDrawingSquare")) {
				$(self.target).parent().find(".designStatusContainer").find(".squareDrawing").addClass("toolbarButtonPressed");
			}
			else {
				$(self.target).parent().find(".designStatusContainer").find(".lineDrawing").removeClass("toolbarButtonPressed");
				$(self.target).parent().find(".designStatusContainer").find(".squareDrawing").removeClass("toolbarButtonPressed");
			}
			
			//Objects
			$(self.objects).each(function (i) {
				
				//Set grouply moving after selecting with making area
				//if ($.inArray(i, self.selectedIndex) > -1) {
					//this.properties.selectedNode = "body";
					//this.properties.isDrag = true;
				//}
				
				
				if (this.shape && this.properties.isDrag && !this.properties.isDrawFinished) {
					if(!self.isModifying && self.isAdding<0) {
						delete self.copiedObjectUndo;
						self.copiedObjectsUndo = $.makeArray();
						
						$(self.selectedIndex).each(function (i) {
							var properties = new Object();
							properties.sx = self.objects[this].properties.sx;
							properties.sy = self.objects[this].properties.sy;
							properties.ex = self.objects[this].properties.ex;
							properties.ey = self.objects[this].properties.ey;

							self.copiedObjectsUndo[this]=properties;
						});
						
						self.isModifying = true;
					}
					this.shape.show();
				}
				
			
				if (this.properties.selectedNode == "body" && this.properties.isDrag) {
					self.move(i, x - this.properties.prevX, y - this.properties.prevY);
					
					var obj = this;
					
					$(self.selectedIndex).each(function (j) {
						if(i != this) {
							self.objects[this].properties.sx += x - obj.properties.prevX;
							self.objects[this].properties.sy += y - obj.properties.prevY;
							self.objects[this].properties.ex += x - obj.properties.prevX;
							self.objects[this].properties.ey += y - obj.properties.prevY;					
						}
					});
				}
				
				
			
				if (this.type == "line") {
					//sx, sy : Start Position,
					//ex, ey : End Position
					var sx=0, sy=0, ex=0, ey=0;
							
					if ($(this)[0].properties.sx) {
						sx = parseInt($(this)[0].properties.sx);
					}
					
					if ($(this)[0].properties.sy) {
						sy = parseInt($(this)[0].properties.sy);	
					}
		
					if ($(this)[0].properties.ex) {
						ex = parseInt($(this)[0].properties.ex);
					}
		
					if ($(this)[0].properties.ey) {					
						ey = parseInt($(this)[0].properties.ey);
					}
					
					if  ( ( (sx - 5 <= x && x <= ex + 5) || (ex - 5 <= x && x <= sx + 5) ) && ( (sy - 5 <= y && y <= ey + 5) || (ey - 5 <= y && y <= sy + 5) ) ) {
					
						//Calculate the constant for Line Function : y = ax + b
						var a;
						var b1, b2;
						var c = 5;
						
						if ( $(this)[0].properties.ex - $(this)[0].properties.sx != 0) {

							a = ($(this)[0].properties.ey - $(this)[0].properties.sy) / ($(this)[0].properties.ex - $(this)[0].properties.sx);
							
							c = Math.round(5 * Math.sqrt(a * a + 1) * 1000)/1000; // +- 5px
							
							b1 = $(this)[0].properties.sy - a * $(this)[0].properties.sx - c;
							b2 = $(this)[0].properties.sy - a * $(this)[0].properties.sx + c;
							
							
							if ( Math.round((Math.abs(a)*1000))/1000 < 0.01 ||  Math.round((Math.abs(1/a)*1000))/1000 < 0.01) {
								self.hoverItem(i);	
								
								//return false; //exit the each function, because the cursor status can be changed by the other object
							}
							else {
								//if a mouse cursor is in line selection coverage,
								if (a * x + b1  <= y && y <= a * x + b2 && (((y - b1) / a <= x && x <=  (y - b2) / a) || ((y - b2) / a <= x && x <=  (y - b1) / a))) {
									self.hoverItem(i);
									
									//return false; //exit the each function, because the cursor status can be changed by the other object
								}
							}
						}
						else {
							self.hoverItem(i);	
							
							//return false; //exit the each function, because the cursor status can be changed by the other object
						}
						
						
					}
					
					//Connection between Line and Square Objects
					if (this.properties.selectedNode == "head" && this.properties.isDrag) {
						var currentObject = this;
						
						//Objects
						$(self.objects).each(function (i) {
							if (this.type == "square") {
								if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
									
									currentObject.properties.sx = this.properties.sx;
									currentObject.properties.sy = this.properties.sy;

									//return false;
								}
								else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
									
									currentObject.properties.sx = Math.round((this.properties.sx + this.properties.ex)/2);
									currentObject.properties.sy = this.properties.sy;
									
									//return false;
								}
								else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
									
									currentObject.properties.sx = this.properties.ex;
									currentObject.properties.sy = this.properties.sy;
									
									//return false;
								}
								else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
									
									currentObject.properties.sx = this.properties.ex;
									currentObject.properties.sy = Math.round((this.properties.sy + this.properties.ey)/2);
									
									//return false;
								}
								else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
									
									currentObject.properties.sx = this.properties.ex;
									currentObject.properties.sy = this.properties.ey;
									
									//return false;
								}
								else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
									
									currentObject.properties.sx = Math.round((this.properties.sx + this.properties.ex)/2);
									currentObject.properties.sy = this.properties.ey;
									
									//return false;
								}
								else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
									
									currentObject.properties.sx = this.properties.sx;
									currentObject.properties.sy = this.properties.ey;
									
									//return false;
								}
								else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
									
									currentObject.properties.sx = this.properties.sx;
									currentObject.properties.sy = Math.round((this.properties.sy + this.properties.ey)/2);
									
									//return false;
								}
							}
						});
					}
					else if (this.properties.selectedNode == "tail" && this.properties.isDrag) {
						var currentObject = this;
						
						//Objects
						$(self.objects).each(function (i) {
							if (this.type == "square") {
								if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
									
									currentObject.properties.ex = this.properties.sx;
									currentObject.properties.ey = this.properties.sy;
									
									//return false;
								}
								else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
									
									currentObject.properties.ex = Math.round((this.properties.sx + this.properties.ex)/2);
									currentObject.properties.ey = this.properties.sy;
									
									//return false;
								}
								else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
									
									currentObject.properties.ex = this.properties.ex;
									currentObject.properties.ey = this.properties.sy;
									
									//return false;
								}
								else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
									
									currentObject.properties.ex = this.properties.ex;
									currentObject.properties.ey = Math.round((this.properties.sy + this.properties.ey)/2);
									
									//return false;
								}
								else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
									
									currentObject.properties.ex = this.properties.ex;
									currentObject.properties.ey = this.properties.ey;
									
									//return false;
								}
								else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
									
									currentObject.properties.ex = Math.round((this.properties.sx + this.properties.ex)/2);
									currentObject.properties.ey = this.properties.ey;
									
									//return false;
								}
								else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
									
									currentObject.properties.ex = this.properties.sx;
									currentObject.properties.ey = this.properties.ey;
									
									//return false;
								}
								else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
									
									currentObject.properties.ex = this.properties.sx;
									currentObject.properties.ey = Math.round((this.properties.sy + this.properties.ey)/2);
									
									//return false;
								}
							}
						});
					}
				}
				else if (this.type == "square") {
					
					//sx, sy : Line Start Position,
					//ex, ey : Line End Position
					var sx=0, sy=0, ex=0, ey=0;
					
					if ($(this)[0].properties.sx) {
						sx = parseInt($(this)[0].properties.sx);
					}
					
					if ($(this)[0].properties.sy) {
						sy = parseInt($(this)[0].properties.sy);	
					}
		
					if ($(this)[0].properties.ex) {
						ex = parseInt($(this)[0].properties.ex);
					}
		
					if ($(this)[0].properties.ey) {					
						ey = parseInt($(this)[0].properties.ey);
					}
					
					if ( ( (sx - 5 <= x && x <= ex + 5) || (ex - 5 <= x && x <= sx + 5) ) && ( (sy - 5 <= y && y <= ey + 5) || (ey - 5 <= y && y <= sy + 5) ) ) {
	
						self.hoverItem(i);	
						
						//return false; //exit the each function, because the cursor status can be changed by the other object	
					}

				}
			});
			
			
			
			//Occuring mouse move event, draw the canvas
			self.draw();						
		});
		
		//Set Mouse Up Event in Canvas
		$(target).find(".canvas").find("canvas").mouseup(function (e) {
			
			self.isDrawing = false;
			
			//Calculate the position (x, y) in Canvas Axis
			var parentOffset = $(this).parent().offset(); 	
			var x = Math.floor(e.pageX - parentOffset.left);
			var y = Math.floor(e.pageY - parentOffset.top);

			
			if (e.which == 1) {
				
				//Selection Layer
				if(!($(self.target).find(".canvas").hasClass("statusDrawingLine")) && 
					!($(self.target).find(".canvas").hasClass("statusDrawingSquare")) &&
					!($(self.target).find(".canvas").hasClass("statusMove")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeTopLeft")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeTopRight")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeBottomLeft")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeBottomRight")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeTop")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeBottom")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeLeft")) &&
					!($(self.target).find(".canvas").hasClass("statusResizeRight")) &&
					!self.isDrawing ) {
					
					if ($(self.target).find(".canvas").find(".grid").find(".selection") &&
						($(self.target).find(".canvas").find(".grid").find(".selection").width() >= 5 || 
						$(self.target).find(".canvas").find(".grid").find(".selection").height() >= 5) ) {
						self.select();
					}
					
					$(self.target).find(".canvas").find(".grid").find(".selection").remove();
						
					
					
					self.sx = 0;
					self.sy = 0;
					self.ex = 0;
					self.ey = 0;
				}
				else if (self.isAdding>-1) {
					var properties = new Object();
					properties.sx = self.objects[self.isAdding].properties.sx;
					properties.sy = self.objects[self.isAdding].properties.sy;
					properties.ex = self.objects[self.isAdding].properties.ex;
					properties.ey = self.objects[self.isAdding].properties.ey;
					
					//Register the undo function
					self.undoManager.register(
						self, self.remove, [self.objects.length-1], 'Remove Item',
						self, self.add, [self.objects[self.isAdding].type, self.objects[self.isAdding].shapeName, self.objects[self.isAdding].option, properties], 'Create Item'
					);
					self.isAdding = -1;
				}

				
				if (Math.abs(x - self.prevX) < 2 && Math.abs(y - self.prevY) < 2) {
					self.deselect();
					self.objectManager.unset();
					
					if (self.hoveredIndex >= 0) {
						self.selectItem(self.hoveredIndex);
					}
				}

				//Set Status with Drawing Mode
				if($(self.target).find(".canvas").hasClass("statusDrawingLine")) {			
					$(self.target).parent().find(".designStatusContainer").find(".lineDrawing").addClass("toolbarButtonPressed");
				}
				//If square mode
				else if($(self.target).find(".canvas").hasClass("statusDrawingSquare")) {
					$(self.target).parent().find(".designStatusContainer").find(".squareDrawing").addClass("toolbarButtonPressed");
				}
				else {
					$(self.target).parent().find(".designStatusContainer").find(".lineDrawing").removeClass("toolbarButtonPressed");
					$(self.target).parent().find(".designStatusContainer").find(".squareDrawing").removeClass("toolbarButtonPressed");
				}
				
				//Objects
				$(self.objects).each(function (i) {

					if (this.type == "line") {

						//Connection between Line and Square Objects
						if (this.properties.selectedNode == "head") {
							var currentObject = this;
							
							//Objects
							$(self.objects).each(function (j) {
								if (this.type == "square") {
									if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
					
										currentObject.properties.connector['head'] = j;
										this.properties.connector['tl'] = i;
										
										currentObject.properties.sx = this.properties.sx;
										currentObject.properties.sy = this.properties.sy;
										//return false;
									}
									else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['t'] = i;
										
										currentObject.properties.sx = Math.round((this.properties.sx + this.properties.ex)/2);
										currentObject.properties.sy = this.properties.sy;
										
										//return false;
									}
									else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['tr'] = i;
										
										currentObject.properties.sx = this.properties.ex;
										currentObject.properties.sy = this.properties.sy;
									
										//return false;
									}
									else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['r'] = i;
										
										currentObject.properties.sx = this.properties.ex;
										currentObject.properties.sy = Math.round((this.properties.sy + this.properties.ey)/2);
										
										//return false;
									}
									else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['br'] = i;
										
										currentObject.properties.sx = this.properties.ex;
										currentObject.properties.sy = this.properties.ey;
										
										//return false;
									}
									else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['b'] = i;
										
										currentObject.properties.sx = Math.round((this.properties.sx + this.properties.ex)/2);
										currentObject.properties.sy = this.properties.ey;
										
										//return false;
									}
									else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['bl'] = i;
										
										currentObject.properties.sx = this.properties.sx;
										currentObject.properties.sy = this.properties.ey;
										
										//return false;
									}
									else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
										
										currentObject.properties.connector['head'] = j;
										this.properties.connector['l'] = i;
										
										currentObject.properties.sx = this.properties.sx;
										currentObject.properties.sy = Math.round((this.properties.sy + this.properties.ey)/2);
										
										//return false;
									}
	
								}
							});
						}
						else if (this.properties.selectedNode == "tail") {
							var currentObject = this;
							
							//Objects
							$(self.objects).each(function (j) {
								if (this.type == "square") {
									if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['tl'] = i;
										
										currentObject.properties.ex = this.properties.sx;
										currentObject.properties.ey = this.properties.sy;
										
										//return false;
									}
									else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['t'] = i;
										
										currentObject.properties.ex = Math.round((this.properties.sx + this.properties.ex)/2);
										currentObject.properties.ey = this.properties.sy;
										
										//return false;
									}
									else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.sy - 10 <= y && y <= this.properties.sy + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['tr'] = i;
										
										currentObject.properties.ex = this.properties.ex;
										currentObject.properties.ey = this.properties.sy;
									
										//return false;
									}
									else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['r'] = i;
										
										currentObject.properties.ex = this.properties.ex;
										currentObject.properties.ey = Math.round((this.properties.sy + this.properties.ey)/2);										
										
										//return false;
									}
									else if (this.properties.ex - 10 <= x && x <= this.properties.ex + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['br'] = i;
										
										currentObject.properties.ex = this.properties.ex;
										currentObject.properties.ey = this.properties.ey;
										
										//return false;
									}
									else if ((this.properties.sx + this.properties.ex)/2 - 10 <= x && x <= (this.properties.sx + this.properties.ex)/2 + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['b'] = i;
										
										currentObject.properties.ex = Math.round((this.properties.sx + this.properties.ex)/2);
										currentObject.properties.ey = this.properties.ey;										
										
										//return false;
									}
									else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && this.properties.ey - 10 <= y && y <= this.properties.ey + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['bl'] = i;
										
										currentObject.properties.ex = this.properties.sx;
										currentObject.properties.ey = this.properties.ey;
										
										//return false;
									}
									else if (this.properties.sx - 10 <= x && x <= this.properties.sx + 10 && (this.properties.sy + this.properties.ey)/2 - 10 <= y && y <= (this.properties.sy + this.properties.ey)/2 + 10) {
										
										currentObject.properties.connector['tail'] = j;
										this.properties.connector['l'] = i;
										
										currentObject.properties.ex = this.properties.sx;
										currentObject.properties.ey = Math.round((this.properties.sy + this.properties.ey)/2);
										
										//return false;
									}


								}
								
								
							});
						}
						else if (this.properties.selectedNode == "body") {
							var currentObject = this;
							
							currentObject.properties.connector['head'] = null;
							currentObject.properties.connector['tail'] = null;
							
							$(self.objects).each(function (j) {
								if (this.type == "square") {
									if (this.properties.connector['tl'] == i) {
										this.properties.connector['tl'] = null;
									}
									else if (this.properties.connector['t'] == i) {
										this.properties.connector['t'] = null;
									}
									else if (this.properties.connector['tr'] == i) {
										this.properties.connector['tr'] = null;
									}
									else if (this.properties.connector['r'] == i) {
										this.properties.connector['r'] = null;
									}
									else if (this.properties.connector['br'] == i) {
										this.properties.connector['br'] = null;
									}
									else if (this.properties.connector['b'] == i) {
										this.properties.connector['b'] = null;
									}
									else if (this.properties.connector['bl'] == i) {
										this.properties.connector['bl'] = null;
									}
									else if (this.properties.connector['l'] == i) {
										this.properties.connector['l'] = null;
									}
								}
							});
						}
						self.objectManager.set(this);
					}
					
				});
				
				// register undoManager in modify
				if(self.isModifying) {
					delete self.copiedObjectsRedo;
					self.copiedObjectsRedo = $.makeArray();
					
					$(self.selectedIndex).each(function (i) {
						console.log("index : "+this+"  //  time : "+i);
						console.log(self.objects[this]);
						var properties = new Object();
						properties.sx = self.objects[this].properties.sx;
						properties.sy = self.objects[this].properties.sy;
						properties.ex = self.objects[this].properties.ex;
						properties.ey = self.objects[this].properties.ey;

						self.copiedObjectsRedo[this]=properties;
					});
					
					self.undoManager.register(
						self, self.setProperties2, [self.selectedIndex, self.copiedObjectsUndo], 'Undo Item',
						self, self.setProperties2, [self.selectedIndex, self.copiedObjectsRedo], 'Redo Item'
					);
					
					self.isModifying = false;
				}

				self.draw();
				
				//self.deselect();
				//self.objectManager.unset();
			}
			
			this.focus = -1;
			

		});
		
		/*
		
		$(target).find(".canvas").click(function (e) {
			var parentOffset = $(this).parent().offset(); 
			var x = Math.floor(e.pageX - parentOffset.left);
			var y = Math.floor(e.pageY - parentOffset.top);	
			
			if (e.which == 1) {
				$(self.objects).each(function (i) {
				
					if (this.type == "square") {
						var sx=0, sy=0, ex=0, ey=0;
							
						if ($(this)[0].properties.sx) {
							sx = parseInt($(this)[0].properties.sx);
						}
						
						if ($(this)[0].properties.sy) {
							sy = parseInt($(this)[0].properties.sy);	
						}
			
						if ($(this)[0].properties.ex) {
							ex = parseInt($(this)[0].properties.ex);
						}
			
						if ($(this)[0].properties.ey) {					
							ey = parseInt($(this)[0].properties.ey);
						}
						
						if ( ( (sx <= x && x <= ex) || (ex <= x && x <= sx) ) && ( (sy <= y && y <= ey) || (ey <= y && y <= sy) ) ) {
							self.objectManager.set(this);
							
							return false;
						}
					}
				});
			}
		});
		
		*/
		
		// NullA must fix the bug
		this.preview.setSize();
		this.preview.setup();
	},
	
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method setCollaborationOn 
	 **/
	setCollaborationOn: function () {
		this.isCollaborationOn = true;
		
		this.collaboration = new org.uizard.core.collaboration.design();
		this.collaboration.init(this);
		this.collaboration.startListening();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method setCollaborationOff 
	 **/
	setCollaborationOff: function () {
		this.isCollaborationOn = false;
		
		if(this.collaboration) {
			this.collaboration.stopListening();
			this.collaboration = null;
			delete this.collaboration;
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method setSize 
	 * @param {String} width The width to be set.
	 * @param {String} height The height to be set.
	 **/
	setSize: function (width, height) {
		//Set width, height properties
		this.width = parseInt(width);
		this.height = parseInt(height);
		
		//Set Canvas Layer Style for aligning center
		$(this.target).find(".canvas").width(this.width);
		$(this.target).find(".canvas").height(this.height);	
		$(this.target).find(".canvas").css("margin-left", 0 - (this.width/2));	
		$(this.target).find(".canvas").css("margin-top", 0 - (this.height/2));	
		
		//Set Canvas Element Style
		$(this.target).find(".canvas").find(".shapes").css("position", "absolute");
		$(this.target).find(".canvas").find(".shapes").css("left", 0);
		$(this.target).find(".canvas").find(".shapes").css("top", 0);
		
		//Set Canvas Element Style
		$(this.target).find(".canvas").find("canvas").css("position", "absolute");
		$(this.target).find(".canvas").find("canvas").css("left", 0);
		$(this.target).find(".canvas").find("canvas").css("top", 0);
		$(this.target).find(".canvas").find("canvas").css("width", this.width);
		$(this.target).find(".canvas").find("canvas").css("height", this.height);
		$(this.target).find(".canvas").find("canvas").attr("width", this.width);
		$(this.target).find(".canvas").find("canvas").attr("height", this.height);			
		
		//Set Canvas Space Style : default margin is 50 (90 = 50 x 2 - 10)
		$(this.target).find(".space").width(this.width + 90);
		$(this.target).find(".space").height(this.height + 100);	

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method setSkin 
	 * @param {String} width The width to be set.
	 * @param {String} height The height to be set.
	 **/
	setSkin: function (imgsrc, width, height) {
		//Set width, height properties
		this.skinWidth = parseInt(width);
		this.skinHeight = parseInt(height);
		
		//Set Canvas Layer Style for aligning center
		$(this.target).find(".skin").width(this.skinWidth);
		$(this.target).find(".skin").height(this.skinHeight);	

		$(this.target).find(".skin").css("margin-left", 0 - (this.skinWidth/2));	
		$(this.target).find(".skin").css("margin-top", 0 - (this.skinHeight/2));	
		$(this.target).find(".skin").css("background-image", "url(" + imgsrc + ")");
		
		//Set Canvas Space Style : default margin is 50 (90 = 50 x 2 - 10)
		$(this.target).find(".space").width(this.skinWidth + 90);
		$(this.target).find(".space").height(this.skinHeight + 100);	

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method add 
	 * @param {String} type The type of the object to be added.
	 * @param {String} shape The shape of the object to be added.
	 **/
	add: function (type, shape, option, properties) {
		var self = this;

		if (!self.isDrawing) {
			
			self.isDrawing = true;
			
			//Add the object
			self.objects.push(new org.uizard.core.object.ui().init($(self.target).find(".canvas"), self, type, shape, option));
			self.isAdding = self.objects.length-1;

			if(properties) {
				self.objects[self.objects.length-1].properties.sx = properties.sx;
				self.objects[self.objects.length-1].properties.sy = properties.sy;
				self.objects[self.objects.length-1].properties.ex = properties.ex;
				self.objects[self.objects.length-1].properties.ey = properties.ey;
				
				self.objects[self.objects.length-1].properties.isDrawFinished = true;
				
				self.isDrawing = false;
				self.isAdding = -1;
				self.objects[self.objects.length-1].shape.show();
				self.draw();
			}


			//Refresh the Object Explorer (for Testing)
			self.objectExplorer.refresh();
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method select 
	 **/
	select: function () {
		var self = this;
		
		//All objects
		$(this.objects).each(function (i) {
			var sx=0, sy=0;
			
			this.selected = false;
					
			if ($(this)[0].properties.sx) {
				sx = parseInt($(this)[0].properties.sx);
			}
			
			if ($(this)[0].properties.sy) {
				sy = parseInt($(this)[0].properties.sy);	
			}


			
			if ( ( (self.sx <= sx && sx <= self.ex) || (self.ex <= sx && sx <= self.sx) ) && ( (self.sy <= sy && sy <= self.ey) || (self.ey <= sy && sy <= self.sy) ) ) {
				var ex=0, ey=0;
					
				if ($(this)[0].properties.ex) {
					ex = parseInt($(this)[0].properties.ex);
				}
	
				if ($(this)[0].properties.ey) {					
					ey = parseInt($(this)[0].properties.ey);
				}
				
			
				if( ( (self.sx <= ex && ex <= self.ex) || (self.ex <= ex && ex <= self.sx) ) && ( (self.sy <= ey && ey <= self.ey) || (self.ey <= ey && ey <= self.sy) ) ) {
					self.selectedIndex.push(i);
					/*
					if($(this)[0].type == 'square') {
						//is selected?
						if($.inArray(i, $(self.selectedIndex)) >= 0) {
							$(this)[0].select();
						}
					}
					*/
					
					this.selected = true;
					
/*
					$("#objectExplorer").find(".objectInformation").each(function (k) {
						
						
						if(k == i) {
							$(this).addClass("highlighted");
						}
					});
*/
					self.objectExplorer.highlight(i);
					
					self.objectManager.set(this);
				}
			}
		});

		
		$(".designerMessage").html("Focus Index: " + this.focus + " / selectedIndex: " + this.selectedIndex);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method deselect 
	 **/
	deselect: function () {
		var self = this;

		//All objects
		/*
		$(this.objects).each(function (i) {
			if($(this)[0].type == 'square') {
				//is selected?
				if($.inArray(i, $(self.selectedIndex)) >= 0) {
					$(this)[0].deselect();
				}
			}
		});
		*/
		
		
		$(this.objects).each(function (i) {			
			self.selectedIndex.pop();	
		});
	
		$("#objectExplorer").find(".highlighted").each(function(i) {
			$(this).removeClass("highlighted");
		});

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method unfocusAll 
	 **/
	unfocusAll: function () {
		var self = this;
		
		this.focus = -1;
		
		$(this.objects).each(function (i) {			
			this.properties.focus = false;	
		});
	},
		
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method resize 
	 **/
	resize: function () {
					
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method draw 
	 **/
	draw: function () {
		var self = this;
		
		
		this.selectedIndex = $.unique(this.selectedIndex);
		
		
		//Canvas Element (Supported in HTML5)
		if($(this.target).find(".canvas").find("canvas")[0].getContext) {
			//Get Context
			var context = $(this.target).find(".canvas").find("canvas")[0].getContext('2d');
			
			//Clear the canvas
			context.clearRect (0, 0, $(this.target).find(".canvas").find("canvas").width(), $(this.target).find(".canvas").find("canvas").height());	
			
			//All objects
			$(this.objects).each(function (i) {
				
				if (this.properties.timestamp == null) {
					var a = self.objects.slice(0, i);
					var b = self.objects.slice(i, self.objects.length);
					
					b.shift();
					self.objects = a.concat(b);
					//self.objects.pop(i);					
				}
				
				if (self.snapToGrid) {
					this.properties.sx = parseInt(Math.round(this.properties.sx/10)) * 10;
					this.properties.sy = parseInt(Math.round(this.properties.sy/10)) * 10;
					this.properties.ex = parseInt(Math.round(this.properties.ex/10)) * 10;
					this.properties.ey = parseInt(Math.round(this.properties.ey/10)) * 10;												
				}
				
				//if the object is line type
				if($(this)[0].type == 'line') {
					
					var sx=0, sy=0, ex=0, ey=0;
					
					if ($(this)[0].properties.sx) {
						sx = parseInt($(this)[0].properties.sx);
					}
					
					if ($(this)[0].properties.sy) {
						sy = parseInt($(this)[0].properties.sy);	
					}
	
					if ($(this)[0].properties.ex) {
						ex = parseInt($(this)[0].properties.ex);
					}

					if ($(this)[0].properties.ey) {					
						ey = parseInt($(this)[0].properties.ey);
					}
					

					
					//is hovered?
					if(self.hoveredIndex == i) {
						context.beginPath();
						context.strokeStyle = "#FFFF00";
						
						context.moveTo(sx, sy);
						context.lineTo(ex, ey);
						context.lineWidth = parseFloat($(this)[0].properties.thickness) + 5;
						context.stroke();
					}
					
					
					//drawing the object
					context.beginPath();
					context.strokeStyle = "#000000";
					
					
					
					
					if (this.properties.dashed) {
						var dashArray=[5, 4];
						var dashCount = dashArray.length;
						
						var dx, dy;
						
						var dashIndex=0, draw=true;
						
						var x, y;
						
						if (ex < sx) {
							x = ex;
							y = ey;
						}
						else {
							x = sx;
							y = sy;
						}
						
						dx = (ex-sx);
						dy = (ey-sy);
						context.moveTo(x, y);
						context.lineWidth = parseFloat($(this)[0].properties.thickness);
						
						var slope = dy/dx;
						var distRemaining = Math.sqrt( dx*dx + dy*dy );
						
						while (distRemaining>=0.1){
							var dashLength = dashArray[dashIndex++%dashCount];
							
							if (dashLength > distRemaining) 
								dashLength = distRemaining;
								
						  	var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
							
						  	x += xStep
						  	y += slope*xStep;
							
						  	context[draw ? 'lineTo' : 'moveTo'](x,y);
						
						  	distRemaining -= dashLength;
						  	draw = !draw;
						}
						
						context.stroke();
					}
					else {	
						context.moveTo(sx, sy);
						context.lineTo(ex, ey);
						context.lineWidth = parseFloat($(this)[0].properties.thickness);
						context.stroke();
					}


					
					//is selected? or hovered?
					if($.inArray(i, self.selectedIndex) >= 0 || self.selected) {
						context.beginPath();
						context.strokeStyle = "#666666";
						
						context.rect(sx- 3, sy - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						
						context.fillStyle = "#FFFFFF";
						context.fill();
						
						context.beginPath();
						context.strokeStyle = "#666666";
						
						context.rect(ex- 3, ey - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						
						context.fillStyle = "#FFFFFF";
						context.fill();
					}
					
					if (this.shape) {
											
						if (this.shape.rotate) {
							this.shape.rotate(this.properties.sx, this.properties.sy, this.properties.ex, this.properties.ey);
						}
					
					}					
				}
				else if($(this)[0].type == 'square') { //if the object is line type
					
					var sx=0, sy=0, ex=0, ey=0;
					
					if ($(this)[0].properties.sx) {
						sx = parseInt($(this)[0].properties.sx);
					}
					
					if ($(this)[0].properties.sy) {
						sy = parseInt($(this)[0].properties.sy);	
					}
	
					if ($(this)[0].properties.ex) {
						ex = parseInt($(this)[0].properties.ex);
					}

					if ($(this)[0].properties.ey) {					
						ey = parseInt($(this)[0].properties.ey);
					}
					
					//is hovered?
					if(self.hoveredIndex == i) {
						context.beginPath();
						context.strokeStyle = "#FFFF00";
						
						context.rect(sx, sy, ex-sx, ey-sy);
						context.lineWidth = 5;
						context.closePath();
						
						context.stroke();
						
						context.beginPath();
						context.strokeStyle = "#000000";
						context.fillStyle = "#FFFFFF";
						
						context.rect(sx, sy, ex-sx, ey-sy);
						context.lineWidth = 0.5;
						context.closePath();
						
						context.stroke();
					}
										
					//drawing the object
					/*
					context.beginPath();
					context.strokeStyle = "#000000";
					context.fillStyle = "#FFFFFF";
					
					context.rect(sx, sy, ex-sx, ey-sy);
					context.lineWidth = 0.5;
					context.closePath();
					
					context.stroke();
					context.fill();
					*/
					

					
					//is selected?
					if($.inArray(i, self.selectedIndex) >= 0 || self.selected) {
						context.beginPath();
						context.strokeStyle = "#666666";
						context.fillStyle = "#FFFFFF";
						
						context.rect(sx- 3, sy - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect(ex- 3, sy - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect(ex- 3, ey - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect(sx- 3, ey - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect( (sx+ex)/2 - 3, ey - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect( (sx+ex)/2 - 3, sy - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect(ex- 3, (sy+ey)/2 - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
						
						context.rect(sx- 3, (sy+ey)/2 - 3, 6, 6);
						context.closePath();
						context.lineWidth = 1;
						context.stroke();
						context.fill();
					}
					
					
					if (this.shape) {
											
						if (this.shape.move) {
							this.shape.move(this.properties.sx, this.properties.sy, this.properties.ex, this.properties.ey);
							this.shape.setShape();
						}
					
					}
				}
			});
		}
		this.preview.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method setCursor 
	 **/	
	setCursor: function (cursorType) {
		//Set the cursor in cavas layer
		$(this.target).find(".canvas").css("cursor", cursorType);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method setDrawingMode 
	 * @param {String} mode The drawing mode to be set.
	 **/
	setDrawingMode: function (mode) {
		//Remove all status
		$(this.target).find(".canvas").removeClass("statusDefault");
		$(this.target).find(".canvas").removeClass("statusDrawingLine");
		$(this.target).find(".canvas").removeClass("statusDrawingSquare");
		$(this.target).find(".canvas").removeClass("statusMove");
		
		$(this.target).find(".canvas").removeClass("statusResizeTopLeft");
		$(this.target).find(".canvas").removeClass("statusResizeTopRight");
		$(this.target).find(".canvas").removeClass("statusResizeBottomLeft");
		$(this.target).find(".canvas").removeClass("statusResizeBottomRight");
		$(this.target).find(".canvas").removeClass("statusResizeTop");
		$(this.target).find(".canvas").removeClass("statusResizeBottom");
		$(this.target).find(".canvas").removeClass("statusResizeLeft");
		$(this.target).find(".canvas").removeClass("statusResizeRight");
		
		
		$(this.target).parent().find(".designStatusContainer").find(".lineDrawing").removeClass("toolbarButtonPressed");
		$(this.target).parent().find(".designStatusContainer").find(".squareDrawing").removeClass("toolbarButtonPressed");
		
		//If line mode
		if(mode == "line") {			
			$(this.target).find(".canvas").addClass("statusDrawingLine");

		}
		//If square mode
		else if(mode == "square") {
			$(this.target).find(".canvas").addClass("statusDrawingSquare");

		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method changeStatus 
	 * @param {String} className The name of class to be changed its status.
	 **/
	changeStatus: function (className) {
		$(this.target).find(".canvas").removeClass("statusDefault");
		$(this.target).find(".canvas").removeClass("statusDrawingLine");
		$(this.target).find(".canvas").removeClass("statusDrawingSquare");
		$(this.target).find(".canvas").removeClass("statusMove");
		
		$(this.target).find(".canvas").removeClass("statusResizeTopLeft");
		$(this.target).find(".canvas").removeClass("statusResizeTopRight");
		$(this.target).find(".canvas").removeClass("statusResizeBottomLeft");
		$(this.target).find(".canvas").removeClass("statusResizeBottomRight");
		$(this.target).find(".canvas").removeClass("statusResizeTop");
		$(this.target).find(".canvas").removeClass("statusResizeBottom");
		$(this.target).find(".canvas").removeClass("statusResizeLeft");
		$(this.target).find(".canvas").removeClass("statusResizeRight");
		
		$(this.target).find(".canvas").addClass(className);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method highlightObject 
	 * @param {String} index The index of object to be highlighted.
	 **/
	highlightObject: function (index) {
	
		$("#objectTree").find(".ygtvcontent").each(function (i) {
			if("objectInformation"+index == $(this).text()) {
				$(this).parent().parent().parent().parent().addClass("highlighted");
			}
			else {
				$(this).parent().parent().parent().parent().removeClass("highlighted");
			}
		});
/*
		
		this.objectExplorer.highlight(index);
		
		$("#objectExplorer").find(".objectInformation").each(function (k) {
			$(this).removeClass("highlighted");
			
			if(k == index) {
				$(this).addClass("highlighted");
			}
		});
*/
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method unhighlightObject 
	 * @param {String} index The index of object to be unhighlighted.
	 **/
	unhighlightObject: function (index) {
		this.objectExplorer.unHighlight(index);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method selectItem
	 * @param {String} index The index of the item to be selected. 
	 **/
	selectItem: function (index) {
		///if (this.focus <= index) {
		this.unfocusAll();
		//this.deselect();
		this.focus = index;
		
		if (this.objects[index]) {
			this.objects[index].properties.focus = true;
			//}
				
			
			this.selectedIndex.push(index); //Set current selected object
		
			//Set the cursor shape to move
			this.changeStatus("statusMove");
			
			this.objectManager.set(this.objects[index]);
			
			//test
			this.highlightObject(index);
		
			
			if (this.objects[index].type == "line") {
				var j;
				
				if (this.objects[index].properties.connector["head"] != null) {
					j = this.objects[index].properties.connector["head"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["tail"] != null) {
					j = this.objects[index].properties.connector["tail"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				
				
			}
			else if (this.objects[index].type == "square") {
				var j;
				
				if (this.objects[index].properties.connector["tl"] != null) {
					j = this.objects[index].properties.connector["tl"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["t"] != null) {
					j = this.objects[index].properties.connector["t"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["tr"] != null) {
					j = this.objects[index].properties.connector["tr"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["r"] != null) {
					j = this.objects[index].properties.connector["r"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["br"] != null) {
					j = this.objects[index].properties.connector["br"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["b"] != null) {
					j = this.objects[index].properties.connector["b"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["bl"] != null) {
					j = this.objects[index].properties.connector["bl"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
				if (this.objects[index].properties.connector["l"] != null) {
					j = this.objects[index].properties.connector["l"];
					this.objects[j].properties.focus = true;
					this.selectedIndex.push(j);
					this.highlightObject(j);
				}
	
			}
		}


		
//		m.s("you selected " + index + " item", "canvas");
		
		$(".designerMessage").html("Focus Index: " + this.focus + " / selectedIndex: " + this.selectedIndex);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method deselectItem 
	 * @param {String} index The index of the item to be deselected.
	 **/
	deselectItem: function (index) {
		//this.selectedIndex.pop(index);
										
		//If user has selected the line drawing tool, keep the cursor is crosshair, unless, chanage the cursor is default
		if (!(($(this.target).find(".canvas").hasClass("statusDrawingLine")) || ($(this.target).find(".canvas").hasClass("statusDrawingSquare")))) {
			this.changeStatus("statusDefault");		
		}
  
		if (this.focus > index) {
			this.focus = -1;
			this.objects[index].properties.focus = false;
		}
		
		this.unhighlightObject(index);	
		
//		m.er("you deselected " + index + " item", "canvas");		


		$(".designerMessage").html("Focus Index: " + this.focus + " / selectedIndex: " + this.selectedIndex);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method hoverItem 
	 * @param {String} index The index of the item to be hovered.
	 **/
	hoverItem: function (index) { 
		this.hoveredIndex = index; //Set current hovered object
									
		//Set the cursor shape to move
		this.changeStatus("statusMove");
		
		//this.objectManager.set(this.objects[index]);
		
		this.highlightObject(index);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method move 
	 * @param {String} index The index of the item to be moved.
	 * @param {String} offsetX The position on the x-coordinate to be moved.
	 * @param {String} offsetY The position on the y-coordinate to be moved.
	 **/
	move: function (index, offsetX, offsetY) {
		/*if (this.objects[index].type == "line") {
			var j;
			
			if (this.objects[index].properties.connector["head"] != null) {
				j = this.objects[index].properties.connector["head"];
				this.objects[j].properties.move(offsetX, offsetY);
			}
			if (this.objects[index].properties.connector["tail"] != null) {
				j = this.objects[index].properties.connector["tail"];
				this.objects[j].properties.move(offsetX, offsetY);
			}
			
			
		}
		else*/
		
		if (this.objects[index].type == "square") {
			var j;
			
			if (this.objects[index].properties.connector["tl"] != null) {
				j = this.objects[index].properties.connector["tl"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["t"] != null) {
				j = this.objects[index].properties.connector["t"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["tr"] != null) {
				j = this.objects[index].properties.connector["tr"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["r"] != null) {
				j = this.objects[index].properties.connector["r"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["br"] != null) {
				j = this.objects[index].properties.connector["br"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["b"] != null) {
				j = this.objects[index].properties.connector["b"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["bl"] != null) {
				j = this.objects[index].properties.connector["bl"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}
			if (this.objects[index].properties.connector["l"] != null) {
				j = this.objects[index].properties.connector["l"];
				//this.objects[j].properties.move(offsetX, offsetY);
				if (this.objects[j].properties.connector["tail"] != null && this.objects[j].properties.connector["tail"] == index) {
					this.objects[j].properties.ex += offsetX;
					this.objects[j].properties.ey += offsetY;
				}
				
				if (this.objects[j].properties.connector["head"] != null && this.objects[j].properties.connector["head"] == index) {
					this.objects[j].properties.sx += offsetX;
					this.objects[j].properties.sy += offsetY;
				}
			}

		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method bringForward 
	 **/
	bringForward: function (object) {
		if (!object) {
			object = this.objects[this.focus];
		}
		
		
		var index = -1;
		

		$(this.objects).each(function (i) {
			if (this.properties.timestamp == object.properties.timestamp) {
				index = i;
			}
		});
		
		if (this.objects[index+1] && index > -1) {
				
			var html = $(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html();
			$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).remove();

			$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index+1].shape.timestamp).after("<div id='stencil_" + this.objects[index].shape.timestamp + "' style='position:absolute; display:none;'></div>");
			$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html(html);
			
			this.objects[index].shape.move(this.objects[index].properties.sx, this.objects[index].properties.sy, this.objects[index].properties.ex, this.objects[index].properties.ey);
			this.objects[index].shape.show();
			
			var dummyObject = this.objects[index+1];
					
			this.objects[index+1] = this.objects[index];			
			this.objects[index] = dummyObject;
		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendBackward 
	 **/
	sendBackward: function (object) {
		if (!object) {
			object = this.objects[this.focus];
		}
		
				
		var index = -1;

		$(this.objects).each(function (i) {
			if (this.properties.timestamp == object.properties.timestamp)
				index = i;
		});
		
		if (this.objects[index-1] && index > 0) {
			var html = $(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html();
			$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).remove();

			$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index-1].shape.timestamp).before("<div id='stencil_" + this.objects[index].shape.timestamp + "' style='position:absolute; display:none;'></div>");
			$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html(html);
			
			this.objects[index].shape.move(this.objects[index].properties.sx, this.objects[index].properties.sy, this.objects[index].properties.ex, this.objects[index].properties.ey);
			this.objects[index].shape.show();
			
			//여기서부터 새로 할 것
			
			var dummyObject = this.objects[index-1];
			
			this.objects[index-1] = this.objects[index];
			this.objects[index] = dummyObject;

		}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method bringToFront 
	 **/
	bringToFront: function (object) {
		if (!object) {
			object = this.objects[this.focus];
		}
		
		
		var index = -1;

		$(this.objects).each(function (i) {
			if (this.properties.timestamp == object.properties.timestamp)
				index = i;
		});
		
		var html = $(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html();
		$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).remove();

		$(this.target).find(".canvas").find(".shapes").append("<div id='stencil_" + this.objects[index].shape.timestamp + "' style='position:absolute; display:none;'></div>");
		$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html(html);
		
		this.objects[index].shape.move(this.objects[index].properties.sx, this.objects[index].properties.sy, this.objects[index].properties.ex, this.objects[index].properties.ey);
		this.objects[index].shape.show();
		
		
		this.objects.push(object);
		if (this.objects[index])
			delete this.objects[index];
		
		
		
		var dummyObjects = $.makeArray();
		
		$(this.objects).each(function (i) {
			dummyObjects.push(this);
		});
		
		this.objects = dummyObjects;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	sendToBack: function (object) {
		if (!object) {
			object = this.objects[this.focus];
		}
		
		
		var index = -1;

		$(this.objects).each(function (i) {
			if (this.properties.timestamp == object.properties.timestamp)
				index = i;
		});
		
		var html = $(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html();
		$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).remove();

		$(this.target).find(".canvas").find(".shapes").prepend("<div id='stencil_" + this.objects[index].shape.timestamp + "' style='position:absolute; display:none;'></div>");
		$(this.target).find(".canvas").find(".shapes").find("#stencil_" + this.objects[index].shape.timestamp).html(html);
		
		this.objects[index].shape.move(this.objects[index].properties.sx, this.objects[index].properties.sy, this.objects[index].properties.ex, this.objects[index].properties.ey);
		this.objects[index].shape.show();
		
		
		this.objects.unshift(object);		
		if (this.objects[index])
			delete this.objects[index];
			
		
		
		var dummyObjects = $.makeArray();
		
		$(this.objects).each(function (i) {
			dummyObjects.push(this);
		});
		
		this.objects = dummyObjects;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	alignLeft: function () {
		var self = this;
		
		var point = 0;
		
		$(this.selectedIndex).each(function (i) {
			if (i == 0) {
				point = self.objects[this].properties.sx;
			}
			
			if (self.objects[this].properties.sx < self.objects[this].properties.ex) {
				if (self.objects[this].properties.sx < point) {
					point = self.objects[this].properties.sx;
				}
			}
			else {
				if (self.objects[this].properties.ex < point) {
					point = self.objects[this].properties.ex;
				}
			}

		});
		
		$(this.selectedIndex).each(function (i) {
			if (self.objects[this].properties.sx < self.objects[this].properties.ex) {
				self.objects[this].properties.ex -= (self.objects[this].properties.sx - point);
				self.objects[this].properties.sx = point;
			}
			else {
				self.objects[this].properties.sx -= (self.objects[this].properties.ex - point);
				self.objects[this].properties.ex = point;
			}
		});
		
		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	alignRight: function () {
		var self = this;
		
		var point = 0;
		
		$(this.selectedIndex).each(function (i) {
			if (self.objects[this].properties.sx < self.objects[this].properties.ex) {
				if (self.objects[this].properties.ex > point) {
					point = self.objects[this].properties.ex;
				}
			}
			else {
				if (self.objects[this].properties.sx > point) {
					point = self.objects[this].properties.sx;
				}
			}
		});
		
		$(this.selectedIndex).each(function (i) {
			if (self.objects[this].properties.sx < self.objects[this].properties.ex) {
				self.objects[this].properties.sx += (point - self.objects[this].properties.ex);
				self.objects[this].properties.ex = point;
			}
			else {
				self.objects[this].properties.ex += (point - self.objects[this].properties.sx);
				self.objects[this].properties.sx = point;
			}
		});
		
		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	alignTop: function () {
		var self = this;
		
		var point = 0;
		
		$(this.selectedIndex).each(function (i) {
			if (i == 0) {
				point = self.objects[this].properties.sy;
			}
			
			if (self.objects[this].properties.sy < self.objects[this].properties.ey) {
				if (self.objects[this].properties.sy < point) {
					point = self.objects[this].properties.sy;
				}
			}
			else {
				if (self.objects[this].properties.ey < point) {
					point = self.objects[this].properties.ey;
				}
			}

		});
		
		$(this.selectedIndex).each(function (i) {
			if (self.objects[this].properties.sy < self.objects[this].properties.ey) {
				self.objects[this].properties.ey -= (self.objects[this].properties.sy - point);
				self.objects[this].properties.sy = point;
			}
			else {
				self.objects[this].properties.sy -= (self.objects[this].properties.ey - point);
				self.objects[this].properties.ey = point;
			}
		});
		
		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	alignBottom: function () {
		var self = this;
		
		var point = 0;
		
		$(this.selectedIndex).each(function (i) {
			if (self.objects[this].properties.sy < self.objects[this].properties.ey) {
				if (self.objects[this].properties.ey > point) {
					point = self.objects[this].properties.ey;
				}
			}
			else {
				if (self.objects[this].properties.sy > point) {
					point = self.objects[this].properties.sy;
				}
			}
		});
		
		$(this.selectedIndex).each(function (i) {
			if (self.objects[this].properties.sy < self.objects[this].properties.ey) {
				self.objects[this].properties.sy += (point - self.objects[this].properties.ey);
				self.objects[this].properties.ey = point;
			}
			else {
				self.objects[this].properties.ey += (point - self.objects[this].properties.sy);
				self.objects[this].properties.sy = point;
			}
		});
		
		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	alignHorizontallyCenter: function () {
		var self = this;
		
		var point = 0;

		point = (self.objects[this.selectedIndex[0]].properties.sx + self.objects[this.selectedIndex[0]].properties.ex) / 2;

		
		$(this.selectedIndex).each(function (i) {
			var halfVal = Math.abs(self.objects[this].properties.ex - self.objects[this].properties.sx)/2;
			
			if (self.objects[this].properties.sx < self.objects[this].properties.ex) {
				self.objects[this].properties.sx = point - halfVal;
				self.objects[this].properties.ex = point + halfVal;
			}
			else {
				self.objects[this].properties.ex = point - halfVal;
				self.objects[this].properties.sx = point + halfVal;
			}
		});
		
		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method sendToBack 
	 **/
	alignVerticallyCenter: function () {
		var self = this;
		
		var point = 0;
		
		point = (self.objects[this.selectedIndex[0]].properties.sy + self.objects[this.selectedIndex[0]].properties.ey) / 2;

		
		$(this.selectedIndex).each(function (i) {
			var halfVal = Math.abs(self.objects[this].properties.ey - self.objects[this].properties.sy)/2;
			
			if (self.objects[this].properties.sy < self.objects[this].properties.ey) {
				self.objects[this].properties.sy = point - halfVal;
				self.objects[this].properties.ey = point + halfVal;
			}
			else {
				self.objects[this].properties.ey = point - halfVal;
				self.objects[this].properties.sy = point + halfVal;
			}
		});
		
		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method cut 
	 * @param {String} index The index of the item to be hovered.
	 **/
	cut: function () { 
		var self = this;
		
		delete this.copiedObject;
		this.copiedObjects = $.makeArray();
		
		$(this.selectedIndex).each(function (i) {
			self.copiedObjects.push(self.clone(self.objects[this]));
			
			self.objects[this].remove();
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method copy 
	 * @param {String} index The index of the item to be hovered.
	 **/
	copy: function () { 
		var self = this;
		
		delete this.copiedObject;
		this.copiedObjects = $.makeArray();
		
		$(this.selectedIndex).each(function (i) {
			self.copiedObjects.push(self.clone(self.objects[this]));
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method paste 
	 * @param {String} index The index of the item to be hovered.
	 **/
	paste: function () { 
		var self = this;

		
		$(this.copiedObjects).each(function (i) {
			self.add(this.type, this.shapeName);
			self.setProperties(self.objects[self.objects.length-1], this);			
			
			self.objects[self.objects.length-1].properties.sx += 10;
			self.objects[self.objects.length-1].properties.sy += 10;
			self.objects[self.objects.length-1].properties.ex += 10;
			self.objects[self.objects.length-1].properties.ey += 10;
			
			self.objects[self.objects.length-1].shape.show();
		});

		this.draw();
	},
	
	load: function (objects) {
		var self = this;


		$(objects).each(function (i) {
			self.isDrawing = false;
			self.add(this.type, this.shapeName);
								
			self.setProperties(self.objects[self.objects.length-1], this);			
			
			self.objects[self.objects.length-1].shape.move(self.objects.sx, self.objects.sy, self.objects.ex, self.objects.ey);
			self.objects[self.objects.length-1].shape.show();
		});

		this.draw();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method copy 
	 * @param {String} index The index of the item to be hovered.
	 **/
	clone: function (object) { 
		var objectClone = {}; 

		
		for (var property in object) {
			
			if (typeof object[property] == 'object') {
				var objectInner = object[property];
				
				var objectCloneInner = {}; 
				for (var propertyInner in objectInner) {
					if (typeof objectInner[propertyInner] == 'object') {
						var objectInnerInner = objectInner[propertyInner];
				
						var objectCloneInnerInner = {}; 
						for (var propertyInnerInner in objectInnerInner) {
							if (typeof objectInnerInner[propertyInnerInner] == 'object') {
								//objectClone[property] = this.clone(objectInner[property]); 
							}
							else {
								objectCloneInnerInner[propertyInnerInner] = objectInnerInner[propertyInnerInner]; 
							}
						}
						
						objectCloneInner[propertyInner] = objectCloneInnerInner;
					}
					else {
						objectCloneInner[propertyInner] = objectInner[propertyInner]; 
					}
				}
				
				
				objectClone[property] = objectCloneInner;

			}
			else {
				objectClone[property] = object[property]; 
			}
		}
				
		return objectClone; 		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method copy 
	 * @param {String} index The index of the item to be hovered.
	 **/
	undo: function () { 
		this.undoManager.undo();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method copy 
	 * @param {String} index The index of the item to be hovered.
	 **/
	redo: function () { 
		this.undoManager.redo();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method copy 
	 * @param {String} index The index of the item to be hovered.
	 **/
	remove: function (index) { 
		var self = this;
		
		var properties = new Object();
		properties.sx = self.objects[index].properties.sx;
		properties.sy = self.objects[index].properties.sy;
		properties.ex = self.objects[index].properties.ex;
		properties.ey = self.objects[index].properties.ey;
				
		self.undoManager.register(
			self, self.add, [self.objects[index].type, self.objects[index].shapeName, self.objects[index].option, properties], 'Create Item',
			self, self.remove, [self.objects.length-1], 'Remove Item'
		);
	
		this.objects[index].remove();
		this.draw();
	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method setProperties 
	 * @param {Object} target The target.
	 * @param {Object} source The source.
	 **/
	setProperties: function (target, source) {
		target.type = source.type;
		target.shapeName = source.shapeName;
		target.data_uuid = source.data_uuid;
		
		target.properties.focus = source.properties.focus;
/*
		target.properties.isDrag = source.properties.isDrag;
		target.properties.isDrawFinished = source.properties.isDrawFinished;
*/
		target.properties.sx = parseInt(source.properties.sx);
		target.properties.sy = parseInt(source.properties.sy);
		target.properties.ex = parseInt(source.properties.ex);
		target.properties.ey = parseInt(source.properties.ey);
		target.properties.prevX = parseInt(source.properties.prevX);
		target.properties.prevY = parseInt(source.properties.prevY);
		target.properties.id = source.properties.name;
		target.properties.x = parseInt(source.properties.x);
		target.properties.y = parseInt(source.properties.y);
		target.properties.width = parseInt(source.properties.width);
		target.properties.height = parseInt(source.properties.height);
		target.properties.connector = source.properties.connector;
		//target.properties.attrList = source.properties.attrList;
		
		target.shape.setShape();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setProperties 
	 * @param {Object} target The target.
	 * @param {Object} source The source.
	 **/
	setProperties2: function (selectedIndex, properties) {
		var self = this;
	
		$(selectedIndex).each(function (i) {
			console.log(properties[this].sx+"//"+properties[this].sy+"//"+properties[this].ex+"//"+properties[this].ey)
			self.objects[this].properties.sx = properties[this].sx;
			self.objects[this].properties.sy = properties[this].sy;
			self.objects[this].properties.ex = properties[this].ex;
			self.objects[this].properties.ey = properties[this].ey;
		});
			
		this.draw();
	}
};
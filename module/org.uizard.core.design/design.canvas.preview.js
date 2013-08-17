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
 * @class preview
 * @extends design.canvas.preview
 **/
org.uizard.core.design.canvas.preview = function () {
	/**
	 * This presents the current browser version
	 * @property canvas
	 **/
	this.canvas = null;
	
	/**
	 * This presents the current browser version
	 * @property target
	 **/
	this.target = null;
	
	/**
	 * This presents the current browser version
	 * @property target
	 **/
	this.realTarget = null;
	
	/**
	 * This presents the current browser version
	 * @property width
	 **/
	this.realWidth = null;
	
	/**
	 * This presents the current browser version
	 * @property height
	 **/
	this.realHeight = null;
	
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
	 * @property scale
	 **/
	this.scale = null;
	
	/**
	 * This presents the current browser version
	 * @property parent
	 **/
	this.parent = null;
	
	/**
	 * This presents the current browser version
	 * @property indicatorWidth
	 **/
	this.indicatorWidth = null;
	
	/**
	 * This presents the current browser version
	 * @property indicatorHeight
	 **/
	this.indicatorHeight = null;
};


org.uizard.core.design.canvas.preview.prototype = {
	init: function (target, width, height, scale, parent) {
		var self = this;

		//this.canvas = canvas;

		//Set Properties
		self.target = target;
		self.realWidth = width;
		self.width = width*scale;
		self.realHeight = height;
		self.height = height*scale;
		self.scale = scale;
		self.parent = parent;
		

		//adding html container
		$(target).append("<div class='previewCanvas'></div>"); //This is a canvas layer
		$(target).find(".previewCanvas").append("<div class='previewCanvasIndicator'></div>");
		$(target).find(".previewCanvas").append("<div class='previewEvent' style='width:"+self.width+"px; height:"+self.height+"px;'></div>");
		$(target).find(".previewCanvas").append("<canvas width='"+self.width+"' height='"+self.height+"'></canvas>"); //This is a canvas element which is supported in HTML5

	},
	
	setSize: function () {
		var self = this;
	
		self.indicatorWidth = ($(self.target).parent().width()-14)*self.scale;
		self.indicatorHeight = ($(self.target).parent().height()-14)*self.scale;
		
		$(self.target).find(".previewCanvasIndicator").width(self.indicatorWidth);
		$(self.target).find(".previewCanvasIndicator").height(self.indicatorHeight);
	},

	setup: function () {
		var self = this;
		
			//	console.log($(self.target).parent().width());

/*
		console.log(self.scale);
		console.log(self.width+"//"+self.height);
		console.log(self.realWidth+"//"+self.realHeight);
		console.log($(self.target).parent());
		console.log($(self.target).parent().width()+"//"+$(self.target).parent().height());
//self.real -> 890, 1100 : div.space
//real view space -> canvasContainer
*/
		$(self.target).find(".previewEvent").click(function (event) {
			var clickedX = event.pageX-$(this).offset().left;
			var clickedY = event.pageY-$(this).offset().top;
/*
						
			var clickedWidth = $(self.target).parent().width()/(self.realWidth+180)*self.width;
			var clickedHeight = $(self.target).parent().height()/(self.realHeight+180)*self.height;
*/
/*
		console.log($(self.target).parent().width()+"//"+$(self.target).parent().height());
*/
			$(self.target).parent().scrollLeft(clickedX/self.scale);
			$(self.target).parent().scrollTop(clickedY/self.scale);
						
			if ((clickedX+self.indicatorWidth) > self.width) {
				$(self.target).find(".previewCanvasIndicator").css("left",self.width-clickedWidth-2);
			}
			else {
				$(self.target).find(".previewCanvasIndicator").css("left",clickedX);
			}
			if ((clickedY+self.indicatorHeight) > self.height) {
				$(self.target).find(".previewCanvasIndicator").css("top",self.height-clickedHeight-2);
			}
			else {
				$(self.target).find(".previewCanvasIndicator").css("top",clickedY);
			}
			
		});
	},
	
	cursorMove: function () {
		
	},
	
	calculate: function () {
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method draw 
	 **/
	draw: function () {
		var self = this;
		
		
/*
		this.selectedIndex = $.unique(this.selectedIndex);
*/
		
		
		//Canvas Element (Supported in HTML5)
		if($(this.target).find(".previewCanvas").find("canvas")[0].getContext) {
			//Get Context
			var context = $(this.target).find(".previewCanvas").find("canvas")[0].getContext('2d');

			//Clear the canvas
			context.clearRect (0, 0, $(this.target).find(".previewCanvas").find("canvas").width(), $(this.target).find(".previewCanvas").find("canvas").height());	
			
			//All objects
			$(this.parent.objects).each(function (i) {				
				//if the object is line type
				if($(this)[0].type == 'line') {
					
					var sx=0, sy=0, ex=0, ey=0;
					
					if ($(this)[0].properties.sx) {
						sx = parseInt($(this)[0].properties.sx);
						sx *= self.scale;
					}
					
					if ($(this)[0].properties.sy) {
						sy = parseInt($(this)[0].properties.sy);
						sy *= self.scale;
					}
	
					if ($(this)[0].properties.ex) {
						ex = parseInt($(this)[0].properties.ex);
						ex *= self.scale;
					}

					if ($(this)[0].properties.ey) {					
						ey = parseInt($(this)[0].properties.ey);
						ey *= self.scale;
					}
					

					
					//is hovered?
					if(self.parent.hoveredIndex == i) {
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
/*
					if($.inArray(i, self.parent.selectedIndex) >= 0 || self.parent.selected) {
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
*/

					
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
						sx *= self.scale;
					}
					
					if ($(this)[0].properties.sy) {
						sy = parseInt($(this)[0].properties.sy);	
						sy *= self.scale;
					}
	
					if ($(this)[0].properties.ex) {
						ex = parseInt($(this)[0].properties.ex);
						ex *= self.scale;
					}

					if ($(this)[0].properties.ey) {					
						ey = parseInt($(this)[0].properties.ey);
						ey *= self.scale;
					}
					
					//is hovered?
					if(self.parent.hoveredIndex == i) {
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
					
					context.beginPath();
					context.strokeStyle = "#000000";
					context.fillStyle = "#FFFFFF";
					
					context.rect(sx, sy, ex-sx, ey-sy);
					context.lineWidth = 0.5;
					context.closePath();
					
					context.stroke();
					context.fill();
					
					

					

					//is selected?
/*
					if($.inArray(i, self.parent.selectedIndex) >= 0 || self.parent.selected) {
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
*/

					
					
					if (this.shape) {
											
						if (this.shape.move) {
							this.shape.move(this.properties.sx, this.properties.sy, this.properties.ex, this.properties.ey);
							this.shape.setShape();
						}
					
					}
				}
			});
		}
	}
};

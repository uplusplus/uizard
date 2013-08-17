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
 * @class design
 **/
org.uizard.core.design.canvas.toolbar = function () {
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
	 * @property isCollaborationON
	 **/
	this.isCollaborationON = false; 
	
	/**
	 * This presents the current browser version
	 * @property isPreviewOn
	 **/
	this.isPreviewOn = true; 	

	/**
	 * This presents the current browser version
	 * @property zoomLevel
	 **/
	this.zoomLevel = 100;
};

org.uizard.core.design.canvas.toolbar.prototype = {
	init: function(canvas) {
		var self = this;
		
		this.canvas = canvas;
		this.target = canvas.target;
		
		$(this.target).append("<div class='designToolbarContainer'></div>");
		$(this.target).append("<div class='designPreviewContainer'></div>");
		$(this.target).append("<div class='designStatusContainer'></div>");
		
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/grid.png' action='gridOnOff' class='toolbarButton toolbarButtonPressed' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/grid-snap.png' action='snapToGrid' class='toolbarButton' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/resize.png' action='resize' class='toolbarButton' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/printer.png' class='toolbarButton' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/ruler_onoff.png' class='toolbarButton' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/share.png' action='collaborationOnOff' class='toolbarButton' border='0' />");
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/preview.png' action='previewOnOff' class='toolbarButton toolbarButtonPressed' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/zoom-fit.png' action='zoomFit' class='toolbarButton' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/zoom-in.png' action='zoomIn' class='toolbarButton' border='0' />"); 
		$(this.target).find(".designToolbarContainer").append("<img src='config/image/org.uizard.core.design/zoom-out.png' action='zoomOut' class='toolbarButton' border='0' />"); 

		$(this.target).find(".designToolbarContainer").find("img[action='gridOnOff']").click(function () {
			if($(self.target).find(".canvasContainer").find(".grid").css("display") == "none") {
				$(self.target).find(".canvasContainer").find(".grid").css("display", "block");
				$(self.target).find(".designToolbarContainer").find("img[action='gridOnOff']").addClass("toolbarButtonPressed");
			}
			else {
				$(self.target).find(".canvasContainer").find(".grid").css("display", "none");
				$(self.target).find(".designToolbarContainer").find("img[action='gridOnOff']").removeClass("toolbarButtonPressed");
			}
		});

		$(this.target).find(".designToolbarContainer").find("img[action='snapToGrid']").click(function () {
			if (self.canvas.snapToGrid) {
				self.canvas.snapToGrid = false;
				$(self.target).find(".designToolbarContainer").find("img[action='snapToGrid']").removeClass("toolbarButtonPressed");
			}
			else {
				self.canvas.snapToGrid = true;
				$(self.target).find(".designToolbarContainer").find("img[action='snapToGrid']").addClass("toolbarButtonPressed");
			}
		});
		
		$(this.target).find(".designToolbarContainer").find("img[action='resize']").click(function () {
			self.canvas.dialog.panel.show();
		});
		
		$(this.target).find(".designToolbarContainer").find("img[action='collaborationOnOff']").click(function () {
			if (self.isCollaborationON) {
				self.isCollaborationON = false;
				
				//TO-DO: Change to event-based
				self.canvas.setCollaborationOff();
				$(self.target).find(".designToolbarContainer").find("img[action='collaborationOnOff']").removeClass("toolbarButtonPressed");
			}
			else {
				self.isCollaborationON = true;
				self.canvas.setCollaborationOn();
				$(self.target).find(".designToolbarContainer").find("img[action='collaborationOnOff']").addClass("toolbarButtonPressed");
			}
		});
		
		$(this.target).find(".designToolbarContainer").find("img[action='previewOnOff']").click(function () {
			if (self.isPreviewON) {
				self.isPreviewON = false;
				$(self.target).find(".designToolbarContainer").find("img[action='previewOnOff']").removeClass("toolbarButtonPressed");
				$(self.target).find(".designPreviewContainer").hide();
			}
			else {
				self.isPreviewON = true;
				$(self.target).find(".designToolbarContainer").find("img[action='previewOnOff']").addClass("toolbarButtonPressed");
				$(self.target).find(".designPreviewContainer").show();
			}
		});
		
		$(this.target).find(".designToolbarContainer").find("img[action='zoomFit']").click(function () {
			$(self.target).find(".space").css("zoom", "100%");	
			$(self.target).find(".skin").css("zoom", "100%");	
			$(self.target).find(".canvas").css("zoom", "100%");	
		});
		
		$(this.target).find(".designToolbarContainer").find("img[action='zoomIn']").click(function () {
			if (self.zoomLevel < 1600) {
				self.zoomLevel += 10;
			}
			
			$(self.target).find(".space").css("zoom", self.zoomLevel + "%");	
			$(self.target).find(".skin").css("zoom", self.zoomLevel + "%");	
			$(self.target).find(".canvas").css("zoom", self.zoomLevel + "%");	
		});
		
		$(this.target).find(".designToolbarContainer").find("img[action='zoomOut']").click(function () {
			if (self.zoomLevel >= 20) {
				self.zoomLevel -= 10;
			}
			
			$(self.target).find(".space").css("zoom", self.zoomLevel + "%");	
			$(self.target).find(".skin").css("zoom", self.zoomLevel + "%");	
			$(self.target).find(".canvas").css("zoom", self.zoomLevel + "%");			
		});
		
		
		$(this.target).find(".designStatusContainer").append("<img src='config/image/org.uizard.core.design/line.png' class='lineDrawing toolbarButton' border='0' />");
		$(this.target).find(".designStatusContainer").append("<img src='config/image/org.uizard.core.design/shape.png' class='squareDrawing toolbarButton' border='0' />"); 
		
	}
};
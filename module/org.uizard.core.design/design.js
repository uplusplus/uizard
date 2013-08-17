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
org.uizard.core.design = function () {
	/**
	 * This presents the current browser version
	 * @property title
	 **/
	this.title = null;
	
	/**
	 * This presents the current browser version
	 * @property container
	 **/
	this.container = null;
	
	/**
	 * This presents the current browser version
	 * @property filepath
	 **/
	this.filepath = null;
	
	/**
	 * This presents the current browser version
	 * @property filename
	 **/
	this.filename = null;
	
	/**
	 * This presents the current browser version
	 * @property filetype
	 **/
	this.filetype = null;
	
	/**
	 * This presents the current browser version
	 * @property ruler
	 **/
	this.ruler = null;
	
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
	
	

};

org.uizard.core.design.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @constructor
	 * @param {String} target The target.
	 * @param {STring} title The title. 
	 **/
	init: function (target, title) {
		var self = this;
		
		this.container = target;
		this.title = title;
		this.target = target;
				
		$(target).append("<div class='canvasContainer'></div>");
		
		
		$(target).find(".canvasContainer").css("left", 14);
		$(target).find(".canvasContainer").css("top", 14);
		
		//Ruler Initialization		
		this.ruler = new org.uizard.core.design.ruler();
		this.ruler.init($(target), "10", "px", this.title);
		
		//Canvas Initialization		
		this.canvas = new org.uizard.core.design.canvas();
		this.canvas.init($(target).find(".canvasContainer"), 800, 1000, this.title, this);



		//Blocking Context Menus for Empty Space		
		var emptyContextMenu = new org.uizard.core.menu.context();
		emptyContextMenu.init("", "none", $(target).find(".canvasContainer"), "");
		
		
		
		
		
		
		
		
		
				
		//for Test
		//this.setCollaborationOn();		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method load 
	 * @param {String} filepath The filepath of target contents.
	 * @param {String} filename The name of target file.
	 * @param {String} filetype The type of target file. 
	 **/
	load: function (filepath, filename, filetype) {
		var self = this;
		
		var url = "module/org.uizard.core.file/file.getContents.php";
		var path = filepath + "/" + filename;
		
		this.filepath = filepath;
		this.filename = filename;
		this.filetype = filetype;
		
		var i = 0;
		this.interval = window.setInterval(function () { if(i<100) { statusbar.progressbar.set('value', i+=10); } else { window.clearInterval(self.interval); } }, 100);
		
		statusbar.startLoading();
		
		$.ajax({
			url: url,			
			type: "POST",
			data: "path="+path,
			success: function(data) {
				//self.editor.setValue(data);
				//self.canvas.objects = $.makeArray();
				//self.canvas.objects = eval(data);
				var objects = eval(data);
				self.canvas.load(objects);

				statusbar.progressbar.set('value', 100);
				
				if(self.interval) {
					window.clearInterval(self.interval);
				}
				
				statusbar.stopLoading();
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method save 
	 **/
	save: function () {
		var self = this;
		
		var url = "module/org.uizard.core.file/file.putContents.php";
		var path = this.filepath + "/" + this.filename;
		
		var data = this.getSource(this.canvas.objects);
		
		
		console.log(data);

		$.ajax({
			url: url,			
			type: "POST",
			data: { path: path, data: data },
			success: function(data) {
				//self.canvas.objects = $.makeArray();
				//self.canvas.objects = eval(data);
				//self.canvas.draw();
				
				m.s("save complete!", "editor");
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method saveAs 
	 * @param {String} filepath The filepath of target contents.
	 * @param {String} filename The name of target file.
	 * @param {String} filetype The type of target file. 
	 **/
	saveAs: function (filepath, filename, filetype) {
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method resizeAll
	 **/
	resizeAll: function () {
		$(this.container).find(".canvasContainer").width($(this.container).parent().width() - 14);
		$(this.container).find(".canvasContainer").height($(this.container).parent().height() - 14);	

		$(this.container).find(".ruler_x").width($(this.container).find(".canvasContainer").width());
		$(this.container).find(".ruler_y").height($(this.container).find(".canvasContainer").height());
		
		
		
		
		if(this.canvas.height + 95 > $(this.container).find(".canvasContainer").height()) {
			$(this.container).find(".canvasContainer").find(".canvas").css("top", 50);	
			$(this.container).find(".canvasContainer").find(".canvas").css("margin-top", 0);
			
			$(this.container).find(".ruler_y").css("background-position", "0px 50px");			
		}
		else {
			$(this.container).find(".canvasContainer").find(".canvas").css("top", "50%");		
			$(this.container).find(".canvasContainer").find(".canvas").css("margin-top", 0 - (this.canvas.height/2) + 10);	
			
			$(this.container).find(".ruler_y").css("background-position", "0px " +  2 + ($(this.container).height() - this.canvas.height)/2 + "px");
		}		
		
		if(this.canvas.width + 95 > $(this.container).find(".canvasContainer").width()) {
			$(this.container).find(".canvasContainer").find(".canvas").css("left", 50);	
			$(this.container).find(".canvasContainer").find(".canvas").css("margin-left", 0);
			
			$(this.container).find(".ruler_x").css("background-position", "50px 0px");
		}
		else {
			$(this.container).find(".canvasContainer").find(".canvas").css("left", "50%");		
			$(this.container).find(".canvasContainer").find(".canvas").css("margin-left", 0 - (this.canvas.width/2) + 10);	
			
			$(this.container).find(".ruler_x").css("background-position", ($(this.container).width() - this.canvas.width)/2 + 2 + "px 0px");
		}

		
		if (this.canvas.skinWidth != null) {
			
			if(this.canvas.skinHeight + 95 > $(this.container).find(".canvasContainer").height()) {
				$(this.container).find(".canvasContainer").find(".skin").css("top", 50);	
				$(this.container).find(".canvasContainer").find(".skin").css("margin-top", 0);
			}
			else {
				$(this.container).find(".canvasContainer").find(".skin").css("top", "50%");		
				$(this.container).find(".canvasContainer").find(".skin").css("margin-top", 0 - (this.canvas.skinHeight/2) + 10);	
			}		
			
			if(this.canvas.skinWidth + 95 > $(this.container).find(".canvasContainer").width()) {
				$(this.container).find(".canvasContainer").find(".skin").css("left", 50);	
				$(this.container).find(".canvasContainer").find(".skin").css("margin-left", 0);
			}
			else {
				$(this.container).find(".canvasContainer").find(".skin").css("left", "50%");		
				$(this.container).find(".canvasContainer").find(".skin").css("margin-left", 0 - (this.canvas.skinWidth/2) + 10);	
			}
			
			$(this.container).find(".canvasContainer").find(".canvas").css("margin-top", 277);	
			$(this.container).find(".canvasContainer").find(".canvas").css("left", "50%");
			$(this.container).find(".canvasContainer").find(".canvas").css("margin-left", 0 - (this.canvas.width/2) + 7);	
		}
		
	
		this.canvas.preview.setSize();
	},
	
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method getSource 
	 **/
	getSource: function (objects) {
		
		var objectsString = "[";
		
		var objectsLength = objects.length;
		
		$(objects).each(function (i) {
			objectsString += "{";
			
			var j = 0;
			
			objectsString += 'type: "' + this.type + '", ';
			objectsString += 'shapeName: "' + this.shapeName + '", ';
			objectsString += 'data_uuid: "' + this.data_uuid + '", ';
			
			objectsString += "properties: {";
			
				objectsString += 'focus: ' + this.properties.focus + ', ';
				objectsString += 'isDrag: ' + this.properties.isDrag + ', ';
				objectsString += 'isDrawFinished: ' + this.properties.isDrawFinished + ', ';
				objectsString += 'sx: ' + this.properties.sx + ', ';
				objectsString += 'sy: ' + this.properties.sy + ', ';
				objectsString += 'ex: ' + this.properties.ex + ', ';
				objectsString += 'ey: ' + this.properties.ey + ', ';
				objectsString += 'prevX: ' + this.properties.prevX + ', ';
				objectsString += 'prevY: ' + this.properties.prevY + ', ';
				objectsString += 'name: "' + this.properties.name + '", ';
				objectsString += 'x: ' + this.properties.x + ', ';
				objectsString += 'y: ' + this.properties.y + ', ';
				objectsString += 'width: ' + this.properties.width + ', ';
				objectsString += 'height: ' + this.properties.height + ', ';
				objectsString += 'connector: "' + this.properties.connector + '"';
				//objectsString += 'attrList: [' + this.properties.attrList + ']';
			
			objectsString += "}";
			
			/*
			for (var property in this) {
				if (typeof this[property] == 'object') {
					var objectInner = this[property];
					
					objectsString += property + ': {';
					
					var k = 0;
					
					for (var propertyInner in objectInner) {
						if (typeof objectInner[propertyInner] == 'object') {
							var objectInnerInner = objectInner[propertyInner];
					
							objectsString += propertyInner + ': {';
							
							var l = 0;
							
							for (var propertyInnerInner in objectInnerInner) {
								if (typeof objectInnerInner[propertyInnerInner] == 'object') {
									
								}
								else if (typeof objectInnerInner[propertyInnerInner] == 'function') {
									//objectsString += propertyInnerInner + ': ' + objectInnerInner[propertyInnerInner];
								}
								else {
									var contents = objectInnerInner[propertyInnerInner] + "";
									contents = contents.split('"').join('\"'); 
									objectsString += propertyInnerInner + ': "' + contents + '"';
								}
								
								if (l != Object.keys(objectInnerInner).length - 1 && propertyInnerInner != "" && propertyInnerInner != null) {
									objectsString += ", ";
								}
								
								l++;
							}
							
							objectsString += '}';
						}
						else if (typeof objectInner[propertyInner] == 'function') {
							//objectsString += propertyInner + ': ' + objectInner[propertyInner];
						}
						else {
							var contents = objectInner[propertyInner] + "";
							contents = contents.split('"').join('\"'); 
							objectsString += propertyInner + ': "' + contents + '"';
						}
						
						if (k != Object.keys(objectInner).length - 1 && propertyInner != "" && propertyInner != null) {
							objectsString += ", ";
						}
						
						k++;
					}
					
					objectsString += '}';
				}
				else if (typeof this[property] == 'function') {
					//objectsString += property + ': ' + this[property];
				}
				else {
					var contents = this[property] + "";
					contents = contents.split('"').join('\"'); 
					objectsString += property + ': "' + contents + '"';
				}
				
				if (j != Object.keys(this).length - 1 && property != "" && property != null) {
					objectsString += ", ";
				}
				
				j++;
			}
			*/
			
			objectsString += "}";
			
			if (i != objectsLength - 1) {
				objectsString += ", ";
			}
		});
		
		objectsString += "]";
		
		/*
		objectsString = objectsString.split(" ,").join("");
		objectsString = objectsString.split(", }").join("}");
		*/
		
		return objectsString;		
	}
};
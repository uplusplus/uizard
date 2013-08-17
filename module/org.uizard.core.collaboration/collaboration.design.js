/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module collaboration
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class design
 * @extends collaboration
 **/
org.uizard.core.collaboration.design = function () {
	/**
	 * This presents the current browser version
	 * @property target
	 * @type Object
	 * @default null
	 **/
	this.target = null;
	
	/**
	 * This presents the current browser version
	 * @property objects
	 * @type Object
	 * @default null
	 **/
	this.objects = null;
	
	/**
	 * This presents the current browser version
	 * @property userID
	 * @type Number
	 * @default 0
	 **/
	this.userID = 0;
	
	/**
	 * This presents the current browser version
	 * @property socket
	 * @type Object
	 * @default null
	 **/
	this.socket = null;
	
	/**
	 * This presents the current browser version
	 * @property predefinedColors
	 * @type Object
	 * @default null
	 **/
	this.predefinedColors = null;
	
	/**
	 * This presents the current browser version
	 * @property assignedColors
	 * @type Object
	 * @default null
	 **/
  	this.assignedColors = null;
  	
	/**
	 * This presents the current browser version
	 * @property updatingProcessRunning
	 * @type Object
	 * @default null
	 **/
  	this.updatingProcessRunning = false;
	
	/**
	 * This presents the current browser version
	 * @property updateQueue
	 * @type Object
	 * @default null
	 **/
  	this.updateQueue = [];
  	
	/**
	 * This presents the current browser version
	 * @property diffWorker
	 * @type Object
	 * @default null
	 **/
  	this.diffWorker = null;
	
	/**
	 * This presents the current browser version
	 * @property patchWorker
	 * @type Object
	 * @default null
	 **/
  	this.patchWorker = null;
  	
  	/**
	 * This presents the current browser version
	 * @property objectUUIDs
	 * @type Object
	 * @default null
	 **/
  	this.objectUUIDs = null;
};

org.uizard.core.collaboration.design.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} target The target.
	 **/
	init: function (target) {
		var self = this;
		
		this.target = target;
		this.objects = this.target.objects;
		
		this.updateQueue = [];
		
		this.predefinedColors = ["#FFCFEA", "#E8FF9C", "#FFCC91", "#42C0FF", "#A7FF9E", "#7DEFFF", "#BABDFF", "#FFD4EB", "#AAFF75", "#FF9EAB", "#DCFF91", "#8088FF"];
  		this.assignedColors = {};
		
		$(this.target.target).append("<div class='designCollaborationUserContainer' style='z-index:100; position:absolute; left:100px; top:30px; width:400px; height:50px; overflow:auto; background:color:#fff; border:1px #666 solid;'></div>");
		
		//Client Socket Initializing
 		//this.socket = new WebSocket('ws://uizard.org:8086');
 		this.socket = new WebSocket('ws://localhost:8086');
 		 		
 		this.diffWorker = new Worker('module/org.uizard.core.collaboration/collaboration.design.worker.diff.js');
 		this.patchWorker = new Worker('module/org.uizard.core.collaboration/collaboration.design.worker.patch.js');
 		
 		this.objectUUIDs = $.makeArray();
 		
 		this.diffWorker.onmessage = function(ev){
			var uuid = ev.data.id;
		    var content = ev.data.changes;
		
		    // send the diff to server via the open socket
		    //if(ev.data != "send_snapshot")
		    var line_msg = {"uuid": uuid, "content": content };
		    socket.send('{ "type": "modify_line", "message": ' + JSON.stringify(line_msg) + '}');
		};
		
		this.patchWorker.onmessage = function(ev){
			var patching_uuid = ev.data[0];
			var patch_user_id = ev.data[1];
			var changed_content = ev.data[2];
			var modifying_line = $("[data-uuid=" + patching_uuid + "]");
		
			if(changed_content != ""){
				$(modifying_line).html(changed_content);
		      
				//update the stored line in hash
				stored_lines[patching_uuid] = {"content": changed_content}
			}
		}
 		
 		//this.startListening();
 		
 		
 		//Event for ADD, DELETE, MODIFY
		$("#inputChatMessage").keypress(function(ev){
			if((ev.keyCode || ev.which) == 13){
				ev.preventDefault();
				
				self.socket.send('{"type": "chat", "message":"' + $(this).val() + '"}');
				$(this).val("");
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method startListening 
	 **/
	startListening: function () {
		
		var self = this;
		
		var checkForUpdates = function () {
			if(self.updateQueue.length > 0 && self.updatingProcessRunning == false) {
				//console.log("checkForUpdates");
	
				var current_update = self.updateQueue.shift();
				
				self.updatingProcessRunning = true;
				self.applyUpdate(current_update["channel"], current_update["payload"]);
			}
		};
		
		var inspectObjectChanage = function (i) {
			
			var currentObjectUUIDs = $.makeArray();
			
			//psuedo code...
			$(self.objects).each(function (i) {
				//add				
				if (this.data_uuid == undefined || this.data_uuid == null) {
					if (this.properties.isDrawFinished) {
						this.data_uuid = self.generateUUID();
						
						self.objectUUIDs.push(this.data_uuid);
						
						var objectData = {
							type: this.type,
							shapeName: this.shapeName,
							data_uuid: this.data_uuid,
							properties: {
								focus: this.properties.focus,
								isDrag: this.properties.isDrag,
								isDrawFinished: this.properties.isDrawFinished,
								selectedNode: this.properties.selectedNode,
								sx: this.properties.sx,
								sy: this.properties.sy,
								ex: this.properties.ex,
								ey: this.properties.ey,
								prevX: this.properties.prevX,
								prevY: this.properties.prevY,
								id: this.properties.name,
								x: this.properties.x,
								y: this.properties.y,
								width: this.properties.width,
								height: this.properties.height,
								connector: this.properties.connector,
								attrList: this.properties.attrList
							}
						};
																
						self.socket.send('{"type": "add_object", "message": { "uuid": "' + this.data_uuid + '", "object": ' + JSON.stringify(objectData) + ' }}');
						//console.log(this.toSource());
					}
				}
				//modify
				else if (this.properties.status == "modified") {
					this.properties.status = "none";
					
					var objectData = {
						type: this.type,
						shapeName: this.shapeName,
						data_uuid: this.data_uuid,
						properties: {
							focus: this.properties.focus,
							isDrag: this.properties.isDrag,
							isDrawFinished: this.properties.isDrawFinished,
							selectedNode: this.properties.selectedNode,
							sx: this.properties.sx,
							sy: this.properties.sy,
							ex: this.properties.ex,
							ey: this.properties.ey,
							prevX: this.properties.prevX,
							prevY: this.properties.prevY,
							id: this.properties.name,
							x: this.properties.x,
							y: this.properties.y,
							width: this.properties.width,
							height: this.properties.height,
							connector: this.properties.connector,
							attrList: this.properties.attrList
						}
					};
										
		    		self.socket.send('{"type": "modify_object", "message": { "uuid": "' + this.data_uuid + '", "object": ' + JSON.stringify(objectData) + ' }}');
				}
				
				currentObjectUUIDs.push(this.data_uuid);
			});
			
			//remove
			$(self.objectUUIDs).each(function (i){
				if ($.inArray(this.toString(), currentObjectUUIDs) == -1) {
					self.socket.send('{"type": "remove_object", "message": { "uuid": "' + this.toString() + '" }}');
						
					self.objectUUIDs.pop(this.toString());
					
					return false;
				}
			});
			
		};
		
		//Set Callback Function for Listening from Collaboration Server 
		this.socket.onmessage = function(ev){
			if(!ev.data) return false;

			var received_msg = JSON.parse(ev.data);

			switch(received_msg["channel"]){
				case "initial":
					self.userID = received_msg["id"];
					
			        for(var user_index in received_msg["users"]){
			        	self.addUser(received_msg["users"][user_index]);
			        }
			
			        // periodically check for available updates and apply them
			        window.setInterval(checkForUpdates, 100);
			        
			        window.setInterval(inspectObjectChanage, 99);
         
					break;
				case "join":
					if(received_msg["payload"]["user"] != self.userID)
           				self.addUser(received_msg["payload"]["user"]);
					break;
				case "leave":
					self.removeUser(received_msg["payload"]["user"]);
					break;
				case "add_object":
					self.updateQueue.push(received_msg);
					break;
				case "modify_object":
					self.updateQueue.push(received_msg);
					break;
				case "remove_object":
					self.updateQueue.push(received_msg);
					break;			
				default:
					//console.log(received_msg);
			}
		};
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method stopListening() 
	 * @return void
	 **/
	stopListening: function () {
		//Unset Callback Function for Listening from Collaboration Server 
		this.socket.onmessage = null;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method applyUpdate 
	 * @param {Object} action The action.
	 * @param {Object} update The update.
	 **/	
	applyUpdate: function (action, update) {
		switch(action){
			case "add_object":
				this.addObject(update);
				break;
			case "modify_object":
				this.modifyObject(update);
				break;
			case "remove_object":
				this.removeObject(update);
				break;
			default:
				console.log("invalid update");
		};
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addUser 
	 * @param {Number} id The identifier.
	 **/
	addUser: function (id) {
		var new_user_li = $("<div id='user-" + id + "'></div>");
	    this.assignedColors[id] = this.predefinedColors.pop();
	
	    new_user_li.append("<span class='user_color' style='background-color:" + this.assignedColors[id] + "; color: " + this.assignedColors[id] + "'>.</span>");
	    new_user_li.append("<span class='user_name'>User-" + id + "</span>");
	    $(this.target.target).find(".designCollaborationUserContainer").append(new_user_li);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method removeUser 
	 * @param {Number} id The identifier.
	 **/
	removeUser: function (id) {
		$("div").find(".chatUserContainer").find("#user-" + id).remove();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addObject 
	 * @param {Object} payload The payload.
	 **/
	addObject: function (payload) {
		var self = this;
		
		var object = eval(payload["message"]["object"]);
		var addObjectAvailable = true;
		
		$(self.objects).each(function (i) {
			//console.log("inspect now...");				
			if (this.data_uuid == object.data_uuid) {
				addObjectAvailable = false;
				
				return false;
			}
		});
		
		if (addObjectAvailable) {
			this.target.add(object.type, object.shapeName);			
			this.setProperties(self.objects[self.objects.length-1], object);			
			this.target.draw();
			
			this.objectUUIDs.push(object.data_uuid);
		}
		
		this.updatingProcessRunning = false;
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
		target.properties.isDrag = source.properties.isDrag;
		target.properties.isDrawFinished = source.properties.isDrawFinished;
		target.properties.selectedNode = source.properties.selectedNode;
		target.properties.sx = source.properties.sx;
		target.properties.sy = source.properties.sy;
		target.properties.ex = source.properties.ex;
		target.properties.ey = source.properties.ey;
		target.properties.prevX = source.properties.prevX;
		target.properties.prevY = source.properties.prevY;
		target.properties.id = source.properties.name;
		target.properties.x = source.properties.x;
		target.properties.y = source.properties.y;
		target.properties.width = source.properties.width;
		target.properties.height = source.properties.height;
		target.properties.connector = source.properties.connector;
		target.properties.attrList = source.properties.attrList;
		
		target.shape.setShape();
	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method modifyObject 
	 * @param {Object} payload The payload.
	 **/
	modifyObject: function (payload) {
		var self = this;
		
		var object = eval(payload["message"]["object"]);
		var modifyObjectAvailable = false;
		var index = null;
		
		$(self.objects).each(function (i) {				
			if (this.data_uuid == object.data_uuid) {
				modifyObjectAvailable = true;
				index = i;
				
				return false;
			}
		});
		
		if (modifyObjectAvailable) {
			this.setProperties(self.objects[index], object);			
			this.target.draw();
		}
		
		this.updatingProcessRunning = false;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method removeObject 
	 * @param {Object} payload The payload.
	 **/
	removeObject: function (payload) {
		var self = this;
		
		var uuid = payload["message"]["uuid"];
		
		$(self.objects).each(function (i) {				
			if (this.data_uuid == uuid) {
				this.remove();
				
				return false;
			}
		});
		
		this.updatingProcessRunning = false;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method generateUUID
	 * @return {String} The result string. 
	 **/
	generateUUID: function () {
    	//get the pad id
	    //var padid = "1";
	    var padid = "1";
    
	    //get the user id
	    //var userid = user_id;
	    var userid = "test";

	    //get the current timestamp (in UTC)
	    var d = new Date();
	    var timestamp = $.map([d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),	d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()], function(n, i){
			return (n < 10) ? "0"+n : n;
		}).join("");

	    //combine them and generate the UUID
	    //format: padid_userid_timestamp
	    return padid + "_" + userid + "_" + timestamp;
  	}
};
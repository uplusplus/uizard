/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * @module collaboration
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class chat
 * @extends collaboration
 **/
org.uizard.core.collaboration.chat = function () {
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
	 * @property predefined_colors
	 * @type String
	 * @default null
	 **/
	this.predefined_colors = null;
	
	/**
	 * This presents the current browser version
	 * @property assigned_colors
	 * @type String
	 * @default null
	 **/
  	this.assigned_colors = null;
  	
	/**
	 * This presents the current browser version
	 * @property updating_process_running
	 * @type Boolean
	 * @default false
	 **/
  	this.updating_process_running = false;
	
	/**
	 * This presents the current browser version
	 * @property update_queue
	 * @type Array
	 * @default null
	 **/
  	this.update_queue = [];
  	
  	/**
	 * This presents the current browser version
	 * @property project_id
	 * @type Array
	 * @default null
	 **/
  	this.project_id = null;
};

org.uizard.core.collaboration.chat.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () {
		var self = this;
		this.project_id = core.currentProjectName;
		
		$("#chat").append("<div class='chatUserContainer'>User </div>");		
		$("#chat").append("<div class='chatMessageContainer'></div>");
		$("#chat").append("<div class='chatMessageInputContainer'><input id='inputChatMessage' value='Chatting Message' style='width:90%;' /></div>");

		this.update_queue = [];
		
		this.predefined_colors = ["#FFCFEA", "#E8FF9C", "#FFCC91", "#42C0FF", "#A7FF9E", "#7DEFFF", "#BABDFF", "#FFD4EB", "#AAFF75", "#FF9EAB", "#DCFF91", "#8088FF"];
  		this.assigned_colors = {};
 		
		$("#inputChatMessage").keypress(function(ev){
			if((ev.keyCode || ev.which) == 13){
				ev.preventDefault();
				
				self.socket.send('{"type": "chat", "project_id": "'+ self.project_id +'", "message":"' + $(this).val() + '"}');
				$(this).val("");
			}
		});
	
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method startListening 
	 **/
	setChatOn: function () {
	
		var self = this;
		this.socket = new WebSocket('ws://localhost:8085');
 		self.project_id = core.currentProjectName;
 		
 		this.startListening();
 		
 		this.socket.onopen = function(){
 		
 		 	this.send('{"type": "init", "project_id": "'+ self.project_id +'",'+ '"message":"init"}');
		
 		};
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method startListening 
	 **/
	setChatOff: function () {
	
		var self = this;
		
 		this.stopListening();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method startListening 
	 **/
	startListening: function () {
		
		var self = this;
		
		console.log("project_id: " + self.project_id);
		var checkForUpdates = function () {
			if(self.update_queue.length > 0 && self.updating_process_running == false) {
				//console.log("checkForUpdates");
	
				var current_update = self.update_queue.shift();
				
				self.updating_process_running = true;
				self.applyUpdate(current_update["channel"], current_update["payload"]);
			}
		}
		
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
					break;
				case "join":
					if(received_msg["payload"]["user"] != self.userID)
           				self.addUser(received_msg["payload"]["user"]);
					break;
				case "leave":
					self.removeUser(received_msg["payload"]["user"]);
					break;
				case "chat":
					self.update_queue.push(received_msg);
					break;
				case "chat_" + self.project_id:
					self.update_queue.push(received_msg);
					break;
				default:
					console.log(received_msg);
			}
		};
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method stopListening 
	 **/
	stopListening: function () {
		//Unset Callback Function for Listening from Collaboration Server 
		this.socket.send('{"type": "leave"}');
		this.socket.onmessage = null;
		this.socket.close();
		
		$("div").find(".chatUserContainer").html("");
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method applyUpdate 
	 * @param {Object} action The action.
	 * @param {Object} update The update. 
	 **/	
	applyUpdate: function (action, update) {
		switch(action){
			case "chat":
				this.newChatMessage(update["user"], update["message"]);
				break;
			case "chat_" + this.project_id:
				this.newChatMessage(update["user"], update["message"]);
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
	    this.assigned_colors[id] = this.predefined_colors.pop();
	
	    new_user_li.append("<span class='user_color' style='background-color:" + this.assigned_colors[id] + "; color: " + this.assigned_colors[id] + "'>.</span>");
	    new_user_li.append("<span class='user_name'>User-" + id + "</span>");
	    $("div").find(".chatUserContainer").append(new_user_li);
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method removeUser 
	 * @param {Number} id The identifier.
	 **/
	removeUser: function (id) {
		$("div").find(".chatUserContainer").find("#user-" + id).remove();
		console.log("User : "+ id + " removed");
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method newChatMessage 
	 * @param {Number} uid The id of a user.
	 * @param {String} msg The message.
	 **/
	newChatMessage: function (uid, msg) {
		var chat_user = $("<span class='user' style='color:" + this.assigned_colors[uid] + "'>User-" + uid + "</span>")
	    var chat_message = $("<span class='message'>" + msg + "</span>");
	    var chat_timestamp = $("<span class='timestamp'>(" + this.getClockTime() + ")</span>");
	
	    var chat_line = $("<div class='chat_message unread'></div>");
	    chat_line.append(chat_user);
	    chat_line.append(chat_message);
	    chat_line.append(chat_timestamp);
	
	    $("div.chatMessageContainer").append(chat_line)
	    //TODO: set focus on last line added
	    $("div.chatMessageContainer").attr({ scrollTop: $("div.chatMessageContainer").attr("scrollHeight") });
		
	    this.updating_process_running = false;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method getClockTime 
	 **/
	getClockTime: function () {
		var now    = new Date();
		var hour   = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		var ap = "AM";
		
		if (hour   > 11) { ap = "PM";             }
		if (hour   > 12) { hour = hour - 12;      }
		if (hour   == 0) { hour = 12;             }
		if (hour   < 10) { hour   = "0" + hour;   }
		if (minute < 10) { minute = "0" + minute; }
		if (second < 10) { second = "0" + second; }
		
		var timeString = hour + ':' + minute + ':' + second + " " + ap;
	   	
		return timeString;
	}
};
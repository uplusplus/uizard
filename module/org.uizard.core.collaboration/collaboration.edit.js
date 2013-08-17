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
 * @class edit
 * @extends collaboration
 **/
org.uizard.core.collaboration.edit = function () {
	/**
	 * This presents the current browser version
	 * @property target
	 * @type Object
	 * @default null
	 **/
	this.target = null;
	
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
	 * @property socket
	 * @type Object
	 * @default null
	 **/
	this.socket = null;
	
	/**
	 * This presents the current browser version
	 * @property previousText
	 * @type Object
	 * @default null
	 **/
	this.previousText = null;
	
	/**
	 * This presents the current browser version
	 * @property taskQueue
	 * @type Object
	 * @default null
	 **/
	this.taskQueue = [];	
	
	/**
	 * This presents the current browser version
	 * @property removedLinesUUIDs
	 * @type Object
	 * @default null
	 **/
	this.removedLinesUUIDs = [];
	
	/**
	 * This presents the current browser version
	 * @property userID
	 * @type Object
	 * @default null
	 **/	
	this.userID = null;
	
	/**
	 * This presents the current browser version
	 * @property updatingProcessRunning
	 * @type Object
	 * @default null
	 **/
	this.updatingProcessRunning = false;
	
	/**
	 * This presents the current browser version
	 * @property playbackMode
	 * @type Object
	 * @default null
	 **/
	this.playbackMode = false;
	
	/**
	 * This presents the current browser version
	 * @property takeDiffs
	 * @type Object
	 * @default null
	 **/
	this.takeDiffs = true;
	
	/**
	 * This presents the current browser version
	 * @property storedLines
	 * @type Object
	 * @default null
	 **/
	this.storedLines = {};
	
	/**
	 * This presents the current browser version
	 * @property contents
	 * @type Object
	 * @default null
	 **/
	this.contents = null;
};

org.uizard.core.collaboration.edit.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor
	 * @param {Object} target 
	 **/
	init: function(target) {
		var self = this;
		
		this.target = target;
		  		
  		this.previousText = this.getEditableContent();
  		
  		this.taskQueue = [];
  		this.removedLinesUUIDs = [];
 		
  		this.storedLines = {};

  		
      	$(this.target).append("<div style='padding:5px;'><div id='collaboration.edit' contenteditable='true' spellcheck='false' style='list-style-type:none;'></div></div>");
      	$(this.target).find("[id='collaboration.edit']").append("<div><p id='line1'>test</p></div>");
      	
      	
      	
  		
  		this.diffWorker = new Worker('./module/org.uizard.core.collaboration/collaboration.edit.worker.diff.js');
  		this.patchWorker = new Worker('./module/org.uizard.core.collaboration/collaboration.edit.worker.patch.js');
  		
  		this.diffWorker.onmessage = function(ev){
			var uuid = ev.data.id;
			var content = ev.data.changes;
		
			// send the diff to server via the open socket
			//if(ev.data != "send_snapshot")
			var line_msg = {"uuid": uuid, "content": content };
			
			self.socket.send('{ "type": "modify_line", "message": ' + JSON.stringify(line_msg) + '}');
		};
		
		this.patchWorker.onmessage = function(ev){
			var patching_uuid = ev.data[0];
			var patch_user_id = ev.data[1];
			var changed_content = ev.data[2];
			var modifying_line = $(self.target).find("[data-uuid=" + patching_uuid + "]");
		
			if(changed_content != ""){
				$(modifying_line).html(changed_content);
		
				//update the stored line in hash
				self.storedLines[patching_uuid] = {"content": changed_content}
			}
		};
		  
		  
		var checkForUpdates = function() {
			if(self.taskQueue.length > 0 && self.updatingProcessRunning == false) {
				var current_update = self.taskQueue.shift(); 
	
				if(current_update["channel"] != "chat"){
					if(!self.playbackMode && (current_update["payload"]["user"] == self.userID))
						return false;
				}
		
				self.updatingProcessRunning = true;
				
				self.applyUpdate(current_update["channel"], current_update["payload"]);
			}
		};
  
  		var inspectLineChanges = function (i) {
			
			//get all lines inside editable area
			var editable_lines = $(self.target).find("[id='collaboration.edit']").find("div").find("p");
			
			//first get the uuids of all the stored lines in to an array
			for(var line_uuid in self.storedLines){
				self.removedLinesUUIDs.push(line_uuid); 
			}
	
			//iterate throught all lines in the editable area
			editable_lines.each(function(i){
				//get the uuid of the line
				var uuid = $(this).attr('data-uuid');
				var prev_uuid = $(this).prev('p').attr('data-uuid') || '';
				var next_uuid = $(this).next('p').attr('data-uuid') || '';
				var content = $(this).text();
	
				//console.log(uuid);
				
				//is this a newly added line?
	      		//all previously stored lines will have a unique uuid
				//when a new line is added browser copies the attributes of the previous line as is
				//also a new line could be without a uuid (first line & pasted lines)
				if(uuid == undefined || uuid == prev_uuid) {
					//this is a newly added line

					//give it a new id
					$(this).attr('id', "line" + editable_lines.length);
					
					//give it a new uuid
					var new_uuid =  self.generateUUID();
					$(this).attr('data-uuid', new_uuid);
					
					//store it in the hash
					self.storedLines[new_uuid] = {
						"content": content
					}
					
					//send 'add line' message to server
					var line_msg = {
						"uuid": new_uuid,
						"previous_uuid": prev_uuid,
						"next_uuid": next_uuid,
						"content": content
					}
					
					////console.log(line_msg);
					self.socket.send('{"type": "add_line", "message":' + JSON.stringify(line_msg) + '}');
				}
				else {
					if (self.storedLines[uuid]) {
						//check whether this exisiting line was updated
						if(self.storedLines[uuid].content.length != $(this).text().length || self.storedLines[uuid].content != $(this).text()){
		
							//send off to diff worker to take the diff and update the server
							self.diffWorker.postMessage([uuid, self.storedLines[uuid].content, $(this).text()]);
							
							//update the stored line in hash
							self.storedLines[uuid] = {"content": $(this).text()}
						}
					}
						
					//uncheck this lines uuid from removed lines array
					self.removedLinesUUIDs.splice(self.removedLinesUUIDs.indexOf(uuid), 1);
				}
			});
	
			//work with deleted lines
			if(self.removedLinesUUIDs.length > 0){
				//iterate through the stale uuids
				$.each(self.removedLinesUUIDs, function(){
					//remove the line from hash
					delete self.storedLines[this];
	
					//send 'remove line' message to server
					var line_msg = {"uuid": this}
					self.socket.send('{"type": "remove_line", "message":' + JSON.stringify(line_msg) + '}');
				});
			}
		};
		
		//Client Socket Methods
 		this.socket = new WebSocket('ws://localhost:8090');
 		this.socket.onmessage = function(ev){
 			
 			if(!ev.data) return false;

			var received_msg = JSON.parse(ev.data);

			switch(received_msg["channel"]){
				case "initial":
					self.userID = received_msg["id"];
					m.s("userID:" + self.userID);
					
					for(var user_index in received_msg["users"]){
						//self.addUser(received_msg["users"][user_index]);
					}
					
 					
  					self.setCollaborationData("!refresh");

					// periodically check for available updates and apply them
					window.setInterval(checkForUpdates, 1000);

					// periodically send the content for syntax highlighting
					window.setInterval(inspectLineChanges, 999);

					break;
				case "add_line":
					//store the update in the queue
					self.taskQueue.push(received_msg);
					break;
				case "modify_line":
					//store the update in the queue
					self.taskQueue.push(received_msg);
					break;
				case "remove_line":
					//store the update in the queue
					self.taskQueue.push(received_msg);
					break;
				case "playback_done":
         			//store the update in the queue
					self.taskQueue.push(received_msg);
					break;
				default:
					//console.log(received_msg);
			}
		}
		
		
		$(this.target).find("[id='collaboration.edit']").keydown(function(ev){
			//don't delete the beyond p
			if(ev.keyCode == 8 || ev.keyCode == 46){
				var editing_lines = $(self.target).find("[id='collaboration.edit']").find("div").find("p");
				if(editing_lines.length == 1 && $(editing_lines[0]).html() == ""){
					$(editing_lines[0]).html("&nbsp;");
					return false;
				}
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method load 
	 * @param {String} filepath The path of the file.
	 * @param {String} filename The name of the file.
	 * @param {String} filetype The type of the file.
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
				self.setCollaborationData(data);
				self.contents = data;
				
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
	 * @method save 
	 **/
	save: function () {
		var self = this;
		
		var url = "module/org.uizard.core.file/file.putContents.php";
		var path = this.filepath + "/" + this.filename;
		
		var data = this.getCollaborationData();
		
		$.ajax({
			url: url,			
			type: "POST",
			data: { path: path, data: data },
			success: function(data) {
				m.s("save complete!", "editor");
				self.setCollaborationData(data);
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method getEditableContent 
	 **/
	getEditableContent: function() {
		var editable_content = this.getCollaborationData();

	    return editable_content;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method applyUpdate 
	 * @param {Object} action The action.
	 * @param {Object} update The update.
	 **/
	applyUpdate: function(action, update){
			
		switch(action) {
			case "add_line":
				this.addLine(update);
				break;
			case "modify_line":
				this.modifyLine(update);
				break;
			case "remove_line":
				this.removeLine(update);
				break;
			case "playback_done":
				this.playback_mode = false;
				break;
			default:
				//console.log("invalid update");
		};
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addLine 
	 * @param {Object} payload The payload.
	 **/  
	addLine: function(payload){
		
		var content = payload["message"]["content"];
		//new line html
		 var new_line = $("<p data-uuid='" + payload["message"]["uuid"] + "'>" + content + "</p>");
		//var new_line = content;
	
		//find the line with next uuid
		var next_line = $(this.target).find("[data-uuid =" + payload["message"]["next_uuid"] + "]");
		var previous_line = $(this.target).find("[data-uuid =" + payload["message"]["previous_uuid"] + "]");
	
		if(next_line.length > 0) {
			//insert before next uuid
			//console.log("next_line");
			next_line.before(new_line);
		}
		// else find the line with previous uuid
		else if(previous_line.length > 0) {
			//insert after previous uuid
			//console.log("prev_line");
			previous_line.after(new_line);
		}
		else {
			// insert as the first line
			$(this.target).find("[id='collaboration.edit']").find("div").append(new_line);
		}
	
		//highlight the line
		//this.highlightUserEdit(new_line, payload["user"]);
	
		//apply syntax highlighting
		//this.applySyntaxHighlighting(new_line);
	
		//update the stored line in hash
		this.storedLines[payload["message"]["uuid"]] = {
			"content": payload["message"]["content"]
		};
	
		this.updatingProcessRunning = false;
		
		////console.log("added a line : " + content); 
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method modifyLine 
	 * @param {Object} payload The payload.
	 **/    
	modifyLine: function(payload){
		//find the line with uuid
		var uuid = payload["message"]["uuid"];
		var user_id = payload["user"];
		var patch = payload["message"]["content"];
	
		var current_text = $(this.target).find("[data-uuid=" + uuid + "]").text();
	
		// send the uuid, line content and diff to patch worker
		this.patchWorker.postMessage({
			"uuid": uuid,
			"patch": patch,
			"current_text": current_text,
			"user_id": this.userID
		});
		
		this.updatingProcessRunning = false;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method removeLine 
	 * @param {Object} payload The payload.
	 **/   
	removeLine: function(payload){
		var self = this;
		
		//find the line with uuid
		var uuid = payload["message"]["uuid"];
		var user_id = payload["user"];
		var line = $(this.target).find("[data-uuid=" + uuid + "]");

		line.remove();
		delete this.storedLines[uuid];
		
		this.updatingProcessRunning = false;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method generateUUID 
	 * @return {String} The result string.
	 **/   
	generateUUID: function(){
		//get the pad id
		var padid = "1";
	
		//get the user id
		var userid = this.userID;
	
		//get the current timestamp (in UTC)
		var d = new Date();
		var timestamp = $.map([d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),
		d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()], function(n, i) {
			return (n < 10) ? "0"+n : n;
		}).join("");
		//combine them and generate the UUID
		//format: padid_userid_timestamp
		return padid + "_" + userid + "_" + timestamp;
	}, 
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method doPlayback 
	 **/   
	doPlayback: function() {
		//send a request to get all the diffs available
		this.socket.send('{"type": "playback", "message":""}');
	
		//turn on the playback mode
		this.playbackMode = true;
	
		//clear everything (pad, chat, users)
		this.storedLines = {};
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setCollaborationData 
	 * @param {Object} contents The contents.
	 **/ 
	setCollaborationData: function(contents) {
		var self = this;
	
		if(contents) {
			if(contents == "!refresh") {
      			this.setCollaborationData(this.contents);
      			return false;
      		}
      		
	      	var originalContents = contents.split("\n");
	      	var result = "";
	      	
	      	$(originalContents).each(function (i){
	      		result += "<p id='line" + (i+1) + "' data-uuid='" + self.generateUUID() + "'>" + this + "</p>";
	      	});
	      	
	      	$(this.target).find("[id='collaboration.edit']").find("div").html(result);
	      	
	      	this.contents = contents;
      	}
      	else {
    		$(this.target).find("[id='collaboration.edit']").find("div").html("<p id='line1' data-uuid='" + this.generateUUID() + "'>&nbsp;</p>");
		}

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method getCollaborationData 
	 **/ 
	getCollaborationData: function() {
		
	}
  	
};

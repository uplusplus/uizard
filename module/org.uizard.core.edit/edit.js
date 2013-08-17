/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module edit
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class edit
 **/
org.uizard.core.edit = function () {
	/**
	 * This presents the current browser version
	 * @property target
	 **/
	this.target = null;
	
	/**
	 * This presents the current browser version
	 * @property editor
	 **/
	this.editor = null;
	
	/**
	 * This presents the current browser version
	 * @property findReplace
	 **/
	this.findReplace = null;
		
	/**
	 * This presents the current browser version
	 * @property filepath
	 * @type String
	 **/
	this.filepath = null;
	
	/**
	 * This presents the current browser version
	 * @property filename
	 * @type String
	 **/
	this.filename = null;
	
	/**
	 * This presents the current browser version
	 * @property filetype
 	 * @type String
	 **/
	this.filetype = null;
	
	/**
	 * This presents the current browser version
	 * @property stringProps
	 * @type String
	 **/
	this.stringProps = null;
	
	/**
	 * This presents the current browser version
	 * @property arrayProps
	 **/
	this.arrayProps = null;
	
	/**
	 * This presents the current browser version
	 * @property funcProps
	 **/
	this.funcProps = null;
	
	/**
	 * This presents the current browser version
	 * @property keywords
	 * @type String
	 **/
	this.keywords = null;
	
	/**
	 * This presents the current browser version
	 * @property collaboration
	 **/
	this.collaboration = null;
};

org.uizard.core.edit.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} target The target.
	 **/
	init: function (target) {
		var self = this;
		
		this.target = target;
		$(target).append("<textarea class='codeEditor'>Loading Data...</textarea>");
		//console.log($(target));
		this.editor = CodeMirror.fromTextArea($(target).find(".codeEditor")[0], {
			lineNumbers: true,
			matchBrackets: true,
			onKeyEvent: function(i, e) {
				// Hook into ctrl-space
				if (e.keyCode == 32 && (e.ctrlKey || e.metaKey) && !e.altKey) {
					e.stop();
					return self.startComplete();
				}
			}
		});
		
		this.setDictionary();
		
		//var findReplace = new org.uizard.core.edit.findReplace(this.editor, $(target).find(".codeEditor")[0]);
		//this.findReplace = new org.uizard.core.edit.findReplace();
		//this.findReplace.init(this.editor);
		//this.findReplace.init(this.editor, $(target));
		
		$(target).keypress(function (e) {
			if (!(e.which == 115 && e.ctrlKey)) return true;

			self.save();
			
			e.preventDefault();
			return false;
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method load 
	 * @param {String} filepath The path where the file is.
	 * @param {String} filename The name of the file.
	 * @param {String} filetype The type of the file.
	 **/
	load: function (filepath, filename, filetype) {
		var self = this;
		
		var url = "module/org.uizard.core.file/file.getContents.php";
		
		if (filetype == "url"){
			filename = "";
		}
		
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
				self.editor.setValue(data);
				
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
		
		var data = this.editor.getValue();
		
		$.ajax({
			url: url,			
			type: "POST",
			data: { path: path, data: data },
			success: function(data) {
				m.s("save complete!", "editor");
				self.editor.setValue(data);
			}
		});
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method saveAs 
	 * @param {String} filepath The path where the file will be.
	 * @param {String} filename The name of the file to be saved.
	 * @param {String} filetype The type of the file to be saved.
	 **/
	saveAs: function (filepath, filename, filetype) {
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method setDictionary 
	 **/
	setDictionary: function () {
		this.stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
                     "toUpperCase toLowerCase split concat match replace search").split(" ");
		this.arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
							"lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
		this.funcProps = "prototype apply call bind".split(" ");
		this.keywords = ("break case catch continue debugger default delete do else false finally for function " +
						  "if in instanceof new null return switch throw true try typeof var void while with").split(" ");
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method startComplete 
	 **/
	startComplete: function () {
		var self = this;
		
		// We want a single cursor position.
		if (this.editor.somethingSelected()) return;
		
		// Find the token at the cursor
		var cur = this.editor.getCursor(false);
		var token = this.editor.getTokenAt(cur);
		var tprop = token;
		
		// If it's not a 'word-style' token, ignore the token.
		if (!/^[\w$_]*$/.test(token.string)) {
		  token = tprop = {start: cur.ch, end: cur.ch, string: "", state: token.state,
						   className: token.string == "." ? "js-property" : null};
		}
		
		// If it is a property, find out what it is a property of.
		while (tprop.className == "js-property") {
		  tprop = editor.getTokenAt({line: cur.line, ch: tprop.start});
		  if (tprop.string != ".") return;
		  tprop = editor.getTokenAt({line: cur.line, ch: tprop.start});
		  if (!context) var context = [];
		  context.push(tprop);
		}
		
		var completions = this.getCompletions(token, context);
		
		if (!completions.length) return;
		
		function insert(str) {
			self.editor.replaceRange(str, {line: cur.line, ch: token.start}, {line: cur.line, ch: token.end});
		}
		
		// When there is only one completion, use it directly.
		if (completions.length == 1) {
			insert(completions[0]); 
			return true;
		}
	
		// Build the select widget
		$(this.target).append("<div class='completions'><select></select></div>")
		
		var divCompletion = $(this.target).find(".completions");
		var selCompletion = divCompletion.find("select");
		
		selCompletion.attr("multiple", true);
		
		
		
		for (var i = 0; i < completions.length; ++i) {
			selCompletion.append("<option>" + completions[i] + "</option>");
		}
		
		divCompletion.find("select:first-child").attr("selected", true);
		selCompletion.attr("size", Math.min(10, completions.length));
	
		
		var pos = this.editor.cursorCoords();
		
		divCompletion.css("left", pos.x - $(this.target).offset().left);
		divCompletion.css("top", pos.yBot - $(this.target).offset().top);
		
		// Hack to hide the scrollbar.
		/*
		if (completions.length <= 10)
		  complete.style.width = (sel.clientWidth - 1) + "px";
		*/
	
		var done = false;
		
		function close() {
			if (done) return;
			done = true;
			divCompletion.remove();
		}
		
		function pick() {
			insert(divCompletion.find("select option:selected").attr("value"));
			close();
			setTimeout(function() {
				self.editor.focus();
			}, 50);
		}
		
		selCompletion.bind("blur", close);
		selCompletion.bind("keydown", function(event) {
			var code = event.keyCode;
			// Enter and space
			if (code == 13 || code == 32) {
				//event.stop();
				pick();
			}
			// Escape
			else if (code == 27) {
				//event.stop(); 
				close(); 
				self.editor.focus();
			}
			else if (code != 38 && code != 40) {
				close(); 
				self.editor.focus(); 
				setTimeout(self.startComplete, 50);
			}
		});
		selCompletion.dblclick(pick);
	
		selCompletion.focus();
		
		// Opera sometimes ignores focusing a freshly created node
		if (window.opera) {
			setTimeout(function() {
				if (!done) selCompletion.focus();
			}, 100);
		}
		
		return true;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method getCompletions 
	 * @param {String} token The token.
	 * @param {String} context The context.
	 **/
	getCompletions: function (token, context) {
		var self = this;
		
		var found = [];
		var start = token.string;
		
		function maybeAdd(str) {
			if (str.indexOf(start) == 0) 
				found.push(str);
		}
		
		function gatherCompletions(obj) {
			if (typeof obj == "string") 
		  		this.forEach(self.stringProps, maybeAdd);
			else if (obj instanceof Array)
				this.forEach(self.arrayProps, maybeAdd);
			else if (obj instanceof Function)
				this.forEach(self.funcProps, maybeAdd);
			for (var name in obj)
				maybeAdd(name);
		}
	
		if (context) {
			// If this is a property, see if it belongs to some object we can
			// find in the current environment.
			var obj = context.pop(), base;
			
			if (obj.className == "js-variable")
				base = window[obj.string];
			else if (obj.className == "js-string")
				base = "";
			else if (obj.className == "js-atom")
				base = 1;
				
			while (base != null && context.length)
				base = base[context.pop().string];
				
			if (base != null) 
				gatherCompletions(base);
		}
		else {
			// If not, just look in the window object and any local scope
			// (reading into JS mode internals to get at the local variables)
			for (var v = token.state.localVars; v; v = v.next) {
				maybeAdd(v.name);
			}
				
			gatherCompletions(window);
			this.forEach(self.keywords, maybeAdd);
		}
		
		return found;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method stopEvent 
	 **/
	stopEvent: function () {
		if (this.preventDefault) {this.preventDefault(); this.stopPropagation();}
		else {this.returnValue = false; this.cancelBubble = true;}
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @method addStop
	 * @param {Event} event The event.
	 * @return {Event} 
	 **/
	addStop: function (event) {
		if (!event.stop) event.stop = this.stopEvent;
		return event;
	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method forEach 
	 * @param {Object} arr Target array.
	 * @param {Object} f 
	 **/
	forEach: function (arr, f) {
		for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
	}
};
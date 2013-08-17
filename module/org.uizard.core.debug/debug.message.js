/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module debug
 **/

/**
 * This is an UIzard code generator.  
 * <br>UIzard starts with this code generator.
 * @class message
 * @extends debug
 **/
org.uizard.core.debug.message = function () {

};

org.uizard.core.debug.message.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method m
	 * @param {String} text The text
	 * @param {String} from The source of the text 
	 **/
	m: function (text, from) {
		var header = "[MSG] ";
		var color = "black";
	
		$("#debug").prepend(this.makeMessage(header, color, text, from)); 
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method makeMessage 
	 * @param {String} header The header of a message.
	 * @param {String} color The color of font in the message.
	 * @param {String} text The contents of message.
	 * @param {String} from The source of the text.
	 **/
	makeMessage: function (header, color, text, from) {	
		var message = "<font color=" + color + ">";
		message += header + ": ";
		message += text;
		message += "</font>";
		message += "<font color='gray'>";
		message += " (from " + from + ")";
		message += "</font>";
		message += "<br>";
		
		return message;
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * <br>This operates the initialization tasks for layout, actions, plugins...
	 * @method clean 
	 **/
	clean: function () {
		$("#debug").html("");
	}
};
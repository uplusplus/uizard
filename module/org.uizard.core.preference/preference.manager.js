/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.uizard.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module preference.manager
 **/

/**
 * This is an UIzard code generator.  
 * UIzard starts with this code generator.
 * @class preference.dialog
 * @extends preference.manager
 **/
org.uizard.core.preference.manager = function () {
	this.ini = null;
	this.treeView = null;
};

org.uizard.core.preference.manager.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 * @param {Object} option The option.
	 **/
	init: function (option) {
	
	},
	addTreeView: function (treeView, xml){
		
		$(xml).find("plugin").find("tree").each(function(){
			$(this).find("item").each(function(){
				var tmpnode2 = new YAHOO.widget.TextNode($(this).attr("label"), treeView, false);
			});
		});
	},
	createTreeView: function (xml) {
		if ($(xml).find("tree").length > 0) {
			var treeView = new YAHOO.widget.TreeView("preferenceTreeview");
			
			$(xml).find("tree").each(function(){
				$(this).find("root").each(function(){
					var tmpnode = new YAHOO.widget.TextNode($(this).attr("label"), treeView.getRoot(), $(this).attr("expanded"));
					$(this).find("item").each(function(){
						var tmpnode2 = new YAHOO.widget.TextNode($(this).attr("label"), tmpnode, false);
					});
				});
			});
			treeView.render();
			this.treeView = treeView;
		}	
	},
	createTabView: function (xml) {
		
		var self = this;
		var tabView = null;
		if ($(xml).find("item").length > 0){
			$(xml).find("item").each(function(){
				if ($(this).find("tab").length > 0) {
					
					$("#preferenceTabview").append("<div id='"+$(this).attr("label")+"' style='display:none'></div>");
					tabView = new YAHOO.widget.TabView($(this).attr("label"));
					
					$(this).find("tab").each(function(){
						
						if($(this).attr("src")){
							var url = $(this).attr("src");
							var label = $(this).attr("label");
							$.ajax({
								type: "GET",
								dataType: "html",
								async: false,
								url: url,
								success: function(data) {
									var tab = new YAHOO.widget.Tab({ 
									    label: label, 
									    content: data, 
									});
									
									tabView.addTab(tab);
								}
							});
						}
						
					});

					tabView.set('activeIndex', 0);
					//tabView.appendTo("preferenceTabview");
				}
				else {
					var content="";
					if($(this).attr("src")){
						var label = $(this).attr("label");
						var url = $(this).attr("src");
						$.ajax({
							type: "GET",
							dataType: "html",
							url: url,
							success: function(data) {
								content=data;
								$("#preferenceTabview").append("<div class='yui-content' id='"+label+"' style='display:none'>"+content+"</div>");
							}
						});
					}
				}
			});
		}
		
		
		$(xml).find("root").each(function(){
			
			if($(this).attr("src")){
					
				var url = $(this).attr("src");
				var label = $(this).attr("label");
				$.ajax({
					type: "GET",
					dataType: "html",
					url: url,
					success: function(data) {
						$("#preferenceTabview").append("<div class='yui-content' id='"+label+"' style='display:none'>"+data+"</div>");
					}
				});
			}
		});
		
		
	},
	xmlParser: function (url) {
		var self=this;
		$.ajax({
			type: "GET",
			dataType: "xml",
			async :false,
			url: url,
			success: function(xml) {
				self.xml = xml;
			}
			, error: function(xhr, status, error) {alert(error); }
		});
	},
	iniParser: function () {
		var self=this;
		var url = "module/org.uizard.core.preference/preference.ini.parser.php";
		$.ajax({
			url: url,			
			type: "POST",
			async : false,
			success: function(data) {
				self.ini = self.unserialize(data);
				return this;
			}
		});
	},
	unserialize : function(data){
	    // Takes a string representation of variable and recreates it  
	    // 
	    // version: 810.114
	    // discuss at: http://phpjs.org/functions/unserialize
	    // +     original by: Arpad Ray (mailto:arpad@php.net)
	    // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
	    // +     bugfixed by: dptr1988
	    // +      revised by: d3x
	    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // %            note: We feel the main purpose of this function should be to ease the transport of data between php & js
	    // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays 
	    // *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
	    // *       returns 1: ['Kevin', 'van', 'Zonneveld']
	    // *       example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
	    // *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
	    
	    var error = function (type, msg, filename, line){throw new window[type](msg, filename, line);};
	    var read_until = function (data, offset, stopchr){
	        var buf = [];
	        var chr = data.slice(offset, offset + 1);
	        var i = 2;
	        while(chr != stopchr){
	            if((i+offset) > data.length){
	                error('Error', 'Invalid');
	            }
	            buf.push(chr);
	            chr = data.slice(offset + (i - 1),offset + i);
	            i += 1;
	        }
	        return [buf.length, buf.join('')];
	    };
	    var read_chrs = function (data, offset, length){
	        buf = [];
	        for(var i = 0;i < length;i++){
	            var chr = data.slice(offset + (i - 1),offset + i);
	            buf.push(chr);
	        }
	        return [buf.length, buf.join('')];
	    };
	    var _unserialize = function (data, offset){
	        if(!offset) offset = 0;
	        var buf = [];
	        var dtype = (data.slice(offset, offset + 1)).toLowerCase();
	        
	        var dataoffset = offset + 2;
	        var typeconvert = new Function('x', 'return x');
	        var chrs = 0;
	        var datalength = 0;
	        
	        switch(dtype){
	            case "i":
	                typeconvert = new Function('x', 'return parseInt(x)');
	                var readData = read_until(data, dataoffset, ';');
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 1;
	            break;
	            case "b":
	                typeconvert = new Function('x', 'return (parseInt(x) == 1)');
	                var readData = read_until(data, dataoffset, ';');
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 1;
	            break;
	            case "d":
	                typeconvert = new Function('x', 'return parseFloat(x)');
	                var readData = read_until(data, dataoffset, ';');
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 1;
	            break;
	            case "n":
	                readdata = null;
	            break;
	            case "s":
	                var ccount = read_until(data, dataoffset, ':');
	                var chrs = ccount[0];
	                var stringlength = ccount[1];
	                dataoffset += chrs + 2;
	                
	                var readData = read_chrs(data, dataoffset+1, parseInt(stringlength));
	                var chrs = readData[0];
	                var readdata = readData[1];
	                dataoffset += chrs + 2;
	                if(chrs != parseInt(stringlength) && chrs != readdata.length){
	                    error('SyntaxError', 'String length mismatch');
	                }
	            break;
	            case "a":
	                var readdata = {};
	                
	                var keyandchrs = read_until(data, dataoffset, ':');
	                var chrs = keyandchrs[0];
	                var keys = keyandchrs[1];
	                dataoffset += chrs + 2;
	                
	                for(var i = 0;i < parseInt(keys);i++){
	                    var kprops = _unserialize(data, dataoffset);
	                    var kchrs = kprops[1];
	                    var key = kprops[2];
	                    dataoffset += kchrs;
	                    
	                    var vprops = _unserialize(data, dataoffset);
	                    var vchrs = vprops[1];
	                    var value = vprops[2];
	                    dataoffset += vchrs;
	                    
	                    readdata[key] = value;
	                }
	                
	                dataoffset += 1;
	            break;
	            default:
	                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
	            break;
	        }
	        return [dtype, dataoffset - offset, typeconvert(readdata)];
	    };
	    return _unserialize(data, 0)[2];
	},
	
	plugin: function (pluginName) {
		this.pluginName = null;
		this.xml = null;
		this.version = null;
		this.url = null;
		this.preference = new Object();
	},
	
	validate: function(input,option){
		var valid=1;
		switch (option){
			case "required" : {
				if(!$(input).val().match(/[^.*]/)) {
				     alert($(input).attr("name")+": required");
				     valid=0;
				}
				break;
			}
			case "alpha" : {
				if(!$(input).val().match(/^[a-z ._-]+$/i)) {
					alert($(input).attr("name")+": only alphabet is needed");
				     valid=0;
				}
				break;
			}
			case "alphanum" : {
				if(!$(input).val().match(/^[a-z0-9 ._-]+$/i)) {
					alert($(input).attr("name")+": only alpha + number is needed");
				     valid=0;
				}
				break;
			}
			case "digit" : {
				if(!$(input).val().match(/^[-+]?[0-9]+$/)) {
					alert($(input).attr("name")+": only digit number is needed");
				     valid=0;
				}
				break;
			}
			case "nodigit" : {
				if(!$(input).val().match( /^[^0-9]+$/)) {
					alert($(input).attr("name")+": digit number is not needed");
				     valid=0;
				}
				break;
			}
			case "number" : {
				if(!$(input).val().match(/^[-+]?\d*\.?\d+$/)) {
					alert($(input).attr("name")+": only number is needed");
				     valid=0;
				}
				break;
			}
			case "email" : {
				if(!$(input).val().match(/^([a-zA-Z0-9_\.\-\+%])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
					alert($(input).attr("name")+": email is not valid");
				     valid=0;
				}
				break;
			}
			case "url" : {
				if(!$(input).val().match(/^(http|https|ftp)\:\/\/[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*$/i)) {
					alert($(input).attr("name")+": url is not valid");
				     valid=0;
				}
				break;
			}
		}
		return valid;
	}

};



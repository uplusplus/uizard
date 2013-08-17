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
 * @class findReplace
 * @extends edit
 **/
org.uizard.core.edit.findReplace = function () {
	/**
	 * This presents the current browser version
	 * @property dialog
	 * @type Object
	 * @default null
	 **/
	this.dialog = null;
	
	/**
	 * The array object that contains the information about buttons on the bottom of a dialog 
	 * @property buttons
	 * @type Object
	 * @default null
	 **/
	this.buttons = null;
	
	/**
	 * This presents the current browser version
	 * @property tabView
	 **/
	this.tabView = null;
	
	/**
	 * This presents the current browser version
	 * @property treeView
	 **/
	this.treeView = null;
	
	/**
	 * This presents the current browser version
	 * @property editor
	 **/
	this.editor = null;
	
	/**
	 * This presents the current browser version
	 * @property lastPos
	 **/
	this.lastPos = null;
	
	/**
	 * This presents the current browser version
	 * @property lastQuery
	 **/
	this.lastQuery = null;
	
	/**
	 * This presents the current browser version
	 * @property marked
	 **/
	this.marked = [];
	
	/**
	 * This presents the current browser version
	 * @property replaceFlag
	 **/
	this.replaceFlag = false;
	
};

org.uizard.core.edit.findReplace.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * @constructor 
	 **/
	init: function () { 
		var self = this;

		this.buttons = [ {text:"Find", handler:this.handleFind},
						 {text:"Replace/Find",  handler:this.handleReplaceF}, 
						 {text:"Replace",  handler:this.handleReplace},
						 {text:"Replace All",  handler:this.handleReplaceAll}];
		
		this.dialog = new org.uizard.core.edit.findReplace.dialog();
		this.dialog.init({
			title:"Find/Replace", 
			path:"../../config/dialog/org.uizard.core.edit/edit.findReplace.html",
			width:400,
			height:150,
			modal:false,
			buttons:this.buttons,
			draggable: true,
			success: function () {
				
			}
		});
		this.dialog = this.dialog.dialog;
		
	},

	handleFind: function() { 
		
		var windowManager = core.mainLayout.windowManager;
			
		// Get current activeWindow's editor
		if (windowManager.window[windowManager.activeWindow].editor) {
			
			// Get current activeWindow's CodeMirror editor
			var editor = windowManager.window[windowManager.activeWindow].editor.editor;
			
			// Get input query of this dialog
			var keyword = $(this.body).find("#query").val();
			
			// Call search function of org.uizard.core.file.findReplace with keyword and editor
			core.dialogFindReplace.search(keyword, editor);
		}
	},
	
	handleReplaceF: function() { 
		
		var windowManager = core.mainLayout.windowManager;
			
		// Get current activeWindow's editor
		if (windowManager.window[windowManager.activeWindow].editor) {
			
			// Get current activeWindow's CodeMirror editor
			var editor = windowManager.window[windowManager.activeWindow].editor.editor;
			
			// Get input query and replacing word of this dialog
			var keyword1 = $(this.body).find("#query").val();
			var keyword2 = $(this.body).find("#replace").val();
			
			// Call search function of org.uizard.core.file.findReplace with keyword and editor
			//core.dialogFindReplace.replace(keyword1, keyword2, editor);
			//core.dialogFindReplace.search(keyword1, editor);
			core.dialogFindReplace.replaceSearch(keyword1, keyword2, editor);
		}
	},
	
	handleReplace: function() { 
		
		var windowManager = core.mainLayout.windowManager;
			
		// Get current activeWindow's editor
		if (windowManager.window[windowManager.activeWindow].editor) {
			
			// Get current activeWindow's CodeMirror editor
			var editor = windowManager.window[windowManager.activeWindow].editor.editor;
			
			// Get input query and replacing word of this dialog
			var keyword1 = $(this.body).find("#query").val();
			var keyword2 = $(this.body).find("#replace").val();
			
			// Call search function of org.uizard.core.file.findReplace with keyword and editor
			core.dialogFindReplace.replace(keyword1, keyword2, editor);
		}
	},
	
	handleReplaceAll: function() { 
		
		var windowManager = core.mainLayout.windowManager;
			
		// Get current activeWindow's editor
		if (windowManager.window[windowManager.activeWindow].editor) {
			
			// Get current activeWindow's CodeMirror editor
			var editor = windowManager.window[windowManager.activeWindow].editor.editor;
			
			// Get input query and replacing word of this dialog
			var keyword1 = $(this.body).find("#query").val();
			var keyword2 = $(this.body).find("#replace").val();
			
			// Call search function of org.uizard.core.file.findReplace with keyword and editor
			core.dialogFindReplace.replaceAll(keyword1, keyword2, editor);
		}
	},
			
	unmark: function() {
	
	  for (var i = 0; i < this.marked.length; ++i) this.marked[i]();
	  this.marked.length = 0;
	  
	},
	
	replace: function (keyword1, keyword2, editor) {
	  this.unmark();

	  var text = keyword1,
	      replace = keyword2;
	  if (!text) return;

	  if (this.replaceFlag == false) {		  
		  var cursor = editor.getSearchCursor(text, this.lastPos);
		  cursor.findPrevious();
		  editor.replaceRange(replace, cursor.from(), cursor.to());
	  }
	  this.replaceFlag = true;
	},
	
	replaceAll: function (keyword1, keyword2, editor) {
	  this.unmark();
	  var text = keyword1,
	      replace = keyword2;
	  if (!text) return;
	  for (var cursor = editor.getSearchCursor(text); cursor.findNext();)
	    editor.replaceRange(replace, cursor.from(), cursor.to());
	},
	
	search: function (keyword, editor) {
	  // 이전 마킹 해제
	  this.unmark();     
	  
	  // 쿼리 값 얻기                
	  var text = keyword;
	  
	  // 쿼리 없으면 리턴
	  if (!text) return;
	  
	  // 쿼리 서치 결과 마킹, 저장
	  for (var cursor = editor.getSearchCursor(text); cursor.findNext();){
	    this.marked.push(editor.markText(cursor.from(), cursor.to(), "searched"));
	    //console.log(this.marked[0]);
	  }
	
	  // 새 쿼리로 검색 직후는 최종 검색 위치를 초기화
	  if (this.lastQuery != text) this.lastPos = null;
	  
	  // 최종 검색 위치가 없다면 커서위치에서부터 서치
	  var cursor = editor.getSearchCursor(text, editor.getCursor() || this.lastPos);
	  
	  // 다음 검색 결과가 없다면 커서를 문서 처음 위치로 변경
	  if (!cursor.findNext()) {
	    cursor = editor.getSearchCursor(text);
	    
	    // 검색 결과가 없다면 리턴
	    if (!cursor.findNext()) return;
	  }
	  
	  editor.setSelection(cursor.from(), cursor.to());
	  this.lastQuery = text; 
	  this.lastPos = cursor.to();
	  this.replaceFlag = false;
	},
	
	replaceSearch: function (keyword1, keyword2, editor) {
	  // 이전 마킹 해제
	  this.unmark();     
	  
	  // 쿼리 값 얻기                
	  var text = keyword1,
	      replace = keyword2;
	  
	  // 쿼리 없으면 리턴
	  if (!text) return;
	  
	  // 쿼리 서치 결과 마킹, 저장
	  for (var cursor = editor.getSearchCursor(text); cursor.findNext();){
	    this.marked.push(editor.markText(cursor.from(), cursor.to(), "searched"));
	  }
	
	  // 새 쿼리로 검색 직후는 최종 검색 위치를 초기화
	  if (this.lastQuery != text) this.lastPos = null;
	  
	  // 최종 검색 위치가 없다면 커서위치에서부터 서치
	  var cursor = editor.getSearchCursor(text, editor.getCursor() || this.lastPos);
	  
	  // 다음 검색 결과가 없다면 커서를 문서 처음 위치로 변경
	  if (!cursor.findNext()) {
	    cursor = editor.getSearchCursor(text);
	    
	    // 검색 결과가 없다면 리턴
	    if (!cursor.findNext()) return;
	  }
	  
	  editor.setSelection(cursor.from(), cursor.to());
	  this.lastQuery = text; 
	  this.lastPos = cursor.to();
	  editor.replaceRange(replace, cursor.from(), cursor.to());
	},

	/**
	 * This function is an UIzard core initializating function.  
	 * @method show 
	 **/
	show: function () {
		this.dialog.panel.show();
	}	
};
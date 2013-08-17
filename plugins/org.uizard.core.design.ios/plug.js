/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/

org.uizard.core.design.ios = function () {
	/**
	 * 
	 * @property name
	 * @type String
	 * @default "design.ios"
	 **/
	this.name = "design.ios";
	
	/**
	 * 
	 * @property stencilCSS
	 **/
	this.stencilCSS = "org.uizard.stencil.ios/stencil.ios.css";
	
	/**
	 * 
	 * @property windowManager
	 **/
	this.windowManager = null;
	

};

org.uizard.core.design.ios.prototype = {
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @constructor
	 **/
	init: function () {
		//console.log(this.name);
			
		this.windowManager = core.mainLayout.windowManager;
		
		
		//Loading CSS
		this.loadCSS();
		
		//Add Project Item
		this.addProjectItem();
		
		//Add Toolbar
		this.addToolbar();
		
		//Add Main Menu
		this.addMainMenu();
		
		//Add Context Menu
		this.addContextMenu();
				
		//Add Design.Canvas Skin
		this.addCanvasSkin();
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * @method loadCSS
	 **/
	loadCSS: function () {
		$("head").append("<link>");
	    var css = $("head").children(":last");
	    css.attr({
	    	rel:  "stylesheet",
	    	type: "text/css",
	    	href: "stencil/" + this.stencilCSS
	    });
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addProjectItem() 
	 * @return void
	 **/
	addProjectItem: function () {

		$("div[id='projectNew']").find(".projectTypes").append("<div class='projectWizardFirstButton' project-type='iosp' style='height:40px; padding:8px; border-bottom:1px solid #ccc; cursor:pointer;'><img src='plugins/org.uizard.core.design.ios/images/iPhone_4_2x.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><span style='margin-left:5px;'>iOS Projects</span></div>");
		
		$("div[id='projectNew']").find(".projectItems").append("<div class='projectWizardSecondButton all iosp' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;' description='  View-based Application을 위한 프로젝트를 생성합니다.' projecttype='iOS'><img src='plugins/org.uizard.core.design.ios/images/iPhone_4_2x.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br /><a>View-based</a></div>");
		$("div[id='projectNew']").find(".projectItems").append("<div class='projectWizardSecondButton all iosp' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;' description='  Window-based Application을 위한 프로젝트를 생성합니다.' projecttype='iOS'><img src='plugins/org.uizard.core.design.ios/images/iPhone_4_2x.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br /><a>Window-based</a></div>");
		$("div[id='projectNew']").find(".projectItems").append("<div class='projectWizardSecondButton all iosp' style='float:left; width:70px; height:70px; margin:5px; cursor:pointer;' description='  Navigation-based Application을 위한 프로젝트를 생성합니다.' projecttype='iOS'><img src='plugins/org.uizard.core.design.ios/images/iPhone_4_2x.png' style='width:40px; height:40px; vertical-align:middle; margin-bottom:3px;' /><br /><a>Navigation-based</a></div>");	

	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addToolbar() 
	 * @return void
	 **/
	addToolbar: function () {
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addMainMenu() 
	 * @return void
	 **/
	addMainMenu: function () {
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addContextMenu() 
	 * @return void
	 **/
	addContextMenu: function () {
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addToolBox() 
	 * @return void
	 **/
	addToolBox: function () {
		var self = this;
		
		$("#toolBox").append("<div id='toolios_title' class='toolTitle'>iOS UI Objects</div>");
		
		
		
		//Title : Class Diagram		
		//$("#toolBox").append("<div id='toolUML_classDiagram' class='toolCategory categoryIcon'>Class Diagram</div>");
		
		//Button
		$("#toolBox").append("<a href='#' action='addiosUIObject_button'><div id='toolios_UIObject_button' class='toolItem itemIconSquare'>Button</div></a>");
		
		// Radio Burron
		$("#toolBox").append("<a href='#' action='addiosUIObject_radioButton'><div id='toolios_UIObject_radioButton' class='toolItem itemIconSquare'>Radio Button</div></a>");
		
		// Label
		$("#toolBox").append("<a href='#' action='addiosUIObject_label'><div id='toolios_UIObject_label' class='toolItem itemIconSquare'>Label</div></a>");
		
		// Check Box
		$("#toolBox").append("<a href='#' action='addiosUIObject_checkBox'><div id='toolios_UIObject_checkBox' class='toolItem itemIconSquare'>Check Box</div></a>");
		
		/*
		//Class Diagram Tool : Aggregation
		$("#toolBox").append("<a href='#' action='addUMLClassDiagram_Aggregation'><div id='toolUML_ClassDiagram_Aggregation' class='toolItem itemIconLine'>Aggregation</div></a>");
		
		//Class Diagram Tool : Composition
		$("#toolBox").append("<a href='#' action='addUMLClassDiagram_Composition'><div id='toolUML_ClassDiagram_Composition' class='toolItem itemIconLine'>Composition</div></a>");
		
		//Class Diagram Tool : Interface
		$("#toolBox").append("<a href='#' action='addUMLClassDiagram_Interface'><div id='toolUML_ClassDiagram_Interface' class='toolItem itemIconLine'>Interface</div></a>");
		
		
		
		//Title : State Diagram		
		$("#toolBox").append("<div id='toolUML_stateDiagram' class='toolCategory categoryIcon'>State Diagram</div>");
		
		//State Diagram Tool : State
		$("#toolBox").append("<a href='#' action='addUMLStateDiagram_State'><div id='toolUML_StateDiagram_State' class='toolItem itemIconSquare'>State</div></a>");
		
		//State Diagram Tool : Start
		$("#toolBox").append("<a href='#' action='addUMLStateDiagram_Start'><div id='toolUML_StateDiagram_Start' class='toolItem itemIconSquare'>Start</div></a>");
		
		//State Diagram Tool : End
		$("#toolBox").append("<a href='#' action='addUMLStateDiagram_End'><div id='toolUML_StateDiagram_End' class='toolItem itemIconSquare'>End</div></a>");
		
		//State Diagram Tool : Transition
		$("#toolBox").append("<a href='#' action='addUMLStateDiagram_Transition'><div id='toolUML_ClassDiagram_Interface' class='toolItem itemIconLine'>Transition</div></a>");
		
		
		
		//Title : Sequence Diagram		
		$("#toolBox").append("<div id='toolUML_sequenceDiagram' class='toolCategory categoryIcon'>Sequence Diagram</div>");
		
		//Sequence Diagram Tool : Timeline
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Timeline'><div id='toolUML_SequenceDiagram_Timeline' class='toolItem itemIconSquare'>Timeline</div></a>");
		
		//Sequence Diagram Tool : Actor
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Actor'><div id='toolUML_SequenceDiagram_Actor' class='toolItem itemIconSquare'>Actor</div></a>");
		
		//Sequence Diagram Tool : Sequence
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Sequence'><div id='toolUML_SequenceDiagram_Sequence' class='toolItem itemIconSquare'>Sequence</div></a>");
		
		//Sequence Diagram Tool : Initialize
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Initialize'><div id='toolUML_SequenceDiagram_Initialize' class='toolItem itemIconLine'>Initialize</div></a>");
		
		//Sequence Diagram Tool : Return
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Return'><div id='toolUML_SequenceDiagram_Return' class='toolItem itemIconLine'>Return</div></a>");
		
		//Sequence Diagram Tool : Asynchronous
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Asynchronous'><div id='toolUML_SequenceDiagram_Asynchronous' class='toolItem itemIconLine'>Asynchronous</div></a>");
		
		//Sequence Diagram Tool : Synchronous
		$("#toolBox").append("<a href='#' action='addUMLSequenceDiagram_Synchronous'><div id='toolUML_SequenceDiagram_Synchronous' class='toolItem itemIconLine'>Synchronous</div></a>");
		
		
		
		//Title : Activity Diagram		
		$("#toolBox").append("<div id='toolUML_activityDiagram' class='toolCategory categoryIcon'>Activity Diagram</div>");
		
		//Activity Diagram Tool : Start
		$("#toolBox").append("<a href='#' action='addUMLActivityDiagram_Start'><div id='toolUML_ActivityDiagram_Start' class='toolItem itemIconSquare'>Start</div></a>");
		
		//Activity Diagram Tool : End
		$("#toolBox").append("<a href='#' action='addUMLActivityDiagram_End'><div id='toolUML_ActivityDiagram_End' class='toolItem itemIconSquare'>End</div></a>");

		//Activity Diagram Tool : Activity
		$("#toolBox").append("<a href='#' action='addUMLActivityDiagram_Activity'><div id='toolUML_ActivityDiagram_End' class='toolItem itemIconSquare'>Activity</div></a>");
		
		//Activity Diagram Tool : Parallel_Vertical
		$("#toolBox").append("<a href='#' action='addUMLActivityDiagram_ParallelVertical'><div id='toolUML_ActivityDiagram_ParallelVertical' class='toolItem itemIconSquare'>Parallel(Vertical)</div></a>");
		
		//Activity Diagram Tool : Parallel_Horizontal
		$("#toolBox").append("<a href='#' action='addUMLActivityDiagram_ParallelHorizontal'><div id='toolUML_ActivityDiagram_ParallelHorizontal' class='toolItem itemIconSquare'>Parallel(Horizontal)</div></a>");
		
		//Activity Diagram Tool : ControlFlow
		$("#toolBox").append("<a href='#' action='addUMLActivityDiagram_ControlFlow'><div id='toolUML_ActivityDiagram_ControlFlow' class='toolItem itemIconLine'>ControlFlow</div></a>");
		
		
		
		//Title : Usecase Diagram		
		$("#toolBox").append("<div id='toolUML_usecaseDiagram' class='toolCategory categoryIcon'>Use Case Diagram</div>");
		
		//Usecsae Diagram Tool : Usecase
		$("#toolBox").append("<a href='#' action='addUMLUsecaseDiagram_Usecase'><div id='toolUML_UsecaseDiagram_Usecase' class='toolItem itemIconSquare'>Use case</div></a>");
		
		//Usecsae Diagram Tool : Usecase_round
		$("#toolBox").append("<a href='#' action='addUMLUsecaseDiagram_Usecase_round'><div id='toolUML_UsecaseDiagram_Usecase_round' class='toolItem itemIconSquare'>Use case(round)</div></a>");
		
		//Usecsae Diagram Tool : Extends
		$("#toolBox").append("<a href='#' action='addUMLUsecaseDiagram_Extends'><div id='toolUML_UsecaseDiagram_Extends' class='toolItem itemIconLine'>Extends</div></a>");
		
		//Usecsae Diagram Tool : Includes
		$("#toolBox").append("<a href='#' action='addUMLUsecaseDiagram_Includes'><div id='toolUML_UsecaseDiagram_Includes' class='toolItem itemIconLine'>Includes</div></a>");
		*/
		
		
		// Add Fuctions

		// Button
		$("a[action=addiosUIObject_button]").click(function () {
			var shapeAdapter = "org.uizard.stencil.ios/uiobject.button";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.ios");
			}
		});	
		
		
		// Radio Button
		$("a[action=addiosUIObject_radioButton]").click(function () {
			var shapeAdapter = "org.uizard.stencil.ios/uiobject.radioButton";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.ios");
			}
		});	
		
		
		// Label
		$("a[action=addiosUIObject_label]").click(function () {
			var shapeAdapter = "org.uizard.stencil.ios/uiobject.label";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.ios");
			}
		});	
		
		// Check Box
		$("a[action=addiosUIObject_checkBox]").click(function () {
			var shapeAdapter = "org.uizard.stencil.ios/uiobject.checkBox";
			//classdiagram.inheritance
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.ios");
			}
		});	
		/*		
		//Class Diagram : Aggregation
		$("a[action=addUMLClassDiagram_Aggregation]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/classdiagram.aggregation";
			//classdiagram.aggregation
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Class Diagram : Composition
		$("a[action=addUMLClassDiagram_Composition]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/classdiagram.composition";
			//classdiagram.composition
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Class Diagram : Interface
		$("a[action=addUMLClassDiagram_Interface]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/classdiagram.interface";
			//classdiagram.interface
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter, {dashed:true});	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		


		//State Diagram : State
		$("a[action=addUMLStateDiagram_State]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/statediagram.state";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//State Diagram : Start		
		$("a[action=addUMLStateDiagram_Start]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/statediagram.start";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//State Diagram : End
		$("a[action=addUMLStateDiagram_End]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/statediagram.end";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//State Diagram : Transition
		$("a[action=addUMLStateDiagram_Transition]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/statediagram.transition";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
	
		
		//Sequence Diagram : Timeline
		$("a[action=addUMLSequenceDiagram_Timeline]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.timeline";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Sequence Diagram : Actor
		$("a[action=addUMLSequenceDiagram_Actor]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.actor";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Sequence Diagram : Actor
		$("a[action=addUMLSequenceDiagram_Sequence]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.sequence";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Sequence Diagram : Initialize
		$("a[action=addUMLSequenceDiagram_Initialize]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.initialize";
			//sequencediagram.initialize
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter, {dashed:true});	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Sequence Diagram : Return
		$("a[action=addUMLSequenceDiagram_Return]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.return";
			//sequencediagram.return
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter, {dashed:true});	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Sequence Diagram : Asynchronous
		$("a[action=addUMLSequenceDiagram_Asynchronous]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.asynchronous";
			//sequencediagram.asynchronous
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Sequence Diagram : Synchronous
		$("a[action=addUMLSequenceDiagram_Synchronous]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/sequencediagram.synchronous";
			//sequencediagram.synchronous
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		
		
		//Activity diagram : Start
		$("a[action=addUMLActivityDiagram_Start]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/activitydiagram.start";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//Activity diagram : End
		$("a[action=addUMLActivityDiagram_End]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/activitydiagram.end";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//Activity diagram : Activity
		$("a[action=addUMLActivityDiagram_Activity]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/activitydiagram.activity";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//Activity diagram : Parallel_Vertical
		$("a[action=addUMLActivityDiagram_ParallelVertical]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/activitydiagram.parallel_vertical";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//Activity diagram : Parallel_Horizontal
		$("a[action=addUMLActivityDiagram_ParallelHorizontal]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/activitydiagram.parallel_horizontal";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//Activity Diagram : ControlFlow
		$("a[action=addUMLActivityDiagram_ControlFlow]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/activitydiagram.controlflow";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Usecase Diagram : Usecase(box)
		$("a[action=addUMLUsecaseDiagram_Usecase]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/usecasediagram.usecase";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Usecase Diagram : Usecase(round)
		$("a[action=addUMLUsecaseDiagram_Usecase_round]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/usecasediagram.usecase_round";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("square", shapeAdapter);	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("square");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});
		
		//Usecase Diagram : Extends
		$("a[action=addUMLUsecaseDiagram_Extends]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/usecasediagram.extends";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter, {dashed:true});	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		
		//Usecase Diagram : Includes
		$("a[action=addUMLUsecaseDiagram_Includes]").click(function () {
			var shapeAdapter = "org.uizard.stencil.uml/usecasediagram.includes";
			
			if (self.windowManager.window[self.windowManager.activeWindow].designer) {
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.add("line", shapeAdapter, {dashed:true});	
				self.windowManager.window[self.windowManager.activeWindow].designer.canvas.setDrawingMode("line");
			}
			else {
				m.er("Active window does not have a desginer!", "plugin: design.uml");
			}
		});	
		*/
		
	},
	
	/**
	 * This function is an UIzard core initializating function.  
	 * This operates the initialization tasks for layout, actions, plugins...
	 * First written: Sung-tae Ryu 
	 * Latest modified: Sung-tae Ryu 
	 * @method addToolBox() 
	 * @return void
	 **/
	addCanvasSkin: function () {
		var self = this;
		
		org.uizard.core.window.panel.prototype.plug = function () {
			if (this.type == "uiDesigner") {
				this.designer.canvas.setSize(640, 960);	
				this.designer.canvas.setSkin("plugins/org.uizard.core.design.ios/images/iPhone_4_2x.png", 800, 1530);				
			}
		}
	}
};
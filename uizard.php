<!--
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
-->

<!doctype html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <!-- CSS : jquery -->
    <link rel="stylesheet" type="text/css" href="lib/com.jqueryui.code/ui-lightness/jquery-ui-1.8.12.custom.css" />
    
    <!-- CSS : yui -->
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/reset-fonts-grids/reset-fonts-grids.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/resize/assets/skins/sam/resize.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/layout/assets/skins/sam/layout.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/reset/reset.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/fonts/fonts.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/container/assets/skins/sam/container.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/tabview/assets/skins/sam/tabview.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/button/assets/skins/sam/button.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/colorpicker/assets/skins/sam/colorpicker.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/datatable/assets/skins/sam/datatable.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/editor/assets/skins/sam/simpleeditor.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/autocomplete/assets/skins/sam/autocomplete.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/calendar/assets/skins/sam/calendar.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/treeview/assets/skins/sam/treeview.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/slider/assets/skins/sam/slider.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/paginator/assets/skins/sam/paginator.css" />
    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/menu/assets/skins/sam/menu.css" />
    <link type="text/css" rel="stylesheet" href="http://yui.yahooapis.com/2.9.0/build/progressbar/assets/skins/sam/progressbar.css">
	<link type="text/css" rel="stylesheet" href="http://yui.yahooapis.com/2.9.0/build/carousel/assets/skins/sam/carousel.css">
	
    <!-- CSS : uizard -->
    <link rel="stylesheet" type="text/css" href="lib/net.codemirror.code/lib/codemirror.css" />
    <link rel="stylesheet" type="text/css" href="lib/net.codemirror.code/css/docs.css" />    
    <link rel="stylesheet" type="text/css" href="lib/net.codemirror.code/mode/xml/xml.css" />
    
    <!-- CSS : uizard -->
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.layout/default.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.layout/datatable.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.layout/treeview.project.css" />      
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.layout/toolBox.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.window/window.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.toolbar/toolbar.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.design/design.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.design/design.canvas.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.edit/edit.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.help/help.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.dialog/dialog.css" />    
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.object/object.explorer.css" />
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.preference/preference.theme.css" />    
    <link rel="stylesheet" type="text/css" href="config/css/org.uizard.core.collaboration/collaboration.chat.css" />       
    
    <!-- JS : jquery -->
    <script type="text/javascript" src="lib/com.jquery.code/jquery-1.5.2.min.js"></script>
    <script type="text/javascript" src="lib/com.jqueryui.code/jquery-ui-1.8.12.custom.min.js"></script>
    <script type="text/javascript" src="lib/com.jquery.code/jquery.hotkeys.js"></script>
    <script type="text/javascript" src="lib/com.jquery.code/jquery.timers.js"></script>
    <script type="text/javascript" src="lib/etc/undomanager.js"></script>

    
    <!-- JS : jquery library - form -->
    <script type="text/javascript" src="lib/com.malsup.jquery.code/jquery.form.js"></script>
    
    <!-- JS : yui -->
	<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/yahoo/yahoo.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/event/event.js" ></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/dom/dom.js" ></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/datasource/datasource-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/yahoo-dom-event/yahoo-dom-event.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/connection/connection-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/dragdrop/dragdrop-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/animation/animation-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/container/container-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/slider/slider-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/element/element-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/colorpicker/colorpicker-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/get/get-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/utilities/utilities.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/slider/slider-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/json/json-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/resize/resize-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/layout/layout-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/button/button-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/tabview/tabview-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/menu/menu.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/autocomplete/autocomplete-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/yuiloader/yuiloader.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/datatable/datatable-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/editor/editor-min.js"></script> 
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/editor/simpleeditor-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/calendar/calendar.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/treeview/treeview.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/charts/charts-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/paginator/paginator-min.js"></script>
    <script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/stylesheet/stylesheet-min.js"></script> 
	<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/progressbar/progressbar-min.js"></script>
	<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/carousel/carousel-min.js"></script>
	
	<!-- JS : codemirror -->
	<script type="text/javascript" src="lib/net.codemirror.code/lib/codemirror.js"></script>
	<script type="text/javascript" src="lib/net.codemirror.code/mode/xml/xml.js"></script>

	<!-- JS : uizard -->
    <script type="text/javascript" src="module/org.uizard.core/core.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.layout/layout.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.utility/utility.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.utility/utility.message.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.utility/utility.statusbar.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.debug/debug.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.debug/debug.message.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.console/console.js"></script>        
    <script type="text/javascript" src="module/org.uizard.core.console/console.message.js"></script>      
    <script type="text/javascript" src="module/org.uizard.core.window/window.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.window/window.panel.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.window/window.tab.js"></script>  
    <script type="text/javascript" src="module/org.uizard.core.window/window.manager.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.menu/menu.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.menu/menu.action.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.menu/menu.context.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.toolbar/toolbar.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.edit/edit.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.object/object.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.object/object.manager.js"></script>   
    <script type="text/javascript" src="module/org.uizard.core.object/object.explorer.js"></script>    
    <script type="text/javascript" src="module/org.uizard.core.object/object.properties.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.object/object.ui.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.object/object.ui.line.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.object/object.ui.square.js"></script>        
    <script type="text/javascript" src="module/org.uizard.core.design/design.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.design/design.canvas.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.design/design.canvas.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.design/design.canvas.objectexplorer.js"></script>    
    <script type="text/javascript" src="module/org.uizard.core.design/design.canvas.toolbar.js"></script>    
    <script type="text/javascript" src="module/org.uizard.core.design/design.canvas.preview.js"></script>    
    <script type="text/javascript" src="module/org.uizard.core.design/design.ruler.js"></script>  
    <script type="text/javascript" src="module/org.uizard.core.dialog/dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.dialog/dialog.confirmation.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.dialog/dialog.wizard.js"></script>    
    <script type="text/javascript" src="module/org.uizard.core.preference/preference.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.preference/preference.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.preference/preference.manager.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project._new.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project._new.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project.open.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project.open.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project.property.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project.property.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.project/project.property.manager.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file._new.js"></script>   
    <script type="text/javascript" src="module/org.uizard.core.file/file._new.dialog.js"></script>   
    <script type="text/javascript" src="module/org.uizard.core.file/file.open.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.open.dialog.js"></script>      
    <script type="text/javascript" src="module/org.uizard.core.file/file.saveAs.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.saveAs.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.rename.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.rename.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.switchWorkspace.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.switchWorkspace.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file._import.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file._import.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file._export.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file._export.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.file/file.property.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.property.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.openURL.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.file/file.openURL.dialog.js"></script>      
    <script type="text/javascript" src="module/org.uizard.core.edit/edit.findReplace.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.edit/edit.findReplace.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.chat.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.edit.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.design.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.joinProject.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.joinProject.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.settings.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.collaboration/collaboration.settings.dialog.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.codeGenerator/codeGenerator.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.contents.js"></script>
	
	
	
	<script type="text/javascript" src="module/org.uizard.core.shortcut/shortcut.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.shortcut/shortcut.manager.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.contents.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.search.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.search.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.tipsAndTricks.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.tipsAndTricks.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.checkForUpdates.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.checkForUpdates.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.installNewPlugin.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.installNewPlugin.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.about.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.help/help.about.dialog.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.scm/scm.js"></script>
	<script type="text/javascript" src="module/org.uizard.core.stencil/stencil.js"></script>
    <script type="text/javascript" src="module/org.uizard.core.localization/localization.js"></script>
    <script type="text/javascript" src="module/org.uizard.plugin/plugin.js"></script>
    <script type="text/javascript" src="module/org.uizard.plugin/plugin.manager.js"></script>
    <script type="text/javascript" src="module/org.uizard.plugin/plugin.loader.js"></script>
  
    
    <title>UIzard3</title>

    <script type="text/javascript">

		var ENV_COLLAPSE_BOTTOM = false;
		var ENV_COLLAPSE_RIGHT = false;

		var core = new org.uizard.core();
		var m = new org.uizard.core.utility.message();
		var d = new org.uizard.core.debug.message();
		var c = new org.uizard.core.console.message();
		var statusbar = new org.uizard.core.utility.statusbar();
		
		var confirmation = new org.uizard.core.dialog.confirmation();
		

	    $(document).ready(function () {
			

			
			//loading progress
			//core.dialog.loading.start();
			
			statusbar.init();
			
			//uizard initialize
			core.init("uizard");
			
			//core.mainLayout.innerRightTabView.selectTab(2);
			
			//uizard main process
			//core.main();
			
			//loading progress
			//core.dialog.loading.stop();
        });
    </script>


        
    </head>
    <body class="yui-skin-sam">
    
    	<!-- layout include phase (main div's id must be "uizard") -->
        <?php ?>

        <div id="uizard">
        
            <!-- Top -->
            <div id="uizardTop" class="yui-navset">
<?php include("config/menu/org.uizard.core.layout/mainMenu.html"); ?>

				<div id="uizardMainToolbar" class='mainToolbar'>
<?php //Need Plugin features ?>
<?php include("config/toolbar/org.uizard.core.file/file.toolbar.html"); ?>               	
<?php include("config/toolbar/org.uizard.core.edit/edit.toolbar.html"); ?>
<?php include("config/toolbar/org.uizard.core.window/window.toolbar.html"); ?>
<?php include("config/toolbar/org.uizard.core.design/design.toolbar.html"); ?>
<?php include("config/toolbar/org.uizard.core.collaboration/collaboration.toolbar.html"); ?>
                </div>
            </div>

            <!-- Left -->
            <div id="uizardLeft" class="yui-navset">
                
            </div>
			
            <!-- Center : inner layout -->
            <div id="uizardCenterInnerLayout" class="yui-navset">

                <!-- Inner layout : Right -->
                <div id="uizardInnerLayoutRight" class="yui-navset">
                                   
                </div>
                
                <!-- Inner layout : Center -->
                <div id="uizardInnerLayoutCenter" class="yui-navset">
                </div>
                
                <!-- Inner layout : Bottom -->
                <div id="uizardInnerLayoutBottom" class="yui-navset">
                    
                </div>
                
            </div>
            
            <!-- Bottom -->
            <div id="uizardBottom" class="yui-navset">
                
                <div style="float:left">
                    <!-- Statusbar message -->
                    <div id="uizardStatusbarBrowserVersion">
                        <div style="float:left; margin-right:4px;"><img src="config/image/org.uizard.core.layout/browser.png" /></div> <div class="browserName"></div>
                    </div>
                    
                    <!-- Statusbar progressbar -->
                    <div id="uizardStatusbarCollaboration">
                        <div style="float:left; margin-right:4px;"><img src="config/image/org.uizard.core.layout/share.png" /></div> <div class="isCollaborationOn">Collaboration Off</div>
                    </div>
                    
                    <!-- Statusbar progressbar -->
                    <div id="uizardStatusbarChat">
                        <div style="float:left; margin-right:4px;"><img src="config/image/org.uizard.core.layout/chat.png" /></div> <div class="isChatOn">Chat Off</div>
                    </div>
                </div>
                
                <div style="float:right">
                    <!-- Statusbar message -->
                    <div id="uizardStatusbarMessage">
                        
                    </div>
                    
                    <!-- Statusbar progressbar -->
                    <div id="uizardLoadingIndicator">
                        <img src="" />
                    </div>
                    
                    <!-- Statusbar progressbar -->
                    <div id="uizardProgressBar">
                        
                    </div>
                </div>
                
            </div>
            
        </div>
        
        <div id="uizardMenuContainer">
        	
        </div>
        
        <div id="uizardDialogContainer">
        	
        </div>
        
    </body>
</html>
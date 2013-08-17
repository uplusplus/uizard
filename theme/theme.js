var oMenuButton1 = new YAHOO.widget.Button("menubutton1", {  
	type: "menu",  
	menu: "menubutton1select" }); 	                                        
	                                        
//	"render" event handler for the Button's Menu
var onMenuRender = function (p_sType, p_aArgs,name) {
	this.addItems([
		{ text: name, value: name+".json" }
	]);
};

//	Add some additional MenuItems to the Button's Menu once it has been rendered
//	Click event listener for the second Button's Menu instance
var onMenuClick = function (p_sType, p_aArgs) {

	var oEvent = p_aArgs[0],	//	DOM event
		oMenuItem = p_aArgs[1];	//	MenuItem instance that was the target of the event

	if (oMenuItem) {
		//console.log($(oMenuItem.element).text());
		$("#menubutton1-button").html($(oMenuItem.element).text());
		
		var selectedTheme = $(oMenuItem.element).text();
		var dir = "theme/"+$(oMenuItem.element).text()+"/"+oMenuItem.value;
		
		//clear areaBox 
		$('#areaBox').children().each( function(n) { 
			$(this).remove(); 
		});
	
		$("#cssBoxdefault").remove();
		$("#cssBoxtop").remove();
		$("#cssBoxworkspace").remove();
		$("#cssBoxProjectExplorer").remove();
		$("#cssBoxbottom").remove();
		
		$.getJSON(dir, function(jd){
			for (var name in jd)
			{
				//alert(name);
				//top,workspace.....
				//$("#areaBox").append("<div class='themeName "+name+" "+selectedTheme+"'>"+name+"</div>");	
				$("#areaBox").append("<div class='themeName "+name+"' style='font-size:11px; height:20px;'>"+name+"</div>");	
			}
			var string = "";
			for (var name in jd)
			{
				var i=1;
				string+="<div id='cssBox"+name+"'>";
				for(var name2 in jd[name])
				{
					//alert(name2);
					//id,class name
					for(var name3 in jd[name][name2])
					{
						//alert(name3);
						//property
						string+="<div class='"+name+"wrap'><div class='"+name+"property"+i+"' style='float:left; margin-left:5px; font-size:11px'>"+name3+"</div>";
						string+="<input type='hidden' class='"+name+"idClassName"+i+"' value='"+name2+"'></input>";						
										
						//alert(jd[name][name2][name3]);
						//value
						string+="<input type='text' class='"+name+"cssValue"+i+"' value='"+jd[name][name2][name3]+"' style='width:80px; float:right; margin-right:5px; font-size:11px'></input>";

						if(name3.indexOf("color") > -1)
						{
							string+="<button style='width: 20px; height: 20px; border: 1px outset #666; float:right; margin-right:5px; cursor:pointer; background-color:"+jd[name][name2][name3]+";' class='colorbox' id='"+name+"ColorBox"+i+"'></button></div>";
						}
						
						else
							string+="</div>";

						i++;
					}
				}
				string+="</div>";

			}
			$(".themeContents").append(string);
			$(".themeContents").append("<div id='cssBoxdefault'></div>");
			
			$("#cssBoxdefault").show();
			$("#cssBoxtop").hide();
			$("#cssBoxworkspace").hide();
			$("#cssBoxProjectExplorer").hide();
			$("#cssBoxbottom").hide();
					
			$(".themeName").click(function(){
				$(".themeName").removeClass("selected");
				$(this).addClass("selected");
				
				$("#cssBoxdefault").hide();
				$("#cssBoxtop").hide();
				$("#cssBoxworkspace").hide();
				$("#cssBoxProjectExplorer").hide();
				$("#cssBoxbottom").hide();
				
				$("#cssBox"+$(this).text()).show();
			});
	
			$(".colorbox").click(function(){
				$(".yui-picker-panel").attr("colorbox",$(this).attr('id'));
				$(this).parent().children().each(function(){
					if($(this).attr("type")=="text")
					{
						$(".yui-picker-panel").attr("inputbox",$(this).attr('class'));			
					}
				});
				
				//$(".yui-picker-panel").attr($(this).attr("id"));
				$(".yui-picker-panel").css("left",this.offsetLeft+25+"px");
				$(".yui-picker-panel").css("top",this.offsetTop+"px");
				$(".yui-picker-panel").show();
				
				var rgb = colorToRgb($(this).css("background-color"));
				picker.setValue([rgb[0],rgb[1],rgb[2]]);
			});
			
			var onRgbChange = function(o) {
				$(picker).attr("newValue",o.newValue);
			}
			//subscribe to the rgbChange event;
			picker.on("rgbChange", onRgbChange);
		});
	}
};

oMenuButton1.getMenu().subscribe("click", onMenuClick); 

//apply 버튼 선택시 테마 적용
$("#btn2").click(function(event){	
	var i=1;		
	$(".topwrap").each(function(n){
		//console.log($(".topidClassName"+i).attr("value"));
		//console.log($(".topproperty"+i).text());
		//console.log($(".topcssValue"+i).attr("value"));
		$($(".topidClassName"+i).attr("value")).css($(".topproperty"+i).text(),$(".topcssValue"+i).attr("value"));

		i++;					
	});

	i=1;
	$(".workspacewrap").each(function(n){
		//console.log($(".workspaceidClassName"+i).attr("value"));
		//$(".property"+i).text()
		//$(".workspacecssValue"+i).attr("value")
		$($(".workspaceidClassName"+i).attr("value")).css($(".workspaceproperty"+i).text(),$(".workspacecssValue"+i).attr("value"));

		i++;					
	});
	
	i=1;
	$(".ProjectExplorerwrap").each(function(n){
		//console.log($(".ProjectExploreridClassName"+i).attr("value"));
		//$(".property"+i).text()
		//$(".ProjectExplorercssValue"+i).attr("value")
		$($(".ProjectExploreridClassName"+i).attr("value")).css($(".ProjectExplorerproperty"+i).text(),$(".ProjectExplorercssValue"+i).attr("value"));
		i++;					
	});

	i=1;
	$(".bottomwrap").each(function(n){
		//console.log($(".bottomidClassName"+i).attr("value"));
		//$(".property"+i).text()
		//$(".bottomcssValue"+i).attr("value")
		$($(".bottomidClassName"+i).attr("value")).css($(".bottomproperty"+i).text(),$(".bottomcssValue"+i).attr("value"));
		i++;					
	});
});
			
var postdata = {
	kind: "theme"
};

var sortingData;			
//select box 초기화
$.post("module/org.uizard.core.file/file.getNodes.php", postdata, function (data) {	
	sortingData = eval(data);
	for (var i in sortingData)
	{
		if(sortingData[i].cls=='folder')
		{
			oMenuButton1.getMenu().subscribe("render", onMenuRender,sortingData[i].filename);			
		}
	}
});

//color picker 			
var picker = new YAHOO.widget.ColorPicker("yui-picker", {
	showhsvcontrols: true,
	showhexcontrols: true,
	images: {
		PICKER_THUMB: "theme/assets/picker_thumb.png",
		HUE_THUMB: "theme/assets/hue_thumb.png"
	}
});

picker.setValue([255,255,255]);

function onButtonColorPickerOK(p_oEvent) {
	$("#"+$(".yui-picker-panel").attr("colorbox")).css("background-color", "rgb("+$(picker).attr("newValue")+")");
	$("."+$(".yui-picker-panel").attr("inputbox")).attr("value", "#"+picker.get("hex"));
	$(".yui-picker-panel").hide();
}

function onButtonColorPickerCancel(p_oEvent) {
	$(".yui-picker-panel").hide();
}

var oPushButton4 = new YAHOO.widget.Button("pushbutton4", { onclick: { fn: onButtonColorPickerOK } });
var oPushButton5 = new YAHOO.widget.Button("pushbutton5", { onclick: { fn: onButtonColorPickerCancel } });

var colorToRgb = function(temp){
	var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(temp);
	var red = parseInt(digits[2]);
	var green = parseInt(digits[3]);
	var blue = parseInt(digits[4]);
	var rgb=[red,green,blue];
	
	return rgb;
};
		
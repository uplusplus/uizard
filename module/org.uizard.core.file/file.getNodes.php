<?
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/


//this module return the directory structure data

//include("xmlClass.php");

if($_POST['kind'] == "project") {
	$DEFALUT_PROJECT_DIR = "../../project/";
	$projectName = $_POST['projectName'];
	
	$dir = $DEFALUT_PROJECT_DIR.$projectName;
	
	//echo $dir;


	filesInDir($dir, "");
}




//by eungwi
else if($_POST['kind'] == "theme") {
	$DEFALUT_THEME_DIR = "../../theme/";
	//$projectName = $_POST['projectName'];
	
	//$dir = $DEFALUT_PROJECT_DIR.$projectName;

	//echo $dir;


	filesInDir($DEFALUT_THEME_DIR, "");
}










else if($_POST['kind'] == "property") {

	getProperty();
}


function filesInDir($tdir, $tab)
{
	echo "[";
		   
	$dirs = scandir($tdir);
    
	for ($i=0; $i < count($dirs); $i++)
	{
		$filename = $dirs[$i];
		
		$comma = ",";
		if ($i == count($dirs) - 1) $comma = "";
		
		if (($filename !== '.') && ($filename != '..'))
		{
			echo "{";
	
			if (is_dir($tdir.'/'.$filename))
			{
				if (filetype($tdir.'/'.$filename) == "file")
					$cls = "file";
				else if(filetype($tdir.'/'.$filename) == "dir")
					$cls = "folder";
				
				$extension = array_pop(explode(".", $filename));
				
				
				if($cls == "file") {
					$label = "<div style=\'line-height:11px; white-space:nowrap; padding-right:4px;\'><img src=config/image/icons/filetype/".$extension.".filetype.png class=directoryIcon />".$filename."<div class=\'fullpath\' style=\'display:none\'>".$tdir.$filename."</div></div>";
				}
				else if($cls == "folder") {
					$label = "<div style=\'line-height:11px; white-space:nowrap; padding-right:4px;\'><img src=config/image/icons/filetype/folder.filetype.png class=directoryIcon />".$filename."<div class=\'fullpath\' style=\'display:none\'>".$tdir.$filename."</div></div>";
				}
				
				
				//$label = $filename;
				
				echo "\n\t".$tab."type: 'html',";	
				echo "\n\t".$tab."html: '".$label."',";
				echo "\n\t".$tab."filename: '".$filename."',";
				echo "\n\t".$tab."parentLabel: '".$tdir."',";
				echo "\n\t".$tab."cls: '".$cls."',";
				echo "\n\t".$tab."filetype: '".($extension)."',";
				echo "\n\t".$tab."expanded: false";	
				
				if(count(scandir($tdir.'/'.$filename)) > 2) {
					echo ",\n\t".$tab."children: ";
					filesInDir($tdir.'/'.$filename, $tab."\t");
				}
				else {
					//echo ",\n\t".$tab."children: []\n";
				}
			}
			else
			{
				if (filetype($tdir.'/'.$filename) == "file")
					$cls = "file";
				else if(filetype($tdir.'/'.$filename) == "dir")
					$cls = "folder";
					
				$extension = array_pop(explode(".", $filename));	
				
				
				if($cls == "file") {
					$label = "<div style=\'line-height:11px; white-space:nowrap; padding-right:4px;\'><img src=config/image/icons/filetype/".$extension.".filetype.png class=directoryIcon />".$filename."<div class=\'fullpath\' style=\'display:none\'>".$tdir.$filename."</div></div>";
				}
				else if($cls == "folder") {
					$label = "<div style=\'line-height:11px; white-space:nowrap; padding-right:4px;\'><img src=config/image/icons/filetype/folder.filetype.png class=directoryIcon />".$filename."<div class=\'fullpath\' style=\'display:none\'>".$tdir.$filename."</div></div>";
				}
				
				
				//$label = $filename;
				
				echo "\n\t".$tab."type: 'html',";	
				echo "\n\t".$tab."html: '".$label."',";
				echo "\n\t".$tab."filename: '".$filename."',";
				echo "\n\t".$tab."parentLabel: '".$tdir."',";
				echo "\n\t".$tab."cls: '".$cls."', ";
				echo "\n\t".$tab."filetype: '".$extension."',";
				echo "\n\t".$tab."expanded: true";	
				
				//echo "\n\t".$tab."leaf: true\n";
			}
			
			echo $tab."}".$comma;
			
			//if ($i !== count($dirs) - 1 && $i !== 0) echo "\n";
		}
	}
	
	echo "]\n";	
}

function getProperty() {
	
	if (file_exists('../config/xoz.xml')) {
    	$xml = simplexml_load_file('../config/xoz.xml');
		
		echo "{\"props\":[\n";
		echo "\t{\n";

		$count = count($xml->object->view->image->attributes());
		$i = 0;
		
		foreach($xml->object->view->image->attributes() as $a => $b) {
			$i++;
			echo "\t\t\"".$a."\":\"".$b."\"";
			
			if($i != $count)
				echo ",";
				
			echo "\n";
		}
		
		echo "\t}\n";
		echo "]}";
		
	} else {
    	exit('Failed to open test.xml.');
	}
	
}




?>
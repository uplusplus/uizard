<?
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/


//this module return the directory structure data

//include("xmlClass.php");


$DEFALUT_PLUGIN_DIR = "../../plugins/";
	
$dir = $DEFALUT_PLUGIN_DIR;

filesInDir($dir, "");



function filesInDir($tdir, $tab)
{
	echo "[";
		   
	$dirs = scandir($tdir);
    
	for ($i=0; $i < count($dirs); $i++)
	{
		$filename = $dirs[$i];
		
		$comma = ",";
		if ($i == count($dirs) - 1) $comma = "";
		
		if (($filename !== '.') && ($filename != '..') && ($filename != '.svn'))
		{
			echo "{";
	
			if (is_dir($tdir.'/'.$filename))
			{
				$extension = array_pop(explode(".", $filename));
				
				echo "\n".$tab."pluginName: '".$filename."'";
			}

			echo $tab."}".$comma;
			
			//if ($i !== count($dirs) - 1 && $i !== 0) echo "\n";
		}
	}
	
	echo "]\n";	
}


?>
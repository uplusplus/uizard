<?
/*
Copyright Ryu Sung Tae. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 2.0.0
*/

include("funcCodeZen.php");

//echo "Starting CodeZeneration...<br /><br />";

/* Get Parameter */
$PROJECT_DIRECTORY = $_POST['projectName'];

/* Set Parameter */

//$PATHXOZ 		=	"../projects/".$USER."/".$XOZ;
$PATHXOZ		=	$_POST['xozfile'];
//$PATHTEMPLATE	=	"../template/".$PLATFORM."/".$RULE."/";
//$PATHRULE		=	$PATHTEMPLATE."zen.rule";
$PATHTEMPLATE	=	$_POST['templateDir'];
$PATHGENERATED 	=	$_POST['generatedDir'];
$PATHRULE		=	$_POST['rulefile'];

$dirLib="../lib/";

/* Load XOZ */

if (file_exists($PATHXOZ)) {
	$xml_xozFile = simplexml_load_file($PATHXOZ);
/*	echo "<font color=green><b>XOZ file is successfully loaded.</b></font><br />";
	
	echo "<textarea style='border:1px solid #666; width:800px; height: 200px; font-size:12px;'>";
	echo file_get_contents($PATHXOZ);
	echo "</textarea><br /><br />";		*/
}
else {
	//echo "Failed to open XOZ file! (".$PATHXOZ.")<br />";
}

/* Load Rule */

if (file_exists($PATHRULE)) {
	$xml_zenRuleFile = simplexml_load_file($PATHRULE);
/*	echo "<font color=green><b>Zen Rule file is successfully loaded.</b></font><br />";	
	echo "<textarea style='border:1px solid #666; width:800px; height: 200px; font-size:12px;'>";
	echo file_get_contents($PATHRULE);
	echo "</textarea><br />";			*/
}
else {
	//echo "Failed to open Zen Rule file! (".$PATHRULE.")<br />";
}

/* Parsing Rule */

$countTemplateFiles = count($xml_zenRuleFile->filelist->file);

//echo "<br />".$countTemplateFiles." template files are founded...<br />";

for($i = 0; $i < $countTemplateFiles; $i++) {
//	echo ($i+1)." : ";
	foreach($xml_zenRuleFile->filelist->file[$i]->attributes() as $attr => $value) {
//		echo "\t\t".$attr." \"".$value."\"";
		if($attr == "from") $TEMPLATEFILE[$i] = $value;
	}
//	echo "<br />";
}

//echo "<br />";

$countRule = count($xml_zenRuleFile->rules->rule);

for($i = 0; $i < $countRule; $i++) {
	
	$countRuleTarget = count($xml_zenRuleFile->rules->rule[$i]->target);
	
//	echo "Rule ".($i+1)." : ".$xml_zenRuleFile->rules->rule[$i]->attributes()->template." Target List <br/>";
	
	for($j = 0; $j < $countRuleTarget; $j++) {
		foreach($xml_zenRuleFile->rules->rule[$i]->target[$j]->attributes() as $attr => $value) {
//			echo "\t\t".$attr." \"".$value."\"";
//			echo "<br />";
		}
		
	}
}

//echo "<br />";

/* Load Templates */

for($i = 0; $i < count($TEMPLATEFILE); $i++) {
	if (file_exists($PATHTEMPLATE.$TEMPLATEFILE[$i])) {
		$template[$i] = implode("", file($PATHTEMPLATE.$TEMPLATEFILE[$i]));
//		echo $TEMPLATEFILE[$i]." is successfully loaded.<br />";	
	}
	else {
//		echo "Failed to open Template file! (".$PATHRULE.")<br />";
	}
}

//echo "<br />";

/* Code Generation */

$xoz_object = $xml_xozFile->objects;
$xoz_elements = $xoz_object->children();
$count = count($xoz_elements);

//echo "<font color=#555555>";

for($i = 0; $i < count($TEMPLATEFILE); $i++) {	
	//echo "<br /><br /><font color=Orange>";
	//echo "#####################################################################<br />";
	//echo "<b>".$TEMPLATEFILE[$i]."</b><br />";
	//echo "#####################################################################</font><br />";
	
	$resultCode = $template[$i];
	
	for($j = 0; $j < count($xml_zenRuleFile->rules->rule[$i]->target); $j++) {
		if(ereg("\#\(", $xml_zenRuleFile->rules->rule[$i]->target[$j]['id']) && ereg("\)\#", $xml_zenRuleFile->rules->rule[$i]->target[$j]['id'])) {
			$id = getIDs($xoz_object);

			for($k = 0; $k < count($id); $k++) {
				$xozChild = getChildById($xoz_object, $id[$k]);
				
				$generatedCode = "\n".generateCode($xozChild, $xml_zenRuleFile->rules->rule[$i], $xml_zenRuleFile->rules->rule[$i]->target[$j]['id']);

				$anchor = str_replace("#(id)#", $id[$k], $xml_zenRuleFile->rules->rule[$i]->target[$j]['id']);
				
				$resultCode = str_replace("[{!".$anchor."!}]", $generatedCode, $resultCode);
			}
		}
		else {
			$generatedCode = "\n".generateCode($xoz_object, $xml_zenRuleFile->rules->rule[$i], $xml_zenRuleFile->rules->rule[$i]->target[$j]['id']);
			
			$resultCode = str_replace("[{!".$xml_zenRuleFile->rules->rule[$i]->target[$j]['id']."!}]", $generatedCode, $resultCode);
		}
	}

	$resultCodeDone[$i] = $resultCode;
	
	//echo "<pre>";
	//echo "<textarea style='border:1px solid #666; width:800px; height: 600px; font-size:12px;'>";
	//echo htmlspecialchars ($resultCodeDone[$i]);
	//echo "</textarea>";
	//echo "</pre>";
	
	$PREFIX = str_replace(".xoz", "", $_POST['xozfile']);
	$PREFIX = explode("/", $PREFIX);
	$PREFIX = $PREFIX[count($PREFIX)-1];
	$FILENAME = str_replace(".template", "", $TEMPLATEFILE[$i]);
	
	$fp = fopen($PATHGENERATED."/".$PREFIX.".".$FILENAME, "w");
	fwrite($fp, $resultCodeDone[$i]);
	fclose($fp);
	
	//if($_POST['mode'] == "codeview")  {
	echo $FILENAME."\n\n";
	echo $resultCode."\n\n\n";
	//}
}

//echo "</font>";

?>
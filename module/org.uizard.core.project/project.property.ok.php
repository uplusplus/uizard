<?php
	/*
	Copyright Sung-tae Ryu. All rights reserved.
	Code licensed under the GPL v2 License:
	http://www.uizard.org/License
	version: 3.0.0
	*/
	
	$message = "";
	$errCode = 0;
	
	if($_POST['inputProjectAuthor'] != "" && $_POST['inputProjectName'] != "" /*&& $_POST['inputProjectAbout'] != "" && $_POST['inputProjectType'] != "" && $_POST['inputProjectDetailedType'] != ""*/) {
	
		// Parsing input data
		$type = $_POST['inputProjectType'];
		$detailedType = $_POST['inputProjectDetailedType'];
		$author = $_POST['inputProjectAuthor'];
		$projectName = $_POST['inputProjectName'];
		$date = $_POST['inputProjectDate'];
		$about = $_POST['inputProjectAbout'];
				
		// Overwrite them
		$tmp = fopen("../../project/".$author."_".$projectName."/project.xml", 'w');
		$fileStr  = '<?xml version="1.0" encoding="utf-8"?>';
		$fileStr .= '<PROJECT>';
		$fileStr .= '<TYPE>'.$type.'</TYPE>';
		$fileStr .= '<DETAILEDTYPE>'.$detailedType.'</DETAILEDTYPE>';
		$fileStr .= '<AUTHOR>'.$author.'</AUTHOR>';
		$fileStr .= '<NAME>'.$projectName.'</NAME>';
		$fileStr .= '<ABOUT>'.$about.'</ABOUT>';
		$fileStr .= '<DATE>'.$date.'</DATE>';
		$fileStr .= '</PROJECT>';

		fwrite($tmp , $fileStr);
		fclose($tmp);
			
	}
	else {
		$message = "Error : Author or Project name is null";
		$errCode = 4;
	}
	
	if($errCode==0) {
		$message = "Updating changes of project property complete";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'", "author":"'.$author.'", "projectName":"'.$projectName.'", "type":"'.$type.'"}';
?>
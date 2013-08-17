<?php
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/
	$message = "";
	$errCode = 0;

	if($_POST['inputFileName'] != "" && $_POST['currentProjectPath'] != "") {
	
		$inputFileName = $_POST['inputFileName'];
		$inputFileType = $_POST['inputFileType'];
		$currentProjectPath = $_POST['currentProjectPath'];
						
		$tmp = fopen("../../project/".$currentProjectPath.$inputFileName.".".$inputFileType, 'w');
		fwrite($tmp , "");
		fclose($tmp);
		
		if(!is_file("../../project/".$currentProjectPath.$inputFileName.".".$inputFileType)) {
			$message = "Error : can not make file";
			$errCode = 1;
		}
			
	}
	else {
		$message = "Error : file name or file type is null";
		$errCode = 2;
	}
	
	if($errCode==0) {
		$message = "Making the new project is done.";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'", "author":"'.$author.'", "projectName":"'.$projectName.'"}';
?>
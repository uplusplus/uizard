<?php
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/
	$message = "";
	$errCode = 0;

	if($_POST['selectedFilePath'] != "" && $_POST['selectedFileName'] != "" && $_POST['inputFileName'] != "") {
	
		$filePath = $_POST['selectedFilePath'];
		$fileName = $_POST['selectedFileName'];
		$inputFileName = $_POST['inputFileName'];
				
		// make directory for user and project
		if(!is_dir($filePath)) {
			$message = "Error : can not find file path";
			$errCode = 1;
		}
		
		if(!rename($filePath.$fileName, $filePath.$inputFileName )) {
				$message = "Error : can not rename file";
				$errCode = 2;
		}
	
	}
	else {
		$message = "Error : file name is null";
		$errCode = 3;
	}
	
	if($errCode==0) {
		$message = "Making the new project is done.";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'", "author":"'.$author.'", "projectName":"'.$projectName.'"}';
?>
<?php
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/
	$message = "";
	$errCode = 0;
	$fileImportSelectPath = "";
	$defaultPath = "../../project/";
	
    $type = $_POST['mimetype']; 
    $xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'; 
    
	if($_POST['fileImportSelectPath'] != "") {
	
		$fileImportSelectPath = $_POST['fileImportSelectPath'];
		$fileImportSelectPath = $defaultPath.$fileImportSelectPath."/";

		// make directory for user and project
		if(!is_dir($fileImportSelectPath)) {
			$message = "Error : can not find project path";
			$errCode = 1;
		}
		else {
		    foreach($_FILES as $file) { 
		        $n = $file['name']; 
		        $s = $file['size']; 
		        if (!$n) continue; 
		        
				if(!move_uploaded_file($file["tmp_name"], $fileImportSelectPath.$file["name"])) {
					$errCode = 2;
					$message = "Error : can not upload this file";
				}
		    }
		}
	}
	else {
		$message = "Error : Some value are null";
		$errCode = 3;
		$message = $_POST['fileImportSelectPath'];
	}
	
	if($errCode==0) {
		$message = "Making the new project is done.";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'"}';
?>
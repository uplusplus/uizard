<?php
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/
	$message = "";
	$log = "";
	$errCode = 0;
	$downloadPath = "";
	$defaultPath = "../../project/";
	$selectProjectPath = "";
	$selectProjectName = "";
	$fileExportType = "";

	if($_POST['selectProjectName'] != "" && $_POST['selectProjectPath'] != "" && $_POST['fileExportType'] != "") {
	
		$selectProjectPath = $_POST['selectProjectPath'];
		$selectProjectPath = $defaultPath.$selectProjectPath."/";
		
		$selectProjectName = $_POST['selectProjectName'];
		
		$fileExportType = $_POST['fileExportType'];

		// make directory for user and project
		if(!is_dir($selectProjectPath)) {
			$message = "Error : can not find project path";
			$errCode = 1;
		}
		else {

			if($fileExportType==1) {
				exec("tar cvf ".$selectProjectPath.$selectProjectName.".tar ".$selectProjectPath."*");
				$downloadPath = $selectProjectPath.$selectProjectName.".tar";
			}
			else if($fileExportType==2) {
				exec("zip ".$selectProjectPath.$selectProjectName.".zip ".$selectProjectPath."*");
				$downloadPath = $selectProjectPath.$selectProjectName.".zip";
			}
		}
	}
	else {
		$message = "Error : Some value are null";
		$errCode = 3;
	}
	
	if($errCode==0) {
		$message = "Making the new project is done.";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'", "log":"'.$log.'", "downloadPath":"'.$downloadPath.'"}';
?>
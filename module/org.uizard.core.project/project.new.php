<?php
/*
Copyright Sung-tae Ryu. All rights reserved.
Code licensed under the GPL v2 License:
http://www.uizard.org/License
version: 3.0.0
*/
	$message = "";
	$errCode = 0;

	if($_POST['inputProjectAuthor'] != "" && $_POST['inputProjectName'] != "") {
	
		$author = $_POST['inputProjectAuthor'];
		$projectName = $_POST['inputProjectName'];
				
		// make directory for user and project
		if(!is_dir("../../project/".$author)) {
			$oldumask = umask(0);
			if(!mkdir("../../project/".$author, 0777)) {
				$message = "Error : can not make directory";
				$errCode = 1;
			}
		}
		
		if(!is_dir("../../project/".$author."/".$projectName)) {
			$oldumask = umask(0);
			if(!mkdir("../../project/".$author."/".$projectName, 0777)) {
				$message = "Error : can not make directory";
				$errCode = 2;
			}
		}

		if(!copy("default/index.html", "../../project/".$author."/".$projectName."/index.html")) {
				$message = "Error : can not copy default files";
				$errCode = 3;
		}
	
		//echo "New Project is Successfully Generated...";
		//echo "<script>location.href='../../uizard.php?action=load&projectDir=".$author."/".$projectName."';</script>";
	}
	else {
		$message = "Error : Author or Project name is null";
		$errCode = 4;
	}
	
	if($errCode==0) {
		$message = "Making the new project is done.";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'", "author":"'.$author.'", "projectName":"'.$projectName.'"}';
?>
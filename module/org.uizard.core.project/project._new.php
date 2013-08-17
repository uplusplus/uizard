<?php
	/*
	Copyright Sung-tae Ryu. All rights reserved.
	Code licensed under the GPL v2 License:
	http://www.uizard.org/License
	version: 3.0.0
	*/
	

require "../../plugins/org.uizard.core.scm.svn/file.svn.php";

	$message = "";
	$errCode = 0;
	
	if($_POST['inputProjectAuthor'] != "" && $_POST['inputProjectName'] != "" && $_POST['inputProjectAbout'] != "" && $_POST['inputProjectType'] != "" && $_POST['inputProjectDetailedType'] != "" && $_POST['inputProjectSource'] != "") {
	
		$source = $_POST['inputProjectSource'];
		$SVNURL = $_POST['inputProjectSVNURL'];
		$SVNID = $_POST['inputProjectSVNID'];
		$SVNPW = $_POST['inputProjectSVNPW'];
		$type = $_POST['inputProjectType'];
		$detailedType = $_POST['inputProjectDetailedType'];
		$author = $_POST['inputProjectAuthor'];
		$projectName = $_POST['inputProjectName'];
		$about = $_POST['inputProjectAbout'];
				
		// make directory for user and project
		if(!is_dir("../../project/".$author."_".$projectName)) {
			$oldumask = umask(0);
			if(!mkdir("../../project/".$author."_".$projectName, 0777)) {
				$message = "Error : can not make directory";
				$errCode = 1;
			}
		}
		
		if(!copy("../../config/project/default/index.html", "../../project/".$author."_".$projectName."/index.html")) {
			$message = "Error : can not copy default files";
			$errCode = 2;
		}
		
		if ($source=="Local") {
			// make project file
		}
		else if ($source=="SVN") {
			// $SVNURL
			// $SVNID
			// $SVNPW
			// svn checkout
			//checkout($SVNURL,"../../project/".$author."_".$projectName."/",$SVNID,$SVNPW);			
			checkout("https://bergkamp.googlecode.com/svn/trunk/","../../project/".$author."_".$projectName."/","pch851130@gmail.com","selab7220");
			checkout($SVNURL,"../../project/".$author."_".$projectName."/",$SVNID,$SVNPW);
		}
		if ($source=="Git") {
			// git
		}
		
		$tmp = fopen("../../project/".$author."_".$projectName."/project.xml", 'w');
		$fileStr  = '<?xml version="1.0" encoding="utf-8"?>';
		$fileStr .= '<PROJECT>';
		$fileStr .= '<SOURCE>'.$source.'</SOURCE>';
		if ($source=="SVN") {
		$fileStr .= '<SVNURL>'.$SVNURL.'</SVNURL>';
		$fileStr .= '<SVNID>'.$SVNID.'</SVNID>';
		$fileStr .= '<SVNPW>'.$SVNPW.'</SVNPW>';
		}
		$fileStr .= '<TYPE>'.$type.'</TYPE>';
		$fileStr .= '<DETAILEDTYPE>'.$detailedType.'</DETAILEDTYPE>';
		$fileStr .= '<AUTHOR>'.$author.'</AUTHOR>';
		$fileStr .= '<NAME>'.$projectName.'</NAME>';
		$fileStr .= '<ABOUT>'.$about.'</ABOUT>';
		$fileStr .= '<DATE>'.date("Y-m-d H:i:s",time()).'</DATE>';
		$fileStr .= '</PROJECT>';

		//echo "<script>console.log("+$tmp+");</script>";

		fwrite($tmp , $fileStr);
		fclose($tmp);
		
		if(!is_file("../../project/".$author."_".$projectName."/project.xml")) {
			$message = "Error : can not make project information file";
			$errCode = 3;
		}
			
	}
	else {
		$message = "Error : Author or Project name is null";
		$errCode = 4;
	}
	
	if($errCode==0) {
		$message = "Making the new project is done.";
	}
	
	echo '{"message":"'.$message.'", "errCode":"'.$errCode.'", "author":"'.$author.'", "projectName":"'.$projectName.'", "type":"'.$type.'"}';
?>
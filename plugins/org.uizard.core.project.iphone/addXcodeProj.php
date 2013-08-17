<?
	include "commonXcodeProj.php";
	
	/*
	 * Update project.pbxproj
	 */
	// Get project file
	$PATH = $projectPath.$projectName.".xcodeproj/project.pbxproj";
	$file = file_get_contents($PATH);
	
	$ID_pre = "A169126813E34FC1";
	
	if(preg_match_all("/".$ID_pre."[\w]{8}/",$file,$tmpID)){
		$tmpID=$tmpID[0];
		sort($tmpID);
		$tmpID = substr($tmpID[count($tmpID)-1],16,8);
		$ID_post = sprintf("%08X",hexdec($tmpID));
		$ID_post++;
	}
	else {
		$ID_post = 0x00000001;
	}
	
	$str_PBXBuildFile = "";
	$str_PBXFileReference = "";
	$str_PBXFrameworksBuildPhase_list = "";
	$str_PBXGroup_Frameworks_list = "";
	$str_PBXGroup_Project_list ="";
	$str_PBXGroup = "";
	$str_PBXResourcesBuildPhase_list = "";
	$str_PBXSourcesBuildPhase_list = "";
	
	for ($i=0; $i < count($fileList); $i++){
		$fileType = array_pop(explode(".",$fileList[$i]));
		$fileName = array_pop(explode("/",$fileList[$i]));
		
		if($fileType == "m"){
			$ID = $ID_pre.sprintf("%08X",$ID_post++);
			$ID_Reference = $ID_pre.sprintf("%08X",$ID_post++);
			
			$str_PBXBuildFile .= "		".$ID." /* ".$fileName." in Sources */ = {isa = PBXBuildFile; fileRef = ".$ID_Reference." /* ".$fileName." */; };\n";
			
			$str_PBXSourcesBuildPhase_list = "				".$ID." /* ".$fileName." in Sources */,";
			$file = AddListSectionByName("PBXSourcesBuildPhase", "Sources", "files", $str_PBXSourcesBuildPhase_list,$file);
			
			$str_PBXFileReference .= "		".$ID_Reference." /* ".$fileName." */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.objc; name = ".$fileName."; path = ".$fileList[$i]."; sourceTree = \"<group>\"; };\n";
		}
		else if ($fileType == "xib" || $fileType == "strings"){
			$ID = $ID_pre.sprintf("%08X",$ID_post++);
			$ID_Reference = $ID_pre.sprintf("%08X",$ID_post++);
			
			$str_PBXBuildFile .= "		".$ID." /* ".$fileName." in Sources */ = {isa = PBXBuildFile; fileRef = ".$ID_Reference." /* ".$fileName." */; };\n";
			
			$str_PBXResourcesBuildPhase_list = "				".$ID." /* ".$fileName." in Resources */,";
			$file = AddListSectionByName("PBXResourcesBuildPhase", "Resources", "files", $str_PBXResourcesBuildPhase_list,$file);
			
			switch($fileType){
				case "xib": $lastKnownFileType = "file.xib";break;
				case "strings":$lastKnownFileType = "text.plist.strings";break;
			}
			$str_PBXFileReference .= "		".$ID_Reference." /* ".$fileName." */ = {isa = PBXFileReference; lastKnownFileType = ".$lastKnownFileType."; name = ".$fileName."; path = ".$fileList[$i]."; sourceTree = \"<group>\"; };\n";
		}
		else {
			switch($fileType){
				case "plist": $lastKnownFileType = "text.plist.xml";break;
				default:$lastKnownFileType = "sourcecode.c.h";break;
			}
			$ID_Reference = $ID_pre.sprintf("%08X",$ID_post++);
			$str_PBXFileReference .= "		".$ID_Reference." /* ".$fileName." */ = {isa = PBXFileReference; lastKnownFileType = ".$lastKnownFileType."; name = ".$fileName."; path = ".$fileList[$i]."; sourceTree = \"<group>\"; };\n";
		}
		
		
		if($fileName == $fileList[$i]){
			// if this file located in root
				$str_PBXGroup_Project_list = "				".$ID_Reference." /* ".$fileName." */,";
				$file = AddListSectionByName("PBXGroup",$projectName,"children",$str_PBXGroup_Project_list,$file);
			}
			else {
			// find folder reference
				$folder = explode("/",$fileList[$i]);
				$current_folder = getReferenceSection("PBXGroup", $projectName, $file);
				$folderReference =0;
				for ($j = 0; $j < count($folder)-1; $j++){
					if(($ID_Folder = IsinSectionByReference("PBXGroup", $current_folder ,$folder[$j], $file))!="" ){
						// folder already exist.
						$current_folder = $ID_Folder;
						$folderReference = $ID_Folder;
					}
					else {
						// folder is absent.
						$folderReference = $ID_pre.sprintf("%08X",$ID_post++);
						
						// insert folder reference
						$str = "				".$folderReference." /* ".$folder[$j]." */,";
						$file = AddListSectionByReference("PBXGroup",$current_folder,"children",$str,$file);
						
						// make folder reference
						$str = "		".$folderReference." /* ".$folder[$j]." */ = {\n"
							  ."			isa = PBXGroup;\n"
							  ."			children = (\n"
							  ."			);\n"
							  ."			name = ".$folder[$j].";\n"
							  ."			sourceTree = \"<group>\";\n"
							  ."		};\n";
						$file = AddSection("PBXGroup",$str,$file);
						$current_folder = $folderReference; 
					}
				}
			// add file to folder
			$str = "				".$ID_Reference." /* ".$fileName." */,";
			$file = AddListSectionByReference("PBXGroup",$folderReference,"children",$str,$file);
			
			}
	}

	$file = str_replace("/* End PBXBuildFile section */",$str_PBXBuildFile."/* End PBXBuildFile section */",$file);
	
	$file = str_replace("/* End PBXFileReference section */",$str_PBXFileReference."/* End PBXFileReference section */",$file);
	$file = str_replace("{\$PBXGroup}",$PBXGroup,$file);
	
//	$fp = fopen($projectPath.$projectName.".xcodeproj/project.pbxproj","w");
	if($fp){
		fwrite($fp, $file);
		fclose($fp);
	}
?>
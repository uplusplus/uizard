<?
	include "commonXcodeProj.php";

	/*
	 * Update project.pbxproj
	 */
	// Get project file
	$PATH = $projectPath.$projectName.".xcodeproj/project.pbxproj";
	$file = file_get_contents($PATH);

	for ($i=0; $i < count($fileList); $i++){
		$fileType = array_pop(explode(".",$fileList[$i]));
		$fileName = array_pop(explode("/",$fileList[$i]));
		
		// find folder reference
		$folder = explode("/",$fileList[$i]);
		$current_folder = getReferenceSection("PBXGroup", $projectName, $file);
		$folderReference =0;
		$ID_Folder = array();
		for ($j = 0; $j < count($folder); $j++){
			if($folder[$j] == "en.lproj") continue;
			
			$current_folder = IsinSectionByReference("PBXGroup", $current_folder ,$folder[$j], $file);
			
			if(!$current_folder){
				$current_folder=IsinSectionByReference("PBXGroup", getReferenceSection("PBXGroup", "Supporting Files", $file) ,$folder[$j], $file);
			}
			array_push($ID_Folder,$current_folder);
		}
		print_r($ID_Folder);
		
		// 1. find PBXBuildFile reference
		$buildReference = getBuildReference($current_folder,$file);
		
		// 2. delete build reference
		if($buildReference){
			$file = preg_replace("/[^\n]*".$buildReference."[^\n]*\{[^\{]*\};\n/s","",$file);
			$file = preg_replace("/[^\n]*".$buildReference."[^\n]*\,\n/s","",$file);
		}
		
		if($current_folder){
		// 3. delete file reference
			$file = preg_replace("/[^\n]*".$current_folder."[^\n]*\{[^\{]*\};\n/s","",$file);
			$file = preg_replace("/[^\n]*".$current_folder."[^\n]*\,\n/s","",$file);
		}
		//echo $file;
	}
	
	$fp = fopen($projectPath.$projectName.".xcodeproj/project.pbxproj","w");
	if($fp){
		fwrite($fp, $file);
		fclose($fp);
	}
?>
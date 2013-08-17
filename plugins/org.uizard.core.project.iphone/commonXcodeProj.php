<?php 
	
	if(get_magic_quotes_gpc()){
  		$d = stripslashes($_POST['myJson']);
	}else{
  		$d = $_POST['myJson'];
	}
	$data = json_decode($d,true);
		
	$projectName = $data['projectName'];
	$projectPath = $data['projectPath'];
	$projectAuthor = $data['projectAuthor'];
	
	/*
	 * Add List to section by name
	 */
	function AddListSectionByName($str_Section, $str_Name, $str_Add, $str,$file){
		$file = preg_replace("/(Begin ".$str_Section." section.*\/\* ".$str_Name." \*\/ = \{[^\{]*".$str_Add." \= \()(.*)(\t\t\t\);[^\{]*End ".$str_Section." section)/sm","$1\n".$str."$2$3",$file);
		return $file;
	}
	
	/*
	 * Add List to section by reference
	 */
	function AddListSectionByReference($str_Section, $str_Reference, $str_Add, $str,$file){
		preg_match("/Begin ".$str_Section." section \*\/(.*)\/\* End ".$str_Section." section/Us",$file,$wholeSection);
		preg_match("/".$str_Reference."[ ]*(\/\* [\w\.\_\-]* \*\/)*[ ]*=[ ]*{\n.*\}/Us",$wholeSection[1],$section);
		preg_match("/(.*".$str_Add." \= \()(.*)/Us",$section[0],$str_Replace);
		$file = str_replace($section[0],preg_replace("/(children \= \()(.*)/Us","$1\n".$str."$2",$section[0]),$file);
		return $file;
	}
	
	/*
	 * Add to section
	 */
	function AddSection($str_Section, $str,$file){
		$file = preg_replace("/(?<=Begin ".$str_Section." section)(.*)(?=\/\* End ".$str_Section." section)/s","$1$2".$str."$3",$file);
		return $file;
	}	
	
	/*
	 * Is List in section?
	 * if list in section, return its reference
	 *
	function IsInSectionByName($str_Section, $str_Group, $str_Name, $file){
		preg_match("/\/\* Begin ".$str_Section." section \*\/.*\/\* ".$str_Group." \*\/ = {.*([0-9A-Z]{24}) \/\* ".$str_Name." \*\/.*[\};^{]*\/\* End ".$str_Section." section \*\//sm",$file,$match);
		return $match[1];
	}*/
	
	/*
	 * Is List in section?
	 * if list in section, return its reference
	 */
	function IsinSectionByReference($str_Section, $str_Reference, $str_Name, $file){
		preg_match("/Begin ".$str_Section." section \*\/(.*)\/\* End ".$str_Section." section/Us",$file,$wholeSection);
		preg_match("/".$str_Reference."[ ]*(\/\* [\w\.\_\- ]* \*\/)*[ ]*=[ ]*{\n.*\}/Us",$wholeSection[1],$section);
		preg_match("/([\w]{24}) \/\* ".$str_Name." \*\/,/Us",$section[0],$match);
		return $match[1];
	}
	
	/*
	 * get reference in section
	 */
	function getReferenceSection($str_Section, $str_Group, $file){
		preg_match("/\/\* Begin ".$str_Section." section \*\/.*([0-9A-Z]{24}) \/\* ".$str_Group." \*\/ = {.*[\};^{]*\/\* End ".$str_Section." section \*\//sm",$file,$match);
		return $match[1];
	}

	/*
	 * get Build reference
	 */
	function getBuildReference($reference, $file){
		preg_match("/\/\* Begin PBXBuildFile section \*\/.*\t\t(\w{24})[^\n]*".$reference.".*\/\* End PBXBuildFile section \*\//sm",$file,$match);
		return $match[1];
	}
?>
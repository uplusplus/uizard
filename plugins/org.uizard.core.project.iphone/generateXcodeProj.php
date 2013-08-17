<?	
	include "commonXcodeProj.php";

	/*
	 * Make project.pbxproj
	 */
	// Get template
	$PATH = "template/View-based/template.xcodeproj/template.project.pbxproj";
	$file = file_get_contents($PATH);
	$file = str_replace("{\$ProjectAuthor}",$projectAuthor,$file);
	$file = str_replace("{\$ProjectName}",$projectName,$file);

	mkdir($projectPath.$projectName.".xcodeproj", 0777);
	
	$fp = fopen($projectPath.$projectName.".xcodeproj/project.pbxproj","w");
	if($fp){
		fwrite($fp, $file);
		fclose($fp);
	}
?>
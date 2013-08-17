<?
	
	if(get_magic_quotes_gpc()){
  		$d = stripslashes($_POST['myJson']);
	}else{
  		$d = $_POST['myJson'];
	}
	$data = json_decode($d,true);
		
	$package = "com.".$data['projectAuthor'].".".$data['projectName'];
	$appName = $data['projectName'];
	$activityName = "mainActivity";
	
	// make AndroidManifest.xml
	$PATH = "template/template.AndroidManifest.xml";
	$file = file_get_contents($PATH);
	$file = str_replace("{package}",$package,$file);
	$file = str_replace("{appName}",$appName,$file);
	$file = str_replace("{activityName}",$activityName,$file);

	$fp = fopen("../../project/".$data['projectPath']."/AndroidManifest.xml","w");
	if($fp){
		fwrite($fp, $file);
		fclose($fp);
	}
	
	// make .project
	$PATH = "template/template.project";
	$file = file_get_contents($PATH);
	$file = str_replace("{projectName}",$appName,$file);
	
	$fp = fopen("../../project/".$data['projectPath']."/.project","w");
	if($fp){
		fwrite($fp, $file);
		fclose($fp);
	}
	
?>
<?php 

	if(get_magic_quotes_gpc()){
  		$d = stripslashes($_POST['myJson']);
	}else{
  		$d = $_POST['myJson'];
	}
	$d = json_decode($d,true);
	
	
	$path_dir = "../../plugins/".$d['packageName']."/";
	
	mkdir($path_dir, 0777);

	for ($i=0; $i < count($d['folderList']);$i++){
		mkdir($path_dir."/".$d['folderList'][$i], 0777);
	}
	
	for ($i=0; $i < count($d['fileList']);$i++){
		$path = $d['pluginUrl'].'/'.$d['fileList'][$i];
		$data = file_get_contents($path);
		
		if(file_exists($path_dir.$d['fileList'][$i])){
			unlink($path_dir.$d['fileList'][$i]);
		}
		$fp = fopen($path_dir.$d['fileList'][$i],"w");
		if($fp){
			fwrite($fp, $data);
			fclose($fp);
		}
	}
	
// get config.xml
	$path = $d['pluginUrl']."/config.xml";
	$data = file_get_contents($path);
	if(file_exists($path_dir."config.xml")){
			unlink($path_dir."config.xml");
	}
	$fp = fopen($path_dir."config.xml","w");
	if($fp){
		fwrite($fp, $data);
		fclose($fp);
	}
	
?>
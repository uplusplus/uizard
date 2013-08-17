<?

	$PATH = $_POST['path'];
	
	$fp = fopen($PATH, "w");
	fwrite($fp, $_POST['data']);
	fclose($fp);
	
	echo file_get_contents($PATH);

?>
<?php
	/*
	Copyright Sung-tae Ryu. All rights reserved.
	Code licensed under the GPL v2 License:
	http://www.uizard.org/License
	version: 3.0.0
	*/
	$fp = fopen('../../filetype/filetype.json', 'w');
	
	if (fwrite($fp, json_encode($_POST['data'])) == false) {
		echo "-1";
	}
	else
		echo "0";
	
	fclose($fp);
?>
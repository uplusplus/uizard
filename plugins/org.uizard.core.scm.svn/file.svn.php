<?php

/*  
 svn commit -m "jom" C:\test_ui\trunk\src\cantona.txt --username pch851130@gmail.com --password Pa7NY2xj4QT5
 */

/*
 $r=commit('/home/park/Desktop/uz/trunk/src/cantona.txt','lge','pch851130@gmail.com','Pa7NY2xj4QT5');

 $r=add('/home/park/Desktop/uz/trunk/src/keane.txt','pch851130@gmail.com','Pa7NY2xj4QT5');
 $r=update('/home/park/Desktop/uz/trunk/src/cantona.txt','pch851130@gmail.com','Pa7NY2xj4QT5');
 echo $r;
 */

//$r=getList('https://bergkamp.googlecode.com/svn/','pch851130@gmail.com','Pa7NY2xj4QT5');
//echo $r;


if($_POST['cmd'] == "commit") {
	$localFileName=$_POST['localFileName'];
	$logMsg=$_POST['logMsg'];
	$username=$_POST['username'];
	$password=$_POST['password'];	
	$r=commit($localFileName,$logMsg,$username,$password);
	$r = mb_convert_encoding($r,"UTF-8","EUC-KR");
	echo $r; 
} else if($_POST['cmd'] == "update") {
	$localFileName=$_POST['localFileName'];
	$version=$_POST['version'];
	$r=update($localFileName,$version);
	$r = mb_convert_encoding($r,"UTF-8","EUC-KR");
	echo $r;
} else if($_POST['cmd'] == "revert") {
	$localFileName=$_POST['localFileName'];		
	$r=revert($localFileName);
	$r = mb_convert_encoding($r,"UTF-8","EUC-KR");
	echo $r;
} else if($_POST['cmd'] == "account") {
	$username=$_POST['username'];
	$password=$_POST['password'];	
	$r=accountSettings($username,$password);
	$r = mb_convert_encoding($r,"UTF-8","EUC-KR");
	echo $r;
} else if($_POST['cmd'] == "add") {
	$localFileName=$_POST['localFileName'];		
	$r=addFile($localFileName);
	$r = mb_convert_encoding($r,"UTF-8","EUC-KR");
	echo $r;
} else if($_POST['cmd'] == "del") {
	$localFileName=$_POST['localFileName'];		
	$r=delFile($localFileName);
	$r = mb_convert_encoding($r,"UTF-8","EUC-KR");
	echo $r;
} else if($_POST['cmd'] == "revision") {
	
}

// revision history
function revisionHistory($localFileName){
	$command= sprintf("svn log %s",$localFileName);
	return returnMessage($command,"log");
}

function returnMessage($command,$commandName){
	$out = array();		
	exec($command,$out);
	if($out==null)
		$result="fail";
	else
		$result="success";
	$returnValue = sprintf("{\"requestedCommand\" : \"%s\",\"userid\" : \"\",\"result\" : \"%s\",\"message\" : \"",$commandName,$result);

	foreach ($out as $row){
		$returnValue=$returnValue.$row.'</br>';		
	}
	$returnValue=$returnValue."\"}";
	return $returnValue;
}

// account settings
function accountSettings($username,$password){
	$fp = fopen('./svn.config.json', 'w');
	$str = sprintf("[{\"username\":\"%s\",\"password\":\"%s\"}]",$username,$password);
	if (fwrite($fp, $str) == false) {
		$fr = "0";
	} else {
		$fr = "1";
	}
	fclose($fp);
	return $fr;
}

// commit
function commit($localFileName,$logMsg,$username,$password){
	$command= sprintf("svn commit -m \"%s\" %s --username %s --password %s",$logMsg,$localFileName,$username,$password);	
	return returnMessage($command,"commit");
}

// revert
function revert($localFileName){
	$command= sprintf("svn revert %s",$localFileName);	
	return returnMessage($command,"revert");
}

// checkout
function checkout($serverRootURL,$localRootURL){
	$command = sprintf("svn checkout %s %s",$serverRootURL,$localRootURL);
	return returnMessage($command,"checkout");
}

// update 
function update($localFileName,$version){
	if($version==-1)
		$command= sprintf("svn update %s",$localFileName);
	else
		$command= sprintf("svn update -r %s %s",$version,$localFileName);
	return returnMessage($command,"update");
}


function addFile($localFileName){
	$command= sprintf("svn add %s",$localFileName);	
	return returnMessage($command,"add");
}

function delFile($localFileName){
	$command= sprintf("svn del %s",$localFileName);	
	return returnMessage($command,"del");
}



?>
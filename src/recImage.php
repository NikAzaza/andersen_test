<?php

	$str = $_POST['photo'];
	echo $str ;
	echo "azaza";

	$data = json_decode($str, true);
	echo $data;
	echo "was decoding from json";
	
	if (!file_exists("/test.png")) {
		mkdir("/test.png", 0777, true);
	}	
	
	$path = $_SERVER['DOCUMENT_ROOT'] . "/photos/".time().'.png';
	#echo $path;
	chmod($path, 0777);
	
	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);
	
	echo "decoding from base64";
	
	mkdir($_SERVER['DOCUMENT_ROOT'] . "/photos");
	
	echo "create dir";
	
	#file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/photos/".time().'.png', $data);
	file_put_contents("/sdcard/ANDERSEN/test.png", $data);
	echo "save file";
	die;
 
?>
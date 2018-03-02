<?php

$dir='../dronenot-facebook/';
 $files=scandir($dir);
 //exec("chmod 666 ".$dir."*");
 foreach ($files as $key => $value) {
  if(is_file($dir.$value))
 {


 	$v=explode(".", $value);
     print_r($v);
 	if($v[1]=='zip')
 	{
 		unlink($dir.$value);
 	}
 }
 }


 ?>
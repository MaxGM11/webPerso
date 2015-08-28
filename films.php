<?php
$dir = "/mnt/alienFilms";
$dh  = opendir($dir);
while (false !== ($filename = readdir($dh))) {
	$files[] = $filename;
}
 
sort($files);
 
print_r($files);
 
rsort($files);
 
print_r($files);
?>
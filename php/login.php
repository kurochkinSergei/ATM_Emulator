<?php // login.php

//Задаем параметры для подключения
$db_host = 'localhost';
$db_name = 'thebankfront';
$db_user = 'ruswbsrvr';
$db_password = 'Orion123';

//Осуществляем подключение
$mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);
if (!$mysqli) {	die('<p style="color:red">'.mysqli_connect_errno().' - '.mysqli_connect_error().'</p>');}


// Задаем кодировку utf-8
mysqli_query($mysqli, "SET NAMES utf8");
$mysqli->set_charset('utf8');
$mysqli->query("SET collation_connection = utf8_general_ci");	
// Информация для log.txt
$log = "Есть подключение к MySQL!";
file_put_contents('log.txt',date("Y-m-d H:i:s").$log."\n", FILE_APPEND | LOCK_EX);

?>

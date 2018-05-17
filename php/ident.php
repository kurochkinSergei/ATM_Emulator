<?php
require_once 'login.php';
if (isset($_POST['Pin'])) {
	//определяем поисковые слова
	$PIN = $_POST['Pin'];
	// Конструируем запрос.
	$query = "SELECT * FROM `customers` where `Login` =".$PIN;
	$result = $mysqli->query($query);
	$row = $result->fetch_array(MYSQLI_NUM);
	$Cust_id = $row[0];
	$Cust_fname = $row[1];
	$Cust_mname = $row[2];
	$Cust_lname = $row[3];
	$data=array();
	$data['Cust_fname']=$Cust_fname;
	$data['Cust_mname']=$Cust_mname;
	$data['Cust_lname']=$Cust_lname;
	$data['Cust_id']=$Cust_id;
	echo json_encode($data);
}
?>

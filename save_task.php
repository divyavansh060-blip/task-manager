<?php
include "db.php";

$task = $_POST['task'];

$query = "INSERT INTO tasks(task) VALUES('$task')";
mysqli_query($conn,$query);
?>

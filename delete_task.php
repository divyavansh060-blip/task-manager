<?php
include "db.php";

$id = $_POST['id'];
$query = "DELETE FROM tasks WHERE id=$id";
mysqli_query($conn,$query);
?>

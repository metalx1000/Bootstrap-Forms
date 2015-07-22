<?php
include("connect.php");
include('tables.php');
$_POST = array_map('strip_tags', $_POST);
$_POST = array_map('htmlspecialchars', $_POST);

$pid=$_POST['pid'];
$result = mysqli_query($con,"SELECT * FROM $table WHERE pid='$pid' ");
if( mysqli_num_rows($result) > 0) {
    print "updating...";
}
else
{
    $sql="INSERT INTO $table (pid) VALUES ('$pid')";
    if (!mysqli_query($con,$sql)) {
      die('Error: ' . mysqli_error($con));
    }
}
foreach($_POST as $key => $value) {
    echo 'Current value in $_POST["' . $key . '"] is : ' . $value . '<br>';
    $entry = mysqli_real_escape_string($con, $value);
    $sql="UPDATE $table SET $key='$entry' WHERE pid='$pid'";
    mysqli_query($con,$sql);
}
mysqli_close($con);
?>

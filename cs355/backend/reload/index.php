<?php
require '../../helper.php';
header('Content-type: application/json');
session_start();

if (!(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true)) {
    echo json_encode(returnWrapper(8, null, "please login first"), JSON_PRETTY_PRINT);
  exit;
}
$db = mysqli_connect('mars.cs.qc.cuny.edu' , 'huxi8128' , '23688128' , 'huxi8128') or die("could not connect to database" ) ;
$username=$_POST["username"];
$sql="select GameSave,BlockSave,GameScore from tetris where GameName='$username'";
$result = $db->query($sql);
$row=$result->fetch_row();
// echo "$row[0]";
// echo "$row[1]";
// die();
$wrapper=array("game"=>$row[0],"block"=>$row[1],"score"=>$row[2]);
echo json_encode($wrapper);
$db->close();
exit();
?>

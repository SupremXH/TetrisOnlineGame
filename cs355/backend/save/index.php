<?php
require '../../helper.php';
header('Content-type: application/json');
session_start();

if (!(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true)) {
    echo json_encode(returnWrapper(8, null, "please login first"), JSON_PRETTY_PRINT);
  exit;
}

$db = mysqli_connect('mars.cs.qc.cuny.edu' , 'huxi8128' , '23688128' , 'huxi8128') or die("could not connect to database" ) ;
$datasave=$_POST["datasave"];
$username=$_POST["username"];
$blocksave=$_POST["blocksave"];
$scoresave=$_POST["scoresave"];
$sql="update tetris set GameSave='$datasave',BlockSave='$blocksave',GameScore='$scoresave' where GameName='$username'";
$result = $db->query($sql);
echo json_encode(returnWrapper(10, null, "success saved"), JSON_PRETTY_PRINT);
$db->close();
exit();
?>

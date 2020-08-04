<?php
require '../../helper.php';
header('Content-type: application/json');
$db = mysqli_connect('mars.cs.qc.cuny.edu' , 'huxi8128' , '23688128' , 'huxi8128') or die("could not connect to database" ) ;

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  echo json_encode(returnWrapper(4, null, "Wrong HTTP request method, " . $_SERVER['REQUEST_METHOD']. " has been used"), JSON_PRETTY_PRINT);
  exit;
}
// Check if fields are empty
if (empty(trim($_POST["username"]))) {
  echo json_encode(returnWrapper(41, null, "Missing username"), JSON_PRETTY_PRINT);
    $db->close();
  exit();
} elseif (empty(trim($_POST["password"]))) {
  echo json_encode(returnWrapper(42, null, "Missing password"), JSON_PRETTY_PRINT);
    $db->close();
  exit();
}
$name=$_POST["username"];
$password=$_POST["password"];
// check signup Already
$sql="select GameName from tetris;";
$result = $db->query($sql);
while($row=$result->fetch_row()){
    if(trim($_POST["username"])==$row[0]){
      echo json_encode(returnWrapper(44, null, "Account was registered by others"), JSON_PRETTY_PRINT);
      $db->close();
      exit();
    }
}


$sql="insert into tetris(GameName,GamePassword) values('$name','$password');";
$result = $db->query($sql);
echo json_encode(returnWrapper(3, null, "signup success"), JSON_PRETTY_PRINT);

$db->close();
?>

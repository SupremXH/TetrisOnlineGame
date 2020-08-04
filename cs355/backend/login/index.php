<?php
require '../../helper.php';
header('Content-type: application/json');
session_start();
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  echo json_encode(returnWrapper(4, null, "Wrong HTTP request method, " . $_SERVER['REQUEST_METHOD']. " has been used"), JSON_PRETTY_PRINT);
  exit;
}

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    echo json_encode(returnWrapper(8, null, "A new user may not be logged in until the current user has logged out"), JSON_PRETTY_PRINT);
  exit;
}
// Check if fields are empty
if (empty(trim($_POST["username"]))) {
 echo json_encode(returnWrapper(41, null, "Missing username"), JSON_PRETTY_PRINT);
  exit();
} elseif (empty(trim($_POST["password"]))) {
 echo json_encode(returnWrapper(42, null, "Missing password"), JSON_PRETTY_PRINT);
  exit();
}
$db = mysqli_connect('mars.cs.qc.cuny.edu' , 'huxi8128' , '23688128' , 'huxi8128') or die("could not connect to database" ) ;
$sql="Select GameName,GamePassword from tetris";
$result = $db->query($sql);
while($row=$result->fetch_row()){
  if(trim($_POST["username"])==$row[0]){
    if(trim($_POST["password"])==$row[1]){
       $_SESSION["loggedin"] = true;
       $_SESSION["username"] = $row[0];
      echo json_encode(returnWrapper(0, null,"success"), JSON_PRETTY_PRINT);
      $db->close();
      exit();
    } else{
     echo json_encode(returnWrapper(44, null, "Invalid password"), JSON_PRETTY_PRINT);
     $db->close();
     exit();
    }
  }
}
echo json_encode(returnWrapper(45, null, "No account found with this username"), JSON_PRETTY_PRINT);
$db->close();
exit();
?>

<?php
require '../../helper.php';

session_start();

// Unset all of the session variables
$_SESSION = array();

// Destroy the session.
session_destroy();

echo json_encode(returnWrapper(0, null), JSON_PRETTY_PRINT);
exit;
?>

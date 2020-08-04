<?php
function returnWrapper($code = 0, $data = null, $message = "success") {
  $timestamp = date("Y-m-d h:m:s T+Z");
  $wrapper = array("code"=>$code, "data"=>$data, "message"=>$message, "timestamp"=>$timestamp);
  return $wrapper;
}
?>

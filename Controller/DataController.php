<?php
include_once '../Model/Data.php';
include_once 'ConnectionController.php';
session_start();
if (isset($_POST['fn'])) {
    $_POST['fn']();
}

if (isset($_GET['fn'])) {
    $_GET['fn']();
}

function AddData()
{
    $c = new ConnectionController();
    $conn = $c->Connect();
    $d = date('Y-m-d H:i:s');
    $ref = $_POST['ref'];
    $type = $_POST['type'];
    $sql = "INSERT INTO sensors (ref	,type,created_at) VALUES ('$ref','$type','$d')";
    if ($conn->query($sql) === true) {
        header('location:/pfe/listsensors.php');
        return false;
    } else {
        $_SESSION['error'] = 'Reference already exist';
        header('location:/pfe/Addsensor.php');
        return false;
    }
}

?>

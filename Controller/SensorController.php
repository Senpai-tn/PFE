<?php
include_once '../Model/Sensor.php';
include_once 'ConnectionController.php';
session_start();
if (isset($_POST['fn'])) {
    $_POST['fn']();
}

if (isset($_GET['fn'])) {
    $_GET['fn']();
}

function AddSensor()
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

function AssingnSensor()
{
    $c = new ConnectionController();
    $ref = $_POST['ref'];
    $idStation = $_POST['idStation'];
    $conn = $c->Connect();
    $sql = "UPDATE sensors SET idStation=$idStation WHERE ref='$ref'";
    $conn->query($sql);
    header('location:/pfe/listsensors.php');
    $conn->close();
}

function ChangeEnabled()
{
    $c = new ConnectionController();
    $ref = $_POST['ref'];
    $isEnabled = $_POST['isEnabled'];
    $conn = $c->Connect();
    $sql = "UPDATE sensors SET isEnabled=$isEnabled WHERE ref='$ref'";
    $conn->query($sql);
    header('location:/pfe/listsensors.php');
    $conn->close();
}

?>

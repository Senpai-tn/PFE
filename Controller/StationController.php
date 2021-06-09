<?php
include_once '../Model/Station.php';
include_once 'ConnectionController.php';
session_start();
if (isset($_POST['fn'])) {
    $_POST['fn']();
}

if (isset($_GET['fn'])) {
    $_GET['fn']();
}

function AddStation()
{
    $c = new ConnectionController();
    $conn = $c->Connect();
    $d = date('Y-m-d H:i:s');
    $name = $_POST['name'];
    $region = $_POST['region'];
    $gouvernorat = $_POST['gouvernorat'];
    $created_at = $d;
    $isEnabled = true;
    $sql = "INSERT INTO `stations`(`name`, `region`, `gouvernorat`) VALUES ('$name','$region','$gouvernorat')";
    $conn->query($sql);
    $conn->close();
    header('location:/pfe/liststations.php');
}

function ChangeEnabled()
{
    $c = new ConnectionController();
    $id = $_POST['id'];
    $isEnabled = $_POST['isEnabled'];
    $conn = $c->Connect();
    $sql = "UPDATE stations SET isEnabled=$isEnabled WHERE id=$id";
    $conn->query($sql);
    header('location:/pfe/liststations.php');
    $conn->close();
}

?>

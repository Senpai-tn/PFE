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

 function GetHistory()
{
    $idStation = $_POST['idStation'];
    $c = new ConnectionController();
    $con = $c->Connect();
    $temp = [];
    $press = [];
    $debit = [];
    $time = [];
    $sql =
        'SELECT * FROM `data` D, sensors S,stations ST 
    WHERE ST.id = S.idStation 
    and D.ref = S.ref 
    and idStation = ' .
        $idStation .
        ' 
    and S.type="temp" 
    ORDER By D.created_at ASC';
    $result = $con->query($sql);
    if ($result->num_rows > 0) {
        $time = [];
        // output data of each row
        while ($row = $result->fetch_array()) {
            array_push($temp, $row['value']);
            $date = strtotime($row[3]);
            array_push($time, date('H', $date));
        }
    }

    $con->close();

    $con = $c->Connect();
    $sql1 =
        'SELECT * FROM `data` D, sensors S,stations ST 
    WHERE ST.id = S.idStation 
    and D.ref = S.ref 
    and idStation = ' .
        $idStation .
        ' 
    and S.type="press" 
    ORDER By D.created_at ASC';
    $result = $con->query($sql1);
    if ($result->num_rows > 0) {
        $time = [];
        // output data of each row
        while ($row = $result->fetch_array()) {
            array_push($press, $row['value']);
            $date = strtotime($row[3]);
            array_push($time, date('H', $date));
        }
    }

    $con->close();

    $con = $c->Connect();
    $sql2 =
        'SELECT * FROM `data` D, sensors S,stations ST 
    WHERE ST.id = S.idStation 
    and D.ref = S.ref 
    and idStation = ' .
        $idStation .
        ' 
    and S.type="debit" 
    ORDER By D.created_at ASC';
    $result = $con->query($sql2);
    if ($result->num_rows > 0) {
        $time = [];
        // output data of each row
        while ($row = $result->fetch_array()) {
            array_push($debit, $row['value']);
            $date = strtotime($row[3]);
            array_push($time, date('H', $date));
        }
    }

    $res['temp'] = $temp;
    $res['press'] = $press;
    $res['debit'] = $debit;
    $res['time'] = $time;
    echo json_encode($res);
}

?>

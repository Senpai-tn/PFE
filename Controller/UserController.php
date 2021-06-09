<?php
include_once '../Model/User.php';
include_once 'ConnectionController.php';
session_start();
if (isset($_POST['fn'])) {
    $_POST['fn']();
}

if (isset($_GET['fn'])) {
    $_GET['fn']();
}

function Login()
{
    $c = new ConnectionController();
    $email = $_POST['email-sign-in'];
    $password = md5($_POST['pass-sign-in']);

    $conn = $c->Connect();
    $sql = 'SELECT * FROM users where email="' . $email . '"  limit 1 ';
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_array();
        if ($row['isEnabled'] == 0) {
            $_SESSION['error'] = 'Accompt blocked';
            header('location:../login.php');
            return false;
        }
        if ($row['password'] != $password) {
            $_SESSION['error'] = 'Check your password';
            header('location:../login.php');
            return false;
        } else {
            $u = new User(
                $row['id'],
                $row['username'],
                $row['login'],
                $row['email'],
                $row['tel'],
                $row['password'],
                explode(',', $row['roles'])
            );
            $u->idStation = $row['idStation'];
            $_SESSION['user'] = serialize($u);
            header('location:../index.php');
            die();
        }
    }
    $_SESSION['error'] = 'Check your email';
    header('location:../login.php');
    return false;
}

function Register()
{
    $c = new ConnectionController();
    $conn = $c->Connect();
    $d = date('Y-m-d H:i:s');
    $username = $_POST['user-sign-up'];
    $login = $_POST['login-sign-up'];
    $email = $_POST['email-sign-up'];
    $tel = $_POST['tel-sign-up'];
    $password = md5($_POST['pass-sign-up']);
    $roles = ['user'];
    $role = implode(',', $roles);
    $sql = "INSERT INTO users (username	,login,email,tel,password,created_at,roles) VALUES ('$username','$login','$email','$tel','$password','$d','$role')";

    if ($conn->query($sql) === true) {
        $last_id = $conn->insert_id;
        $u = new User($last_id, $username, $login, $email, $tel, $password, [
            'user',
        ]);
        $u->idStation = null;

        $myJSON = serialize($u);
        $_SESSION['user'] = $myJSON;
        header('location:../index.php');
    } else {
        $_SESSION['error'] = 'Email already exist';
        header('location:../login.php');
    }

    $conn->close();
}

function Logout()
{
    $_SESSION['user'] = null;
    header('location:../login.php');
}

function FetchAll()
{
    $all = [];
    $c = new ConnectionController();
    $conn = $c->Connect();
    $sql = 'SELECT * FROM users ';
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        array_push($all, $row);
    }
    echo json_encode($all);
}

function ChangeRole()
{
    $c = new ConnectionController();
    $id = $_POST['id'];
    $new_role = $_POST['role'];
    $conn = $c->Connect();
    $sql = "UPDATE users SET roles='$new_role' WHERE id=$id";
    $conn->query($sql);
    header('location:/pfe/listusers.php');
    $conn->close();
}

function ChangeEnabled()
{
    $c = new ConnectionController();
    $id = $_POST['id'];
    $isEnabled = $_POST['isEnabled'];
    $conn = $c->Connect();
    $sql = "UPDATE users SET isEnabled=$isEnabled WHERE id=$id";
    $conn->query($sql);
    header('location:/pfe/listusers.php');
    $conn->close();
}

function AddUser()
{
    $c = new ConnectionController();
    $conn = $c->Connect();
    $d = date('Y-m-d H:i:s');
    $username = $_POST['user-sign-up'];
    $login = $_POST['login-sign-up'];
    $email = $_POST['email-sign-up'];
    $tel = $_POST['tel-sign-up'];
    $password = md5($_POST['pass-sign-up']);
    $roles = ['user'];
    $role = implode(',', $roles);
    $sql = "INSERT INTO users (username	,login,email,tel,password,created_at,roles) VALUES ('$username','$login','$email','$tel','$password','$d','$role')";
    $conn->query($sql);
    $conn->close();
    header('location:/pfe/listusers.php');
}

function AssingnUser()
{
    $c = new ConnectionController();
    $id = $_POST['id'];
    $idStation = $_POST['idStation'];
    $conn = $c->Connect();
    $sql = "UPDATE users SET idStation=$idStation WHERE id=$id";
    $conn->query($sql);
    header('location:/pfe/listusers.php');
    $conn->close();
}

?>

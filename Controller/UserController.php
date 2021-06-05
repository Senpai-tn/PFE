<?php
include '../Model/User.php';
include 'ConnectionController.php';
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
    $d = date('Y-m-d H:i:s');
    $username = $_POST['user-sign-up'];
    $login = $_POST['login-sign-up'];
    $email = $_POST['email-sign-up'];
    $tel = $_POST['tel-sign-up'];
    $password = md5($_POST['pass-sign-up']);
    $conn = $c->Connect();
    $roles = ['user'];
    $role = implode(',', $roles);

    $sql = "INSERT INTO users (username	,login,email,tel,password,created_at,roles) VALUES ('$username','$login','$email','$tel','$password','$d','$role')";

    if ($conn->query($sql) === true) {
        $last_id = $conn->insert_id;
        $u = new User($last_id, $username, $login, $email, $tel, $password, [
            'user',
        ]);

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

?>

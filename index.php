<?php
include_once 'Base.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    include 'Model/User.php';
    $u = unserialize($_SESSION['user']);

    if (in_array('admin', $u->roles)) {
        header('location:admin.php');
    } else {
        header('location:user.php');
    }
    ?>



    
</body>
</html>
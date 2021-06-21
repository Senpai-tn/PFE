<?php
session_start();
include 'Model/User.php';
include 'Controller/ConnectionController.php';
$u = unserialize($_SESSION['user']);

if (!isset($_SESSION['user'])) {
    header('location:login.php');
    return false;
}

if (!in_array('admin', $u->roles)) {
    header('location:403.html');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon.png">
    <title></title>
    <!-- Bootstrap Core CSS -->
    <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- morris CSS -->
    <link href="assets/plugins/morrisjs/morris.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="assets/AdminAssets/css/style.css" rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="assets/AdminAssets/css/colors/blue-dark.css" id="theme" rel="stylesheet">
    <link href="assets/font-awesome/css/font-awesome.css"  rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js" integrity="sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<style>
.alert
{
    padding-top: 0;
    margin: 0;
    font-weight: bolder;
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
}

.alert-danger{
    background: #f00;
}
.hidden{
    display:none;
}
</style>
<body class="fix-header fix-sidebar card-no-border">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
             </svg>
    </div>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <!-- ============================================================== -->
        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- ============================================================== -->
                <!-- Logo -->
                <!-- ============================================================== -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="admin.php">
                        <!-- Logo icon --><b>
                            <!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
                            <!-- Dark Logo icon -->
                            <img src="assets/img/logo-icon.png" alt="homepage" class="dark-logo" />
                            <!-- Light Logo icon -->
                            <img src="assets/img/logo-light-icon.png" alt="homepage" class="light-logo" />
                        </b>
                        <!--End Logo icon -->
                        <!-- Logo text --><span>
                         <!-- dark Logo text -->
                         <img src="assets/img/logo-text.png" alt="homepage" class="dark-logo" />
                         <!-- Light Logo text -->    
                         <img src="assets/img/logo-light-text.png" class="light-logo" alt="homepage" /></span> </a>
                </div>
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                <div class="navbar-collapse">
                    <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav mr-auto mt-md-0">
                        <!-- This is  -->
                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                        <li class="nav-item m-l-10"> <a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                        <!-- ============================================================== -->
                       
                
                        <!-- ============================================================== -->
                    </ul>
                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav my-lg-0">
                        <!-- ============================================================== -->
                       
                        <!-- ============================================================== -->
                        <!-- Profile -->
                        <!-- ============================================================== -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/img/admin.png" alt="user" class="profile-pic" /></a>
                            <div class="dropdown-menu dropdown-menu-right scale-up">
                                <ul class="dropdown-user">
                                    <li>
                                        <div class="dw-user-box">
                                            <div class="u-img"><img src="assets/img/admin.png" alt="user"></div>
                                            <div class="u-text">
                                                <h4><?php echo $u->username; ?></h4>
                                                <p class="text-muted"><?php echo $u->email; ?></p><a href="pages-profile.html" class="btn btn-rounded btn-danger btn-sm">View Profile</a></div>
                                        </div>
                                    </li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="Controller/UserController.php?fn=Logout"><i class="fa fa-power-off"></i> Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- ============================================================== -->
        <!-- End Topbar header -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <aside class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- User profile -->
                <div class="user-profile">
                    <!-- User profile image -->
                    <div class="profile-img"> <img src="assets/img/admin.png" alt="user" />
                        <!-- this is blinking heartbit-->
                        <div class="notify setpos"> <span class="heartbit"></span> <span class="point"></span> </div>
                    </div>
                    <!-- User profile text-->
                    <div class="profile-text">
                        <h5><?php echo $u->username; ?></h5>
                        <a href="Controller/UserController.php?fn=Logout"  class="btn-danger" data-toggle="tooltip" title="Logout"><i style="color:#fff" class="mdi mdi-power"></i></a>
                        
                    </div>
                </div>
                <!-- End User profile text-->
                <!-- Sidebar navigation-->
                
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="nav-devider"></li>
                        <li> <a class="has-arrow waves-effect waves-dark" href="#" aria-expanded="false">
                        <i class="fa fa-users" aria-hidden="true"></i><span class="hide-menu">
                                Users <span class="label label-rouded label-themecolor pull-right"></span></span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="adduser.php">Add new user </a></li>
                                <li><a href="listusers.php">List of users </a></li>
                                <li><a href="AssignUser.php">Assign user to station</a></li>

                            </ul>
                        </li>
                        <li> <a class="has-arrow waves-effect waves-dark" href="#" aria-expanded="false">
                        <i class="fa fa-building-o" aria-hidden="true"></i><span class="hide-menu">Stations <span class="label label-rouded label-primary pull-right"></span></span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="AddStation.php">Add new station </a></li>
                                <li><a href="liststations.php">List of stations </a></li>
                                
                            </ul>
                        </li>
                        <li> <a class="has-arrow waves-effect waves-dark" href="#" aria-expanded="false"><img style="    height: 34px;
    width: auto;
    margin-left: -10px;
    margin-right: 7px;" src="assets/img/sensor.png"><span class="hide-menu">Sensors<span class="label label-rouded label-info pull-right" style="    background-color: #0f0"></span></span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="AddSensor.php">Add sensor</a></li>
                                <li><a href="ListSensors.php">List of sensor</a></li>
                                <li><a href="AssignSensor.php">Assign sensor</a></li>
                            </ul>
                        </li>
                        <li> 
                            <a class="waves-effect waves-dark" href="history.php" aria-expanded="false">
                                <i class="mdi mdi-table"></i>
                                <span class="hide-menu">History<span class="label label-rouded label-danger pull-right"></span></span>
                            </a>
                        </li>
                        

                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </aside>
        <div class="alert alert-danger hidden" id="alert" style="text-align:center" role="alert">
       
</div>

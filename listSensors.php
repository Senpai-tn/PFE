<?php

include_once 'AdminViews/Header.php';
include_once 'Controller/ConnectionController.php';
?>
<style>
    .btn-success{
        background-color: #28a745;
        border:0;
    }
</style>
<div class="page-wrapper">
<div class="container-fluid">
<div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Data Export</h4>
                                <h6 class="card-subtitle">Export data to Copy, CSV, Excel, PDF & Print</h6>
                                <div class="table-responsive m-t-40">
                                    <table id="example23" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Station</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Station</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </tfoot>
                                        <tbody id="table">
                                        <?php
                                        $all = [];
                                        $c = new ConnectionController();
                                        $conn = $c->Connect();
                                        $sql = 'SELECT * FROM sensors';
                                        $result = $conn->query($sql);
                                        while ($row = $result->fetch_assoc()) {
                                            echo '<tr>
                                                 <td>' .
                                                $row['ref'] .
                                                '</td>
                                                 <td>' .
                                                $row['type'] .
                                                '</td>
                                                 <td></td>
                                                 <td ></td>
                                                <td >';
                                            if ($row['idStation'] != null) {
                                                $s =
                                                    'SELECT * FROM stations where id =' .
                                                    $row['idStation'];
                                                $res = $conn->query($s);
                                                $st = $res->fetch_assoc();
                                                echo $st['name'];
                                            } else {
                                                echo '';
                                            }
                                            echo '</td>
                                                 <td></td>
                                                 <td> 
                                            
                                            <form action="Controller/UserController.php" method="POST">
                                            <input type="hidden" name="ref" value=' .
                                                $row['ref'] .
                                                '
                                                     >
                                            <input type="hidden" name="fn" value="ChangeEnabled">';

                                            if ($row['isEnabled'] == 0) {
                                                echo '<input type="hidden" name="isEnabled" value="true">
                                            <input class="btn btn-success" type=submit value="Activate">';
                                            } elseif ($row['isEnabled'] == 1) {
                                                echo '<input type="hidden" name="isEnabled" value="false">
                                    
                                    <input class="btn btn-danger" type=submit value="block">';
                                            }

                                            echo '</form>
                                            </td>
                                            
                                             </tr>';
                                        }
                                        ?>
                                            
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                  
                     
                    </div>
                </div>
                </div>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<?php include 'AdminViews/Footer.php'; ?>

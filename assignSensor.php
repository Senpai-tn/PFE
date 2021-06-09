<?php
include_once 'AdminViews/Header.php';
include_once 'Controller/ConnectionController.php';
$c = new ConnectionController();
$conn = $c->Connect();
?>

<link rel="stylesheet" href="assets/css/login.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:600">
  <style>
.input-number::-webkit-outer-spin-button,
.input-number::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.hidden {
  position: relative;
  display: none;
}

.container
{
  padding:80px 20px;
}

datalist {
  display: none;
}

</style>
<div class="page-wrapper">
  <!-- Container fluid  -->
  <!-- ============================================================== -->
  <div class="container-fluid">
    <div class="login-form">
      <div class="container">
      <form action="Controller/SensorController.php" method="POST">
  
  <div class="form-group">
    <label for="exampleFormControlSelect1">Sensors </label>
    <label for="browsersSensors">( Choose your browser from the list ) :</label>
  <input list="browsersSensors" class="form-control" id="exampleFormControlSelect1" name="ref">
  <datalist id="browsersSensors">
  <?php
  $sql = 'SELECT * FROM sensors';
  $result = $conn->query($sql);
  while ($row = $result->fetch_assoc()) {
      echo '<option value=' . $row['ref'] . '>' . $row['type'] . '</option>';
  }
  ?>
  </datalist>
    
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Station :</label>
    <label for="browsersStations">( Choose your browser from the list ) :</label>
  <input list="browsersStations" class="form-control" id="exampleFormControlSelect1" name="idStation">
  <datalist id="browsersStations">
  <?php
  $sql = 'SELECT * FROM stations';
  $result = $conn->query($sql);
  while ($row = $result->fetch_assoc()) {
      echo '<option value=' . $row['id'] . '>' . $row['name'] . '</option>';
  }
  ?>
  </datalist>
  </div>
  <input type="hidden" name="fn" value="AssingnSensor">
  <input type="submit" value="Assign">
</form>
      </div>
    </div>
  </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
                    document.title = "Assign User";
                </script>
<?php include 'AdminViews/Footer.php'; ?>

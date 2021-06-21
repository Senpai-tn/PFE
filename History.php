<?php include 'AdminViews/Header.php';
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

  
  <div class="form-group">
  <label for="exampleFormControlSelect2">Search by region :</label>
  <input list="browsersRegion" class="form-control" id="exampleFormControlSelect2" name="region">
    <label for="exampleFormControlSelect2">Station :</label>
    <label for="browsersStations">( Choose the station ) :</label>
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
  <datalist id="browsersRegion">
  <?php
  $sql = 'SELECT distinct(region),id FROM stations';
  $result = $conn->query($sql);
  while ($row = $result->fetch_assoc()) {
      echo '<option value=' .
          $row['region'] .
          '>' .
          $row['region'] .
          '</option>';
  }
  ?>
  </datalist>
  </div>
  <div id="chart-container">
  <canvas id="chart" height="130"></canvas>
  </div>
 
      </div>
     
    </div>
    
  </div>

</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
                    document.title = "History";
                </script>
   <script src="assets/plugins/jquery/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>              
<script>
        var ctx = document.getElementById('chart').getContext('2d');
        AllChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Temp',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'Press',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'Debit',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
temp=[];

$('#exampleFormControlSelect2').on('input',function(e){
    $.ajax({
        url:'http://localhost/pfe/Controller/StationController.php',
    type:"json",
    method:"POST",
    data:{
        "fn":"FindStationByRegion",
        "region":$('#exampleFormControlSelect2').val()
    },
    success:function(data){
        res = JSON.parse(data);
        if(res.length > 0)
        {
            $("#browsersStations").html("");
        }
        for (let index = 0; index < res.length; index++) {
            console.log('====================================');
            console.log(res[index]);
            console.log('====================================');
            $("#browsersStations").append(new Option(res[index].name, res[index].id))     
        }
    }
    })
});


$('#exampleFormControlSelect1').on('input',function(e){
 $.ajax({
    url:'http://localhost/pfe/Controller/Datacontroller.php',
    type:"json",
    method:"POST",
    data:{
        "fn":"getHistory",
        "idStation":$('#exampleFormControlSelect1').val()
    },
    success:function(data){
      if(data.includes("0 results") == false )
      {
        AllChart.destroy();
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        res = JSON.parse(data) ;
        var temp = res.temp;
        var press = res.press;
        var debit = res.debit;
        var time = res.time;
        var ctx = document.getElementById('chart').getContext('2d');
        AllChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'Temp',
                    data: temp,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'Press',
                    data: press,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },{
                    label: 'Debit',
                    data: debit,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

      }
     
    }
})
});


</script>

       
        <script>

        




        </script>
<?php include 'AdminViews/Footer.php'; ?>

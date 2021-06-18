<?php include 'AdminViews/Header.php'; ?>
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

</style>
  <div class="page-wrapper">
    <!-- Container fluid  -->
    <!-- ============================================================== -->
    <div class="container-fluid">
    <div class="login-form">
    <?php if (isset($_SESSION['error'])) {
        echo '<span style="color:red">' . $_SESSION['error'] . '</span>';
    } ?>
      <div class="container">
      <form action="Controller/SensorController.php" method="POST">
        <div class="sign-up-htm">
          <div class="group">
          <input type="hidden" name="fn" value="AddSensor">
            <label for="ref" class="label">Reference </label>
            <input id="ref" required name="ref" type="text" class="input">
          </div>
          <div class="group">
            <label for="type" class="label">Type </label>
            <select style="    width: 100%;" class="custom-select my-1 mr-sm-2" name="type" id="inlineFormCustomSelectPref">
              <option value="temp">Temp</option>
              <option value="press">Press</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div class="group">
            <input type="submit" class="button" value="Add sensor">
          </div>
        </div>
      </form>
      </div>
		</div>
    </div>
</div>
<script src="assets/js/Validate.js"></script>
<script>
                    document.title = "Add sensor";
                </script>
<?php include 'AdminViews/Footer.php'; ?>

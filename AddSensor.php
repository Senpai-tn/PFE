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
      <div class="container">
      <form action="Controller/SensorController.php" method="POST" onsubmit="return ValidateSignUp()">
        <div class="sign-up-htm">
          <div class="group">
          <input type="hidden" name="fn" value="AddSensor">
            <label for="name" class="label">Reference </label>
            <input id="name" required name="ref" type="text" class="input">
          </div>
          <div class="group">
            <label for="region" class="label">Type </label>
            <input id="region" required name="type" type="text" class="input">
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
<?php include 'AdminViews/Footer.php'; ?>

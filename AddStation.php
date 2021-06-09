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
      <form action="Controller/StationController.php" method="POST" onsubmit="return ValidateSignUp()">
        <div class="sign-up-htm">
          <div class="group">
          <input type="hidden" name="fn" value="AddStation">
            <label for="name" class="label">Name</label>
            <input id="name" required name="name" type="text" class="input">
          </div>
          <div class="group">
            <label for="region" class="label">Region</label>
            <input id="region" required name="region" type="text" class="input">
          </div>
          <div class="group">
            <label for="gouvernorat" class="label">Gouvernement</label>
            <input id="gouvernorat" required name="gouvernorat" type="text" class="input">
          </div>
          <div class="group">
            <input type="submit" class="button" value="Sign Up">
          </div>


        </div>
      </form>
      </div>
		</div>
    </div>
</div>
<script src="assets/js/Validate.js"></script>
<script>
                    document.title = "Add station";
                </script>
<?php include 'AdminViews/Footer.php'; ?>

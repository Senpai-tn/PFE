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

</style>
  <div class="page-wrapper">
    <!-- Container fluid  -->
    <!-- ============================================================== -->
    <div class="container-fluid">
    <div class="login-form">
 
      <form action="Controller/UserController.php" method="POST" onsubmit="return ValidateSignUp()">
        <div class="sign-up-htm">
          <div class="group">
          <input type="hidden" name="fn" value="AddUser">
            <label for="user-sign-up" class="label">Firstname & Lastname</label>
            <input id="user-sign-up" required name="user-sign-up" type="text" class="input">
          </div>
          <div class="group">
            <label for="email-sign-up" class="label">Email Address</label>
            <input id="email-sign-up" required name="email-sign-up" type="email" class="input">
          </div>
          <div class="group">
            <label for="login-sign-up" class="label">Username</label>
            <input id="login-sign-up" required name="login-sign-up" type="text" class="input">
          </div>
          <div class="group">
            <label for="tel-sign-up" class="label">Tel number</label>
            <input id="tel-sign-up" required name="tel-sign-up" type="number"  class="input input-number">
          </div>
          <div class="group">
            <label for="pass-sign-up" class="label">Password</label>
            <input id="pass-sign-up" required name="pass-sign-up" type="password" class="input" data-type="password">
            <div id="error-sign-up" class="hidden">
            <span style="color: red;left:30px">Password doesn't match</span>
            </div>

          </div>
          <div class="group">
            <label for="cpass-sign-up" class="label">Repeat Password</label>
            <input id="cpass-sign-up" required name="cpass-sign-up" type="password" class="input" data-type="password">
          </div>

          <div class="group">
            <input type="submit" class="button" value="Sign Up">
          </div>


        </div>
      </form>
		</div>
    </div>
</div>
<script src="assets/js/Validate.js"></script>
<?php include 'AdminViews/Footer.php'; ?>

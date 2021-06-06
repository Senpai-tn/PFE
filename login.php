<?php
session_start();
if (isset($_SESSION['user'])) {
    header('location:index.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/login.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:600">
  <link rel="stylesheet" href="assets/css/login.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
</head>
<body>
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

<div class="login-wrap">

	<div class="login-html">
  <?php if (isset($_SESSION['error'])) {
      echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error ! </strong>' .
          $_SESSION['error'] .
          '
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">X</span>
    </button>
    </div>
    ';
  } ?>

		<input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
		<div class="login-form">
      <form action="Controller/UserController.php" method="POST" onsubmit="return ValidateSignIn()">
        <div class="sign-in-htm">
          <div class="group">
            <input type="hidden" name="fn" value="Login">
            <label for="email-sign-in" class="label">Email</label>
            <input id="email-sign-in" name="email-sign-in" type="email" class="input" required>
            
          </div>
          <div class="group">
            <label for="pass-sign-in" class="label">Password</label>
            <input id="pass-sign-in" name="pass-sign-in" type="password" required class="input" data-type="password">
          </div>

          <div class="group">
            <input type="submit" class="button" value="Sign In">
          </div>
          <div class="hr"></div>
          
        </div>
      </form>
      <form action="Controller/UserController.php" method="POST" onsubmit="return ValidateSignUp()">
        <div class="sign-up-htm">
          <div class="group">
          <input type="hidden" name="fn" value="Register">
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
          <div class="hr"></div>
          <div class="foot-lnk">
            <label for="tab-1">Already Member?</a>
          </div>
        </div>
      </form>
		</div>
	</div>
</div>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="assets/js/Validate.js"></script>

<script>
  setTimeout(() => {
    <?php $_SESSION['error'] = null; ?>
  }, 1000);
</script>
</body>
</html>
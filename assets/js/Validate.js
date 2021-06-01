function ValidateSignUp() {
  if ($("#pass-sign-up").val() !== $("#cpass-sign-up").val()) {
    $("#error-sign-up").removeClass("hidden");
    return false;
  }

  return true;
}

function ValidateSignIn() {}

async function initSummary() {
    await initJoin();
}

function openSignup(){
    let login = document.getElementById('start-page-login');
    let signup = document.getElementById('signup-startpage');
    login.classList.add('d-none');
    signup.classList.remove('d-none');
}

function backToLogin(){
    let login = document.getElementById('start-page-login');
    let signup = document.getElementById('signup-startpage');
    login.classList.remove('d-none');
    signup.classList.add('d-none');
}

function showPassword() {
    let image = document.getElementById('password');
    if (image.type == 'password') {
      image.style.backgroundImage = "url('./assets/img/visibility_off.svg')";
      image.type = 'text';
    } else {
      image.style.backgroundImage = "url('./assets/img/visibility.svg')";
      image.type = 'password';
    }
  }
  
  /**
   * Function to toggle password visibility.
   */
  function showPasswordConf() {
    let image = document.getElementById('passwordConfirm');
    if (image.type == 'password') {
      image.style.backgroundImage = "url('../assets/icons/visibility.svg')";
      image.type = 'text';
    } else {
      image.style.backgroundImage = "url('../assets/icons/visibility_off.svg')";
      image.type = 'password';
    }
  }
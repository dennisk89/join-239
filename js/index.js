/**
 * This function initialized the Join app.
 */
// function init() {
//   initJoin();
// }


/**
 * This function is used to open the signup form.
 */
function openSignup() {
  let login = document.getElementById('start-page-login');
  let signup = document.getElementById('signup-startpage');
  login.classList.add('d-none');
  signup.classList.remove('d-none');
}


/**
 * This function is used to go back, to the login page.
 */
function backToLogin() {
  let login = document.getElementById('start-page-login');
  let signup = document.getElementById('signup-startpage');
  login.classList.remove('d-none');
  signup.classList.add('d-none');
}


/**
 * Toggles the visibility of a password field by changing its type between 'password' and 'text'.
 * Also updates the background image of a related field to indicate the visibility state.
 * 
 * @param {string} id - The ID of the HTML element whose background image should be updated.
 * @param {string} container - The ID of the password field whose visibility is being toggled.
 */
function showPassword(id, container) {
  let password = document.getElementById(container)
  let field = document.getElementById(id);
  if (password.type == 'text') {
    field.style.backgroundImage = "url('./assets/img/visibility_off.svg')";
    password.type = 'password';
  } else {
    field.style.backgroundImage = "url('./assets/img/visibility.svg')";
    password.type = 'text';
  }
}


/**
 * Updates the background image of a specified HTML element to indicate focus.
 *
 * @param {string} id - The ID of the HTML element whose background image should be updated.
 */
function handleFocus(id) {
  let field = document.getElementById(id);
  field.style.backgroundImage = "url('./assets/img/visibility_off.svg')";
}

// Add event listeners for focus events on specific elements

/**
 * Adds a focus event listener to the element with the ID 'passwordForm'.
 * When the element gains focus, it calls the handleFocus function with the ID 'passwordClick1'.
 */
document.getElementById('passwordForm').addEventListener('focus', function () {
  handleFocus('passwordClick1');
});

/**
 * Adds a focus event listener to the element with the ID 'confirmPassword'.
 * When the element gains focus, it calls the handleFocus function with the ID 'passwordClick2'.
 */
document.getElementById('confirmPassword').addEventListener('focus', function () {
  handleFocus('passwordClick2');
});

/**
 * Adds a focus event listener to the element with the ID 'password'.
 * When the element gains focus, it calls the handleFocus function with the ID 'passwordClick'.
 */
document.getElementById('password').addEventListener('focus', function () {
  handleFocus('passwordClick');
});


/**
 * Checks if the password and confirm password fields match.
 * If they do not match, displays an error message and adds a red border to the password field.
 * If they match, hides the error message.
 *
 * @returns {boolean} Returns true if the passwords match, false otherwise.
 */
function checkPasswordMatch() {
  let password = document.getElementById('passwordForm').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let showError = document.getElementById('pwError');
  let passwordWarning = document.getElementById('passwordWarning')
  if (password !== confirmPassword) {
    showError.classList.remove('d-none');
    passwordWarning.classList.add('border-red')
    return false;
  } else {
    showError.classList.add('d-none');
    return true;
  }
}


/**
 * This function is used to change the image depending on whether the privacy policy has been accepted or not.
 */
function handleCheckBoxPrivacyPolicy() {
  let image = document.getElementById('privacyCheckBox');
  if (image.src.includes('checkbox.svg')) {
    image.src = "./assets/img/checkbox-checked.svg";
  } else {
    image.src = "./assets/img/checkbox.svg";
  }
}


/**
 * Validates the form by checking if the passwords match and if the privacy checkbox is checked.
 * If validation passes, creates a new user and adds the user information.
 * If validation fails, prevents form submission and displays error messages.
 *
 * @param {Event} event - The form submission event.
 * @returns {boolean} Returns false if the validation fails, true otherwise.
 */
function validateForm(event) {
  event.preventDefault();
  debugger
  let privacyerrormessage = document.getElementById('privacyError')
  let isPasswordMatch = checkPasswordMatch();
  let privacyCheckBox = document.getElementById('privacyCheckBox').src.includes('checkbox-checked.svg');
  if (isPasswordMatch && privacyCheckBox && document.getElementById('name').value.length > 0 &&  document.getElementById('e-mail').value.length > 0) {
    createNewUser();
  } else {
    if (!privacyCheckBox) {
      privacyerrormessage.classList.remove('d-none');
      return false;
    }
  };
}


/**
 * This function is used to show a message, when the signup was successfull.
 */
function showSuccessMessage() {
  const successMessage = document.getElementById('successfullSignup');
  successMessage.classList.add('show');
}


/**
 * This function is used to toggle the checkbox image
 */
function handleCheckBoxRememberMe() {
  let checkbox = document.getElementById('rememberMe');
  if (checkbox.src.includes('checkbox.svg')) {
    checkbox.src = "./assets/img/checkbox-checked.svg";
  } else {
    checkbox.src = "./assets/img/checkbox.svg";
  }
}


/**
 * This function is used to check whether the remember me checkbox was clicked or not. If so, loginwithpersistence will be executed if not the standard login.
 */
function validateLogin() {
  let inputValues = [document.getElementById('email').value, document.getElementById('password').value]
  let checkBox = document.getElementById('rememberMe');
  if (inputValues[0].length > 0 && inputValues[1].length > 0) {
    checkBox.src.includes('checkbox-checked.svg') ? loginWithPersistence() : login();
  } else {
    document.getElementById('passwordContainer').classList.add('border-red');
    document.getElementById('wrongPassword').style.display = 'block';
  }
}

/**
 * This function is used to open the summary page for guest users and to execute the function handleGuestUser commiting the variable "true".
 */
function openGuestAccess() {
  handleGuestUser(true);
  window.location.href = "./summary.html";
}


/**
 * This function is used to store the information whether a guest user is logged in or not into the local storage.
 * @param {boolean} yesOrNo This variable is either filled with "true" or "false".
 */
function handleGuestUser(trueOrFalse) {
  guestUserActive = trueOrFalse;
  localStorage.setItem('guestUserActive', JSON.stringify(guestUserActive));
}






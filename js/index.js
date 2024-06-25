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

function handleFocus(id) {
  let field = document.getElementById(id);
  field.style.backgroundImage = "url('./assets/img/visibility_off.svg')";
}

document.getElementById('passwordForm').addEventListener('focus', function() {
  handleFocus('passwordClick1');
});

document.getElementById('confirmPassword').addEventListener('focus', function() {
  handleFocus('passwordClick2');
});

document.getElementById('password').addEventListener('focus', function() {
  handleFocus('passwordClick');
});

// class User {
//   constructor(id, name, email, password) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }
// }
 
// function checkPasswordMatch() {
//   let password = document.getElementById('passwordForm').value;
//   let confirmPassword = document.getElementById('confirmPassword').value;
//   let showError = document.getElementById('pwError');
//   if (password !== confirmPassword) {
//     showError.classList.remove('d-none');
//     return false;
//   } else {
//     showError.classList.add('d-none');
//     return true;
//   }
// }

function handleCheckBoxPrivacyPolicy() {
  let image = document.getElementById('privacyCheckBox');
  if (image.src.includes('checkbox.svg')) {
    image.src = "./assets/img/checkbox-checked.svg";
  } else {
    image.src = "./assets/img/checkbox.svg";
  }
}

// async function createNewUser() {
//   let newUser = new User(generateUniqueId('u', usersArray), 
//         document.getElementById('name').value, 
//         document.getElementById('e-mail').value, 
//         document.getElementById('passwordForm').value, 
//       );
//     usersArray.push(newUser)  
//     await putData(endpointUser, usersArray);
//     backToLogin();
// }

// function validateForm(event) {
//   event.preventDefault(); // Verhindert das Standard-Formular-Submit
//   let privacyerrormessage = document.getElementById('privacyError')
//   let isPasswordMatch = checkPasswordMatch();
//   let privacyCheckBox = document.getElementById('privacyCheckBox').src.includes('checkbox-checked.svg');
//   if (isPasswordMatch && privacyCheckBox) {
//     createNewUser();
//   } else {
//     if (!privacyCheckBox) {
//       privacyerrormessage.classList.remove('d-none');
//       return false;
//     }
//   }
//   ;
// }

function animation() {
  setTimeout(function() {
      document.getElementById("whiteB").style.zIndex = "-1";
  }, 4000);
}

window.onload = animation;






const userLocalStorageKey = "users_key";
let users = {};

function loadUsers() {
    let result = localStorage.getItem(userLocalStorageKey);
    if (result) {
        users = result;
    }
    console.log("users loaded")
}

function saveUsers() {
    localStorage.setItem(userLocalStorageKey, users);
}

function addUser(username, email, password) {
    users[username] = {
        "username": username,
        "email": email,
        "password": password,
        "highScore": 0
    }
    saveUsers();
}

function setHighScore(username, score) {
    users[username].highScore = score;
}

function validateUserLogin(username, password) {
    return true;
}

function validateUsernameSignup(username) {
    return true;
}

function validateEmailAddressSignup(email) {
    return true;
} 

function validatePasswordStrength(password) {
    return true;
}

function validatePasswordMatch(password, passwordCopy) {
    if (password == passwordCopy) {
        return true;
    } else {
        showPasswordMismatchError();
        return false;
    }
}

function showLoginFailedError() {
    // TO DO: error message when log in fails
    console.log("show log in failed")
}

function showEmailExistsError() {
    // TO DO: when try to sign up
    console.log("email exists")
}

function showUserExistsError() {
    // TO DO: 
    console.log("user exists")
}

function showPasswordError() {
    // TO DO:
    console.log("password is invalid")
}

function showPasswordMismatchError() {
    // TO DO:
    console.log("passwords don't match")
}

function showEmailNotValidError() {
    // TO DO:
    console.log("email is invalid")
}

function showUserNotValidError() {
    // TO DO:
    console.log("username is invalid")
}

function login(username) {
    localStorage.setItem('loggedInUser', username);
    window.location.href='index.php';
}

function onLoginSubmit() {
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    if(validateUserLogin(username, password)) {
        login();
    } else {
        showLoginFailedError();
    }
}

function onSignupSubmit() {
    let username = document.getElementById('userSignup').value;
    let password = document.getElementById('passSignup').value;
    let passwordCopy = document.getElementById('pass2Signup').value;
    let email = document.getElementById('emailSignup').value;

    if(validateUsernameSignup(username) 
    && validateEmailAddressSignup(email) 
    && validatePasswordStrength(password) 
    && validatePasswordMatch(password,passwordCopy)) {
        addUser(username, email, password);
        login(username);
    }
}


loadUsers();
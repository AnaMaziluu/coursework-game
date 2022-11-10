const userLocalStorageKey = "users_key";
const loggedInUserKey = "loggedInUser";
let users = {};

function navigateToHomePage() {
    window.location.href='/homePage/homePage.php';
}

function saveUsers() {
    let stringUsers = JSON.stringify(users);
    localStorage.setItem(userLocalStorageKey, stringUsers);
}

function loadUsers() {
    let returnedUsers = localStorage.getItem(userLocalStorageKey);
    if (returnedUsers) {
        users = JSON.parse(returnedUsers);
    }
}

function getUser(username) {
    return users[username];
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
    saveUsers();
}

function validateUserLogin(username, password) {
    let user = getUser(username);
   return user && user.password == password
}

function validateUsernameSignup() {
    let usernameField = document.getElementById('userSignup');
    let input = usernameField.value;

    if (input === "") {
        usernameField.setCustomValidity("Enter your username!");
        return false;
    } else if (!(/^[A-Za-z0-9_]*$/.test(input))) {
        usernameField.setCustomValidity("Your username should contain just letters, numbers or underscore");
        return false;
    }
    else {
        return true;
    }
}

function validateEmailAddressSignup() {
    let emailField = document.getElementById('emailSignup');
    let input = emailField.value;

    if (input === "") {
        emailField.setCustomValidity("Enter your email!");
        return false;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))) {
        emailField.setCustomValidity("Not a valid email address");
        return false;
    }
    else {
        return true;
    }
} 

function checkContainsUpperCase(string) {
    return /[A-Z]/.test(string)
}

function checkContainsLowerCase(string) {
    return /[a-z]/.test(string)
}

function checkContainsSpecialCharacter(string) {
    return /[!@#$%^&*(),.?":{}|<>]/.test(string)
}

function checkMinimumLength(string) {
    return string.length > 7;
}

function validatePasswordStrength() {
    let passwordField = document.getElementById('passSignup');
    let input = passwordField.value;

    if (!checkMinimumLength(input)) {
        passwordField.setCustomValidity("The password should be at least 8 characters long!");
        return false;
    }
    if (checkContainsUpperCase(input) && checkContainsLowerCase(input) && checkContainsSpecialCharacter(input)) {
        return true;
    } else {
        passwordField.setCustomValidity("Password should contain at least one upper case, one lower case and one special character")
    }
    return false;
}

function validatePasswordMatch() {
    let password = document.getElementById('passSignup');
    let passwordCopy = document.getElementById('pass2Signup');
    if (password.value == passwordCopy.value) {
        return true;
    } else {
        passwordCopy.setCustomValidity("Passwords don't match!");
        return false;
    }
}

function showLoginFailedError(field) {
    field.setCustomValidity("The username and/or the password is wrong");
}

function login(username) {
    localStorage.setItem(loggedInUserKey, username);
    navigateToHomePage();
}

function logOut() {
    localStorage.removeItem(loggedInUserKey);
    navigateToHomePage();
}

function onLoginSubmit() {
    let username = document.getElementById('user').value;
    let passwordField = document.getElementById('pass');
    let password = passwordField.value;
    if(validateUserLogin(username, password)) {
        login(username);
    } else {
        showLoginFailedError(passwordField);
    }
}

function onSignupSubmit() {
    if (validateUsernameSignup() 
        && validateEmailAddressSignup() 
        && validatePasswordStrength() 
        && validatePasswordMatch()
    ) {
        let username = document.getElementById('userSignup').value;
        let password = document.getElementById('passSignup').value;
        let email = document.getElementById('emailSignup').value;

        addUser(username, email, password);
        login(username);
    }
}

loadUsers();

let usernameField = document.getElementById('userSignup');
usernameField.addEventListener("input", () => {
    usernameField.setCustomValidity("");
});
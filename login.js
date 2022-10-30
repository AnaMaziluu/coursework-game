const userLocalStorageKey = "users_key";
let users = {};

function loadUsers() {
    let result = localStorage.getItem(userLocalStorageKey);
    if (result) {
        users = result;
    }
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
    // trebuie sa verific daca este in local storage user cu username-ul si parola asta
    return true;
}

function validateUsernameSignup() {
    let usernameField = document.getElementById('userSignup');
    let input = usernameField.value;

        if (input === "") {
            usernameField.setCustomValidity("Enter your username!");
            console.log("e gol usernameul");
            return false;
        } else if (!(/^[A-Za-z0-9_]*$/.test(input))) {
            usernameField.setCustomValidity("Your username should contain just letters, numbers or underscore");
            console.log("nu contine doar litere sau numere sau _");
            return false;
        }
        else {
            return true;
        }
        //  la fel ca mai jos, trebuie sa verific ca nu este deja in lista mea de useri, adica in local storage
}


function validateEmailAddressSignup() {
    // pe langa validare de adresa, trebuie sa validez si ca nu exista in userii mei adresa asta
    return true;
} 

function validatePasswordStrength() {
    return true;
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
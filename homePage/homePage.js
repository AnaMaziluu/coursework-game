function onStartButtonClicked() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href='../gamePage/gamePage.php';
    } else {
        window.location.href='../loginPage/login.php';
    }
}

let loggedInUser = localStorage.getItem('loggedInUser');
console.log(loggedInUser);
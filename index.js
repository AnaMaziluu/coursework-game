function onStartButtonClicked() {
    console.log("s-a apasat butonul")
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href='gamePage.php';
    } else {
        window.location.href='login.php';
    }
}

let loggedInUser = localStorage.getItem('loggedInUser');
console.log(loggedInUser);
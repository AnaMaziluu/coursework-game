function onStartButtonClicked() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href='../gamePage/gamePage.php';
    } else {
        window.location.href='../loginPage/login.php';
    }
}

function logOut() {
    localStorage.removeItem('loggedInUser');
}

function updateNavigationBar() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser) {
        let signIn = document.getElementById('signIn');
        signIn.textContent = 'Sign out';
        signIn.onclick = logOut;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    updateNavigationBar();
});
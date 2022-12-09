// // Ranking table functionality

const userLocalStorageKey = "users_key";
let loggedInUser = localStorage.getItem('loggedInUser');
let users = {};
let usernameAndScore = [];
let sortedScores = [];
function loadUsers() {
    let returnedUsers = localStorage.getItem(userLocalStorageKey);
    if (returnedUsers) {
        users = JSON.parse(returnedUsers);
    }
}
loadUsers();

for (var key in users) {
    if (users.hasOwnProperty(key)) {
      usernameAndScore.push([users[key].username, [users[key]["highScore"]]]) 
    }
}

usernameAndScore.sort((a, b) => b[1] - a[1])


//   Modify the table with the sorted scores

 let tableContent =  usernameAndScore.map((element) => {
    if (element[0] == loggedInUser) {
        return `
        <tr class="currentPlayer">
            <td>${element[0]}</td>
            <td>${element[1]}</td>
        </tr>
    `;
    } else {
        return `
            <tr>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
            </tr>
        `;
    }
  }).join('');

  if (Object.keys(users).length !== 0) {
    document.getElementById('tbody').innerHTML = tableContent;
  } else {
    console.log("intra?")
    document.getElementById('table').innerHTML = `
        <p style="padding: 20px; font-size: 30px; font-weight: bold;"> Nobody played the game yet :'( </p>        
    `;
  }


//   Modify the navbar
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
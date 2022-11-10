// // Ranking table functionality

const userLocalStorageKey = "users_key";
let users = {};
function loadUsers() {
    let returnedUsers = localStorage.getItem(userLocalStorageKey);
    if (returnedUsers) {
        users = JSON.parse(returnedUsers);
    }
}
loadUsers();


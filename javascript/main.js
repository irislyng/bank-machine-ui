var account_number = localStorage.getItem("current_account_number");
var user = JSON.parse(localStorage.getItem(account_number));


function init() {
	document.getElementById("user-name").innerText = user.name;
}

function logout() {
	localStorage.setItem("current_account_number", null);
	location.href = "index.html"
}
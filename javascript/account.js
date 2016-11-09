var account_number = localStorage.getItem("current_account_number");
var user = JSON.parse(localStorage.getItem(account_number));
var account = localStorage.getItem("account");

function displayInformation() {
	document.getElementById("account-type").innerHTML = capitalizeFirstLetter(account);
	document.getElementById("account-number").innerHTML = account_number;
	document.getElementById("account-balance").innerHTML = user["accounts"][account]["balance"];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
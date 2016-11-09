function checkUser() {
	var account_number = localStorage.getItem("current_account_number");
	if (account_number == "null") {
		location.href="index.html";
		console.log("No user currently logged in.");
	} else {
		console.log("Current account number: " + account_number);
	}
}
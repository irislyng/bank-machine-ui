chequingBalance = user["accounts"]["chequing"]["balance"];
savingsBalance = user["accounts"]["savings"]["balance"];

function transferReceipt (params) {
	// TODO: Implement function
}

function withdrawalReceipt(account, amount) {
	console.log("in withdrawalReceipt() with account: " + account + " and amount: " + amount);

	var user = getLocalUser();
	var balance = user["accounts"][account]["balance"];

	var receipt = {
		type: "withdrawal",
		balance: balance, 
		amount: amount,
		account: account
	};

	localStorage.setItem("receipt", JSON.stringify(receipt));
	location.href="receipt.html"
}

function depositeReceipt(params) {
	// TODO: Implement function
}

function getLocalUser() {;
 	return JSON.parse(localStorage.getItem(currentAccount));
}
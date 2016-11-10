function transferReceipt (fromAccount, toAccount, amount) {
	var user = getLocalUser();

	var receipt = {
		type: "transfer",
		fromAccount: {
			account: fromAccount,
			balance: user["accounts"][fromAccount]["balance"]
		},
		toAccount: {
			account: toAccount,
			balance: user["accounts"][toAccount]["balance"]
		},
		amount: amount
	}

	localStorage.setItem("receipt", JSON.stringify(receipt));
	location.href="receipt.html"
}

function withdrawalReceipt(account, amount) {
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

function depositReceipt(account, amount) {
	var user = getLocalUser();
	var balance = user["accounts"][account]["balance"];

	var receipt = {
		type: "deposit",
		balance: balance, 
		amount: amount,
		account: account
	};

	localStorage.setItem("receipt", JSON.stringify(receipt));
	location.href="receipt.html"
}

function getLocalUser() {;
 	return JSON.parse(localStorage.getItem(currentAccount));
}
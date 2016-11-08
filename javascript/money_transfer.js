var currentAccount = localStorage.getItem("current_account_number");

var chequingBalance = getChequingBalance(currentAccount);
var savingsBalance = getSavingsBalance(currentAccount);



function setAccountBalance(acntNum, value, acntType) {
	// set the balance of the account and update localStorage
	var user = localStorage.getItem(acntNum);
	var account = JSON.parse(user);
	// account = [ {"pin": 1234, "accounts": { "chequing": { "balance": 7000 }, "savings": { "balance": 4000 }}, "name": "John Doe", "history": [] }]
	account["accounts"][acntType]["balance"] = value;
	console.log("Account " + acntType + "updated: " + value);

	var stringAccount = JSON.stringify(account);
	localStorage.setItem(acntNum, stringAccount);
};

function getChequingBalance(acntNum) {
	// get the balance for chequing 
	var user = localStorage.getItem(acntNum);
	var account = JSON.parse(user);
	return account["accounts"]["chequing"]["balance"];
}

function getSavingsBalance(acntNum) {
	// get the balance for savings
	var user = localStorage.getItem(acntNum);
	var account = JSON.parse(user);
	return account["accounts"]["savings"]["balance"];
}

function withdraw(fromAcnt, amount) {
	// simulate a withdrawl from a certain account (chequing or savings)
	var user = localStorage.getItem(currentAccount);
	var account = JSON.parse(user);

	if(fromAcnt == "chequing") {
		chequingBalance = chequingBalance - amount;
		account["accounts"][fromAcnt]["balance"] = chequingBalance;
	} else {
		savingsBalance = savingsBalance - amount;
		account["accounts"][fromAcnt]["balance"] = savingsBalance;
	}

	var stringAccount = JSON.stringify(account);
	localStorage.setItem(currentAccount, stringAccount);
}

function deposit(toAcnt, amount) {
	// simulate a deposit to a certain account (chequing or savings)
	var user = localStorage.getItem(currentAccount);
	var account = JSON.parse(user);

	if(toAcnt == "chequing") {
		chequingBalance = chequingBalance + amount;
		account["accounts"][toAcnt]["balance"] = chequingBalance;
	} else {
		savingsBalance = savingsBalance + amount;
		account["accounts"][fromAcnt]["balance"] = chequingBalance;
	}

	var stringAccount = JSON.stringify(account);
	localStorage.setItem(currentAccount, stringAccount);

}












var currentAccount = localStorage.getItem("current_account_number");
var user = getLocalUser();
var chequingBalance;
var savingsBalance;
updateBalances();

function setAccountBalance(value, acntType, transaction, diff, fromAcnt, toAcnt) {
	// Set the balance of the account and update localStorage.

	user["accounts"][acntType]["balance"] = value;
	console.log("Account " + acntType + " updated: " + value);

	var date = new Date();

	// Update account history.
	user["history"].push(JSON.stringify({ 
		"from": fromAcnt, 
		"to": toAcnt, 
		"transaction_type": transaction, 
		"amount": diff, 
		"current_balance": value, 
		"date": date.toString()
	}));

	setLocalUser();
	updateBalances();
};

function withdraw(fromAcnt, toAcnt = null, amount, error_id) {
	// Simulate a withdrawl from a certain account (chequing or savings).

	if(fromAcnt == "chequing") {
		if(chequingBalance < amount) {
			// TODO: Set up error message.
			console.log("Error: Insufficient funds to withdraw $" + amount);
			getElementById(error_id).innerHTML = "Error: Insufficient funds to withdraw $" + amount
			return 
		}
		var newChequing = chequingBalance - amount;
		setAccountBalance(newChequing, fromAcnt, "withdrawal", amount, fromAcnt, toAcnt);
	} else if(fromAcnt == "savings"){
		if(savingsBalance < amount) {
			// TODO: Set up error message.
			console.log("Error: Insufficient funds to withdraw $" + amount);
			return 
		}
		var newSavingsBalance = savingsBalance - amount;
		setAccountBalance(newSavingsBalance, fromAcnt,  "withdrawal", amount, fromAcnt, toAcnt);
	} else {
		// this will never be hit unless you're a hacker
		console.log("Error: Not An Account.");
	}

	setLocalUser();
}

function deposit(fromAct = null, toAcnt, amount) {
	// Simulate a deposit to a certain account (chequing or savings).

	if(toAcnt == "chequing") {
		chequingBalance = chequingBalance + amount;
		setAccountBalance(chequingBalance, toAcnt, "deposit", amount, fromAcnt, toAcnt);
	} else if(toAcnt == "savings") {
		savingsBalance = savingsBalance + amount;
		setAccountBalance(savingsBalance, toAcnt, "deposit", amount, fromAcnt, toAcnt);
	} else {
		// this will never be hit unless you're a hacker
		console.log("Error: Not An Account.");
	}

	setLocalUser();
}

function transferFunds(fromAcnt, toAcnt, amount) {
	// Simulate a transfer between accounts.
	
	if(fromAcnt == toAcnt) {
		console.log("Error: cannot transfer money between the same account.");
		return;
	}

	withdraw(fromAcnt, toAcnt, amount);
	deposit(fromAct, toAcnt, amount);
}


function getLocalUser() {;
 	return JSON.parse(localStorage.getItem(currentAccount));
}

function setLocalUser() {
	localStorage.setItem(currentAccount, JSON.stringify(user));
}

function updateBalances() {
	chequingBalance = user["accounts"]["chequing"]["balance"];
	savingsBalance = user["accounts"]["savings"]["balance"];
}











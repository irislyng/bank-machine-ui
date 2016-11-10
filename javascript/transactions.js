
var currentAccount = localStorage.getItem("current_account_number");
var user = getLocalUser();
var chequingBalance;
var savingsBalance;
updateBalances();

function init() {
	var account = localStorage.getItem("account");
	document.getElementById("account-balance").innerHTML = user["accounts"][account]["balance"];
}

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
	if(amount%20 != 0) {
		console.log("Error: Unable to withdraw $" + amount + " must be multiples of $20");
		document.getElementById("withdrawal-amount-error-message").innerHTML = "Error: Unable to withdraw $" + amount + " must be multiples of $20";
		document.getElementById("withdrawal-amount-error-message").removeAttribute("hidden");
		return false;
	}


	if(fromAcnt == "chequing") {
		if(chequingBalance < amount) {
			// TODO: Set up error message.
			console.log("Error: Insufficient funds to withdraw $" + amount);
			document.getElementById("withdrawal-amount-error-message").innerHTML = "Insufficient funds to withdraw $" + amount;
			document.getElementById("withdrawal-amount-error-message").removeAttribute("hidden");
			return false;
		}
		var newChequingBalance = chequingBalance - amount;
		setAccountBalance(newChequingBalance, fromAcnt, "withdrawal", amount, fromAcnt, toAcnt);
	} else if(fromAcnt == "savings"){
		if(savingsBalance < amount) {
			// TODO: Set up error message.
			console.log("Error: Insufficient funds to withdraw $" + amount);
			document.getElementById("withdrawal-amount-error-message").innerHTML = "Insufficient funds to withdraw $" + amount;
			document.getElementById("withdrawal-amount-error-message").removeAttribute("hidden");
			return false;
		}
		var newSavingsBalance = savingsBalance - amount;
		setAccountBalance(newSavingsBalance, fromAcnt,  "withdrawal", amount, fromAcnt, toAcnt);
	} else {
		// this will never be hit unless you're a hacker
		console.log("Error: Not An Account.");
	}

	setLocalUser();
	return true;

}

function deposit(fromAcnt = null, toAcnt, amount) {
	// Simulate a deposit to a certain account (chequing or savings).

	if(toAcnt == "chequing") {
		var newChequingBalance = chequingBalance + amount;
		setAccountBalance(newChequingBalance, toAcnt, "deposit", amount, fromAcnt, toAcnt);
		return true;
	} else if(toAcnt == "savings") {
		var newSavingsBalance = savingsBalance + amount;
		setAccountBalance(newSavingsBalance, toAcnt, "deposit", amount, fromAcnt, toAcnt);
		return true;
	} else {
		// this will never be hit unless you're a hacker
		console.log("Error: Not An Account.");
		return false;
	}

	setLocalUser();
	return true;
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
	chequingBalance = parseInt(user["accounts"]["chequing"]["balance"]);
	console.log(typeof(chequingBalance))
	savingsBalance = parseInt(user["accounts"]["savings"]["balance"]);
}











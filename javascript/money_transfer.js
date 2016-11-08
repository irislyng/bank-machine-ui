
var currentAccount = localStorage.getItem("current_account_number");
var user = getLocalUser();

var chequingBalance = getChequingBalance();
var savingsBalance = getSavingsBalance();



// Not actually used
function setAccountBalance(value, acntType) {
	// set the balance of the account and update localStorage

	// account = [ {"pin": 1234, "accounts": { "chequing": { "balance": 7000 }, "savings": { "balance": 4000 }}, "name": "John Doe", "history": [] }]
	user["accounts"][acntType]["balance"] = value;
	console.log("Account " + acntType + "updated: " + value);

	localStorage.setItem(currentAccount, JSON.stringify(user));
	chequingBalance = getChequingBalance();
	savingsBalance = getSavingsBalance();
};

function withdraw(fromAcnt, amount) {
	// simulate a withdrawl from a certain account (chequing or savings)

	if(fromAcnt == "chequing") {
		chequingBalance = chequingBalance - amount;
		setAccountBalance(chequingBalance, fromAcnt);
	} else if(fromAcnt == "savings"){
		savingsBalance = savingsBalance - amount;
		setAccountBalance(savingsBalance, fromAcnt);
	} else {
		// this will never be hit unless you're a hacker
		console.log("Not An Account");
	}

	localStorage.setItem(currentAccount, JSON.stringify(user));
}

function deposit(toAcnt, amount) {
	// simulate a deposit to a certain account (chequing or savings)

	if(toAcnt == "chequing") {
		chequingBalance = chequingBalance + amount;
		setAccountBalance(chequingBalance, toAcnt);
	} else if(toAcnt == "savings") {
		savingsBalance = savingsBalance + amount;
		setAccountBalance(savingsBalance, toAcnt);
	} else {
		// this will never be hit unless you're a hacker
		console.log("Not An Account");
	}

	localStorage.setItem(currentAccount, JSON.stringify(user));
}

function transferFund(fromAcnt, toAcnt, amount) {

	if(fromAcnt == toAcnt) {
		// bad
		console.log("Select different accounts");
		return
	}

	if(fromAcnt == "chequing" && toAcnt == "savings") {
		chequingBalance = chequingBalance - amount;
		savingsBalance = savingsBalance + amount;

		setAccountBalance(chequingBalance, fromAcnt);
		setAccountBalance(savingsBalance, toAcnt);

	} else if(fromAcnt == "savings" && toAcnt == "chequing") {
		savingsBalance = savingsBalance - amount;
		chequingBalance = chequingBalance + amount;

		setAccountBalance(savingsBalance, fromAcnt);
		setAccountBalance(chequingBalance, toAcnt);

	} else {
		// Shouldn't ever get hit unless you're trying to hack
		console.log("Invalid accounts");
	}

	localStorage.setItem(currentAccount, JSON.stringify(user));
}

function getChequingBalance() {
	// get the balance for chequing 

	return user["accounts"]["chequing"]["balance"];
}

function getSavingsBalance() {
	// get the balance for savings
	var user = getLocalUser();

	return user["accounts"]["savings"]["balance"];
}


function getLocalUser() {
 	var localUser = localStorage.getItem(currentAccount);
 
 	return JSON.parse(localUser);
 } 












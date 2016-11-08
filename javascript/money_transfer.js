
var currentAccount = localStorage.getItem("current_account_number");
var user = getLocalUser();

var chequingBalance = getChequingBalance();
var savingsBalance = getSavingsBalance();




function setAccountBalance(value, acntType, transaction, diff, fromAcnt, toAcnt) {
	// set the balance of the account and update localStorage

	// account = [ {"pin": 1234, "accounts": { "chequing": { "balance": 7000 }, "savings": { "balance": 4000 }}, "name": "John Doe", "history": [] }]
	user["accounts"][acntType]["balance"] = value;
	console.log("Account " + acntType + " updated: " + value);

	var date = new Date();


	user["history"].push(JSON.stringify({ "from": fromAcnt, "to": toAcnt, "transaction_type": transaction, "amount": diff, "current_balance": value, "date": date.toString()}));

	localStorage.setItem(currentAccount, JSON.stringify(user));
	chequingBalance = getChequingBalance();
	savingsBalance = getSavingsBalance();
};

function withdraw(fromAcnt, amount, toAcnt=null) {
	// simulate a withdrawl from a certain account (chequing or savings)

	if(fromAcnt == "chequing") {
		if(chequingBalance < amount) {
			console.log("Insufficient funds to withdraw $" + amount);
			return false;
		}
		chequingBalance = chequingBalance - amount;
		setAccountBalance(chequingBalance, fromAcnt, "withdawl", amount, fromAcnt, toAcnt);
	} else if(fromAcnt == "savings"){
		if(savingsBalance < amount) {
			console.log("Insufficient funds to withdraw $" + amount);
			return false;
		}
		savingsBalance = savingsBalance - amount;
		setAccountBalance(savingsBalance, fromAcnt,  "withdawl", amount, fromAcnt, toAcnt);
	} else {
		// this will never be hit unless you're a hacker
		console.log("Not An Account");
	}

	localStorage.setItem(currentAccount, JSON.stringify(user));
}

function deposit(toAcnt, amount, fromAcnt=null) {
	// simulate a deposit to a certain account (chequing or savings)

	if(toAcnt == "chequing") {
		chequingBalance = chequingBalance + amount;
		setAccountBalance(chequingBalance, toAcnt, "deposit", amount, fromAcnt, toAcnt);
	} else if(toAcnt == "savings") {
		savingsBalance = savingsBalance + amount;
		setAccountBalance(savingsBalance, toAcnt, "deposit", amount, fromAcnt, toAcnt);
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

	withdraw(fromAcnt, amount, toAcnt);
	deposit(toAcnt, amount, fromAcnt);


}

function getChequingBalance() {
	// get the balance for chequing 

	return user["accounts"]["chequing"]["balance"];
}

function getSavingsBalance() {
	// get the balance for savings

	return user["accounts"]["savings"]["balance"];
}


function getLocalUser() {
 	var localUser = localStorage.getItem(currentAccount);

 	return JSON.parse(localUser);
 } 












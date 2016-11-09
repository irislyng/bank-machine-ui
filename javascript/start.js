
function login() {
	var account_number = +document.getElementById("account-number").value;

	// Validate input.
	var isValid = validate(account_number);

	if (isValid) {
		console.log("User validated.");
		// Store account_number in local storage.
		localStorage.setItem("current_account_number", account_number);

		// Get local existing user if it exists.
		var user = getLocalUser(account_number);

		location.href="input-pin.html"
	} else {
		// TODO: Set up error message.
		console.log("Error: account number could not be validated.")
	}
}

function validate(account_number) {
	return Number.isInteger(account_number) && account_number.toString().length == 16;
}

function getLocalUser(account_number) {
	var localUser = localStorage.getItem(account_number);
	var user = null;

	if (localUser) {
		console.log("Found local user.");
		user = JSON.parse(localUser);
	} else {
		console.log("Could not find local user. Creating...");
		user = {
			name: "John Doe", 
			account_number: account_number,
			pin: null,
			accounts: {
				chequing: {
					balance: 7000
				},
				savings: {
					balance: 4000
				}
			},
			history: []
		};

		localStorage.setItem(account_number, JSON.stringify(user));
	}
	console.log(user);
	return user;
}
var account_number = localStorage.getItem("current_account_number");

function login(pin_number) {
	// Validate PIN.
	var isValid = validate(pin_number);

	if (isValid) {
		console.log("PIN number is validated.")
		// Get local user from account number.
		var user = getLocalUser();
		console.log(user);

		if (user.pin == null) { // Checks if pin is null. 
			// Sets up pin for first-time login.
			user.pin = pin_number;

			// Update local storage with new pin.
			localStorage.setItem(account_number, JSON.stringify(user));
		} else { // Pin exists for current user.
			if (user.pin == pin_number) {
				// TODO: Set up success functionality.
				console.log("PIN Numbers match.");
			} else {
				// TODO: Set up error message.
				console.log("PIN Numbers do not match.")
			}
		}
	} else {
		// TODO: Set up error message.
		console.log("Error: PIN number could not be validated.")
	}
}

function validate(pin_number) {
	return Number.isInteger(pin_number) && pin_number.toString().length == 4;
}

function getLocalUser() {
	var localUser = localStorage.getItem(account_number);

	return JSON.parse(localUser);
}
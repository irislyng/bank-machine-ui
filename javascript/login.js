var account_number = localStorage.getItem("current_account_number");
// Get local user from account number.
var user = JSON.parse(localStorage.getItem(account_number));

function init() {
	document.getElementById("user-name").innerText = user.name;
	document.getElementById("account-number").innerText = user.account_number;
}

function login() {
	var pin_number = +document.getElementById("pin-number").value;
	

	// Validate PIN.
	var isValid = validate(pin_number);

	if (isValid) {

		if (user.pin == null) { // Checks if pin is null. 
			// Sets up pin for first-time login.
			user.pin = pin_number;

			// Update local storage with new pin.
			localStorage.setItem(account_number, JSON.stringify(user));
		} else { // Pin exists for current user.
			if (user.pin == pin_number) {
				// TODO: Set up success functionality.
				location.href="main-menu.html"
			} else {
				document.getElementById("pin-number-error-message").innerHTML = "Error: Incorrect PIN number.";
				document.getElementById("pin-number-error-message").removeAttribute("hidden");
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
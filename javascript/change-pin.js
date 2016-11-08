var account_number = localStorage.getItem("current_account_number");
var user = JSON.parse(localStorage.getItem(account_number));

function changePin(oldPin, newPin, confirmedPin) {
	// Validate old PIN.
	var isOldPinValid = validateOldPin(oldPin);
	// Validate new PINs.
	var areNewPinsValid = validateNewPins(newPin, confirmedPin);

	if (!isOldPinValid) {
		// TODO: Set up error messsage.
		console.log("Error: Old PIN cannot be validated. Please enter the correct PIN number.");
	} else if (!areNewPinsValid) {
		// TODO: Set up error message.
		console.log("Error: New PIN Numbers cannot be validated. Please ensure the PIN numbers match and are 4 digits long.")
	} else {
		user.pin = newPin;
		localStorage.setItem(account_number, JSON.stringify(user));
		console.log("PIN updated.");
	}
}

function validatePin(pin) {
	return Number.isInteger(pin) && pin.toString().length == 4;
}

function validateOldPin(pin) {
	return validatePin(pin) && pin == user.pin;
}
function validateNewPins(pin1, pin2) {
	return validatePin(pin1) && validatePin(pin2) && pin1 == pin2;
}
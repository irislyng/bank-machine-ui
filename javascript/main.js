function logout() {
	localStorage.setItem("current_account_number", null);
	location.href = "index.html"
}
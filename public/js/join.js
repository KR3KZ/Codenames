window.addEventListener("load", (event) => {
	//Disable join button
	document.getElementById("join").disabled = true;
});

function onBlueChecked() {
	activeJoinBtn();
	//Uncheck red if blue selected
	document.getElementById("inputRed").checked = false;
}

function onRedChecked() {
	activeJoinBtn();
	//Uncheck blue if red selected
	document.getElementById("inputBlue").checked = false;
}

function activeJoinBtn() {
	//Enable join button
	document.getElementById("join").disabled = false;
}
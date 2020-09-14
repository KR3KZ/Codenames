window.addEventListener("load", (event) => {
  //Disable join button
  document.getElementById("join").disabled = true;
});

function activeBtnBlue() {
  activeBtn();
  //Uncheck red if blue selected
  document.getElementById("inputRed").checked = false;
}

function activeBtnRed() {
  activeBtn();
  //Uncheck blue if red selected
  document.getElementById("inputBlue").checked = false;
}

function activeBtn() {
  //Enable join button
  document.getElementById("join").disabled = false;
  if (!document.getElementById("inputBlue").checked && !document.getElementById("inputRed").checked) {
    //Disable join button
    document.getElementById("join").disabled = true;
  }
}

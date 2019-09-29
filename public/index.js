
function openForm() {
	document.getElementById("form-container").style.visibility = "visible";
}
function closeForm(){
	form.destroy()
	newForm()
	form.build()
	document.getElementById("form-container").style.visibility = "hidden";
}
function getNonce(){
	form.requestCardNonce()
	document.getElementById("form-container").style.visibility = "hidden";
}
/* Script for the chat.html page */

var msgTxt = document.getElementById("msgTxt");

msgTxt.addEventListener('click', function(e) {
	if (msgTxt.value == 'Your message') {
		msgTxt.value = '';
	}
}, true);

msgTxt.addEventListener('blur', function(e) {
	if (msgTxt.value == '') {
		msgTxt.value = 'Your message';
	}
}, true);

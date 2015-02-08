/* Script for the registration.html page */

var userID = document.getElementById('userID');

userID.addEventListener('click', function(e) {
    if (userID.value == 'Your Username') {
        userID.value = '';
    }
}, true);
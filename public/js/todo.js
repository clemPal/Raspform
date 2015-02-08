/* Script for the todo.html page */

var itemTxt = document.getElementById("itemTxt");

itemTxt.addEventListener('click', function(e) {
    if (itemTxt.value == 'New Item') {
        itemTxt.value = '';
    }
}, true);
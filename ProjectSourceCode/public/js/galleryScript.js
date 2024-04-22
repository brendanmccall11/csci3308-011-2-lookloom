// *****************************************************
// Gallery Modal
// *****************************************************
/*var modal = document.getElementById("myModal");
var cardInfos = document.querySelectorAll('.card-body');
var span = document.getElementsByClassName("close")[0];

// When the user clicks on a card, open the modal 
cardInfos.forEach(function(card) {
    card.onclick = function() {
        modal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/

var closetModal = document.getElementById("Modal");
var addToClosetButtons = document.querySelectorAll('.btn.btn-success');
var closeButton = document.getElementsByClassName('close-button');
const cButtonArr = Array.from(closeButton);

addToClosetButtons.forEach(function(button) {
    button.onclick = function() {
        closetModal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
cButtonArr.forEach(function(but) {
    but.onclick = function() {
        closetModal.style.display = "none";
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == closetModal) {
        closetModal.style.display = "none";
    }
}

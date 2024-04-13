// *****************************************************
// Closet Modal for Adding Item to Outfit
// *****************************************************

var closetModal = document.getElementById("closet-modal");
var addButton = document.getElementsByClassName('addToOutfit');
const arrButton = Array.from(addButton);
var span = document.getElementsByClassName("close")[0];

// When the user clicks on button to add item to outfit, open the modal 
arrButton.forEach(function(card) {
    card.onclick = function() {
        closetModal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    closetModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closetModal.style.display = "none";
    }
}
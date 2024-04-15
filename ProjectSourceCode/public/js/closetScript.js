// *****************************************************
// Closet Modal for Adding Item to Outfit
// *****************************************************

var closetModal = document.getElementById("closet-modal");
var addButton = document.getElementsByClassName('addToOutfit');
const arrButton = Array.from(addButton);
var closeButton = document.getElementsByClassName('close-button');
const cButtonArr = Array.from(closeButton);

// When the user clicks on button to add item to outfit, open the modal 
arrButton.forEach(function(card) {
    card.onclick = function() {
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

function passItemIdToForm(item_id) {
    const inputField =  document.getElementById('itemId');//get the "Location" field

    inputField.value = item_id;
}

document.addEventListener('DOMContentLoaded', function() {
    const addToOutfitButtons = document.querySelectorAll('.addToOutfit');

    addToOutfitButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const itemId = button.dataset.itemId; // Retrieve item ID from data attribute
            document.getElementById('itemId').value = itemId; // Set the item ID value to the hidden input field
        });
    });
});


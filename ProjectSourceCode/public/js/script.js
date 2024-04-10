// *****************************************************
// Gallery Modal
// *****************************************************
var modal = document.getElementById("myModal");
var cardInfos = document.querySelectorAll('.card-info');
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
}
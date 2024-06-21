// cartas
const cards = document.querySelectorAll(".memory-card");

// funcion para voltear la carta,
// aplica una clase a la carta que dispara el evento click
function flipCard() {
    this.classList.toggle("memory-card-flip");
}

// evento onclick sobre cada carta
cards.forEach( card => {
    card.addEventListener("click", flipCard);
} );
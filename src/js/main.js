// cartas
const cards = document.querySelectorAll(".memory-card");

// estado de la carta, al inicio no hay ninguna volteada
let hasFlippedCard = false;
// primera y segunda carta a comparar
let firstCard, secondCard;
// bloquear tablero
let lockBoard = false;

// funcion para voltear la carta,
// aplica una clase a la carta que dispara el evento click
// captura las cartas, comprueba si hay match
function flipCard() {
    if (lockBoard) return;
    if (firstCard === this) return;

    this.classList.add("memory-card-flip");

    // la primera carta elegida entra aqui
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this; // esta sera la primera carta
        return;
    };

    // la segunda carta elegida entra aqui
    secondCard = this;

    checkForMatch();
};

// comprobar si son iguales las cartas
function checkForMatch() {
    let isMatch = firstCard.dataset.fruit === secondCard.dataset.fruit;
    isMatch ? disableCards() : unflipCards();
};

// remover listener de cartas
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
};

// ocultar las cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("memory-card-flip");
        secondCard.classList.remove("memory-card-flip");

        resetBoard();
    }, 1500);
};

// reestablecer tablero
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

// evento onclick sobre cada carta
cards.forEach( card => {
    card.addEventListener("click", flipCard);
} );

// mezclar las cartas (IIFE function, se invoca al cargar la pagina)
// el contenedor de cartas tiene un display en flex,
// y cada flex item tiene una propiedad orden en 0 por defecto.
// generamos numeros aleatorios entre 0 y 11 para la posicion de las 12 cartas.
(function shuffle() {
    cards.forEach( card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    } );
})();
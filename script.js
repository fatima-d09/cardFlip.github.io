document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    // Define your images here
    let images = [
        'image/front/desperateHouseWives.jpeg', // replace with paths to your images
        'image/front/malcomInTheMiddle.jpeg',
        'image/front/modernFamily.jpeg',
        'image/front/orphanBlack.jpeg',
        'image/front/parksAndRec.jpeg',
        'image/front/PLL_Season_6_DVD.jpg',
        'image/front/theMiddle.jpeg',
        'image/front/theOffice.jpeg'
    ];

    // Duplicate each image to create pairs and shuffle them
    let imageArray = images.concat(images).sort(() => 0.5 - Math.random());

    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];

    function createBoard() {
        for (let i = 0; i < imageArray.length; i++) { // Use imageArray.length instead of cardsArray.length
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('data-id', i);

            // Create a container for the card's front and back sides
            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            // Create cardFront and cardBack
            const cardFront = document.createElement('div');
            const cardBack = document.createElement('div');
            cardFront.setAttribute('class', 'card-front');
            cardBack.setAttribute('class', 'card-back');

            // Set the background image for the front of the card
            cardFront.style.backgroundImage = `url(${imageArray[i]})`;
            cardFront.style.backgroundSize = 'cover';
            cardFront.style.backgroundPosition = 'center';

            // Set the default back image for all cards
            cardBack.style.backgroundImage = 'url("image/back/default-back-image.png")'; // Replace with your path to the back image
            cardBack.style.backgroundSize = 'cover';
            cardBack.style.backgroundPosition = 'center';

            // Append cardFront and cardBack to cardInner
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);

            // Append cardInner to card
            card.appendChild(cardInner);

            // Add click event to card to flip it
            card.addEventListener('click', flipCard);

            gameContainer.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenIds.includes(cardId)) {
            cardsChosen.push(imageArray[cardId]);
            cardsChosenIds.push(cardId);
            this.classList.add('flipped');
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 120);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            // Match found
            setTimeout(() => {
                cards[optionOneId].style.visibility = 'hidden';
                cards[optionTwoId].style.visibility = 'hidden';
                cardsChosen = [];
                cardsChosenIds = [];
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                cards[optionOneId].classList.remove('flipped');
                cards[optionTwoId].classList.remove('flipped');
                cardsChosen = [];
                cardsChosenIds = [];
            }, 500);
        }

          // Check for game over
          const allCards = document.querySelectorAll('.card');
          const flippedCards = document.querySelectorAll('.card.flipped');
  
          if (flippedCards.length === allCards.length) {
              endGame();
          }
    }

    function endGame() {
        //Confetti Container
        const confettiContainer = document.createElement('div');
        confettiContainer.setAttribute('class', 'confetti-container');

        // The winning text
        const winningText = document.createElement('div');
        winningText.textContent = 'YOU WON!';
        winningText.setAttribute('class', 'winning-text');

        // End game image and play again button
        const endGameImage = document.createElement('img');
        endGameImage.setAttribute('src', 'image/front/elmo.gif');
        endGameImage.setAttribute('class', 'end-game-image');

       //Play Again Button
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.setAttribute('class', 'button-28');
        playAgainButton.addEventListener('click', restartGame);

        // Clear the game container 
        gameContainer.innerHTML = ''; 
        gameContainer.style.display = 'flex';
        gameContainer.style.flexDirection = 'column';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.alignItems = 'center';

        // append the end game elements
        gameContainer.appendChild(confettiContainer);
        gameContainer.appendChild(winningText);
        gameContainer.appendChild(endGameImage);
        gameContainer.appendChild(playAgainButton);

        //Starting the confetti animation
        startConfetti();
    }

    function startConfetti() {
        confetti({
            particleCount: 900,
            spread: 1500,
            origin: { y: 0.6 },
          });
    }

    function restartGame() {
        // Clear the game container and reset game variables
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }
    
        // Reset the styles for the game container
        gameContainer.style.display = 'grid';
        gameContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        gameContainer.style.gap = '70px';  // Set the gap as it was initially
        gameContainer.style.padding = '60px';
        gameContainer.style.maxWidth = '1000px';
        gameContainer.style.background = '#ffffff';
        gameContainer.style.borderRadius = '10px';
        gameContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        gameContainer.style.margin = 'auto'; // Assuming you want to center the container

    // Remove any inline styles that may have been added during the endGame phase
    gameContainer.removeAttribute('style');
    
        cardsChosen = [];
        cardsChosenIds = [];
        cardsWon = [];
    
        // Shuffle the images array again for the new game
        imageArray = images.concat(images).sort(() => 0.5 - Math.random());
    
        // Recreate the board
        createBoard();
    }
      

    createBoard();
});

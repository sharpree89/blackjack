// Blackjack

// Rules

// 1. Get 21 points before the "dealer" does
// 2. Number cards are worth the number on the card
// 3. Face cards are worth 10
// 4. Aces are worth 11
// 5. Hit as many times in a row as you want
// 6. If you go over 21, you lose

var deck = [];
var counter = 52;
var scores = [0,0]
var activePlayer = 0;

createDeck();
shuffleDeck();

// create a full deck
function createDeck() {
  console.log('Creating deck...');
  var suites = ['diamonds', 'spades', 'hearts', 'clubs'];
  var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  for (var i = 0; i < values.length; i++) {
    for (var k = 0; k < suites.length; k++) {
      deck.push(values[i] + '_of_' + suites[k]);
    }
  }
  return deck;
}

// shuffle the deck
function shuffleDeck() {
  var temp = null;
  for (var i = deck.length - 1; i > 0; i --) {
    var r = Math.floor(Math.random() * (i + 1))
    temp = deck[i]
    deck[i] = deck[r]
    deck[r] = temp
  }
  console.log('Shuffling deck...');
  return deck;
}

// select a card from the deck
// remove the card from the deck
// update the card image
function hitMe() {
  var counter = deck.length;
  console.log('Selecting a card...');

  if (deck[counter-1]) {
    card = deck[counter-1];
    var index = deck.indexOf(card);
    if (index !== -1) {
        deck.splice(index, 1);
        counter = deck.length;
        document.querySelector('.counter').textContent = counter + ' cards remaining';
    }
    // change the src of the card image to the correct card
    document.querySelector('.card-' + activePlayer).src = card + '.png';
    // update player's score
    updateScore();
    return card;
  } else {
    console.log('Thats the end of the deck!');
    document.querySelector('.card-' + activePlayer).src = 'back.png';
  }
};

// update player's score
// handle scoring logic
function updateScore() {
  // if the card is a 10, jack, queen, or king, add 10 to the player's score
  if (card.indexOf('jack') !== -1 || card.indexOf('queen') !== -1 || card.indexOf('king') !== -1 || card.indexOf('10') !== -1) {
    scores[activePlayer] += 10;
    console.log(card);
    document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];

  // if the card is an ace, add 11 to the player's score
  } else if (card.indexOf('ace') !== -1) {
    scores[activePlayer] += 11;
    console.log(card);
    document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];

  // if the card is a single digit number, add that number to the player's score
  } else if (card[1] === "_") {
      var score = Number(card[0]);
      scores[activePlayer] += score;
      console.log(card);
      document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];
  }

  if (scores[activePlayer] > 21) {
    document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer] + " - Game Over";
  } else if (scores[activePlayer] === 21) {
    document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer] + " - Congratulations!";
  }
};


function nextPlayer() {
  console.log('Next player\'s turn!');
  // If the activePlayer is 0, then change activePlayer to 1. otherwise activePlayer is 1 and should be changed to 0. ? means then, : means else
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
};

// when the Hit Me button is clicked, select a new card
document.querySelector('.btn-hit').addEventListener('click', hitMe);

// when the Stand button is clicked, it is the next player's turn
document.querySelector('.btn-stand').addEventListener('click', nextPlayer);

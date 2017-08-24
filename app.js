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

// create a full deck at the beginning of each game
// return the deck
function createDeck() {
  console.log('Creating the deck...');
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
// return the deck
function shuffleDeck() {
  var temp = null;
  for (var i = deck.length - 1; i > 0; i --) {
    var r = Math.floor(Math.random() * (i + 1))
    temp = deck[i]
    deck[i] = deck[r]
    deck[r] = temp
  }
  console.log('the deck has been shuffled');
  console.log(deck);
  return deck;
}

// select a card from the deck
// remove the card from the deck
// update the card image
// add the card's value to player's score
// return the card
function selectCard() {

  var counter = deck.length;
  console.log('Selecting a card...');

  if (deck[counter-1]) {
    card = deck[counter-1];
    var index = deck.indexOf(card);
    if (index !== -1) {
        deck.splice(index, 1);
        console.log(card + ' has been removed from the deck.');
        counter = deck.length;
        document.querySelector('.counter').textContent = counter + ' cards remaining';
    }
    // change the src of the card image to the correct card
    document.querySelector('.card').src = card + '.png';
    // update player's score
    updateScore();
    return card;
  } else {
    console.log('Thats the end of the deck!');
    document.querySelector('.card').src = 'back.png';
  }
};

// update player's score
function updateScore() {

  // if the card contains 10, jack, queen, or king, add 10 to the player's score
  if (card.indexOf('jack') !== -1 || card.indexOf('queen') !== -1 || card.indexOf('king') !== -1 || card.indexOf('10') !== -1) {
    scores[0] += 10;
    console.log(card);
    document.querySelector('.player-score').textContent = scores[0];

  // if the card is an ace, add 11 to the player's score
  } else if (card.indexOf('ace') !== -1) {
    scores[0] += 11;
    console.log(card);
    document.querySelector('.player-score').textContent = scores[0];

  // if the card contains a single digit number, add that number to the player's score
  } else if (card[1] === "_") {
      var score = Number(card[0]);
      scores[0] += score;
      console.log(card);
      document.querySelector('.player-score').textContent = scores[0];
  }
};

// when the Hit Me button is clicked, select a new card
document.querySelector('.btn-hit').addEventListener('click', selectCard);

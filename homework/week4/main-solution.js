// Your card and deque factory code should be loaded into the browser before this file
// by the main.html container file.
// At this point, both makeCard and makeDeque should be defined.


// 2b:
// make a deque instance to store a full deck of cards:
var deckOfCards = makeDeque(makeCard.fullSet);


function compareByAscendingCardSuit(a,b) {
	if (a.suit() > b.suit()) return 1;
	if (a.suit() < b.suit()) return -1;
	//suits are equal; compare by rank
	if (a.rank() > b.rank()) return 1;
	if (a.rank() < b.rank()) return -1;
	return 0;
}

deckOfCards.sort(compareByAscendingCardSuit);
deckOfCards.cut();
assert(deckOfCards.top().name() === 'King of Diamonds', 'Failed King of Diamonds test');


function compareByCardName(a,b) {
	if (a.name() > b.name()) return 1;
	if (a.name() < b.name()) return -1;
	return 0;
}

deckOfCards.sort(compareByCardName);
assert(deckOfCards.bottom().name() === 'Ace of Clubs', 'Failed Ace of Clubs test');
assert(deckOfCards.top().name() === 'Two of Spades', 'Failed Two of Spades test');



// 2c:
// make a deque instance to store student names:
var people = [
	'Anton','Brigitta','Danniel','Eric','Greg','Ian',
	'Jahsie','James','John','Kristopher','Kyle',
	'Michael','Ondine','Peter','Robert','Tal','Todd'];

var deckOfNames= makeDeque(people);

function compareBySecondLetter(strA,strB) {
	return (strA[1]>strB[1]) ? 1 : -1;
}

deckOfNames.sort(compareBySecondLetter);
var theFinalName = 'Kyle'; //whoever is last via that sort
assert(deckOfNames.top() === theFinalName, 'Failed name test');



// 2d:

/*
// Example of bad way:
function compareByRandom(a,b) {
	return (Math.random()-.5);
}
makeDeque.shuffle = function () {
	this.array.sort(compareByRandom);
}
*/

// Good way: first add a deque.shuffle() method in your factory, then...
var shuffledDeck = makeDeque(makeCard.fullSet);

shuffledDeck.shuffle();


var ids = shuffledDeck.map(function(card){
	return card.id;
});
console.log(ids);
var names = shuffledDeck.map(function(card) {
	return card.name();
});
console.log(names);

// 2f: see full makeDeque version in deque-solution.js

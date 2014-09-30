// Full version of deque factory, including parts a), e) ,and f)

function makeDeque(values) {
	return {
		array   : values.slice(), //copies values array
		// attach shared instance methods:
		top     : makeDeque.top,
		bottom  : makeDeque.bottom,
		push    : makeDeque.push,
		pop     : makeDeque.pop,
		shift   : makeDeque.shift,
		unshift : makeDeque.unshift,
		sort    : makeDeque.sort,
		cut     : makeDeque.cut,
		map     : makeDeque.map,
		//---- part e) only:----
		shuffle : makeDeque.shuffle,
		//---- part f) only:---
		absent  : [], // original elements currently missing
		readmit : makeDeque.readmit
	}
}

// ---------------------------------
// Class methods (OPTIONAL)

makeDeque.isDeque = function(deq) {
	return deq && (typeof deq === 'object') // check for null or primitive
		&& (deq.cut === makeDeque.cut);     // check at least one method
}


// -----------------------------------------------
// Instance methods ('this' means deque instance):

makeDeque.cut = function() { //returns # elements moved from upper half to lower (0 if no change)
	var fullLength = this.array.length;
	var headLength = Math.ceil(fullLength / 2);
	if (headLength == fullLength) // no tail, nothing to swap
		return 0;
	var tail = this.array.splice(headLength, fullLength); // removes tail from array
	this.array = tail.concat(this.array); // swap tail and remaining head
	return tail.length; 
}


makeDeque.top = function() {
	return this.array[this.array.length-1];  // undefined if length is 0
}

makeDeque.bottom = function() {
	return this.array[0]; //undefined if length is 0
}

// -- These methods are just adapters, delegating most work to the array: --

makeDeque.pop = function() {
	var val = this.array.pop();
	if (val !== undefined)
		this.absent.push(val);  //part f)
	return val;
}

makeDeque.push = function(val) {
	return this.readmit(val) && //part f)
		this.array.push(val);
}

makeDeque.shift = function() {
	var val = this.array.shift();
	if (val !== undefined)
		this.absent.push(val); //part f)
	return val;
}

makeDeque.unshift = function(val) {
	return this.readmit(val) && //part f)
		this.array.unshift(val);
}

makeDeque.sort = function(sortFn) {
	return this.array.sort(sortFn);
}

makeDeque.map = function(convertFn) {
	return this.array.map(convertFn);
}


// ---- Part e)----

makeDeque.shuffle = function () {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
	var end = this.array.length, temp, i;

  	// While there remain elements to shuffle…
  	while (end>1) {

    	// Pick a remaining element…
    	i = Math.floor(Math.random() * end--);

    	// And swap it with the current element.
    	temp = this.array[end];
    	this.array[end] = this.array[i];
    	this.array[i] = temp;
  	}
  	// always successful; no return val needed
}

// ---- Part f)----

makeDeque.readmit = function(val) { // returns true if val was absent
	var foundAt = this.absent.indexOf(val);
	if (foundAt < 0) // -1 if not found
			return false;
	// else found; excise from absent array
	this.absent.splice(foundAt,1);
	return true;
}


// ======== Part b) ========
// (requires makeCard() from Problem #1 solution)

function make52Cards() {
	var result = [];
	for (var i=0 ; i<52; i++) {
		result.push(makeCard(i));
	}
	return result;
}
var someCards = make52Cards();


// ======== Part c) ========

function assert(claim,warning) {
	if (!claim) console.log(warning);
}

var deckOfCards = makeDeque(someCards);
function compareByCardID(cardA,cardB) {
	return cardA.id - cardB.id;
}
deckOfCards.sort(compareByCardID);  // sort by id
deckOfCards.cut();
assert(deckOfCards.top().name() === 'Seven of Diamonds', 'Failed Seven of Diamonds test');


function compareByCardName(cardA,cardB) {
	return (cardA.name() < cardB.name()) ? -1 : 1;
}
deckOfCards.sort(compareByCardName); // sort by name
assert(deckOfCards.bottom().name() === 'Ace of Clubs', 'Failed Ace of Clubs test');
assert(deckOfCards.top().name() === 'Two of Spades', 'Failed Two of Spades test');

// ======== Part d) ========

var everyname = ['Adam','Dallas','Greg','Jack','Joel','Mike','Natalie','Sara','Stacey','Tristan'];
var everyone = makeDeque(everyname);
function compareBySecondLetter(strA,strB) {
	return (strA[1]<strB[1]) ? -1 : 1;
}
everyone.sort(compareBySecondLetter); //sort by second letter of name

// Sorting by second letter puts 'Stacey' last, on top:
assert(everyone.top() === 'Stacey', "Failed name test");


// ======== Part e) ========
/*
// Example of bad way:
function compareByRandom(a,b) {
	return (Math.random()-.5);
}
makeDeque.shuffle = function () {
	this.array.sort(compareByRandom);
}
*/

// Correct way: see makeDeque.shuffle() in full makeDeque version above
deckOfCards.shuffle();
// Demonstrate effect of shuffling!
// Print deck by id:
console.log(deckOfCards.map( function(card) {return card.id} ));
// Print deck by name:
console.log(deckOfCards.map( function(card) {return card.name()} ));

// ======== Part f) ========

// See full makeDeque version above

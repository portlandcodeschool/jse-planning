// This IIFE will define a superclass:
var Card = (function(){

	// Ctor:
	function Card(id) {
		//...
	}


	// Instance methods (attach these to Card's prototype):

	//rank...

	//suit...

	//name...

	//color...


	// Private data:
	var rankNames = [/*...*/];
	var suitNames = [/*...*/];


	var fullSet = [];
	// loop to fill fullSet with 52 instances...


	// Class methods:

	Card.isCard = function(thing) {// return Boolean
		//...
	}

	Card.fullSet = function() {//return copy of private array
		return fullSet.slice(); 
	}

	Card.rankNames = function() {
		return rankNames.slice(); 
	}

	Card.suitNames = function() {
		return suitNames.slice();
	}

	Card.numCards = function() {
		return 52;
	}


	// Return constructor:
	return Card;

})(); //end superclass IIFE




// This IIFE will create a subclass (constructor TarotCard) of a superclass (constructor Card)
var TarotCard = (function(){ //<-- Superclass is parameter, but equals Card

	// Create subclass constructor:
	function Ctor(id) {
		Card.call(this,id); // call superclass ctor first
		this.upright = true; // then add subclass-specific properties
	}
	Ctor.isCard = Card.isCard; //share one superclass method

	// Override some other superclass methods and resources:

	var suitNames = ["Cups","Pentacles","Swords","Wands"];
	var rankNames = Card.rankNames(); // subclass ranks are derived from superclass Card,
	rankNames.splice(10,1,"Page","Knight"); // but Jack gets replaced w. Page+Knight

	Ctor.rankNames = function() {
		return rankNames.slice();
	}
	Ctor.suitNames = function() {
		return suitNames.slice();
	}
	Ctor.numCards = function() {
		return 56;
	}

	// Replace default prototype so that subclass inherits from superclass Card
	var proto = (Ctor.prototype = Object.create(Card.prototype));
	proto.constructor = Ctor;

	// Disable one superclass instance method:
	proto.color = undefined; //Tarot cards have no color; disable inherited method

	return Ctor; //== TarotCard
})(); // end subclass IIFE


// ====================
// Testing suite as before...
// ====================

function assert(claim,message) {
    if (!claim) console.error(message);
}

// card instances needed for assertions:
var card0 = new Card(0);
var card3 = new Card(3);
var card5 = new Card(5);
var card51 = new Card(51);
var card52 = new Card(52); // invalid when tested

// Test instance methods:
assert(card0.rank()===1,  "Test 1 failed");
assert(card3.rank()===1,  "Test 2 failed");
assert(card51.rank()===13,"Test 3 failed");
assert(card0.suit()===1,  "Test 4 failed");
assert(card5.suit()===2,  "Test 5 failed");
assert(card51.suit()===4, "Test 6 failed");
assert(card0.color()==='red',   "Test 10 failed");
assert(card3.color()==='black', "Test 11 failed");
assert(card5.name()==='Two of Diamonds', "Test 12 failed");
assert(card51.name()==='King of Clubs',  "Test 13 failed");

assert(card0.isValid(),		"Test 15 failed");
assert(card51.isValid(),	"Test 16 failed");
assert(!card52.isValid(),	"Test 17 failed");

// Test Card.isCard:
assert(Card.isCard(card0),  "Test 21 failed");
assert(Card.isCard(card51), "Test 22 failed");
assert(!Card.isCard(0),     "Test 23 failed");
assert(!Card.isCard({}),    "Test 24 failed");
assert(!Card.isCard(card52),"Test 25 failed");

// Now test Tarot cards!
var tarot0 = new TarotCard(0);
var tarot3 = new TarotCard(3);
var tarot5 = new TarotCard(5);
var tarot40 = new TarotCard(40);
var tarot46 = new TarotCard(46);
var tarot55 = new TarotCard(55);
var tarot56 = new TarotCard(56); // invalid when tested

// Test instance methods:
assert(tarot0.rank()===1,  "Test 51 failed");
assert(tarot3.rank()===1,  "Test 52 failed");
assert(tarot55.rank()===14,"Test 53 failed");
assert(tarot0.suit()===1,  "Test 54 failed");
assert(tarot5.suit()===2,  "Test 55 failed");
assert(tarot55.suit()===4, "Test 56 failed");
assert(!tarot0.color,   "Test 60 failed");

assert(tarot5.name()==='Two of Pentacles', 	"Test 61 failed");
assert(tarot40.name()==='Page of Cups',  	"Test 62 failed");
assert(tarot46.name()==='Knight of Swords', "Test 63 failed");
assert(tarot55.name()==='King of Wands',  	"Test 64 failed");

assert(tarot0.isValid(),	"Test 65 failed");
assert(tarot55.isValid(),	"Test 66 failed");
assert(!tarot56.isValid(),	"Test 67 failed");

// Test TarotCard.isCard:
assert(TarotCard.isCard(tarot0),  "Test 71 failed");
assert(TarotCard.isCard(tarot55), "Test 72 failed");
assert(!TarotCard.isCard(0),     "Test 73 failed");
assert(!TarotCard.isCard({}),    "Test 74 failed");
assert(!TarotCard.isCard(tarot56),"Test 75 failed");


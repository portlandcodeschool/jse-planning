function makeCard(id) {
    // abort if id is invalid:
    if (!makeCard.isValidID(id))
	   return null;
    
    // otherwise, build card instance:
    return {id:id,
            rank : makeCard.rank,
            suit : makeCard.suit,
            color: makeCard.color,
            name : makeCard.cardName
            //NOTE: functions (including this factory) have a built-in property 'name',
	        //so we need a different key (e.g. cardName) for the factory method
    }
}

//-----------------------
// Methods to be called through factory:
//-----------------------

makeCard.isValidID = function(num) { // Returns--> true, false
        return ((typeof num)==="number") //correct type
                && (num%1 === 0)        //integer
                && num>=0 && num<=51;   //in range
}

makeCard.isCard = function(card) { // Returns --> true, falsish
    return card && (typeof card === 'object') // check for null or primitive
            && (card.name === makeCard.cardName) // check at least one method
            && ('id' in card) && makeCard.isValidID(card.id); //check id
}

//-----------------------------
// Methods called though instances (where 'this' means the instance):
//-----------------------------


makeCard.rank = function() { // --> 1..13, NaN
        return Math.floor(this.id/4)+1;
}

makeCard.suit = function() { // --> 1..4, NaN
        return (this.id%4)+1;
}
   
makeCard.color = function() { // -->"red,"black", NaN
        var suit=this.suit();
        return suit && ((suit<3)? "red": "black");
}

makeCard.rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                        'Jack','Queen','King'];
makeCard.suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

makeCard.cardName = function() { //--> string, NaN
        var rank = this.rank();
        var suit = this.suit();
        return rank && suit && (makeCard.rankNames[rank]+' of '+makeCard.suitNames[suit]);
}



// ====================
// Testing suite...
// ====================

function assert(claim,message) {
    if (!claim) console.error(message);
}

// card instances needed for assertions:
var card0 = makeCard(0);
var card3 = makeCard(3);
var card5 = makeCard(5);
var card51 = makeCard(51);


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

// Test makeCard.isCard:
assert(makeCard.isCard(card0),  "Test 21 failed")
assert(makeCard.isCard(card51), "Test 22 failed")
assert(!makeCard.isCard(0),    "Test 23 failed")
assert(!makeCard.isCard({}),   "Test 24 failed")


// Test card-making results:
assert(!makeCard(52),"Test 26 failed");
assert(!makeCard("0"),"Test 27 failed");
assert(!makeCard(-1),"Test 28 failed");
assert(!makeCard(false),"Test 30 failed");
assert(!makeCard(true),"Test 31 failed");


// Test that methods are shared:
assert(card0 !== card3, "Test 50 failed"); //first prove different cards
assert(card0.rank === card3.rank, "Test 51 failed");
assert(card0.suit === card3.suit, "Test 52 failed");
assert(card0.name === card3.name, "Test 53 failed");
//etc...




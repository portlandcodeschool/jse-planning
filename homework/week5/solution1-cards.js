var makeCard = // receive factory with external name `makeCard`
    (function () { //begin IIFE...

    // The factory itself:
    function makeCard(id) {  //makeCard is also IIFE's internal name
        if (!isValidID(id))
            return null;
        var card = {id:id,  //personal property
            // links to shared methods, defined below:
            rank : rank,
            suit : suit,
            color: color,
            name : name
        };
        return card;
    };
//------------------
// Private resources (internal use only)
//------------------

    var isValidID = function(num) { // Returns--> true, false
        return ((typeof num)==="number") //correct type
                && (num%1 === 0)        //integer
                && num>=0 && num<=51;   //in range
    };

    var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven',
                        'Eight','Nine','Ten','Jack','Queen','King'];
    var suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

//-----------------------
// Methods to be called through factory:
//-----------------------

    makeCard.isCard = function(card) { // Returns --> true, falsish
        return card && (typeof card === 'object') // check for null or primitive
            && (card.name === name) // check at least one method
            && ('id' in card) && isValidID(card.id); //check id
    };

//-----------------------------
// Methods called though instances (where 'this' means the instance):
//-----------------------------

    var rank = function() { // --> 1..13, NaN
        return Math.floor(this.id/4)+1;
    };

    var suit = function() { // --> 1..4, NaN
        return (this.id%4)+1;
    };
   
    var color = function() { // -->"red,"black", NaN
        var suitVal=this.suit();
        return suitVal && ((suitVal<3)? "red": "black");
    };

    var name = function() { //--> string, NaN
        var rankVal = this.rank();
        var suitVal = this.suit();
        return rankVal && suitVal &&
            (rankNames[rankVal]+' of '+suitNames[suitVal]);
    };

    return makeCard;  //return factory function, product of IIFE's work

})(); //end IIFE definition and do it now!



// ====================
// Testing suite as before...
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




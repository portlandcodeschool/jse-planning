// Error-detecting version

var cardReader = {

    isValid: function(num,low,high) { // Returns--> NaN, true
        if ((typeof num)!="number") //wrong type
            return NaN;
        if (num%1 !== 0) //non-integer
            return NaN;
        if (num<low || num>high) //out of range
            return NaN;
        return true;
    },

    rank: function(card) { // --> 1..13, NaN
        return this.isValid(card,0,51) &&
            Math.floor(card/4)+1;
    },

    suit: function(card) { // --> 1..4, NaN
        return this.isValid(card,0,51) &&
            (card%4)+1;
    },

    cardID: function(rank,suit) { // --> 0..51, NaN
        return this.isValid(rank,1,13) &&
                this.isValid(suit,1,4) &&
                ((rank-1)*4 + (suit-1));
    },
    
    color: function(card) { // -->"red,"black",NaN
        var suit=this.suit(card);
        return suit && ((suit<3)? "red": "black");
    },

    rankNames: ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'],
    suitNames: ['','Hearts','Diamonds','Spades','Clubs'],

    name: function(card) { //--> string, NaN
        var rank = this.rank(card);
        var suit = this.suit(card);
        return rank && suit && (this.rankNames[rank]+' of '+this.suitNames[suit]);
    }
};

// TESTING:
function assert(claim,message) {
    if (!claim) console.error(message);
}
//var cardReader = yourNameIfDifferent;  // you may need to define cardReader

assert(cardReader.rank(0)===1,  "Test 1 failed");
assert(cardReader.rank(3)===1,  "Test 2 failed");
assert(cardReader.rank(51)===13,"Test 3 failed");
assert(cardReader.suit(0)===1,  "Test 4 failed");
assert(cardReader.suit(5)===2,  "Test 5 failed");
assert(cardReader.suit(51)===4, "Test 6 failed");
assert(cardReader.cardID(1,1)===0,    "Test 7 failed");
assert(cardReader.cardID(13,4)===51,  "Test 8 failed");
assert(cardReader.cardID(8,3)===30,   "Test 9 failed");
assert(cardReader.color(0)==='red',   "Test 10 failed");
assert(cardReader.color(2)==='black', "Test 11 failed");
assert(cardReader.name(5)==='Two of Diamonds', "Test 12 failed");
assert(cardReader.name(51)==='King of Clubs',  "Test 13 failed");


// Extra testing!
// These tests check that invalid arguments produce invalid output.
// I.e. "garbage in guarantees garbage out".
assert(Number.isNaN(cardReader.rank(52)),  "Test 21 failed");
assert(Number.isNaN(cardReader.rank("0")), "Test 22 failed");
assert(Number.isNaN(cardReader.rank(-1)),  "Test 23 failed");
assert(Number.isNaN(cardReader.rank(2.5)), "Test 24 failed");
assert(Number.isNaN(cardReader.rank(undefined)),"Test 25 failed");

assert(Number.isNaN(cardReader.suit(52)),   "Test 26 failed");
assert(Number.isNaN(cardReader.suit(false)),"Test 27 failed");
assert(Number.isNaN(cardReader.suit(true)), "Test 28 failed");
assert(Number.isNaN(cardReader.suit(-1)),   "Test 29 failed");
assert(Number.isNaN(cardReader.suit(3.14)), "Test 30 failed");

assert(Number.isNaN(cardReader.cardID(0,1)),   "Test 31 failed");
assert(Number.isNaN(cardReader.cardID("1",1)), "Test 32 failed");
assert(Number.isNaN(cardReader.cardID(1,5)),   "Test 33 failed");
assert(Number.isNaN(cardReader.cardID(14,1)),  "Test 34 failed");
assert(Number.isNaN(cardReader.cardID(-1,-1)), "Test 35 failed");
assert(Number.isNaN(cardReader.cardID(0.5,1)), "Test 36 failed");
assert(Number.isNaN(cardReader.cardID(1,NaN)), "Test 37 failed");

assert(Number.isNaN(cardReader.color('apple')),"Test 41 failed");
assert(Number.isNaN(cardReader.color(true)),   "Test 42 failed");
assert(Number.isNaN(cardReader.name(false)),   "Test 43 failed");
assert(Number.isNaN(cardReader.name(-1)),      "Test 44 failed");
assert(Number.isNaN(cardReader.name(52)),      "Test 45 failed");
assert(Number.isNaN(cardReader.name(NaN)),     "Test 46 failed");


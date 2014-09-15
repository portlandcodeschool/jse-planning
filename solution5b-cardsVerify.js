// Error-detecting version

// Helper function:
function isValid(num,low,high) { // Returns--> NaN, true
    if ((typeof num)!="number") //wrong type
        return NaN;
    if (num%1 !== 0) //non-integer
        return NaN;
    if (num<low || num>high) //out of range
        return NaN;
    return true;
}

// Card features:
function rank(card) { // --> 1..13, NaN
    return isValid(card,0,51) &&
        Math.floor(card/4)+1;
}

function suit(card) { // --> 1..4, NaN
    return isValid(card,0,51) &&
        ((card%4)+1);
}

function cardID(rank,suit) { // --> 0..51, NaN
    return isValid(rank,1,13) &&
            isValid(suit,1,4) &&
            ((rank-1)*4 + (suit-1));
}
function color(card) { // -->"red,"black",NaN
    var theSuit=suit(card); //may be NaN
    return theSuit && ((theSuit<3)? "red": "black");
}

var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'];
var suitNames = ['','Hearts','Diamonds','Spade','Clubs'];

function name(card) { //--> string, NaN
    var theRank = rank(card);
    var theSuit = suit(card);
    return theRank && theSuit && (rankNames[theRank]+' of '+suitNames[theSuit]);
}



// TESTING:
function assert(claim,message) {
    if (!claim) console.error(message);
}
assert(rank(0)===1,  "Test 1 failed");
assert(rank(3)===1,  "Test 2 failed");
assert(rank(51)===13,"Test 3 failed");
assert(suit(0)===1,  "Test 4 failed");
assert(suit(5)===2,  "Test 5 failed");
assert(suit(51)===4, "Test 6 failed");
assert(cardID(1,1)===0,    "Test 7 failed");
assert(cardID(13,4)===51,  "Test 8 failed");
assert(cardID(8,3)===30,   "Test 9 failed");
assert(color(0)==='red',   "Test 10 failed");
assert(color(2)==='black', "Test 11 failed");
assert(name(5)==='Two of Diamonds', "Test 12 failed");
assert(name(51)==='King of Clubs',  "Test 13 failed");


// Extra testing!
// These tests check that invalid arguments produce invalid output.
// I.e. "garbage in guarantees garbage out".
assert(isNaN(rank(52)),  "Test 21 failed");
assert(isNaN(rank("0")), "Test 22 failed");
assert(isNaN(rank(-1)),  "Test 23 failed");
assert(isNaN(rank(2.5)), "Test 24 failed");
assert(isNaN(rank(undefined)),"Test 25 failed");

assert(isNaN(suit(52)),   "Test 26 failed");
assert(isNaN(suit(false)),"Test 27 failed");
assert(isNaN(suit(true)), "Test 28 failed");
assert(isNaN(suit(-1)),   "Test 29 failed");
assert(isNaN(suit(3.14)), "Test 30 failed");

assert(isNaN(cardID(0,1)),   "Test 31 failed");
assert(isNaN(cardID("1",1)), "Test 32 failed");
assert(isNaN(cardID(1,5)),   "Test 33 failed");
assert(isNaN(cardID(14,1)),  "Test 34 failed");
assert(isNaN(cardID(-1,-1)), "Test 35 failed");
assert(isNaN(cardID(0.5,1)), "Test 36 failed");
assert(isNaN(cardID(1,NaN)), "Test 37 failed");

// My bad: the following test are inadequate!  Since they provide invalid arguments,
//  they should all return NaN.  But function isNaN(result) will be true if result
//  is a string.  So these tests fail to ensure that garbage in guarantees garbage out!
assert(isNaN(color('apple')),"Test 41 failed");
assert(isNaN(color(true)),   "Test 42 failed");
assert(isNaN(name(false)),   "Test 43 failed");
assert(isNaN(name(-1)),      "Test 44 failed");
assert(isNaN(name(52)),      "Test 45 failed");
assert(isNaN(name(NaN)),     "Test 46 failed");

// Part c: more tests!

// Success cases:
assert(rank(4)===2,      "Test 51 failed");
assert(color(4)==='red', "Test 52 failed");
assert(name(4)==='Two of Hearts', "Test 53 failed");

// Failure cases:
// Fix 41 thru 46 above:
assert(Number.isNaN(color('apple')),"Test 41b failed");
assert(Number.isNaN(color(true)),   "Test 42b failed");
assert(Number.isNaN(name(false)),   "Test 43b failed");
assert(Number.isNaN(name(-1)),      "Test 44b failed");
assert(Number.isNaN(name(52)),      "Test 45b failed");
assert(Number.isNaN(name(NaN)),     "Test 46b failed");

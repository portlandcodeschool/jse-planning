// Error-detecting version

function rank(card) {
}

function suit(card) {
}

function cardID(rank,suit) {
}

function color(card) {
}

function name(card) {
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

assert(isNaN(color('apple')),"Test 41 failed");
assert(isNaN(color(true)),   "Test 42 failed");
assert(isNaN(name(false)),   "Test 43 failed");
assert(isNaN(name(-1)),      "Test 44 failed");
assert(isNaN(name(52)),      "Test 45 failed");
assert(isNaN(name(NaN)),     "Test 46 failed");


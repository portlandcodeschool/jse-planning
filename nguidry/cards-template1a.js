// Simple version (no error-detection)

// function()--> possible return values

function rank(card) { // --> 1..13
    return Math.floor((card/4) + 1);
}

function suit(card) { // --> 1..4
	return (card % 4) + 1;
}

function color(card) { // -->"red","black" ()
    if (2 % suit(card) === 0) {
		return "red";
	} else {
		return "black";
	  }
}

function name(card) { // --> string
	var faces = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
	var suits = ["Hearts", "Spades", "Diamonds","Clubs"];
	var cardFace = rank(card) - 1;
	var cardSuit = suit(card) - 1;

	return faces[cardFace] + " of " + suits[cardSuit];

}


function cardID(rank,suit) { // --> 0..51
	return ((rank - 1) * 4) + (suit - 1);
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

// This is an extra function I wrote up to to print deck with number assignments 
// for crosschecking answers and providing new assertion tests.


function printDeck() {
    var deck = "";
    for(var i = 0; i < 52; i++) {
        deck += i.toString() + " = " + name(i) + "\n";
    }
    return deck;
}

printDeck();

/*
0 = Ace of Hearts
1 = Ace of Spades
2 = Ace of Diamonds
3 = Ace of Clubs
4 = Two of Hearts
5 = Two of Spades
6 = Two of Diamonds
7 = Two of Clubs
8 = Three of Hearts
9 = Three of Spades
10 = Three of Diamonds
11 = Three of Clubs
12 = Four of Hearts
13 = Four of Spades
14 = Four of Diamonds
15 = Four of Clubs
16 = Five of Hearts
17 = Five of Spades
18 = Five of Diamonds
19 = Five of Clubs
20 = Six of Hearts
21 = Six of Spades
22 = Six of Diamonds
23 = Six of Clubs
24 = Seven of Hearts
25 = Seven of Spades
26 = Seven of Diamonds
27 = Seven of Clubs
28 = Eight of Hearts
29 = Eight of Spades
30 = Eight of Diamonds
31 = Eight of Clubs
32 = Nine of Hearts
33 = Nine of Spades
34 = Nine of Diamonds
35 = Nine of Clubs
36 = Ten of Hearts
37 = Ten of Spades
38 = Ten of Diamonds
39 = Ten of Clubs
40 = Jack of Hearts
41 = Jack of Spades
42 = Jack of Diamonds
43 = Jack of Clubs
44 = Queen of Hearts
45 = Queen of Spades
46 = Queen of Diamonds
47 = Queen of Clubs
48 = King of Hearts
49 = King of Spades
50 = King of Diamonds
51 = King of Clubs

*/

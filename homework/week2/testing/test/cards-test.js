var assert = require('assert'); //standard with Node

var cards = require('../cards.js'),
	rank = cards.rank,
	suit = cards.suit,
	cardID = cards.cardID,
	name = cards.name,
	color = cards.color;

describe("rank(id)", function() {
	it("should return the appropriate value 1..13 for valid id", function() {
		assert(rank(0)===1,  "Test 1 failed");
		assert(rank(3)===1,  "Test 2 failed");
		assert(rank(51)===13,"Test 3 failed");
	});
	it("should return NaN for invalid ids", function() {
		assert(Number.isNaN(rank(52)),  "Test 21 failed");
		assert(Number.isNaN(rank("0")), "Test 22 failed");
		assert(Number.isNaN(rank(-1)),  "Test 23 failed");
		assert(Number.isNaN(rank(2.5)), "Test 24 failed");
		assert(Number.isNaN(rank(undefined)),"Test 25 failed");
	});
});


describe("suit(id)", function() {
	it("should return the appropriate value 1..4 for valid id", function() {
		assert(suit(0)===1,  "Test 4 failed");
		assert(suit(5)===2,  "Test 5 failed");
		assert(suit(51)===4, "Test 6 failed");
	});
	it("should return NaN for invalid ids", function() {
		assert(Number.isNaN(suit(52)),   "Test 26 failed");
		assert(Number.isNaN(suit(false)),"Test 27 failed");
		assert(Number.isNaN(suit(true)), "Test 28 failed");
		assert(Number.isNaN(suit(-1)),   "Test 29 failed");
		assert(Number.isNaN(suit(3.14)), "Test 30 failed");
	});
});

describe("cardID(rank,suit)", function() {
	it("should return the appropriate value 0..51 for valid rank,suit", function() {
		assert(cardID(1,1)===0,    "Test 7 failed");
		assert(cardID(13,4)===51,  "Test 8 failed");
		assert(cardID(8,3)===30,   "Test 9 failed");
	});
	it("should return NaN for invalid rank or suit", function() {
		assert(Number.isNaN(cardID(0,1)),   "Test 31 failed");
		assert(Number.isNaN(cardID("1",1)), "Test 32 failed");
		assert(Number.isNaN(cardID(1,5)),   "Test 33 failed");
		assert(Number.isNaN(cardID(14,1)),  "Test 34 failed");
		assert(Number.isNaN(cardID(-1,-1)), "Test 35 failed");
		assert(Number.isNaN(cardID(0.5,1)), "Test 36 failed");
		assert(Number.isNaN(cardID(1,NaN)), "Test 37 failed");
	});
});

describe("color(id)", function() {
	it("should return the appropriate color string for valid id", function() {
		assert(color(0)==='red',   "Test 10 failed");
		assert(color(2)==='black', "Test 11 failed");
	});
	it("should return NaN for invalid ids", function() {
		assert(Number.isNaN(color('apple')),"Test 41 failed");
		assert(Number.isNaN(color(true)),   "Test 42 failed");
	});
});

describe("name(id)", function() {
	it("should return the appropriate name string for valid id", function() {
		assert(name(5)==='Two of Diamonds', "Test 12 failed");
		assert(name(51)==='King of Clubs',  "Test 13 failed");
	});
	it("should return NaN for invalid ids", function() {
		assert(Number.isNaN(name(false)),   "Test 43 failed");
		assert(Number.isNaN(name(-1)),      "Test 44 failed");
		assert(Number.isNaN(name(52)),      "Test 45 failed");
		assert(Number.isNaN(name(NaN)),     "Test 46 failed");
	});
});



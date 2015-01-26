var assert = require('assert'); //standard with Node

var people = require('../people.js');

describe("people.meet(A,B)", function() {
	it("should do nothing when A==B", function() {
		people.index = {};
		assert(people.meet('name','name')===undefined);
		assert(!('name' in people.index));
	});
	it("should create people mentioned for the first time", function() {
		people.index = {};
		assert(people.meet('A','B')===1);
		var objA = people.index.A,
			objB = people.index.B;
		assert.ok(objA);
		assert.ok(objB);
		assert(objA.friends.B === 1);
		assert(objB.friends.A === 1);
	});
	it("should increment and return count on successive meetings", function() {
		people.index = {};
		people.meet('A','B');
		people.meet('A','C');
		assert(people.meet('A','B') === 2);
		people.meet('C','D');
		assert(people.meet('A','B') === 3);
	});
	it("should be symmetric for (A,B) and (B,A)", function() {
		people.index = {};
		people.meet('A','B');
		assert(people.meet('B','A') === 2);
	})
});

describe("people.haveMet(A,B)", function() {
	it("should return falsish if A or B is unknown", function() {
		people.index = {};
		people.meet('A','B');
		assert(!people.haveMet('A','C'));
		assert(!people.haveMet('C','A'));
		assert(!people.haveMet('C','C'));
		assert(!people.haveMet('C','D'));
	});
	it("should return falsish if A equals B", function() {
		people.index = {};
		people.meet('A','B');
		assert(!people.haveMet('A','A'));
		assert(!people.haveMet('B','B'));
	});
	it("should return falsish if A and B exist but never met", function() {
		people.index = {};
		people.meet('A','B');
		people.meet('A','C');
		assert(!people.haveMet('B','C'));
		assert(!people.haveMet('C','B'));
	});
	it("should return the current count if A,B have met", function() {
		people.index = {};
		people.meet('A','B');
		people.meet('B','C');
		people.meet('A','B');
		people.meet('C','B');
		people.meet('C','B');
		people.meet('A','C');
		assert(people.haveMet('A','B') === 2);
		assert(people.haveMet('B','A') === 2);
		assert(people.haveMet('B','C') === 3);
		assert(people.haveMet('C','B') === 3);
		assert(people.haveMet('A','C') === 1);
		assert(people.haveMet('C','A') === 1);
	});
});

describe("people.friendsOf(A)", function() {
	it("should return a string of all A's friends, sorted and non-repeating", function() {
		people.index = {};
		people.meet('A','D');
		people.meet('A','F');
		people.meet('A','E');
		people.meet('A','G');
		people.meet('A','C');
		people.meet('A','B');
		assert(people.friendsOf('A') === 'B,C,D,E,F,G');
	});
});

describe("people.friendsOfFriendsOf(A)", function() {
	it("should return a string of all A's friends, sorted and non-repeating", function() {
		people.index = {};
		people.meet('A','D');
		people.meet('A','F');
		people.meet('A','E');
		people.meet('A','G');
		people.meet('A','C');
		people.meet('A','B');
		people.meet('Q','Z'); //should be omitted
		people.meet('B','C');
		people.meet('B','T');
		people.meet('B','Q');
		people.meet('B','R');
		people.meet('B','S');
		assert(people.friendsOfFriendsOf('A') === 'A,B,C,D,E,F,G,Q,R,S,T');
	})
});
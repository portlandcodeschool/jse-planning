
// --- Assertion module: ---
var assert = require('assert'); //standard with Node
//var should = require('should'); // alternative
//var expect = require('chai').expect; // alternative


// --- The code to be tested: ---
var and2 = require('../and.js').and2;
var and3 = require('../and.js').and3;
var andN = require('../and.js').andN;

function identical(a,b) {
    if (Number.isNaN(a) && Number.isNaN(b)) //consider NaNs equal
        return;
    assert.strictEqual(a,b);
}

// chai.expect version:
//      expect(A).to.equal(B);
// should version:
//      A.should.equal(B);


var falseyVals = [false,0,'',undefined,null,NaN];
var truthyVals = [true,1,-1,Infinity,-Infinity,Math.PI,
                'true','false','undefined','0','1','-1',{}];



//--- Describe test suite ---


describe("and2(A,B)", function() {
    it("should return A whenever A is falsey", function() {
        falseyVals.forEach(function(a) {
            falseyVals.forEach(function(b) {
                identical(and2(a,b), a);
            });
            truthyVals.forEach(function(b) {
                identical(and2(a,b), a);
            });
        });
    });
    it("should return B whenever A is truthy", function() {
        truthyVals.forEach(function(a) {
            falseyVals.forEach(function(b) {
                identical(and2(a,b), b);
            });
            truthyVals.forEach(function(b) {
                identical(and2(a,b), b);
            });
        });
    });
});



describe("and3(A,B,C)", function() {
    it("should return A whenever A is falsey", function() {
        falseyVals.forEach(function(a) {
            falseyVals.forEach(function(b) {
                identical(and3(a,b), a);
            });
            truthyVals.forEach(function(b) {
                identical(and3(a,b), a);
            });
        });
    });
    it("should return B whenever A is truthy and B is falsey", function() {
        truthyVals.forEach(function(a) {
            falseyVals.forEach(function(b) {
                identical(and3(a,b), b);
            });
        });
    });
    it("should return C whenever A and B are truthy", function() {
        truthyVals.forEach(function(a) {
            truthyVals.forEach(function(b) {
                falseyVals.forEach(function(c) {
                    identical(and3(a,b,c), c);
                });
                truthyVals.forEach(function(c) {
                    identical(and3(a,b,c), c);
                });
            });
        });
    });
});


describe("andN(arr)", function() {
    it("should return true if arr is empty", function () {
        assert.strictEqual(true,andN([]));
    });
    it("should return the first falsey value, if any", function () {
        for (var i=0; i<=truthyVals.length; i++) {
            var truesExceptAt = truthyVals.slice();
            truesExceptAt.splice(i,0,false); //all truthy except at i
            falseyVals.forEach(function(f) {
                truesExceptAt[i] = f; //vary the falsey val at i
                identical(andN(truesExceptAt), f);
            });
        }
    });
    it("should return the last value otherwise", function () {
        for (var last=0; last<truthyVals.length; last++) {
            var truncTrues = // truncate to varying lengths >=1
                truthyVals.slice(0,last+1);
            identical(andN(truncTrues), truncTrues[last]);
        }
    }); 
})

 

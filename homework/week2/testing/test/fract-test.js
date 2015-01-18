var assert = require('assert'); //standard with Node


// --- The code to be tested: ---
var fractionString = require('../fract.js');


describe("fractionString(n,d)", function() {
    it("should return '<n>/<d>' when n<d and d>=2", function() {
        for (var d=2; d<10; d++) {
            for (var n=1; n<d; n++) {
                assert.strictEqual(fractionString(n,d),
                                    String(n)+'/'+String(d));
            }
        }
    });
    it("should return '<int>' when n%d===0", function() {
        for (var d=1; d<10; d++) {
            for (var n=0; n<10; n++) {
                if (n%d===0)
                    assert.strictEqual(fractionString(n,d),
                                        String(n/d));
            }
        }
    });
    it("should return '<int> <n>/<d>' otherwise", function () {
        for (var d=2; d<10; d++) {
            for (var n=d; n<100; n++) {
                var whole = Math.floor(n/d);
                if (n%d)
                    assert.strictEqual(fractionString(n,d),
                                        String(whole)+' '
                                        +String(n%d)+'/'+String(d));
            }
        }
    });
});
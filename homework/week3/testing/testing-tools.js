
function randomInt (max) {
    max = max || 6;
    return Math.floor(max*Math.random()-max/2);
}

function randomPosInt (max) {
    max = max || 6;
    return Math.floor(max*Math.random());
}

function randomFloat (max) {
    max = max || 6;
    return (max*Math.random()-max/2);
}

function randomBool () {
    return Math.random()<.5;
}

function randomStr () {
    return String(randomInt());
}

var oddballs = [undefined,Infinity,-Infinity,null,''];//skip NaN

function randomOddball() {
    return oddballs[randomPosInt(oddballs.length)];
}

function randomObject(len) {
    len = len || 3; // include len random properties
    var obj = {};
    while (len>0) {
        --len;
        obj[randomStr()] = randomValue();
    }
    return obj;
}

var randomFns = [randomInt,randomStr,randomBool,randomOddball,randomObject];

function randomValue() {
    var type=randomPosInt(randomFns.length),
        fn = randomFns[type];
    return fn();  
}

function makeTrioUsing(funct) {
    var a = randomObject(),
        b = randomObject();
    return {
        a: a,
        b: b,
        c: funct(a,b)
    }
}

function severalTimes(cb,n) {
    if (!n) n=10;//default
    //assert(n>0 && n%1==0);
    while (n--) cb();
}

function withRandomSamples(outputFn,testFn,n) {
    severalTimes(function(){
        var abc = makeTrioUsing(outputFn);
        testFn(abc);
    }, n);
}

function equal(objA,objB) {
    function isSubset(one,other) {
        var match;
        for (var key in one) {
            match = ((key in other) && (one[key] === other[key]));
            if (!match) return false;
        }
        return true;
    }
    return isSubset(objA,objB) && isSubset(objB,objA);
}


function similar(objA,objB) {
    // just like equal() but with no checking of prop values
    var key;
    for (key in objA) {
        if (!(key in objB))
            return false;
    }
    for (key in objB) {
        if (!(key in objA))
            return false;
    }
    return true;
}


module.exports = {
    withRandomSamples: withRandomSamples,
    equal: equal,
    similar: similar
}

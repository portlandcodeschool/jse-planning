
function randomInt (max) {
    max = max || 100;
    return Math.trunc(max*Math.random()-max/2);
}

function randomFloat (max) {
    max = max || 100;
    return (max*Math.random()-max/2);
}

function randomBool (max) {
    return Math.random()<.5;
}

function randomStr () {
    return String(randomInt());
}

function randomObject(len) {
    len = len || 3; // include len random properties
    var obj = {};
    while (len>0) {
        --len;
        obj[randomStr()] = randomStr();
    }
    return obj;
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
    assert(n>0 && n%1==0);
    while (n--) cb();
}

function withRandomSamples(outputFn,testFn,n) {
    severalTimes(function(){
        var abc = makeTrioUsing(outputFn);
        testFn(abc);
    }, n);
}


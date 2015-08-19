Closures as data-integrity assurance:

Pseudo-arrays

Loan manager



Closures as Persistence:








//---- Counting Factory 2-----
function makeFactory() {
    var count = 0; // persists through all calls to factory()
    function factory() {
        var id = count++,
            thing = {
                id: function() {
                    return id;
                }
            };
        return thing;
    }
    return factory;
}
var makeThing = makeFactory();
var thing0 = makeThing(),
    thing1 = makeThing(),
    thing2 = makeThing();
thing0.id() //0
thing1.id() //1
thing2.id() //2




// RULE:
// If a function needs to have data persist between calls,
//  it must be stored outside the function.

// Possibilities include:
// 1) global variable
// 2) property of itself
// 3) variable of enclosing function (i.e. closure)

// But enclosing function has two potential problems:
// 1) creates an extra global variable,
// 2) hard to remember when/how to call it


## Solution: Immediately-Invoked Function Expression (IIFE)
// (aka Self-Executing Anonymous Function)



// Start with pile of resources/functions


function makeCard() {//factory
    //...
}
makeCard.method = function() {}
makeCard.resource = [];







// Then wrap it all in anonymous function which returns a single export object
function() {

    function makeCard() {//factory
        //...
    }
    makeCard.method = function() {}
    makeCard.resource = [];

    return makeCard;
}






// Then trigger it and capture export:
var makeCard = (function() {

    function makeCard() {//factory
        //...
    }
    makeCard.method = function() {}
    makeCard.resource = [];

    return makeCard;
})();



// Short form:
(function(){/**/})()
//or
(function(){/**/}())


Closures as Modules: IIFEs


var makeCard = // receive factory with external name `makeCard`
    (function () { //begin IIFE...

    // The factory itself:
    function makeCard(id) {  //makeCard is also IIFE's internal name
        // set instance properties here
        //...
        // and return instance...
    };


//--------------------------
// Private resources (internal use only)
//--------------------------

    // Examples:

    //function isValidID(num) {...}
    //var rankNames = [...];

//-----------------------
// Instance Methods:
//-----------------------

    function rank() {
    }

    function suit() {
    }

    //etc...


//-----------------------
// Factory Methods/Data:
//-----------------------

    makeCard.isCard = function(thing) {

    };

    makeCard.fullSet = [];//<-- fill me



    return makeCard;  //return factory function, product of IIFE's work

})(); //end IIFE definition and run it now!

// Export as node-style module:
if (typeof module != 'undefined')
    module.exports = makeCard;
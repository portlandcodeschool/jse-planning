// Assert verifies various conditions within functions
// Calls to assert are optional but good practice
function assert(claim,warning) {
    if (!claim) console.log(warning);
}

// Solution:
var people = {};  //master object: stores both data and methods

people.index = {}; //data object: stores known names and corresponding objects

// ---- Helper functions ----

// Retrieve the object for a particular person, which might be null
people.findPerson = function(name) {
    assert(typeof name === 'string','ensurePerson:name should be string');
    return this.index[name]; // object or undefined
}

// Retrieve the object for a particular person *ALWAYS*, creating it if needed
people.ensurePerson = function(name) {
    // return existing person, or else create them
    return this.findPerson(name) ||
        ( this.index[name] = {name:name, friends:{}} ); //if not found, make person
}

// ---- Functions needed for part a) ----
people.meet = function(nameA,nameB) {
    if (nameA===nameB) return; //don't meet oneself

    // retrieve or make the person objects:
    var a = this.ensurePerson(nameA);
    var b = this.ensurePerson(nameB);

    assert(typeof a === 'object','meet:a should be object');
    assert(typeof b === 'object','meet:b should be object');
    assert(a !== b,'meet:a,b should be different');

    // include each in other's friends list:
    if (!a.friends[nameB]) //if undefined...
            a.friends[nameB]=0;
    if (!b.friends[nameA])
            b.friends[nameA]=0;

    assert(a.friends[nameB] === b.friends[nameA], "meet: counts disagree"); //make sure their counts agree

    //increment meeting count of each, and return either incremented count:
    ++a.friends[nameB];
    return ++b.friends[nameA];
}

people.haveMet = function(nameA,nameB) {
    var a = this.findPerson(nameA);
    return a && //maybe undefined
        a.friends[nameB];
}

people.friendsOf = function(name) {
    var person = this.findPerson(name);
    if (!person) return;

    // Make an array of all of person's friends:
    var friends = Object.keys(person.friends);
    // OR:
    //var friends = Object.getOwnPropertyNames(person.friends);
    // OR:
    //var friends=[];
    //for (var eachName in person.friends) {
    //    friends.push(eachName);
    //}

    // Sort the array, join it into a comma-separated string, and return it:
    return friends.sort().join();
}

// ---- Functions needed for part b) -----
people.friendsOfFriendsOf = function(name) {
    var person = this.findPerson(name);
    if (!person) return;

    var setOfNames = copy(person.friends); //duplicate set of names of friends (will be modified)
    for (var eachName in person.friends) {// for each friend of person...
        //union the current setOfNames with set of that friend's friends
        unionWith(setOfNames,this.findPerson(eachName).friends);
    }

    var arrOfNames = Object.keys(setOfNames);  //turn set into array
    return arrOfNames.sort().join();
}

// Copy from Problem #2:
function copy(obj) {
    var clone = {};
    for (var key in obj) {
        clone[key]=obj[key];
    }
    return clone;
}

// More efficient Union, adapted from Problem #2:
function unionWith(union,objB) { //modifies the obj passed as parameter union; make sure it's a copy!
    for (var key in objB) {
        union[key] = union[key] || objB[key];
    }
}


if (module) {
    module.exports = people;
}
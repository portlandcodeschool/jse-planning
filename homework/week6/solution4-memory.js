var MemoryBoard = (function() {

	function Memory(values,matchFn,displayFn,winFn) {
		var slots, //sparse array: will have elements deleted as cards are removed
			length,//total slots, including gaps
			there; //position of face-up card if any, or false

		var reset = function() {  //public method
			slots = values.slice();
			length = values.length;
			there = false;
			shuffle(slots);
		}
		reset();// reset now as part of init'ing

		var faceupValue = function() {
			return valueAt(there);
		}
		var faceupWhere = function() {
			return there;
		}
		var remainsAt = function(where) {
			return slots[where]!==undefined;
		}
		var valueAt = function(where) {
			return slots[where];
		}
		var removeAt = function(where) {
			delete slots[where];
		}
		var remaining = function() {
			return Object.keys(slots).map(Number);
		}
		var checkGameover = function() {
			if (winFn && (remaining().length === 0))
				winFn();
		}

		var lift = function(here) {
			if (!isValid(here,length)) return false;
			if (!remainsAt(here)) return false;
			if (there===here) return false;

			// must be a face-down card here; proceed...
			var valHere = valueAt(here);
			if (there === false) {
				// no current face-up
				there = here; //turn here face-up
			} else {
				// check match with face-up
				if (matchFn(valHere,valueAt(there))) {
					// match; remove both:
					removeAt(here);
					removeAt(there);
					checkGameover();
				}
				//either way, turn face-up to face-down:
				there = false;
			}
			if (displayFn) //maybe convert value for display
					valHere = displayFn(valHere); 
			return valHere;
		}

		// Make some methods public:
		this.reset = reset;
		this.lift = lift;
		this.faceupValue = faceupValue;
		this.faceupWhere = faceupWhere;
		this.remaining = remaining;
	}//end ctor

	// Private Functions shared by all boards:
	//  (these could just as easily be placed inside ctor)
	function isValid(where,length) {
			return (typeof where === 'number')
				&& (where%1 === 0)
				&& (where>=0)
				&& (where<length)
		}

	function shuffle(array) {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
		var end = array.length, temp, i;
  			// While there remain elements to shuffle…
		while (end>1) {
   			// Pick a remaining element…
   			i = Math.floor(Math.random() * end--);
   			// And swap it with the current element.
   			temp = array[end];
   			array[end] = array[i];
		    array[i] = temp;
 		}
	}

	return Memory;
})();



// ----Example set 1:----

// card values:
var food = ['apple','artichoke','banana','blueberry','carrot','cranberry'];
// match callback:
var sameInitial = function(str1,str2) {
	return str1[0]===str2[0];
}
// end game callback:
var gameoverFn = function() {console.log("You win!")}

var game = new MemoryBoard(food,sameInitial,null,gameoverFn);

// ----Example set 2:----

// card values (each card is a pair, array [name,num]) :
var animals = [['dog',1],['puppy',1],['cat',2],['kitten',2],['frog',3],['tadpole',3],['bird',4],['chick',4]];
// match callback:
var sameSpecies = function(animal1,animal2) { // check if num matches:
	return (animal1[1]===animal2[1]);
}
// display callback:
var showName = function(animal) { // display only name:
	return animal[0];
}

var game = new MemoryBoard(animals,sameSpecies,showName);



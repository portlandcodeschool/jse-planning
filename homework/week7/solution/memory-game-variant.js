// Alternative game rules:
// lift cards until there is a match;
// then the unmatched ones are removed and the matched ones
// are flipped facedown again.
// (Under construction...)

var MemoryGame = (function() {

	function Ctor(cardset) {
		var slots, //values of shuffled cards;
				//sparse array: will have elements deleted as cards are removed
			length,//total slots, including gaps
			status, //array corresponding to slots: true if faceup
			//there, //position of face-up card if any, or false
			_gui = null;

		// Helper functions which need access to closure vars;
		//  some fns will be made public as instance methods:
		var reset = function() {
			slots = cardset.values();
			status = [];
			length = slots.length;
			there = false;
			shuffle(slots);
		}
		reset();// reset now as part of init'ing

		var gui = function() {//accessor fn
			if (arguments.length === 0) 
				return _gui; //getter
			_gui = arguments[0]; //setter
		}

		var size = function() {
			return length;
		}

		var remainsAt = function(where) {//--> boolean
			return slots[where]!==undefined;
		}
		var valueAt = function(where) {//--> card val
			return slots[where];
		}
		var removeAt = function(where) {
			delete slots[where];
			delete status[where];
		}
		var firstFaceup = function() {
			return faceups()[0];
			//var faceups = Object.keys(status);
			//if (faceups.length)
			//	return faceups[0];
		}
		var faceupValue = function() {//--> card val
			var first = firstFaceup();
			if (first !== undefined)
				return valueAt(first);
		}
		var faceupWhere = function() {//--> integer
			return firstFaceup();
		}
		var remaining = function() {//--> array of integers
			return Object.keys(slots).map(Number);
		}
		var faceups = function() {
			return Object.keys(status).map(Number);
		}
		var isFaceup = function(where) {
			return status[where];
		}
		var flip = function(where) {
			status[where] = true;
		}

		var unflip = function(exceptArr) {
			//console.log("")
			var theres = faceups();
			theres.forEach(function(there) {
				if (exceptArr.indexOf(there) === -1) {
					removeAt(there);
					if (_gui)
						_gui.removeSoon([there]);
				}
			});
			status = [];
			if (_gui)
				_gui.hideSoon(exceptArr);
		}

		var lift = function(here) {
			if (!isValid(here,length)) return false;
			if (!remainsAt(here)) return false;
			if (isFaceup(here)) return false;

			var valHere = valueAt(here),
				displayHere = cardset.display(valHere);
			var theres = faceups();
			//var matchAt = [];
			var matchAt = theres.filter(function(there){
				return cardset.match(valueAt(there),valHere);
			});
			console.log(theres,matchAt);
			//theres.forEach(function(there) {
			//	if (cardset.match(here,there))
			//		matchAt.push(there); 
			//});
			flip(here);
			if (matchAt.length>0)
				unflip(matchAt.concat([here]));
			if (_gui)
				_gui.show(here,displayHere);
			return displayHere; 
		}
/*
		var lift = function(here) {//--> display string
			if (!isValid(here,length)) return false;
			if (!remainsAt(here)) return false;
			if (there===here) return false;

			// must be a face-down card here; proceed...
			var valHere = valueAt(here),
				displayHere = cardset.display(valHere);
			if (there === false) {
				// no current face-up
				there = here; //turn here face-up
			} else {
				// check match with face-up
				if (cardset.match(valHere,valueAt(there))) {
					// match; remove both:
					removeAt(here);
					removeAt(there);
					if (_gui)
						_gui.removeSoon([here,there]);
					//optional: report match
					console.log("Match!")
				} else {
					if (_gui)
						_gui.hideSoon([here,there]);
				}
				//either way, turn face-up to face-down:
				there = false;
			}
			if (_gui)
				_gui.show(here,displayHere);
			return displayHere; 
		}
		*/

		// Make some functions public as instance methods:
		this.reset = reset;
		this.lift = lift;
		//this.faceupValue = faceupValue;
		//this.faceupWhere = faceupWhere;
		this.remaining = remaining;
		this.gui = gui;
		this.size = size;
	}//end ctor

	// Private Functions shared by all boards:
	// these could be placed inside ctor,
	// but then they would be rebuilt for each instance
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

	return Ctor;
})();



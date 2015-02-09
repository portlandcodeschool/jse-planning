var MemoryGame = (function() {

	function MemoryGame(GuiCtor,cardset,gameoverFn) {
		// extract three components of cardset:
		var values = cardset.values;
		var matchFn = cardset.match;
		var displayFn = cardset.display;

		var slots; // sparse array of card values; some slots are missing
		var length;// total slots (includes possible empties at end)
		var there; //position of face-up card, if any

		var gui = (GuiCtor)? new GuiCtor(values.length,lift,reset): null;

		function reset() {
			slots = values.slice();
			length = values.length;
			there = false;
			shuffle(slots);
		}
		reset(); //do it now

		function faceupValue() {
			return valueAt(there);
		}
		function faceupWhere() {
			return there;
		}
		function remainsAt(where) {
			return slots[where]!==undefined;
		}
		function valueAt(where) {
			return slots[where]
		}
		function removeAt(where) {
			delete slots[where];
		}
		function remaining() {
			return Object.keys(slots);
		}
		function checkGameover() {
			if (gameoverFn && (remaining().length === 0))
				gameoverFn();
		}

		function lift(here) {
			if (!isValid(here,length)) return false;
			if (!remainsAt(here)) return false;
			if (there===here) return false;

			var valHere = valueAt(here);
			if (there === false) {
				// no current face-up
				there = here;
			} else {
				// must match face-up
				if (matchFn(valHere,valueAt(there))) {
					removeAt(here);
					removeAt(there);
					if (gui) {
						gui.removeSoon([here,there]);
					}
					checkGameover();
				} else {
					if (gui) gui.hideSoon([here,there]);
				}
				there = false;
			}
			if (displayFn)
				valHere = displayFn(valHere);
			if (gui)
				gui.show(here,valHere)
			return valHere;
		}

		// Public methods:
		this.reset = reset;
		this.lift = lift;
		this.faceupValue = faceupValue;
		this.faceupWhere = faceupWhere;
		this.remaining = remaining;

	}//end ctor

	// Functions shared by all boards:
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

	return MemoryGame;
})();

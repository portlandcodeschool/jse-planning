var makeDeque = 
(function() { //begin IIFE

	function makeDeque(values) { //begin factory

		// These vars are private, local to scope of makeDeque,
		//  only accessible to functions defined in makeDeque

		var array = values.slice(); //copy values
		var absent = []; //list of missing elements

		// Each function below is specific to one deque, with access to the private vars

		function readmit(val) { //internal function only, do not attach to instances
			var foundAt = absent.indexOf(val);
			if (foundAt<0) return false; //foundAt is -1 if val not found
			// else found; excise from absent array
			absent.splice(foundAt,1);
			return true;
		}

		// ---- Instance methods: -----

		function top() {
			if (array.length)
				return array[array.length-1];
		}

		function bottom() {
			if (array.length)
				return array[0];
		}

		function pop() {
			var val = array.pop();
			if (val !== undefined)
				absent.push(val);
			return val;
		}

		function push(val) {
			return readmit(val) && array.push(val);
		}

		function shift() {
			var val = array.shift();
			if (val !== undefined)
				absent.push(val);
			return val;
		}

		function unshift(val) {
			return readmit(val) && array.unshift(val);
		}

		function sort(sortFn) {
			//don't return:
			array.sort(sortFn);
		}

		function map(convertFn) {
			// This solution works but can be exploited
			// (certain callbacks could change the array):
			// return array.map(convertFn);

			// Safer version: map a copy of array:
			return array.slice().map(convertFn);
		}

		function cut() { //returns # elements moved from upper half to lower (0 if no change)
			var fullLength = array.length;
			var headLength = Math.ceil(fullLength / 2);
			if (headLength == fullLength) // no tail, nothing to swap
				return 0;
			var tail = array.splice(headLength, fullLength); // removes tail from array
			array = tail.concat(array); // swap tail and remaining head
			return tail.length; 
		}

		function shuffle() {
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

	 	// Problem 4:
	 	function render(container,renderItemFn) {
	 		if (typeof container === 'string') {
	 			container = document.getElementById(container);
	 		}
	 		if (!(container instanceof HTMLElement)) {
	 			console.log('no such element');
	 			return;
	 		}
	 		for (var i=0; i<array.length; ++i) {
	 			var cell = document.createElement('div');
	 			cell.className = 'dequeItem';
	 			renderItemFn(array[i], cell);
	 			container.appendChild(cell);
	 		}
	 	}

		var deque = {// export each public method by linking an instance property to it:
				sort : sort,
				map : map,
				cut : cut,
				shuffle : shuffle,
				top : top,
				bottom : bottom,
				push : push,
				pop : pop,
				shift : shift,
				unshift : unshift,

				render : render
		};
		return deque;

	} //end factory makeDeque

	return makeDeque;
})(); //end IIFE

if (typeof module !== "undefined") {
    module.exports = makeDeque;
}

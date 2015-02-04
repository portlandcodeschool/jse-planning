// Full version of deque factory, including parts a), d) ,and e)


// Problem 2a): build a deque factory
//-------

// The factory itself:
function makeDeque(values) {
	// return an instance object
	return {
		array   : values.slice(), //copies values array
		// attach shared instance methods:
		length  : makeDeque.arrLength,
		top     : makeDeque.top,
		bottom  : makeDeque.bottom,
		push    : makeDeque.push,
		pop     : makeDeque.pop,
		shift   : makeDeque.shift,
		unshift : makeDeque.unshift,
		sort    : makeDeque.sort,
		cut     : makeDeque.cut,
		map     : makeDeque.map,
		//---- part d) only:----
		shuffle : makeDeque.shuffle,
		//---- part e) only:---
		absent  : [], // original elements currently missing
		readmit : makeDeque.readmit
	}
}

// The factory's instance methods:
makeDeque.arrLength = function() { 	// can't use property named length;
				// as a function, makeDeque has a predefined length property.
	return this.array.length;
}

makeDeque.top = function() {
	return this.array[this.array.length-1];  // undefined if length is 0
}

makeDeque.bottom = function() {
	return this.array[0]; //undefined if length is 0
}

makeDeque.cut = function() {
	var fullLength = this.array.length;
	var headLength = Math.ceil(fullLength / 2);
	if (headLength == fullLength) // no tail, nothing to swap
		return 0;
	var tail = this.array.splice(headLength, fullLength); // removes tail from array
	this.array = tail.concat(this.array); // swap tail and remaining head
	return tail.length;  //returns # elements moved from upper half to lower (0 if no change)
}

// -- These methods are just adapters, delegating most work to the array: --

makeDeque.pop = function() {
	var val = this.array.pop();
	if (val !== undefined)
		this.absent.push(val);  //part e)
	return val;
}

makeDeque.push = function(val) {
	return this.readmit(val) && //part e)
		this.array.push(val);
}

makeDeque.shift = function() {
	var val = this.array.shift();
	if (val !== undefined)
		this.absent.push(val); //part e)
	return val;
}

makeDeque.unshift = function(val) {
	return this.readmit(val) && //part e)
		this.array.unshift(val);
}

makeDeque.map = function(convertValFn) {
	return this.array.map(convertValFn);
}

makeDeque.sort = function(compareValsFn) {
	return this.array.sort(compareValsFn);
}

// ---- Part d)----

makeDeque.shuffle = function () {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
	var end = this.array.length, temp, i;

  	// While there remain elements to shuffle…
  	while (end>1) {

    	// Pick a remaining element…
    	i = Math.floor(Math.random() * end--);

    	// And swap it with the current element.
    	temp = this.array[end];
    	this.array[end] = this.array[i];
    	this.array[i] = temp;
  	}
  	// always successful; no return val needed
}

// ---- Part e)----

makeDeque.readmit = function(val) { // returns true if val was absent
	var foundAt = this.absent.indexOf(val);
	if (foundAt < 0) // -1 if not found
			return false;
	// else found; excise from absent array
	this.absent.splice(foundAt,1);
	return true;
}



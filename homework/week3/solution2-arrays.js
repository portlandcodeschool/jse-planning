// ---------- Part a: Testing --------

// Here's the old, simple assertion:
function assert(claim,message) {
    if (!claim) console.error(message);
}

// Here's a fancy new assertion, with better failure reporting:
function expectValue(result, expected, attemptStr) {
	if (result !== expected) {
		console.log(attemptStr+" expected result "+expected+", got "+result);
	}
}
// In your tests below, you may use either kind of assertion, or write your own!


function testPush(array) { // accept an array to test, if provided
	// otherwise make a new one:
	if (!array) array = [];

	array.length = 0; //clear the array to be empty initially

	// Try several pushes, and for each try, check the status of
	//  the resulting array and the return value:
	expectValue(array.push('a'), 1, "array.push('a')"); //check return value
	expectValue(array[0], 'a', "array[0]"); // check array element
	expectValue(array.length, 1, "array.length");	// check array length

	expectValue(array.push('b'), 2, "array.push('b')");
	expectValue(array[0], 'a', "array[0]"); //should remain 'a'
	expectValue(array[1], 'b', "array[1]");
	expectValue(array.length, 2, "array.length");

	// That might be enough, but to be sure, push 'c' and test again here:
	//...
	expectValue(array.push('c'), 3, "array.push('c')");
	expectValue(array[0], 'a', "array[0]"); //should remain 'a'
	expectValue(array[1], 'b', "array[1]"); //should remain 'b'
	expectValue(array[2], 'c', "array[2]");
	expectValue(array.length, 3, "array.length");

}

function testPop(array) {
	if (!array) array = [];

	array.length = 0; //clear array

	// 1) populate the array by pushing elements 'a' and 'b' onto it
	//...
	array.push('a');
	array.push('b');

	// 2) pop once, then check the return value, array contents, and array length
	//...
	expectValue(array.pop(), 'b', "array.pop()");  //pop and check return val
	expectValue(array.length, 1, "array.length"); //check length
	expectValue(array[0],'a',"array[0]");  //should remain 'a'
	// normal Arrays should pass this test, but your pseudo-array may not:
	expectValue(array[1],undefined,"array[1]");


	// 3) pop again, then check as before
	//...
	expectValue(array.pop(), 'a', "array.pop()");  //pop and check return val
	expectValue(array.length, 0, "array.length"); //check length
	// normal Arrays should pass this test, but your pseudo-array may not:
	expectValue(array[0],undefined,"array[0]");

	// 4) array should now be empty!  check an attempt to pop when empty
	//...
	expectValue(array.pop(), undefined, "array.pop()");  //pop and check return val
	expectValue(array.length, 0, "array.length"); //check length

}

function testJoin(array) {
	if (!array) array = [];

	array.length = 0; //clear array

	// 1) try a join on the empty array,
	//  then check the return value and its status (which should be unchanged)
	//...
	expectValue(array.join(' '), '', "array.join(' ')");
	expectValue(array.length, 0, "array.length");

	// 2) push 'a', then join and check as before
	//...
	array.push('a');
	expectValue(array.join(' '), 'a', "array.join(' ')");
	expectValue(array.length, 1, "array.length");


	// 3) push 'b', then join and check as before
	//...
	array.push('b');
	expectValue(array.join(' '), 'a b', "array.join(' ')");
	expectValue(array.length, 2, "array.length");

	// 4) push 'c', then join and check as before
	//...
	array.push('c');
	expectValue(array.join('_'), 'a_b_c', "array.join('_')");//different delim, just for fun
	expectValue(array.length, 3, "array.length");

	// 5) leave array unchanged, but join it with a different delimiter and check outcome
	//...
	expectValue(array.join(''), 'abc', "array.join('')");//various other delims...
	expectValue(array.join('%%'), 'a%%b%%c', "array.join('%%')");
	expectValue(array.join('a'), 'aabac', "array.join('a')");
	expectValue(array.join('\t'), 'a\tb\tc', "array.join('\t')");

	// 6) leave array unchanged, but join() it with no delimiter argument, and check that it
	//   uses the default delimiter ',' correctly
	expectValue(array.join(), 'a,b,c', "array.join()");

}

// When those test functions are written, you can run them on built-in arrays
//  by calling the test with no arguments:
testPush();
testPop();
testJoin();

// -------- Part b: Pseudo-array --------

var array = {
	length:0,

	push: function(val) {
    	this[this.length] = val;
    	this.length += 1;
    	return this.length;
	},

	pop: function() {
    	if (this.length<1)
    			return undefined; //nothing to pop
    	this.length -= 1;
    	var lastVal = this[this.length]; //keep copy of last item
    	delete this[this.length]; // destroy last item
    	return lastVal; //return copy
    },

    join: function(delim) {
    	if (delim === undefined)
    		delim = ',';  // use comma as default delimiter if none is provided

    	var str = ''; //accumulate result string here
    	for (var i=0; i<this.length; i++) {
    		if (this[i]!==undefined) // unless element is undefined...
    			str += this[i];	// append it to str
    		if (i < this.length - 1) // if another element follows...
    			str += delim;  // append delimiter
    	}
    	return str;
    }
}; //end array defn


// -------- Part c --------
// To test a custom array implementation (see problem 2), do this:
var myArray = array; //special object with push,pop, and join methods

testPush(myArray);
testPop(myArray);
testJoin(myArray);

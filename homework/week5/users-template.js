var makeUser = (function() {// begin IIFE...
	
	var sharedLog = [];  //private; accessible only from functions defined within IIFE


	// The factory itself:
	function makeUser(name,passwd) {
		// Return a user object with three methods:
		// getName()
		// validate(str)
		// record(message) (Part b)
	}

	// Part b) only:
	// Factory method (defined within IIFE, so can access sharedLog):
	makeUser.getLog = function(user) {
	}

	return makeUser;
})();


if (typeof module != 'undefined')
	module.exports = makeUser;

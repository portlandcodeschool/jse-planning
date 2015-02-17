var MemoryGame = (function() {

	function GameCtor(cardset) {

		// some of the instance methods may need to be
		// specific to each instance
		// ...

		this.reset = function() {}

		this.remaining = function() {}

		this.faceupWhere = function() {}

		this.faceupValue = function() {}

		this.lift = function(where) {}

		// New methods:
		this.gui = function(useGui) {}

		this.size = function() {}
	}

	// some of those instance methods could instead be shared
	// by installing them in GameCtor.prototype
	// ...

	return GameCtor;
})();

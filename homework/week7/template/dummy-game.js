var MemoryGame = (function() {

	function DummyGameCtor(cardset, size) {
		//ignore cardset, but allow optional size parameter
		this.size = function() {
			return size || 16; //default to 16 if size is undefined or 0
		}

		var _gui = null; //private variable
		this.gui = function(useGui) {
			if (useGui === undefined) //no parameter; act as getter:
				return _gui;
			// else act as setter:
			_gui = useGui;
		}

		this.lift = function(where) {
			console.log("Attempted lift("+where+")");
		}
	}
	// add these dummy methods to prototype to ensure complete interface:

	DummyGameCtor.prototype.remaining	= function() {}
	DummyGameCtor.prototype.reset 		= function() {}
	DummyGameCtor.prototype.faceupWhere	= function() {}
	DummyGameCtor.prototype.faceupValue = function() {}

	return DummyGameCtor;
})();

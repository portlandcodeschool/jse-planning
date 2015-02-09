// You may use this cardset until you make your own

var MemoryCards = (function(){
	// produces pairs 'a'=='A','b'=='B',...
	var alphabet = ' abcdefghijklmnopqrstuvwxyz';

	function MemoryCardset(numPairs) {
		if (numPairs < 1) numPairs = 1;
		if (!numPairs || (numPairs > 26)) numPairs = 26;

		this.values = [];
		while (numPairs) {
			this.values.push(alphabet[numPairs]);
			this.values.push(alphabet[numPairs].toUpperCase());
			--numPairs;
		}
		this.match = function(a,b) {
			return a.toUpperCase() == b.toUpperCase();
		}
		// this.display could remain undefined if MemoryGame allows it to be optional,
		// but in case it's required, provide this identity function:
		this.display = function(val) {
			return val;
		}

	}
	return MemoryCardset;
})();

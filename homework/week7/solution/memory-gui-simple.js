// Non-jQuery version; classical DOM-manipulation only...

var MemoryGUI = (function () {

	function GUI(container,game) { //begin ctor
		var len = game.size();

		if (typeof container === 'string') {
			container = document.getElementById(container);
		}
		// public instance method:
		this.reset = function() { //reset all cards (gui only)
			for (var where=0; where<len; ++where) {
				resetAt(where);
			}
		}
		
		// Set up the necessary DOM structure and event handlers: 
		makeGrid(container,game);
		makeReset(container,game,this);

		// Alternatively, makeGrid and makeReset could be embedded here,
		// where they could access the variables container, game and `this` through closure
		// instead of receiving them as arguments

	} // end ctor


	// shared (i.e. prototype) public instance methods:
	GUI.prototype.show = function(where,what) {
		var cell = findCell(where);
		cell.setAttribute('value',what);
		//The 'value' attribute is used by CSS pseudo-class (faceup:before)
		// to display the card face
		cell.classList.add('faceup');
	}
	GUI.prototype.removeSoon = function(locs) {
		window.setTimeout(function() {
			locs.forEach(removeAt);
		}, 1000);
	}
	GUI.prototype.hideSoon = function(locs) {
		window.setTimeout(function() {
			locs.forEach(hideAt);
		}, 1000);
	}


	// private helper functions:
	function hideAt(where) {
		var cell = findCell(where);
		cell.classList.remove('faceup');
		// cell.removeAttribute('value');
		// Leaving the value attribute in place is harmless,
		//  but it does afford cheating by inspecting face-down cards.
	}
	function removeAt(where) {
		var cell = findCell(where);
		cell.classList.add('missing')
	}
	function resetAt(where) {
		var cell = findCell(where);
		cell.classList.remove('faceup');
		cell.classList.remove('missing');
	}

	function makeID(where) {// given a number, generate an id
		return 'cell'+where;
	}

	function findCell(where) {
		if (where instanceof HTMLElement)
			return where; //already a DOM element
		// else find it by id:
		return document.getElementById(makeID(where));
	}

	// Structure-building functions:
	// (Alternatively, these could all be put into a single render() function)
	
	function makeCell(game,where,isFirstCol) {
		var cell = document.createElement('div');
		cell.id = makeID(where);
		cell.classList.add('memoryCell');
		if (isFirstCol)
			cell.classList.add('firstCol');
		// Each scope of makeCell is specific to one cell, so clickFn callback
		//  always gets corresponding where parameter:
		cell.addEventListener('click',function(){
			game.lift(where);
		});
		return cell;
	}
	
	function makeGrid(container,game) {
		var len = game.size(),
			cols = Math.ceil(Math.sqrt(len));
		for (var id=0; id<len; ++id) {
			var isFirstCol = (id%cols===0);
			container.appendChild(makeCell(game,id,isFirstCol));
		}
		container.classList.add('memorygame');
	}

	function makeReset(container,game,gui) {
		var btn = document.createElement('button');
		btn.innerHTML = 'Reset';
		btn.classList.add('resetBtn');
		container.insertBefore(btn,container.firstElementChild);
		btn.addEventListener('click',function() {//when clicked, reset both modules
			gui.reset();
			game.reset();
		});
	}


	return GUI;
})();


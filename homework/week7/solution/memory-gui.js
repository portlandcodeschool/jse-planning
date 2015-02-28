// Non-jQuery version; classical DOM-manipulation only...

var MemoryGUI = (function () {

	var numGuis = 0; // counts number of GUI instances made

	// Begin ctor:
	function GUI(_container,_game) {
		_game.gui(this); //link _game to this gui:

		// The variables _container, _game, _len, _gui, and _guiID are all
		//  in the ctor's closure, and are therefore visible to all functions below
		var _len = _game.size(),
			_guiID = numGuis++, //affords multiple GUIs without duplicating IDs
			_gui = this;

		if (typeof _container === 'string') {
			_container = document.getElementById(_container);
		}

		// ---- Public instance methods ----

		this.reset = function() { //reset all cards (gui only)
			for (var where=0; where<_len; ++where) {
				resetAt(where);
			}
		}
		this.show = function(where,what) {
			var cell = findCell(where);
			cell.setAttribute('value',what);
			//The 'value' attribute is used by CSS pseudo-class (faceup:before)
			// to display the card face
			cell.classList.add('faceup');
		}
		this.removeSoon = function(locs) {
			window.setTimeout(function() {
				locs.forEach(removeAt);
			}, 1000);
		}
		this.hideSoon = function(locs) {
			window.setTimeout(function() {
				locs.forEach(hideAt);
			}, 1000);
		}


		// ---- Private helper functions ----

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
			return 'grid'+_guiID+'cell'+where;
		}

		function findCell(where) {
			if (where instanceof HTMLElement)
				return where; //already a DOM element
			// else find it by id:
			return document.getElementById(makeID(where));
		}

		// ---- Private structure-building functions ----
		// (Alternatively, these could all be put into a single render() function)

		function makeCell(where,isFirstCol) {
			var cell = document.createElement('div');
			cell.id = makeID(where);
			cell.classList.add('memorycell');
			if (isFirstCol)
				cell.classList.add('firstcol');
			// Each scope of makeCell is specific to one cell, so clickFn callback
			//  always gets corresponding where parameter:
			cell.addEventListener('click',function(){
				_game.lift(where);
			});
			return cell;
		}
		
		function makeGrid() {
			var cols = Math.ceil(Math.sqrt(_len));
			for (var id=0; id<_len; ++id) {
				var isFirstCol = (id%cols===0);
				_container.appendChild(makeCell(id,isFirstCol));
			}
			_container.classList.add('memorygrid');
		}

		function makeReset() {
			var btn = document.createElement('button');
			btn.innerHTML = 'Reset';
			btn.classList.add('resetBtn');
			// insert button just before grid:
			_container.insertBefore(btn,_container.firstElementChild);
			btn.addEventListener('click',function() {//when clicked, reset both modules
				_gui.reset();
				_game.reset();
			});
		}

		// Set up the necessary DOM structure and event handlers: 
		makeGrid();
		makeReset();

	} // end ctor


	return GUI;
})();


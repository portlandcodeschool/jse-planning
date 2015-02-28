// jQuery version...

var MemoryGUI = (function () {

	var numGuis = 0; // counts number of GUI instances made

	// Begin ctor:
	function GUI(container,_game) {
		_game.gui(this); //link _game to this gui:

		// The variables _$container, _game, _len, _gui, and _guiID are all
		//  in the ctor's closure, and are therefore visible to all functions below
		var _len = _game.size(),
			_guiID = numGuis++, //affords multiple GUIs without duplicating IDs
			_gui = this;

		// ensure that a string container begins with '#'
		if (typeof container === 'string')
			if (container[0] !== '#')
				container = '#' + container;

		var _$container = $(container);

		// ---- Public instance methods ----

		this.reset = function() { //reset all cards (gui only)
			for (var where=0; where<_len; ++where) {
				resetAt(where);
			}
		}
		this.show = function(where,what) {
			$findCell(where)
				.attr('value',what)
			//The 'value' attribute is used by CSS pseudo-class (faceup:before)
			// to display the card face
				.addClass('faceup');
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
			$findCell(where).removeClass('faceup');
			// cell.removeAttribute('value');
			// Leaving the value attribute in place is harmless,
			//  but it does afford cheating by inspecting face-down cards.
		}
		function removeAt(where) {
			$findCell(where).addClass('missing');
		}
		function resetAt(where) {
			$findCell(where)
				.removeClass('faceup')
				.removeClass('missing');
		}

		function makeID(where) {// given a number, generate an id
			return 'grid'+_guiID+'cell'+where;
		}

		function $findCell(where) {
			return $('#'+makeID(where));
		}

		// ---- Private structure-building functions ----
		// (Alternatively, these could all be put into a single render() function)

		function makeCell(where,isFirstCol) {
			return $('<div>')
					.attr('id',makeID(where))
					.addClass('memorycell')
					.addClass(isFirstCol && 'firstcol')
					.on('click',function() {
						_game.lift(where);
					});
		}

		function makeGrid() {
			var cols = Math.ceil(Math.sqrt(_len));
			for (var id=0; id<_len; ++id) {
				var isFirstCol = (id%cols===0);
				_$container.append(makeCell(id,isFirstCol));
			}
			return _$container.addClass('memorygrid');
		}

		function makeReset() {
			return $('<button>')
					.html('Reset')
					.addClass('resetBtn')
					.prependTo(_$container)
					.on('click',function() {
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


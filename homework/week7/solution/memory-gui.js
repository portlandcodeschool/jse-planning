
var MemoryGUI = (function () {

	function GUI(container,game) { //begin ctor

		var len = game.size();

		if (typeof container === 'string') {
			container = document.getElementById(container);
		}


		var hideAt = function(where) {
			var cell = findCell(where);
			cell.classList.remove('faceup');
			cell.removeAttribute('value');
		}
		var removeAt = function(where) {
			var cell = findCell(where);
			cell.classList.add('missing')
		}
		var resetAt = function(where) {
			var cell = findCell(where);
			cell.classList.remove('faceup');
			cell.classList.remove('missing');
		}


		// public instance methods:
		this.reset = function() { //reset all cards (gui only)
			for (var where=0; where<len; ++where) {
				resetAt(where);
			}
		}
		this.show = function(where,what) {
			var cell = findCell(where);
			cell.setAttribute('value',what);
			//'value' attribute is used by CSS pseudo-class (faceup:before)
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

		makeGrid(container,len);
		makeReset(container,this.reset,game.reset);
	} // end ctor

	function makeID(where) {
		return 'cell'+where;
	}

	function findCell(where) {
		if (where instanceof HTMLElement)
			return where; //already a DOM element
		// else find it by id:
		return document.getElementById(makeID(where));
	}

	function makeCell(where,isFirstCol) {
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

	

	function makeGrid(container,len,cols) {
		if (!cols) cols = Math.ceil(Math.sqrt(len));
		for (var id=0; id<len; ++id) {
			var isFirstCol = (id%cols===0);
			container.appendChild(makeCell(id,isFirstCol));
		}
	}

	function makeReset(container,resetGui,resetGame) {
		var btn = document.createElement('button');
		btn.innerHTML = 'Reset';
		btn.id = 'resetBtn';
		var grid = document.getElementById('memorygame');
		grid.insertBefore(btn,grid.firstElementChild);
		btn.addEventListener('click',function() {//when clicked, reset both modules
			resetGui();
			resetGame();
		});
	}


	return GUI;
})();


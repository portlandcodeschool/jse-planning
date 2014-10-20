
var MemoryGUI = (function () {

	function GUI(len,clickFn,resetGameFn) { //begin ctor

		this.reset = function() { //reset gui only
			for (var where=0; where<len; ++where) {
				resetCell(findCell(where));
			}
		}

		var hide = function(where) {
			var cell = findCell(where);
			cell.classList.remove('faceup');
			cell.removeAttribute('value');
		}
		this.show = function(where,what) {
			var cell = findCell(where);
			cell.setAttribute('value',what);
			//'value' attribute is used by CSS pseudo-class (faceup:before)
			// to display the card face
			cell.classList.add('faceup');
		}
		var remove = function(where) {
			var cell = findCell(where);
			cell.classList.add('missing')
		}
		this.removeSoon = function(locs) {
			window.setTimeout(function() {
				locs.forEach(remove);
			}, 1000);
		}
		this.hideSoon = function(locs) {
			window.setTimeout(function() {
				locs.forEach(hide);
			}, 1000);
		}

		makeGrid(clickFn,len);
		makeReset(this.reset,resetGameFn);
	} // end ctor

	function makeID(where) {
		return 'cell'+where;
	}

	function findCell(where) {
		return document.getElementById(makeID(where));
	}

	function makeCell(where,isFirstCol,clickFn) {
		var cell = document.createElement('div');
		cell.id = makeID(where);
		cell.classList.add('memoryCell');
		if (isFirstCol)
			cell.classList.add('firstCol');
		// Each scope of makeCell is specific to one cell, so clickFn callback
		//  always gets corresponding where parameter:
		cell.addEventListener('click',function(){
			clickFn(where);
		});
		return cell;
	}

	function resetCell(cell) {
		cell.classList.remove('faceup');
		cell.classList.remove('missing');
	}

	function makeGrid(clickFn,len,cols) {
		if (!cols) cols = Math.ceil(Math.sqrt(len));
		var grid = document.getElementById('memorygame');
		for (var id=0; id<len; ++id) {
			var isFirstCol = (id%cols===0);
			grid.appendChild(makeCell(id,isFirstCol,clickFn));
		}
	}

	function makeReset(resetGui,resetGame) {
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

/* You can test your gui without a game module:
   just call the ctor directly with dummy args, like so:

var gui = new MemoryGUI( 16,
		function(i){console.log('clicking on '+i);},
		function(){console.log("resetting game")}
);

Then call its public methods:
gui.show(1,'test');
gui.show(2,'test');
gui.hideSoon([1,2]);
gui.removeSoon([1,2]);
//etc

*/


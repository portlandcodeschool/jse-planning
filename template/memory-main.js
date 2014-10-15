
var game,cards; //global makes debugging easier
function go() {
	cards = new MemoryCards();
	game  = new MemoryGame(MemoryGUI,cards);
}

window.addEventListener("load",go);

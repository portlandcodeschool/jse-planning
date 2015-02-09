
var game,cards; //global only for debugging
function go() {
	cards = new MemoryCards(10);
	game  = new MemoryGame(MemoryGUI,cards);// can add gameover callback if desired
}

window.addEventListener("load",go);

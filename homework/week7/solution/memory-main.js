var cards,game,gui; //global vars make debugging easier
function go() {
	// set global vars:
	cards = new AlphabetCards(8);//<--maybe add argument for some card sets
	game  = new MemoryGame(cards);
	gui   = new MemoryGUI('memorygame',game);
	game.gui(gui); // link game to gui

	// Optional: extra games on same page, just to prove they're independent:
	var cards2 = new AnimalCards(),
		game2  = new MemoryGame(cards2),
		gui2   = new MemoryGUI('memorygame2',game2);
	game2.gui(gui2); // link game2 to gui2

	var cards3 = new FoodCards(),
		game3  = new MemoryGame(cards3),
		gui3   = new MemoryGUI('memorygame3',game3);
	game3.gui(gui3); // link game2 to gui2

}

window.addEventListener("load",go);

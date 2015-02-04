
var deckOfCards = makeDeque(makeCard.fullSet);


deckOfCards.map(function(card) {
	card.renderText('people-names');
});

deckOfCards.shuffle();

function renderTextBox(item,container) {
	item.renderText(container);
}
function renderImage(item,container) {
	item.renderImage(container);
}

function drawStuff() {
	deckOfCards.render('card-names', renderTextBox);
	deckOfCards.render('card-images', renderImage);
}


//wait until everything is loaded before rendering:
window.onload = drawStuff;

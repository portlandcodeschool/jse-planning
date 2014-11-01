var MemoryGame = (function() { //begin game IIFE

var MemoryCardModel = Backbone.Model.extend({
    defaults: {status:'facedown'}
});

var MemoryCollection = Backbone.Collection.extend({
  model: MemoryCardModel,
});




// Ctor:
function MemoryGame(cardset) {
  var match = cardset.match;
  var display= cardset.display;
  var values = cardset.values;

  var there=false; //location of faceup card, if any
  
  var collection = this.cards = new MemoryCollection(); //empty collection
  collection.add(_.shuffle(values));

  this.length = values.length;

  this.reset = function() {
    collection.reset(collection.shuffle());
    collection.models.forEach(function(model) {model.set(model.defaults)});
    
  }


  this.lift=function(here) { //here should be a number
    if (there === here) return false;
    var modelHere = collection.at(here);
    var modelThere= collection.at(there);//maybe undefined
    if (modelHere.get('status') !== 'facedown') return false;

    if (typeof modelThere !== 'object') {
    // no current face-up
        there = here;
        modelHere.set('status','faceup');
    } else {
        if (match(modelHere,modelThere)) {// matches face-up
            modelHere.set('status','matched');
            modelThere.set('status','matched');
            if (this.gui) {
                this.gui.removeSoon([here,there]);
            }
        } else {// no match
            modelThere.set('status','facedown');
            if (this.gui) {
                this.gui.hideSoon([here,there]);
            }
        }
        there = false;
    }
    var faceVal = display(modelHere);
    if (this.gui)
        this.gui.show(here,faceVal);
    return faceVal;
  };
  
  this.coll = collection;
  
}; // end ctor

return MemoryGame;
})(); //end game IIFE



var cards = null, gui = null, game = null;  //global for debugging
$(function() {
    cards = new MemoryCards();
    game = new MemoryGame(cards);
    
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});



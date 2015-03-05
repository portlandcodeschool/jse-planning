var MemoryGame = (function() { //begin game IIFE

var MemoryCollection = Backbone.Collection.extend({});

// Ctor:
function MemoryGame(Model,len) {
  var match = Model.match;
  var display= Model.display;
  
  var there=false; //location of faceup card, if any
  
  var collection = new MemoryCollection(); //empty collection
  collection.model = Model;
  collection.add(_.shuffle(Model.values(len)));

  this.length = collection.length;

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



var gui = null, game = null;  //global for debugging
$(function() {
    game = new MemoryGame(TestCardModel,12);
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});



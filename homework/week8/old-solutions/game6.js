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

    var faceVal = display(modelHere);
    // Create options/details objects which can be sent to change-event handler
    //  (along with the model and new status):
    var detailsHere = {where:here, what:faceVal};
    var detailsThere= {where:there};
    
    // trigger "show now" action in gui:
    modelHere.set({status:'faceup'},detailsHere);
    // 'faceup' status may be replaced below by 'matched' or 'facedown'

    if (typeof modelThere !== 'object') {
    // no current face-up
        there = here;
    } else {
        if (match(modelHere,modelThere)) {// matches face-up
            // these each trigger "remove soon" action in gui:
            modelHere.set({status:'matched'},detailsHere);
            modelThere.set({status:'matched'},detailsThere);
        } else {// no match
            // these each trigger "hide soon" action in gui:
            modelHere.set({status:'facedown'},detailsHere);
            modelThere.set({status:'facedown'},detailsThere);
        }
        there = false;
    }
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



UNFINISHED_TEMPLATE //delete me

var MemoryGame = (function() { //begin game IIFE

var MemoryCollection = Backbone.Collection.extend({});//<--NO MODEL HERE

// Ctor:
function MemoryGame(Model,len) { //<-- CHANGED
  //...
  
  this.length //= something;

  this.reset = function() {
        //...
  }

  this.lift=function(here) { //here should be a number
    // lift will include these somewhere:
    if (this.gui)
        this.gui.removeSoon([here,there]);
    //...
    if (this.gui)
        this.gui.hideSoon([here,there]);
    //...
    if (this.gui)
        this.gui.show(here,faceVal);
    //...
  };
    
}; // end ctor

return MemoryGame;
})(); //end game IIFE



var gui = null, game = null;  //global for debugging
$(function() {
    game = new MemoryGame(TestCardModel,12); //<-- CHANGED
	gui = new MemoryGUI(game); //make a gui
    game.gui = gui; //attach gui to game/collection
});



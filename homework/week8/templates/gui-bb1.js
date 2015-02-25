
var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        // opts should also contain an id...
    },
    // Each view should respond to a click with this method:
    lift: function() {
        this.game.lift(/*something*/);
    }
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
    },
    remove: function() { //remove as matched
    },
    hide: function() { //turn face-down
    },
    reset: function() { //return to starting state
    }
});

var  GridView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new div

    initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews

        //loop... {
            // generate each subview:
            var card = new CardView({
                //pass some options downward:
                game: opts.game,
                //...
            });
            this.cardviews.push(card);
            // connect card's element to DOM;
            // i.e. attach card.el to this.el
            // ...
        //}
    },

    reset: function() {
        //loop over all card views to reset them
        //...
    }
    
});

var MainView = Backbone.View.extend({
    events: {
        // define click on reset button
        'click #resetBtn': 'resetAll'
    },
    //...
    initialize: function(opts) {
        //opts should include el and game
        this.game = opts.game;
        this.gridview = new GridView({
            //pass some options downward:
            game:opts.game,
            //...
        });
        // attach gridview.el below this.el
        //...

        // create and attach a reset button:
        //...
    },
    
    resetAll: function() {
        this.game.reset();
        this.gridview.reset();
    }
});

// Ctor for master gui object:
function GUI(container,game) {

    // Generate all views:
    this.mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });

    // These methods will be called by game;
    // figure out how they should delegate any
    // re-rendering to various subviews
    this.show = function(where,what) {
    //...
    }
    this.hideSoon = function(locs) {
    //...
    }
    this.removeSoon = function(locs) {
    //...
    }
}

return GUI;

})(); //end GUI IIFE

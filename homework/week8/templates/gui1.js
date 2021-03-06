
var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new el
    events: {
        'click': 'liftMe'
    },
    
    initialize: function(opts) {
        // Each subview view will have a reference
        // to gui, the topmost object in the GUI module.
        this.gui = opts.gui;  //receive custom option
        // opts should also contain an id...
    },
    // Each view should respond to a click with this method:
    liftMe: function() {
        // let master gui object decide what to do,
        // but send this view as a parameter
        this.gui.liftCard(this);
    }
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
    },
    remove: function() { //remove as matched
    },
    hide: function() { //turn face-down
    },
    reset: function() { //ensure starting state
    }
});

var  GridView = Backbone.View.extend({
    tagName: 'div', //use this tag to make a new div

    initialize: function(opts) {
        this.gui = opts.gui;//
        this.cardviews = []; // grid's subviews

        //loop {
            // within loop, generate each subview:
            var card = new CardView({
                //pass some options downward:
                gui: opts.gui,
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
    }
    
});

var MainView = Backbone.View.extend({
    events: {
        // define click on reset button
        'click #resetBtn': 'resetAll'
    },
    //...
    initialize: function(opts) {
        //opts should include el and gui
        this.gui = opts.gui;
        this.gridview = new GridView({
            //pass some options downward:
            gui:opts.gui,
            //...
        });
        // create and attach a reset button:
        //...
    },
    
    resetAll: function() {
        this.gui.game().reset();
        this.gridview.reset();
    }
});

// Ctor for master gui object:
function GUI(container,game) {

    this.game = function() {
        return game;
    }

    // All gui views will have a reference to
    // this master gui object, which will communicate
    // with game.
    this.size = function() {
        return game.size();
    }
    this.liftCard = function(cardview) {
        //do sth with cardview and call game.lift()
        //...
    }

    // Generate all views:
    this.mainview = new MainView({
        el:container,
        gui:this
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

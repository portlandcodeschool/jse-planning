UNFINISHED_TEMPLATE // delete me

var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    events: {},
    //...
    initialize: function(opts) {
    },
    show: function(what) {
    },
    remove: function() {
    },
    hide: function() {
    },
    reset: function() {
    }
});

var  GridView = Backbone.View.extend({
    //...

    initialize: function(opts) {
        this.cards = []; // grid's subviews
    //...
    },
    
});

var MainView = Backbone.View.extend({
    el:'#memorygame',
    events: {},
    //...
    initialize: function(opts) {
        this.gridview = new GridView(opts);
        //...
    },
    
    resetAll: function() {
        this.game.reset();
        this.reset(); // or something
    }
});

function GUI(game) { //ctor
    if (arguments.length===3) //make back-compatible w. HW7
        game = {length:arguments[0], lift:arguments[1], reset:arguments[2]};
    this.game = game;

    //...

    this.mainview = new MainView({game:game});

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

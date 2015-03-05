
var MemoryGUI = (function() { // begin IIFE

var CardView = Backbone.View.extend({
    //tagName: 'div', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    className: 'memorycell',
    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        this.where= opts.where;
        // opts should also contain an id...
        if (opts.isFirstCol)
            this.$el.addClass('firstcol');
    },
    // Each view should respond to a click with this method:
    lift: function() {
        this.game.lift(this.where);
    },
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
        this.$el.attr('value',what)
                .addClass('faceup');
    },
    remove: function() { //remove as matched
        this.$el.addClass('missing');
    },
    hide: function() { //turn face-down
        this.$el.removeClass('faceup');
    },
    reset: function() { //return to starting state
        this.$el.removeClass('faceup')
                .removeClass('missing');
    }
});

var  GridView = Backbone.View.extend({
    //tagName: 'span', //use this tag to make a new div
    className:'memorygrid',

    initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews
        var len = this.game.size(),
            cols = Math.ceil(Math.sqrt(len));
            
        for (var i=0; i<len; ++i) {
            // generate each subview:
            var card = new CardView({
                //pass some options downward:
                game: opts.game,
                where: i,
                isFirstCol: (i%cols===0)
            });
            this.cardviews.push(card);
            // connect card's element to DOM;
            // i.e. attach card.el to this.el
            this.$el.append(card.el);
        }
    },

    reset: function() {
        //loop over all card views to reset them
        this.cardviews.forEach(function(view){
            view.reset();
        })
    }
    
});

var MainView = Backbone.View.extend({
    events: {
        // define click on reset button
        'click .resetBtn': 'resetAll'
    },
    //className:'memorygrid',

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
        this.$el.append(this.gridview.$el);

        // create and attach a reset button:
        $('<button>').html('Reset')
                    .addClass('resetBtn')
                    .prependTo(this.gridview.$el);
    },
    
    resetAll: function() {
        this.game.reset();
        this.gridview.reset();
    }
});

// Ctor for master gui object:
function GUI(container,game) {
    game.gui(this);
    // ensure that a string container begins with '#'
        if (typeof container === 'string')
            if (container[0] !== '#')
                container = '#' + container;


    // Generate all views:
    var mainview =
    this.mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });

    function findCardView(where) {
        return mainview.gridview.cardviews[where];
    }
    function hideAt(where) {
        findCardView(where).hide();
    }
    function removeAt(where) {
        findCardView(where).remove();
    }
    // These methods will be called by game;
    // figure out how they should delegate any
    // re-rendering to various subviews
    this.show = function(where,what) {
        findCardView(where).show(what);
    }
    this.hideSoon = function(locs) {
        window.setTimeout(function() {
            locs.forEach(hideAt);
        }, 1000);
    }
    this.removeSoon = function(locs) {
        window.setTimeout(function() {
            locs.forEach(removeAt);
        }, 1000);
    }
}

return GUI;

})(); //end GUI IIFE

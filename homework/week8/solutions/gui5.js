
var MemoryGUI = (function() { // begin IIFE

//  Define specialized Backbone views...

var CardView = Backbone.View.extend({

  tagName: 'div', // create new div element for each view
  events: {
    'click': 'liftMe' // respond to clicks with tryLift method
  },
  
  initialize: function(opts) { //opts contains game,n, and maybe className
    // className, if included, is picked up automatically
    this.game = opts.game;
    this.n = opts.n;
    this.$el.addClass('memoryCell');
    this.$el.appendTo('#memorygrid');
  },

  liftMe: function() {
    this.game.lift(this.n); // defers to game to decide result;
                            // eventually gets replay of show, hide,or remove
  },

  // Change appearance of this card view:
  show: function(what) {
    this.$el.attr('value',what); // store what is attribute for CSS pseudo-element to read
    this.$el.addClass('faceup'); // CSS pseudo-element to show card face (what)
  },
  remove: function() {
    this.$el.addClass('missing');
  },
  hide: function() {
    this.$el.removeClass('faceup');
  },
  reset: function() {
    this.$el.removeClass('faceup').removeClass('missing');
  }
});

var  GridView = Backbone.View.extend({
	el:'#memorygrid', // div #memorygrid is created in html, so just attach view to it

	initialize: function(opts) { // opts is {game:game}
        // create personal properties:
        this.game = opts.game;
        this.cards = []; // grid's subviews
        
        // Generate all a subview for each card in game:
        var len = this.game.length;
		var cols = Math.ceil(Math.sqrt(len));
		for (var n=0; n<len; ++n) {
            // rebuild options object:
            opts = {game:this.game, n:n};
            if (!(n%cols))
                opts.className = 'firstCol';
            this.cards.push(new CardView(opts)); //make one subview and save it
		}
    },
    
    show: function(where,what) { // where is #, what is card face value (usually string)
        // Show one subview...
        this.cards[where].show(what); // delegate to card view at where
    },

    doSoon: function(locs,methodName) {// locs is an array of #s; methodName is 'hide' or 'remove'
    // In a little while, call the hide() or remove() method for each card subview in locs...
    // (This could also be split into two separate methods (hideSoon, removeSoon))

        var cards=this.cards; //retain this.cards as variable so that it's available to forEach callback below
        window.setTimeout(function () { // after a delay...
            locs.forEach(function(loc) { // for each location...
                // forEach doesn't set 'this', so needs var 'cards' from closure:
                cards[loc][methodName]();// use appropriate method of appropriate card view
            });
        }, 1000); // 1 second delay
    },
    
    reset: function() {
        // reset all card views...
        this.cards.forEach(function(cardview) {cardview.reset()});
    }
});

var MainView = Backbone.View.extend({
    el:'#memorygame', // div #memorygame is created in html, so just attach view to it
    events: {
        'click .resetBtn': 'resetAll' //define click for reset button
        },
    initialize: function(opts) { // opts is {game:game}
        // give mainview links to game and gridview:
        this.game = opts.game;
        this.gridview = new GridView(opts); //make subviews, passing opts downward
        // create and attach reset button:
        $('<button>Reset</button>').addClass('resetBtn').appendTo(this.$el);
    },
    resetAll: function() { //when reset button is clicked:
        this.game.reset();
        this.gridview.reset();
    }
});

function GUI(game) { //ctor
    if (arguments.length===3) //make backward compatible w. 3-arg version...
        game = {length:arguments[0], lift:arguments[1], reset:arguments[2]};

    // give GUI links to related objects: game, mainview, gridview:
    this.game = game;
    this.mainview = new MainView({game:game}); //makes all views
    var gridview = this.gridview = this.mainview.gridview;

    // Replace gui's public methods with event handlers...

    // Attach to game's collection (the object which triggers the events)
    // some event handlers which call gridview's methods.
    // (These listeners could also be attached from within
    //   gridview's initialize method)
        
    // Use either of two forms:
    // A: "other.on(bindings...)", or
    // B: "object.listenTo(other,bindings...)

    //game.coll.on({ // form A
    gridview.listenTo(game.coll, { // form B
        'removeSoon':function(opts) {
            // 'this' has no referent here; use gridview instead:
            gridview.doSoon(opts.where,'remove');
        },
        'hideSoon':function(opts) {
            gridview.doSoon(opts.where,'hide');
        },
        'show':function(opts) {
            gridview.show(opts.where, opts.what);
        }});
}

return GUI;

})(); //end GUI IIFE

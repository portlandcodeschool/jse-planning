### Homework 8

Due Mon. 3/2


Reimplement your GUI module using nested Backbone views.  This replacement GUI module will be (initially) interchangeable with the old one; it should work with your existing _game_ and _card_ modules.  Start with [this template](templates/gui-bb1.js).

This GUI should have three classes of view, each a subclass of Backbone.View:

- The _MainView_, attached to the DOM element '#memorygame', will be responsible for rendering all parts of the game (mostly by delegating to its child views).  It should contain a _GridView_ instance and a _Reset_ button (which can have its own view or not, as you choose).

- The _GridView_, attached to a new `_div_` within '#memorygame', will be responsible for rendering all the cards (mostly by delegating to each of them).

- Each _CardView_, attached to an _div_ somewhere below #memorygame, will be responsible for rendering and controlling one card.

Your master object _gui_ can be built with an ordinary constructor _MemoryGUI_, as before, but it should contain the _MainView_ instance as a property named _mainview_.  The _mainview_ should contain the _GridView_ instance in a property _gridview_.  And _gridview_ should have an array _cardviews_ holding all of the _CardView_s.  Those links let you delegate action downward.

Your _gui_ instance should have three public methods as before:
- show(where,what)
- hideSoon(locs)
- removeSoon(locs)

For each method, have _gui_ re-render only the necessary card views.  Each card view should have a method to _show_, _hide_, _remove_, and _reset_ itself.

As before, your main constructor _MemoryGUI_ should expect two parameters:
- _container_ will be a DOM object or an "#id" string; your Mainview should use _container_ for its _el_.
- _game_ will be the game instance.  Each view within the GUI should have a reference to it, so pass that _game_ object as an instance option to the views at all levels.

Each of your card views should respond to a click by calling _game.lift(num)_ with a different integer _num_ for each card view.

Similarly, your _mainview_ should respond to a Reset-button click by resetting both game (via _game.reset()_) and gui views.

The architecture of the finished application is summarized in the figure below:

![](http://portlandcodeschool.github.io/jse-win15-8/memory-backbone.svg)


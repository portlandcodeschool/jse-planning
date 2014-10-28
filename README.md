### Homework 8
Due Mon. 11/3

*Rewrite your memory game using backbone!*

The steps below will guide your through the transition.  They assume that you have a working version of each of the three modules (cards, game, gui) from Homework 7.  You may adopt the HW7 solutions to any or all of them.
Regardless of which code you start with, it would be wise to start with the new template file for each, and import older code only as needed.

---
_ **0)** VOTE!  Mail that ballot today!_

---
**1)**
Reimplement your GUI module using nested Backbone views.  This replacement GUI module will be (initially) interchangeable with the old one; it should work with your existing _game_ and _card_ modules.  Start with [this template](templates/gui1.js).

This GUI should have three classes of view, each a subclass of Backbone.View:

- The _MainView_, attached to the DOM element '#memorygame', will be responsible for rendering all parts of the game (mostly by delegating to its cchild views).  It should contain the _GridView_ and your _Reset_ button (which can have its own view or not, as you choose).

- The _GridView_, attached to the DOM element "#memorygrid", will be responsible for rendering all the cards (mostly by delegating to each of them).

- Each _CardView_, attached to an element (_div_ or _td_) somewhere below _#memorygrid, will be responsible for rendering and controlling one card.

Your master object _gui_ can be built with an ordinary constructor _MemoryGUI_, as before, but it should contain the _MainView_ instance as a property named _mainview_.  The _mainview_ should contain the _GridView_ instance in a property _gridview_.  And _gridview_ should have an array _cards_ holding all of the _CardView_s.  Those links let you delegate action downward.

Your _gui_ instance should have three public methods as before:
- show(where,what)
- hideSoon(locs)
- removeSoon(locs)

For each method, have _gui_ re-render only the necessary card views.  Each card view should have a method to _show_, _hide_, and _remove_ itself.

Your main constructor _MemoryGUI_ should expect a single parameter _game_, but it should also be back-compatible with the Homework 7 version, accepting three parameters (_length_, _clickFn_, _resetGameFn_).  If it receives three parameters, wrap them together into a _game_ object.  It it receives only one parameter, use that as the _game_ and assume it already has the three properties: _length_, _lift_, and _reset_.  Either way, pass that _game_ object to all views so that any level can refer to it.

Each of your card views should respond to a click by calling _game.lift(num)_ with a different integer _num_ for each card view.

Similarly, your _mainview_ should respond to a Reset-button click by resetting both game (via _game.reset()_) and gui views.

Debug your Backbone gui by creating an instance of it manually, with a dummy game, like so:
```
var dummygame = {
    length: 16, // or whatever
    lift:  function(n) { console.log('lifting '+n);},
    reset: function()  { console.log('resetting game');}
};
var gui = new MemoryGUI(dummygame);
```
Even with a dummy game, you should be able to call _gui.show()_, _gui.hideSoon()_, and _gui.removeSoon()_ to see the views changing the display.
When all that appears to work, try combining your new gui with the Homework 7
 [game](templates/old-game.js) and [card](templates/old-cards.js) module:

```
var cards = new MemoryCards();
var game =  new MemoryGame(MemoryGUI, cards);
```
The _game_ instance will use your new MemoryGUI constructor to make an instance of your Backbone gui, using its own length, lift, and reset properties.
Now your gui should be playable exactly like last week, but now displayed using Backbone!

If you get completely stuck on this phase, you may adopt [this solution](solutions/gui1.js) and move to the next phase.

---

**2)**
Replace your old cardset module (e.g. [the one](templates/old-cards.js)) with [this one](templates/cards1.js).  It contains a tiny demo cardset which is compatible with both the old game module and the new one you're about to write.

Combine your old game or [this one](templates/old-game.js) with the new cards and new gui, and test drive it.

---

**3)**
Replace your old game module with a new Backone one, starting with [this template](templates/game1.js).

Instead of storing an array of cards, your new game should them as Models in a Collection.

Your new MemoryGame constructor should receive a parameter _cardset_ and build a _game_ instance which has a property _cards_, a Backbone collection of class _MemoryCollection_.

Your _game_ instance also needs three properties:
- _length_: the collection size;
- _lift(where)_: a method with the same logic as before, expecting integer _where_;
- _reset()_: a method which resets the game and its collection (but not _gui_) to their starting state, newly shuffled.

---

**4)**
Convert the card set to a Backbone Model subclass.  There need to be changes in both the game and cards modules, but the [cards module](templates/cards2.js) is already written for you.
Note that it replaces the array property _values_ with a method _values(len)_, which will return a varying number of values depending on _len_.

Rewrite the game module to use this new card module.
(Hint: the collection class won't know what model to use until you pass it as an argument to the game constructor.)

---

**5)**
Replace the game's calls to _gui.show()_, _gui.hideSoon()_, and _gui.removeSoon()_ with three custom events triggered from those positions.  _Hint: you'll need something like `collection.trigger('revealCard',detailsObj)`._

In the gui, add an event listener for each of those three events which calls the appropriate gui method.

Notice that in this solution, _game_ doesn't need to know about _gui_ at all; it just broadcasts events and hopes that someone is listening.

---
**6)**
Omit the explicit triggers when _lift_ changes the card models.  Instead, make an event listener in the _gui_ which will detect the 'change' events automatically emitted by the collection.  The _gui_ will have to decide what kind of update to do depending on how the models change their _status_ attribute.

Your event listener can receive the changed model easily, but it will be more difficult to decide which view needs updating.  There are multiple solutions, but none are trivial.  Explore!


### Homework 7
Due  Mon. Feb. 23

---

Write a single-page browser application by adding a graphical interface to your Memory game engine from homework #6.  Your application should comprise three modules, each in an IIFE in separate files:

* The _game_ module (a.k.a. the "Model") is responsible for maintaining the state and rules of a game. It has an API (command-line interface) but otherwise has no commitment to any graphical representation nor any particular set of cards.
If you've written a Memory engine already, your game module is nearly finished.  
If you're close to completing your own version, please do so.  But if not, for this exercise you may adopt the one in the Homework 6 solutions and modify it as directed below.

* The _GUI_ module (a.k.a. the "View") knows nothing about the logical structure or rules of the game, but it knows how to draw it in the browser and how to initiate action with clicks.
The _GUI_ includes both a _.js_ and a _.css_ file which work together and share the same assumptions about the interface.

* The _cards_ module specifies the game's content: the values and pairings of the memory cards.  Some card sets (e.g. images instead of text) will require a specialized GUI. 

The body of your application will be a single HTML file which imports the three modules and ties them together in a [main file](template/memory-main.js).

The following steps will help guide you through the development of the GUI, but you don't need to provide answers along the way.
You may develop your GUI by any process you like, as long as it has the API (i.e. set of public methods) outlined in the [template file](template/memory-gui.js).

---
**a)** Modify your MemoryGame constructor by adding two new instance methods:

- size(): A getter function, returning the total number of cards used in the current game.

- gui(useGui): A combined setter and getter function.  If parameter _useGui_ is an object, the game instance remembers that object as its _gui_, and sends it various updates as the game proceeds.  If _useGui_ is undefined, the function acts as a getter, returning whatever object was previously set the as _gui_.


---
**b)**  In the GUI's IIFE, write a constructor _MemoryGUI(container, game)_.  
The first parameter _container_ should be either a DOM element or the id of one, and tells the GUI instance where in the document to render the interface.
The second parameter _game_ should be an instance of MemoryGame; the GUI instance will remember that object as its game model, which represents the game's status.

When the GUI instance is created, it can call `game.size()` to decide how many cards to draw.  Arrange the cards in an approximately-square grid of cells.  You many use a `<table>` or a series of `<div>`s.  Each cell should have a unique id which maps onto a number, the position of the corresponding card in your game model.  Place the grid within _container_.   The [html file template](template/memory.html) defines a `<div>` labeled 'memorygame' which could be used as the GUI's _container_.

The GUI instance should immediately render the game's starting state, with all cards face down.  But any updates will be driven by the _game_; the GUI just waits for _game_ to call its various rendering methods.

---
**c)**  Make each grid cell clickable.  When a cell with an id like 'idN' (for some number N) is clicked, it should call `game.lift(N)`, which attempts a change to the game state.  If the lift is successful (which _game_ decides), _game_ will call one or more of _gui_'s rendering methods to update the display.

Before you implement the rendering updates below, debug your clicking mechanism by providing a ["dummy" game](template/dummy-game.js) which merely reports any `lift()` calls from _gui_.

---
**d)**  Each card on the board can be in one of three states: face-down, face-up, and matched (possibly removed or hidden, depending on how you want your interface to look).
For each state, define a CSS class to display a card in that state.  The body of each card can be either the grid cell itself or another element within it.

---
**e)** Give your GUI instance three rendering methods, one for each state above:

- `show(where,value)`: turn one card (at position _where_) face-up immediately.  The display value of that card (according to the game model) will be provided as parameter _value_.

- `hideSoon(whereArray)`: turn some cards (at positions listed in _whereArray_) face-down, but only after some time (or triggering event) decided by your GUI.
(Hint: you might want to use `window.setTimeout`).

- `removeSoon(whereArray)`: turn some cards (at positions listed in _whereArray_) into the _matched_ state, but only after a delay decided by your GUI.

---
**f)** Write another method of GUI:
- `reset()`: set the state of all cards to face-down, restoring the initial display.

Then add a Reset button to your interface, implemented and styled any way you like.  When pushed, it should reset both GUI and game (by calling `game.reset()`).

At this point, you should be able to debug your GUI by manually simulating the game from the console, driving the GUI through its four public methods.

---
**g)** Modify your MemoryGame module again to make use of the _gui_ object which can be set by calling `gui(useGui)`.  If the game has no _gui_ object, it should run as before with no interface, just returning values from its various methods.  But if it does have a _gui_ object, the game should tell _gui_ to update itself whenever a call to `lift()` changes the game's state.

Modify the game's _lift_ method to, if it has a _gui_, call one or more of _gui_'s rendering methods: _show_, _hideSoon_, and _removeSoon_.

- Always `show(where,value)` the lifted card, providing its position _where_ and display string _value_ as arguments.

- In addition, if the lifted card is the second to be turned face-up, call `removeSoon([old,new])` if the face-up cards at positions _old_ and _new_ match, or `hideSoon([old,new])` if they don't.

Although the _gui_ will introduce a delay in removing or hiding the displayed cards, the game can change its state immediately to be ready for another lift.

Now you can integrate your modules, using a real game instance with your GUI.  You should now be able to play the game through the GUI interface.

---
**h)** Improve whatever card set you've been using, either the simple ones from the [template](template/cardset-example.js) or a custom set you've written.
Be as creative as you like.  For the card values, you can use strings, numbers, or objects (which are matched according to some common property and converted to a string using the cardset's `display()` method).  If you want your GUI to display images instead of strings, the `display()` method could return an image URL for the GUI to render.

Have fun!



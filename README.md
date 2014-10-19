### Homework 7
Due  Mon. Oct. 20

---

Write a single-page browser game by adding a graphical interface to your Memory game engine from homework #6.  Your application should comprise three modules, each in an IIFE in separate files:

* The _game_ module (a.k.a. the "Model") is responsible for maintaining the state and rules of a game. It has an API (command-line interface) but otherwise has no commitment to any graphical representation nor any particular set of cards.
If you've written a Memory engine already, your game module is nearly finished.  
If you're close to completing your own version, please do so.  But if not, for this exercise you may adopt the one in the Homework 6 solutions and modify it as directed below.

* The _GUI_ module (a.k.a. the "View") knows nothing about the logical structure or rules of the game, but it knows how to draw it in the browser and how to initiate action with clicks.
The _GUI_ includes both a _.js_ and a _.css_ file which work together and share the same assumptions about the interface.

* The _cards_ module specifies the game's content: the values and pairings of the memory cards.  Some card sets (e.g. images instead of text) will require a specialized GUI. 

The body of your application will be a single HTML file which imports the modules and ties them together in a [main file](template/memory-main.js).

The following steps will help guide you through the development of the GUI, but you don't need to provide answers along the way.
You may develop your GUI by any process you like, as long as it has the public interface outlined in the [template file](template/memory-gui.js).

---
**a)**  In the GUI's IIFE, write a constructor _MemoryGUI_.  The first parameter of the constructor should be the size of the game (the number of cards on the initial board).  Assume the cards will be arranged in grid approximately square.

Generate a grid of cells, one per card.  You many use a `<table>` or a series of `<div>`s.  Each cell should have a unique id which maps onto a number, the position of the corresponding card in your game model.  Place the grid within the DOM element with id 'memorygame' (defined in the [html file](template/memory.html)).

---
**b)**  Make each cell clickable.  Pass a second argument to _MemoryGUI_: a callback of one parameter which defines an action to take when a square is clicked.  Eventually, this callback will trigger your model's _lift_ function, but for now it may be a test function.
Add an event listener to each cell which calls the callback, passing in the square's id, whenever you click it.

---
**c)**  Each card on the board can be in one of three states: face-down, face-up, and matched (possibly removed or hidden, depending on how you want your interface to look).
For each state, define a CSS class to display a card in that state.  The body of each card can be either the grid cell itself or another element within it.

---
**d)** Give your GUI three public methods, one for each state:

- `show(where,value)`: turn one card (at position _where_) face-up immediately.  The display value of that card (according to the game model) will be provided as parameter _value_.

- `hideSoon(whereArray)`: turn some cards (at positions listed in _whereArray_) face-down, but only after some time (or triggering event) decided by your GUI.
(Hint: you might want to use `window.setTimeout`).

- `removeSoon(whereArray)`: turn some cards (at positions listed in _whereArray_) into the _matched_ state, but only after a delay decided by your GUI.

---
**e)** Write another public method of GUI:
- `reset()`: set the state of all cards to face-down, restoring the initial display.

Add to _MemoryGUI_ another parameter _resetGameFn_, a callback which will reset the game module.  Then add a Reset button to your interface, implemented and styled any way you like.  When pushed, it should reset both game and GUI.

At this point, you should be able to debug your GUI by manually simulating the game from the console, driving the GUI through its four public methods.

---
**f)** Integrate your modules!  Modify your game module slightly:

-  Insert a parameter _GuiCtor_ to your game constructor (MemoryGame) in the first position.  If it's null, your game should run just as before with no interface.  Otherwise, it should be your new MemoryGui constructor, and your game instance should use it to make a corresponding GUI instance.
Save the GUI instance as a variable or property available to your game; you'll keep using it.  When you call the MemoryGui constructor, remember that you need to provide arguments: number of cards, a click callback, and a reset callback.

- Additionally, whenever a card is flipped, you game needs to tell the GUI (if there is one) to update itself.  Each _lift_ action will need to call one of GUI's public methods.

---
**g)** Design and implement a card set!  Be as creative as you like.  For the card values, you can use strings, numbers, or objects (which are matched according to some common property and converted to a simple value using a display callback).
You can use ordinary playing cards or Tarot cards or something else.  You can use their full name or an abbreviated name, or URLs for images.

Organize the code for generating your card set, its _match_ function, and any _display_ function into another IIFE in a third file (_memory-cards.js_).  This IIFE should define a constructor _MemoryCards_, and calling that constructor (possibly with some parameters) should produce an instance object with three properties:

 - an array _values_ containing the raw data (object or primitive) for each card;
 - a method _match(a,b)_ which compares two values;
 - a method _display(val)_ (possibly undefined) which converts a raw value to a display-able one.

Change the parameters of your MemoryGame constructor to accept only the MemoryGui constructor and a MemoryCards instance, and extract its three properties as needed.

You may extrapolate from [this example](template/memory-cards.js).

Have fun!

### Homework #6

_Due Mon. Feb.16_

####Synopsis

- **Problem 1:** Constructor Basics _[10% of total time]_ **Goals:** Practice the fundamentals of constructors and prototypes.
- **Problem 2:** Imaginary Menagerie _[15%]_ **Goals:** Practice simple inheritance and subclassing.
- **Problem 3:** Cards Finale _[25%]_ **Goals:** Convert your card factory into a constructor, then connect it to a specialize subclass of Cards.
- **Problem 4:** Memory Game Engine _[50%]_ **Goals:** Integrate several past lessons by using separate modules to implement the first stage of a browser-based memory game.  You'll keep building more in future weeks, so this problem is the most important. 

---

 **1)  Constructor basics** _[10%]_

**a)** Here's a sequence of simple exercises related to how constructors and prototypes work.

-   First make a constructor named _Ctor_ for an object that has properties _a_ and _b_ and initializes them to 0 and 1 respectively.
-   Now, make two objects named _obj1_ and _obj2_ using _Ctor_.
-   Now make a new object _obj3_ this way:
    ```
    var obj3 = {};
    Ctor.call(obj3);
    ```

    and check its properties.
-   Next, add a property _c_ to _obj1_ with a value of 2.  What will be the value of _obj2.c_?
-   Now, add a property _d_ with the value 3 to _obj1_'s "proto" (the object which helps out when _obj1_ can't do something by itself).  Remember that there are at least four ways of referring to that proto object.
-   What are the values of _obj1.d_, _obj2.d_, and _obj3.d_? Can you explain the results?


**b)** Consider this code:

```
function A() {};
//set default values for instances of A:
A.prototype = {num:0, str:'default'};
var objA = new A();

function B() {};
// set default values for instances of B:
B.prototype.num = 0;
B.prototype.str = 'default';
var objB = new B();
```

There is a difference between the behaviors of `objA` and `objB`!  Explain.

---

**2) Imaginary Menagerie** _[15%]_

**a)** Implement a simple taxonomy of four related classes, using a constructor for each:

- _Animal_: every instance of an Animal should inherit a method called _move()_.  For basic animals, this just returns the string "walk".
- _Bird_: A subclass of Animal.  Every Bird instance should return "fly" instead of "walk" when asked to _move()_.  All Birds also have a property _hasWings_ which is true.
- _Fish_: Another subclass of Animal.  A Fish instance will "swim" instead of "walk".
- _Penguin_: A subclass of Bird.  Penguins cannot fly and they should move like Fish.

Every instance of Animal and its subclasses should also have a personal _name_ property which is not inherited.  It should be set only within the constructor Animal, and each subclass should each ensure that its own constructor calls its superclass constructor as an initializer.

You should see these behaviors:
```
new Animal("Simba").move();// 'walk'
new Fish("Nemo").move();// 'swim'
new Bird("Lulu").move();// 'fly'
var pengo = new Penguin("Pengo");
pengo.name;     // "Pengo"
pengo.move();   //'swim'
pengo.hasWings; //true;
pengo instanceof Penguin; //true
pengo instanceof Bird; 	  //true
pengo instanceof Animal;  //true
```

**b)** Create a class _Egg_, whose instances have one method, _hatch(name)_, which returns a new instance (named _name_) of the same species which laid the egg.
Assume that every Animal can lay an egg with an instance method _layEgg()_ which creates a new Egg instance.
Try to solve this without subclassing Egg and without implementing _layEgg_ and _hatch_ more than once.

You should see this behavior:
```
var pengo = new Penguin("Pengo");
var egg = pengo.layEgg();
egg.constructor === Egg; //true
var baby = egg.hatch("Penglet");
baby instanceof Penguin; //true

var nemo = new Fish("Nemo");
egg = nemo.layEgg();
egg.constructor === Egg; //true
baby = egg.hatch("Nemolet");
baby instanceof Fish; //true
```

---
**3) Cards Finale** _[25%]_

**a)**
Rewrite your _makeCard_ factory as a constructor _Card_.  You should define your constructor and any supplementary code inside an IIFE and export it to a global variable _Card_.

_Card_ should initialize card objects which have the same four instance methods as before (`rank()`, `suit()`, `color()`, and `name()`), plus another method `isValid()`, which returns _true_ if the card has a valid id.
Implement each of those instance methods using _Card_'s prototype instead of linking them to each card.  Make sure each method uses `this` to refer to the card instance.

_Card_ should also have four class methods which are called through the constructor:

- `isCard(card)` returns true if card is a valid instance of the class _Card_;
- `numCards()` returns the number of cards in a full deck;
- `rankNames()` returns an array of all rank names;
- `suitNames()` returns an array of all suit names.

For both name arrays: omit any empty "padding" strings, and protect the internal name arrays by returning only a copy.

There are multiple ways of organizing your module to satisfy these requirements, but some of the patterns will be much easier to adapt to part (b).  Read ahead carefully and study the included [template file](template-tarot.js).

**b)** The Card class will have a subclass TarotCard, another constructor which inherits from it.  Tarot cards (Minor only!) are similar to ordinary playing cards, but with four differences:

1. Their suit names are "Cups", "Pentacles", "Swords", and "Wands".
1. A Jack is called instead a "Knight", and there is one extra rank "Page" between "Ten" and "Knight".  Therefore there are 56 total cards.
1. Tarot cards have no color, and should have no such method.
1. Each tarot card can be oriented normally or upside-down, and has a boolean instance property reflecting that orientation.

The _TarotCard_ constructor is implemented in a separate module, and it has been written completely in the [template](template-tarot.js).  You don't need to change anything in that module.  But you should write your _Card_ module in such a way that _TarotCard_ can sucessfully inherit from it.  An expression like `card = new Card(51)` should make an object with Card behavior, and `tarot = new TarotCard(51)` should make an object with Tarot behavior.
The two classes should be able to co-exist and pass all of the tests in the template.


---

**4) Memory Game** _[50%]_

Write the engine for a game of Memory, in which some set of cards are arranged face down on a board and a player turns them over looking for pairs.  This week, you'll only implement the game's logic and an API, not a graphical interface.  Your game's "board" will be a single row of cards which are identified by a single position number (later you can convert it to a 2D grid).

This week you'll write two independent modules which work together: _MemoryGame_ and _MemoryCards_.  Each should be a constructor packaged as an IIFE in a separate file, [memory-game.js](memory-game.js) and [memory-cards.js](memory-cards.js).  Each constructor can implement its instance methods and data in either of two ways: 1) storing instance data in public properties which are accessed through shared prototype methods (like Problems 2-3 above), or 2) using instance-specific methods which access private data variables through closure (like the Deques).

**a)**

Write a _MemoryCards_ module representing a set of cards and the possible matches between them.  You may adapt your earlier playing-card module or write a new one for a completely different system of cards.  Two simple examples are in [cardset-example.js](cardset-example.js).  Your _MemoryCards_ constructor needs to build only one instance, an object representing a _set of cards_ rather than an individual card.  The _MemoryCards_ instance should have the following methods:

* values(): return an array of all the card values in the set.  Each value could be either an object or a primitive, depending on how you choose to implement your cards.

* match(valA,valB): given card values _valA_ and _valB_ (both of which should be found in _values()_), return true if they match as a pair, or false otherwise.

* display(val): given card value _val_, return a string which represents that card.  If your card values are already strings, this method could merely return _val_, but if your card values are objects, you'll need to generate a string version (e.g. the _name()_ or _shortName()_ of playing-card objects)

For example, if you decide to use regular playing cards in your game, your _values()_ could be a set of 52 card objects generated by your _Card_ constructor.  In that case, an appropriate _match()_ function might return true if two cards are the same rank and same color, creating 26 matching pairs, and _display()_ might return the card's name.

**b)**

Write a _MemoryGame_ module representing the rules and status of a game.  Each call to the constructor _MemoryGame(cardset)_ will construct one game instance using the cards represented in _cardset_, an instance of _MemoryCards_.
Each _MemoryGame_ instance must keep track of whether and where any card is face up, where any matching cards have been removed, and where unmatched cards remain.
It should have these methods:

* `reset()` replaces all removed cards, reshuffles the entire board, and rebuilds the board face-down.

* `faceupWhere()` returns the position (a number) of the one face-up card (if any), otherwise returns _false_.

* `faceupValue()` returns the raw value of the one face-up card (if any), otherwise _false_.

* `remaining()` returns an array of the positions of all cards still on the board, including _faceupWhere()_ if any.

* `lift(where)` attempts to lift a card.  If there is a face-down card at position _where_ (a single number), return its display value _(by calling `cardset.display(val)` callback on the card's raw value)_; otherwise return _false_.  If there is not currently a face-up card, leave this card face-up.  If there's already a face-up card, do one of the following:

	* If this card and the face-up card match (according to `cardset.match()`), remove both from the board.  If all pairs are removed from the board, you win the game.

	* If there is no match, leave both cards in place and turn them face down.

It should be possible (though inconvenient) to play an entire game through the console, one `lift()` call at a time.


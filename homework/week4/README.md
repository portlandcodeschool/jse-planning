### Homework #4

_Due Mon. Feb. 2_

####Synopsis

- **Problem 1:** A Card Factory! _[25% of total time]_ **Goals:** The deck of cards returns again to demonstrate the _Factory_ and _Instance_ object patterns.  You'll also practice combining JS files within HTML.

- **Problem 2:** Stacking the Deque! _[75%]_ **Goals:**  Implement a _Deque_, an abstract data structure (like an array) which can hold a variety of data types.

	- **Part a)** Implement a deque factory and basic deque instance methods. _[25%]_

	- **Part b)** Fill a deque with cards from Problem 1, then sort them in different ways. _[10%]_

	- **Part c)** Fill another deque with strings and sort them. _[10%]_

	- **Part d)** Add a shuffle feature to all deques. _[10%]_

	- **Part e)** Make your deques smarter about adding and removing content. _[20%]_


---

**1) A Card Factory**  _[25%]_
Revisit your playing card functions from homework 3 and repackage them in a Factory pattern.  You will replace the earlier _cardTools_ toolkit object with a function
`makeCard(id)` (the Factory) which, with each call, makes and returns an object (an Instance) representing a single card.  If _id_ is invalid (not an integer 0..51), the factory should instead return _null_.  Each valid card object stores its own _id_ and has four instance methods to calculate its other attributes:

* `card.rank()` returns 1..13 representing that card's rank.
* `card.suit()` returns 1..4 representing that card's suit.
* `card.color()` returns a string representing that card's color.
* `card.name()` returns a string representing that card's name.  _Note that although this function can be attached to the card instance as a property called 'name', it needs a different name (e.g. 'cardName') when attached to the factory, which is a function and already defines a property 'name' for another purpose._

Avoid redundant copies of the instance methods: instead of defining new methods for each card instance, link them all to a shared copy of each method which stored in the factory itself.
Here is a [template file](cards3-template.js).
If you need helper functions (e.g. for validating arguments), you may attach them as additional factory methods.


**b)**  Write another method which is attached to and called through _the factory alone_, not the instances:

* `makeCard.isCard(obj)` should return _true_ if `obj` is a valid card object (a product of the factory) and _false_ otherwise.

There's no need for any card instance to have an _isCard_ method (since by calling its method, you've already assumed it's a card).

**c)** Use the factory to generate an array of 52 card instances (one for each id), and store the array as a property of the factory called `fullSet`:

* `makeCard.fullSet` -->  an array of all 52 possible card instances


**d)** Edit the file [main.html](main.html) to ensure that its first `<script...src=...>` tag includes the correct filename for your card-factory code, then open [main.html](main.html) in a browser.  Using the console, call your factory to generate and test a few card instances.
In Problem 2b), you'll combine the card-factory module with a "deque" module.

---

**2) Stacking the Deque**

"Deque" (pronounced "deck") is an acronym for "double-ended queue", a sequential data structure similar to an Array but with different rules of access.  While an Array is random-access (i.e. any element is accessible), a deque can only be accessed at either of its ends (like a roll of mints with both ends open).  The two ends can be called "top" and "bottom" (where "top" corresponds to the _end_ of an Array).

**a)** _[25%]_
Write a deque factory, a function `makeDeque(values)` which follows the Factory pattern.  Each call to `makeDeque(values)` should build and return a new deque instance, which holds a copy (not just an alias!) of the array _values_.  Each deque instance has the following methods:

* `length()`: return the number of items currently in the deque.  Notice that this can be used to _get_ the deque's length but not to _change_ it.

* `top()`: return the element on top of the deque (or undefined if none).

* `bottom()`: return the element on bottom of the deque (undefined if none).

* `pop()`:  remove and return the top element (undefined if none).

* `push(val)`: add an element to the top and return the new deque length.

* `shift()`: remove and return the bottom element.

* `unshift(val)`: add an element to the bottom and return the new length.

* `cut()`: split the deque at the middle, then swap the two halves.  If there are an odd number of deque elements, split just above the middle element.  The element just below the split will become the new top element when the halves are swapped.  If the deque contains fewer than 2 items, it will remain unchanged.

* `sort(compareValsFn)`: reorder the elements of the deque according to the comparison defined by the function _compareValsFn_, passed as an argument to _sort_.
`compareValsFn(a,b)` should return a positive number whenever value _a_  belongs somewhere above value _b_ in the sorted result, and a negative number whenever _a_ belongs below _b_.  (Zero means they're equivalent: either may come first.)

* `map(convertValFn)`: return an array whose elements have been generated by calling `convertValFn(val)` on each _val_ in the deque.

In part b), you'll use a deque to simulate a deck of 52 cards, but your deque implementation should be completely general, able to handle any number of any type of element.

A deque instance should not itself be an Array; instead it should be an ordinary object which **contains** an Array, a copy of the _values_ parameter.
Be sure to **copy** the _values_ array into the deque instead of using the original; you don't want anyone messing with the deque's content through another reference.

For any of the methods above which correspond to a built-in array method, you don't need to reimplement the method from scratch; instead, just have the deque instance _delegate_ the job to its internal Array.  That will make the deque's _pop_, _push_, _shift_, _unshift_, _sort_, and _map_ very easy to write.

Use the [template file](deque-template.js) to get started.  If you use a different file name for your deque-factory code, make sure to edit [main.html](main.html) and include your deque file name in the second `<script...src=...>` tag.

When your code is finished and you load [main.html](main.html), which includes both your card and deque modules, you should have the data structure shown in Figure 1:

![](http://portlandcodeschool.github.io/jse-win15-4/deque1.svg)

---

**b)** _[10%]_
Edit the file [main.js](main.js) to use your two factories together: make a deque instance called `deckOfCards` by calling your deque factory with `makeCard.fullSet`.  The resulting deque will contain 52 card instances which can be ordered independently from any other deque.

Figure 2 represents the new structure:

![](http://portlandcodeschool.github.io/jse-win15-4/deque2.svg)

Order the deck in two different ways, using its _sort()_ method with two different comparison functions:

-  Write a comparison function to sort _deckOfCards_ by ascending suit (Hearts on bottom, Clubs on top), and by ascending rank within each suit.   After sorting, the bottommost card will be "Ace of Hearts" and the topmost will be "King of Clubs".  A cut should move "King of Diamonds" to the top.
Therefore you should pass this test:
```
deckOfCards.sort(/* ascending-by-suit comparison function here */);
deckOfCards.cut();
assert(deckOfCards.top().name() === 'King of Diamonds', 'Failed King of Diamonds test');
```

- Write a new comparison function and sort the deck by card name, alphabetically from bottom to top.  You should pass this test:
```
deckOfCards.sort(/* alphabetic comparison function */);
assert(deckOfCards.bottom().name() === 'Ace of Clubs', 'Failed Ace of Clubs test');
assert(deckOfCards.top().name() === 'Two of Spades', 'Failed Two of Spades test');
```

---

**c)** _[10%]_
Without changing your deque factory, use it to create another deque holding a different data type.  In file `main.js`, define another variable `deckOfNames` to be a deque instance holding the first names of all 17 students in the class.

Sort the names alphabetically, bottom to top, by the SECOND letter of the name (e.g. "Matt" would precede "Tom" because 'a'<'o').  If two names are the same in the second letter, their order doesn't matter.  Then test your result:
```
var deckOfNames = makeDeque(/* 17 names */);
deckOfName.sort(/*something*/);
var theFinalName = '/*someone*/'; //whoever is last via that sort
assert(everyone.top() === theFinalName, 'Failed name test');
```

---

**d)** _[10%]_ 
In your deque factory, add a deque instance method `shuffle()` which shuffles the elements into a random order.
First, try the easy (but slow and ineffective) way by using Array.sort() with a comparison function returning a random result.

Then do it properly using the [in-place Knuth-Fisher-Yates algorithm](http://bost.ocks.org/mike/shuffle/).  You may copy code from there or any other source, but cite the source if you do.

With the new factory definition, define a new variable `shuffledDeck` with a new deque of card instances and shuffle it.
Use its _map(...)_ method with a custom callback function to view the shuffled elements by _card.id_.
Then use _map(...)_ with a different callback function to view them by _card.name()_.

---

**e)** _[20%]_
Improve your deque implementation to ensure that no one can add unauthorized elements to it (e.g. extra Aces).

Change anything necessary so that `push(val)` and `unshift(val)` only add _val_ if it was part of the original deque and is currently missing (via `pop()` or `shift()`).

(Hint: each deque will need to maintain some record of all elements released with a _pop_ or _shift_.)

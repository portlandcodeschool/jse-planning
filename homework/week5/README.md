### Homework 5

_Due Mon. Feb.8_

####Synopsis

- **Problem 1:** A Cards Module _[20% of total time]_ **Goals:** Start working with IIFEs and closure to create a self-contained module for your cards.
- **Problem 2:** All Hands Off Deque _[25%]_ **Goals:** Get more comfortable with closure by creating a secure version of the deque from last week.
- **Problem 3:** Secrets At All Levels _[25%]_ **Goals:** Build on Monday's in-class password example to practice closures at the level of both instance and factory methods.
- **Problem 4:** Showing Off the Deque _[30%]_ **Goals:** Learn the basics of DOM manipulation by displaying a deque of cards in the browser.

---


---

**1)  Card module** _[20%]_

Package your earlier playing-card code into a module; that is, wrapped inside an immediately-invoked function expression (IIFE, or "Iffy").  Your module should return one object: the factory _makeCard_.  As before, calling `makeCard(id)` should create and return a card object with methods for rank, suit, name, etc.  But this time, the shared methods don't need to be linked initially to the factory; they can just be ordinary functions within the IIFE, where they are protected from the global scope.

The instance methods still need to be linked to each instance, and the factory methods (e.g. `isCard()`) still needs to be linked the factory.  But any other helper-functions or arrays which do not need to be public should remain inaccessible from outside the IIFE.

You may use the [template file](cards4-template.js) to get started.

---

**2)  All hands off deque** _[25%]_

The implementation of a deque in Homework 4, Problem 2e), tries to maintain the integrity of the deque contents by preventing a _push_ or _unshift_ of items not in the original deque.  But a programmer could deliberately or accidentally circumvent those efforts by accessing and changing the deque's array instead of using its methods.  

**a)**
Write another version of a deque factory which protects the deque instances by using closure to hide their content arrays from the outside world.  Your deque methods should be the only way of changing their hidden arrays.  You may use the [template file](deque2-template.js) to get started.

_(Hint #1: you'll have to give up the strategy of sharing factory methods with instances to avoid redundancy.  Instead, have each call to the factory generate a set of methods specific to one deque instance which can access any private arrays associated with it.)_

_(Hint #2: the private arrays will live in a function scope, not in an object.)_

**b)** Wrap the deque factory in an IIFE to create a module which exports _makeDeque_.

---

**3) Secrets at all levels**  _[25%]_

**a)**  Write a user-registration tool, a factory function `makeUser(name,pwd)` which accepts a username and password and generates a user object.  Once we have a user object we should be able to do two things with it: retrieve the corresponding username and test to see if a provided password matches that user's password.  Each user will have these methods:

  + `getName()` returns the username;
  + `validate(str)` takes a string and returns true if it matches that user's password.

It should not be possible, however, to modify the username or password once created nor to directly see the password.

Here is a [template](users-template.js) to get you started.

**b)**  Now that we can make user objects, let's assume that our system needs some version of a "system log" that will record messages left by different users. This system log, being shared by all user objects created, will contain all the messages that users have recorded. You will need to modify the factory you made above to be a part of a module that has a private variable that holds the system log.

  + Each *user* object should have an additional method `record(message)` which writes an entry to the shared log in the format "_username: message_" and returns true.  If no message is provided, the `record` method should return undefined instead.

  + Reading from the log is a operation of the system and not of individual users.
  The factory itself should have a method `getLog(username)` whose argument _username_ is optional.  If _username_ is provided, _getLog_ should return a string of all log entries recorded by that user.  If _username_ is omitted (therefore undefined), return a string of all log entries from everyone.  In either case, log entries should be separated by newlines.

The log should not be able to be modified other than through a user's _record_ method.

---

**4) Showing Off the Deque**  _[30%]_

Use the browser's Document Object Model (DOM) to display your deques!

**a)** _(This part is optional, but you'll probably find it easy and convenient.)_
Write a new method for all card instances, `shortName()`, which is an alternative to `name()`.  Method `shortName()` should return "AH" instead of "Ace of Hearts", "2D" instead of "Two of Diamonds", and so on.

**b)** Write two new instance methods for all cards:

- _renderText(cell)_: Display the card's name (or shortName) to the DOM as a new child of _cell_.  Make the text color the same as the card color (red or black).

- _renderImage(cell)_: Display an image for the card as a new child of _cell_.  A set of [card images](http://code.google.com/p/vector-playing-cards/) is included in the _images_ directory.  You'll probably want to scale them for display.

For both methods, parameter _cell_ should be a DOM element or a string.  If it's a string, use the DOM element whose id is that string.

_(Hint: Each card will need to generate a specific filename for its own image.  All filenames should be relative to main.html (and will start with "images/").  You may modify the file [cards.ss](cards.css) as desired to customize appearance.)_

**c)** Write a new instance method for all deques:

- _render(container, renderItemFn)_:  Like _cell_ above, _container_ should be a DOM element or an id string identifying one; `renderItemFn` is a callback.  First clear any contents of _container_.  Then, for each item in the deque, create a cell (a new _<div>_ element) with an appropriate CSS class (e.g. _dequeItem_), make that cell a child of _container_, and call `renderItemFn(item,cell)` on it, where _item_ is the deque item and _cell_ is the DOM container assigned to it.

You may modify the file [deque.css] to customize the appearance of the deque's cells (which each contain item-specific content).
Remember that a deque has no awareness of a card or its possible methods (e.g. `card.renderImage()`); the deque must rely on callback _renderItemFn_ to decide the details of rendering into a cell.
Your deque code should work equally well for deques of strings or other content.

**d)** In file [main.js], create some callbacks to play the role of _renderItemFn_ and render a deck of cards in two ways:

- In the container with id 'card-names', display the deck as colored card names.

- In the container with id 'card-images', display the deck as images.

Make another deque holding the names of your classmates.  Then display that deck in the container with id 'people-names'.  You'll need another callback specific to that deque's content (strings instead of card-objects).

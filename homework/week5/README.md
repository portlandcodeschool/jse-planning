#### Homework 5

Due Mon. 10/6


---

**1)  Card module** _[moderate, 2 hrs]_

Package your earlier playing-card code into a module; that is, wrapped inside an immediately-invoked function expression (IIFE, or "Iffy").  Your module should return one object: the factory _makeCard_.  As before, calling `makeCard(id)` should create and return a card object with methods for rank, suit, name, etc, but with a structural difference:
the methods shared between instances need not be linked initially as methods of the factory, but can instead be 'siblings' of it, functions local to the IFFE's scope.

---

**2)  All hands off deque** _[easyish, 2 hrs]_

If you haven't yet finished Homework 4, #2f, please do so first.
That implementation of a deque tries to maintain the integrity of its contents by preventing a _push_ or _unshift_ of items not in the original deque.  But a programmer could deliberately or accidentally circumvent those efforts by accessing and changing the deque's array instead of using its methods.  

Write another version of a deque factory which protects the deque instances by using closures to hide their content arrays from the outside world.  Your deque methods should be the only way of changing their hidden arrays.

_(Hint #1: you'll have to give up the strategy of sharing factory methods with instances to avoid redundancy.  Instead, have each call to the factory generate a set of methods specific to one deque instance which can access any private arrays associated with it.)_

_(Hint #2: the private arrays will live in a function scope, not in an object.)_

---

**3) Secrets at all levels** 

**a)** _[easyish, 1 hr]_ Write a user-registration tool, a function `makeUser(name,pwd)` which accepts a username and password and generates a user object.  Once we have a user object we should be able to do two things with it: retrieve the corresponding username and test to see if a provided password matches that user's password.  Each user will have these methods:

  + `getName()` returns the username;
  + `validate(str)` takes a string and returns true if it matches that user's password.

 It should not be possible, however, to modify the username or password once created nor to directly see the password.

**b)** _[difficult, 2 hrs]_ Now that we can make user objects, let's assume that our system needs some version of a "system log" that will record messages left by different users. This system log, being shared by all user objects created, will contain all the messages that users have recorded. You will need to modify the factory you made above to be a part of a module that has a private variable that holds the system log.

  + Each *user* object should have an additional method `record(message)` which writes an entry to the shared log in the format "_username: message_" and returns true.  If no message is provided, the `record` method should return undefined instead.

  + Reading from the log is a operation of the system and not of individual users.
  The factory itself should have a method `getLog(username)` whose argument _username_ is optional.  If _username_ is provided, _getLog_ should return a string of all log entries recorded by that user.  If _username_ is omitted (therefore undefined), return a string of all log entries from everyone.  In either case, log entries should be separated by newlines.

The log should not be able to be modified other than through a user's _record_ method.



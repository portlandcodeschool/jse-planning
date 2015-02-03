### Homework #3

_Due Mon. Jan 26_

####Synopsis

- **Problem 1:** A Cards Toolkit! _[Easy, 10% of total time]_ **Goals:** The deck of cards returns to demonstrate the _Toolkit_ object pattern. **Notes:** This is an important one, as it's not the last time you'll see it.

- **Problem 2:** Testing and Simulating Arrays _[Moderate, 20%]_ **Goals:** Learn how to write unit tests by testing Arrays, and learn how arrays work by simulating one! **Notes:** This is your introduction to writing tests, which you will be doing more of.

- **Problem 3:** Object Comparison _[Moderate, 30%]_ **Goals:** Learn basic Object behaviors and how to compare and combine them.

- **Problem 4:** Social network! _[Moderate to Difficult, 40%]_ **Goals:** Some more real-world practice using Objects. **Notes:** Problem 3 will probably help with aspects of this.

---

**1)  A Cards Toolkit!**  _[Easy, 10%]_

Revisit your playing card functions from homework 2, problem 5b.  Repackage them in a Toolkit pattern, as methods of a single master object.  You may hold that object in a global variable named anything you like (it's _cardTools_ in the template), but its name should not appear in the definitions of your methods; instead, refer to that object as `this`.  You'll need to change the form of your method definitions and the way they call other methods, but their logic and most of their code will remain the same.

You may adopt the enclosed [template file](cards2-template.js).  Make sure your code still passes all the assertions there!

It would be best to modify your own code from Homework 2, but if you didn't solve it before, you may adopt the posted solution instead and modify it here.

---

**2)  Testing and Simulating Arrays** _[Moderate, 20%]_

**a)**
Write some code to verify that Arrays behave as advertised.  Specifically, write three different functions, each testing one method of Arrays:

* `testPush(array)` should verify that `array.push(val)` adds _val_ to the end of _array_ and returns its new length;

* `testPop(array)` should verify that `array.pop()` removes and return the last element of _array_;

* `testJoin(array)` should verify that `array.join(delim)` concatenates all elements of _array_ into a single string, with string _delim_ inserted between each element.


Each function should do several tests:  adding, removing, or joining values under various conditions to ensure that _array_ produces the correct outcome.  Each outcome may require multiple assertions to verify.  For each function, make sure one test is for how an empty array behaves.
Any assertion which fails should log a message to the console, but your test functions don't need return values.

More detailed instructions are in the [template file](array-test-template.js).

**b)** Now that you have a testing suite, implement your own version of Arrays!

Create a pseudo-array, an ordinary object which is not an actual Array but behaves
(somewhat) like one.  You may use a global variable _array_ to store
your pseudo-array.
It will have a property _length_, which is initially zero but needs to be adjusted as elements are added or removed.
The elements of _array_ will be stored as properties named by their index numbers.
So for example, an _array_ representing `[5,9]` would have three properties named "length", "0", and "1" whose values are 2, 5, and 9.

For this exercise, you don't need to delete any _array_ elements beyond its length if the length shrinks; just ignore them.  Setting _array.length_ to 0 is enough to reset it to "empty".

In addition to property _length_ and the element properties, give _array_ three more properties _pop_, _push_, and
_join_ which are functions (i.e. methods) behaving exactly like (and returning the same values as) the
corresponding methods of real Arrays.  When your _pop_ and _push_ methods modify the array, _length_ should change accordingly.

You may use the enclosed [template file](pseudo-array-template.js) to get started.

_Hint:_ Within each method, to refer to your array object, you may use either the global variable _array_ or the keyword _this_.

**c)**  Test your pseudo-array implementation using your tests from part **a)**.  Your pseudo-array should be able to pass the same tests of push, pop, and join as a real Array.

---

**3)  Object Comparison** _[Moderate, 30%]_

**a)**
Write a function `copy(obj)`, which duplicates an object (not just copying a reference to it).  You only need a _shallow_ copy, duplicating only the top level of properties.  That is, if `obj` contains another object _inner_, the duplicate may share a reference to _inner_ rather than copying all of _inner_ too.

Write another function to compare two objects:
`equal(objA,objB)` should return true only when `objA` and `objB` have exactly the same properties with the same values.  You only need _shallow_ equality: if `objA` and `objB` each have a property _inner_ referring to an object, check only that both _inner_ objects are identical (references to the same object); don't try to compare their properties.
Note that two empty objects should be considered equal (by this function, not by the `==` operator).

Write a third function:
`similar(objA,objB)` should return true only when `objA` and `objB` have exactly the same properties, regardless of their values.

**b)**
We can interpret objects as _sets_ of properties, and merge those sets in various ways.  Let's define three such merges:

*Union*: The union of objects A,B is a new object which contains all the properties found in either A or B.  If a property is found in both, the merged property gets the shared key and the value `(A[key] || B[key])`.
For example: the union of `{a:1,b:0}` and `{a:0,c:0}` is `{a:1,b:0,c:0}`.

*Intersection*: The intersection of objects A,B is a new object which contains only those properties found in BOTH A and B.  The value of each intersecting property is `(A[key] && B[key])`.
For example, the intersection of `{a:1,b:0}` and `{a:0,c:0}` is `{a:0}`.

*Subtraction*: The subtraction of B from A, aka "A minus B", is an object which contains all the properties of A which are NOT in B.  Note that this merge is usually not symmetric: _A minus B_ doesn't equal _B minus A_ (except in one case, which you should identify!)
For example, `{a:1,b:0}` minus `{a:0,c:0}` is `{b:0}`, and the reverse subtraction is `{c:0}`.

Using those definitions, implement a function for each:

* `union(objA,objB)`

* `intersect(objA,objB)`

* `subtract(objA,objB)`

Each function should return a new object, or _undefined_ if either of their arguments is not an object.

**c)**
Write three sample assertions to test each of your three merging functions (9 total).
Remember that when comparing your results to the expected results, you'll need to see if objects are equal() but not identical.

**d)**
Finally: even if your functions implement perfectly the definitions above, 
intersection and union are still not symmetric.  That is, `similar(union(A,B),union(B,A))` will always be true, but `equal(union(A,B),union(B,A))` may not be.  Likewise with intersection.  Explain!

---

**4) Social network!** _[40% total]_

Assume a world in which no two people have the same name.
Create an object `people` whose purpose is to remember everyone ever mentioned and the relationships between them.

**a)** _[Moderate, 25%]_

Write three methods for `people`:

* `people.meet(nameA,nameB)` should accept two names, update `people`, and return the total number of times those two have met, including this new meeting.
If either person isn't yet represented in `people`, add them.
Then increment a count of the meetings between them.
Assume that the order of arguments doesn't matter (i.e. `meet(A,B)` is the same as `meet(B,A)`), and that meeting oneself _(A==B)_ has no effect.

* `people.haveMet(nameA,nameB)` should return a number greater than 0 if those people have met, and some falseish value if they haven't or don't exist.

* `people.friendsOf(name)` should return a string listing the names of all people whom `name` has met at least once (or undefined if `name` doesn't exist).   List the names in alphabetical order, and make sure each name appears only once.

You may use the enclosed [template file](social-network-template.js) to get started.

_Hint:_ the `people` object should contain an index of all people, linking each name to an individual object for that person.  Each such person-object should have two properties:

* `name` is a string for that person's name.  (This redundant copy of the name isn't necessary for the solution, but it may help you debug.)

* `friends` is another index object, unique to each person, with multiple keys (one for each friend that person has met), each with a numeric value.  Because meetings are symmetric (each person meets the other), each number is duplicated in a corresponding property in the friend's index; make sure you update both copies of the number during a meeting.

Here is a diagram showing the data structure after `people` is fully initialized but before any method calls:

![](http://portlandcodeschool.github.io/jse-win15-3/social-network1.svg)

Here is the data structure just after the first method call `people.meet('Matt','Tom')`:

![](http://portlandcodeschool.github.io/jse-win15-3/social-network2.svg)

**b)** _[Difficult, 15%]_

Write another method `people.friendsOfFriendsOf(name)` which returns a string listing, in alphabetical order, all the names of people within two degrees of separation from `name`: they've met either `name` or at least one of `name`'s friends.
Your list may include `name` itself but no duplicates: any person should be listed only once regardless of the number of connections with `name`.

(_Hint:_ the union of sets includes no duplicates!  Perhaps you could recycle code from somewhere?)



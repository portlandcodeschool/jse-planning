## Object hierarchy:
	Objects
Array	  Functions

## Functions are Objects!


function someFn() { 
	blahblahblah;
	yap+yiddle+fiddle+faddle;
	oogity(boogity);
}
//[Fig0]
someFn; //OK
typeof someFn; //OK
var alias = someFn; //ok



Lifetime of a function:
1) Being built
	invisible link to scope where it was born,
then interspersed moments of:
2) Being an object (referenced, stored in vars/props, having props installed)
3) Running

Summary
A function is an object which:
1) stores some code
2) stores a list of parameters
3) Runs that code when triggered with call operator ()
4) then creates a scope or "environment" or "call object" which holds local vars

Three uses of function names in code:
* definition
* mention/reference
* call
 (call operator)


Implications:

```
function paint(obj) {
	obj.color = 'red';
}


1. functions can have aliases

Make an alias for _paint_ and call the alias as a function.


2. functions can BE methods
	`this`


Make _paint_ a method of an object

3. functions can BE arguments
	callbacks
	inline anonymous functions


Use _paint_ as a callback to forEach for some array of objects.

Use an anonymous function (which paints things 'blue') as a callback to forEach.


4. functions can HAVE properties
	automatic:
		name
		length
	customized:
		flavor:banana

Use the `length` property to determine how many arguments function `paint` requires.

Rewrite paint to use, instead of 'red', a property of itself called `color`.  Then set that property to 'green'.  Then paint something green.


5. functions can HAVE methods
	automatic:
		toString()
		(preview w/o detail:) call(), apply()
	customized:


Give function _paint_ a method which sets the color it uses to paint things.
You should be able to use it like this:
```
paint.useColor('turquoise');
paint(obj); // --> sets obj's color to 'turquoise'
```

EXERCISE:
function plus(a,b) {
	if (a===undefined)
	plus.stash(a,b);
	return a+b;
}
plus.stash = function(a,b) {
	plus.a=a;
	plus.b=b;
}
plus.repeat = function() {
	this(this.a,this.b)
}
plus.

plus[x]()


## Review: Methods and _this_

Here is a simple instance object representing an animal:
{% highlight javascript %}
var dog = {
	noise:'woof'
}
{% endhighlight %}

Here is an ordinary function which makes an animal talk.  We might call it "freelance" since it belongs to no particular animal:
{% highlight javascript %}
function talk(who) { //needs target object as argument
	console.log(who.noise);
}
talk(dog);
{% endhighlight %}

We can attach that function as a method:
{% highlight javascript %}
var dog1 = {
	noise:'rowr',
	talk: function() { //no target arg needed
		console.log(dog1.noise);
	}
};
dog1.talk();
{% endhighlight %}



But a better alternative uses the keyword `this`:
{% highlight javascript %}
var dog2 = {
	noise:'rowf',
	talk: function() {
		console.log(this.noise);
	}
};
dog2.talk();
{% endhighlight %}


Short (and imperfect) definitions of `this`:
_the method's owner_
or
_the object containing the method_

_Why is using 'this' better?_


### Lexical vs. Dynamic Scoping

All variables we've ever seen are 'lexically' scoped--
the declaration they refer to (the closure for that variable) can be determined in advance by looking at the structure of the code (how function definitions are nested).

For example: what is the scope of `dog` in
{% highlight javascript %}
var dog = {
	noise:'woof',
	talk: function() { //no target arg needed
		console.log(dog.noise);
	}
};
{% endhighlight %}



The word `this` behaves somewhat like a variable, except:

1. You can never set it (e.g. `this=that`)

2. It always refers to an object, never a primitive

3. It is 'dynamically' scoped; its referent cannot be determined by looking at the code surrounding it.  Its value is not determined by closure, like a local variable, but instead depends on how its function is called, like a parameter.  It is essentially an invisible parameter.

For example:
{% highlight javascript %}
var dog = {
	noise:'arf',
	talk: function() {
		console.log(this.noise);
	}
};
dog.talk();
{% endhighlight %}

`this` refers to dog, but _not because the function is 'embedded' in the description of dog_.  Instead, it's only because the function is called as a method of dog.

Alternative form:
{% highlight javascript %}
var talk = function() {
	console.log(this.noise)
}
var dog = {
	noise:'arf',
	talk: talk
};
dog.talk();
{% endhighlight %}

Our earlier crude definition of `this`: _the owner of the method_

Here's better definition of `this`: _the object holding the reference we followed to get here_.

### Sharing methods:
{% highlight javascript %}
var duck = {
	noise:'quack',
	talk: dog.talk; // share dog's method
}
duck.talk();
{% endhighlight %}

#### Single-use borrowing with _call_
Object has no method of its own:
{% highlight javascript %}
var duck = {
	noise:'quack'
}
{% endhighlight %}

Borrowing the hard way:
{% highlight javascript %}
duck.talk = dog.talk;
duck.talk();
delete duck.talk;
{% endhighlight %}

Borrowing the easy way, with the 'call' method:
{% highlight javascript %}
dog.talk.call(duck);
{% endhighlight %}

Freelance method:
{% highlight javascript %}
function talk() {
	console.log(this.noise);
}
{% endhighlight %}

Permanently shared:
{% highlight javascript %}
var canary = {noise:'tweet', talk:talk};
var crane = {noise:'whoop', talk:talk};
canary.talk();
crane.talk();
{% endhighlight %}

Borrowed on demand:
{% highlight javascript %}
var canary = {noise:'tweet'};
var crane = {noise:'whoop'};
talk.call(canary);
talk.call(crane);
{% endhighlight %}

EXERCISE:


### Global object


var one='one',
    two='two',
    three='three';

this.one;
this['two'];


// Therefore they can be deleted:
delete this.one;
one

// Global object also called `window`:

this === window
this === this.window
this === this.window.window.window

// Global object is both an object and a scope;
// its properties are both properties and vars!

What happens here?
{% highlight javascript %}
talk();
{% endhighlight %}


*Hazard:* callback function within method:
{% highlight javascript %}
var animals = [dog, cat, canary];
animals.allTalk = function() {
	this.forEach(talk);
}
animals.allTalk(); // failure!
{% endhighlight %}

**EXERCISE:** fix it!  Give the array _animals_ a method called `allTalk` which 
makes each animal talk.  
You must use
1. `talk()` exactly as defined above
2. `forEach(something)`
`something` should be a function which is not `talk` but instead somehow calls `talk`.



## Factories &amp; Shared Methods

We know how to make animal instances by hand:
```
var dog = {
	name:'dog',
	noise:'woof',
	talk:function() {
		console.log(this.noise);
	}
}
var sheep = {
	name:'sheep',
	noise:'baaa',
	talk:function() {
		console.log(this.noise);
	}
}
```


How can we automate that to mass-produce animals?

EXERCISE: write a function to create any number of animals like those above.





{% highlight javascript %}
function makeAnimal(sound) {
	var critter = {};
	critter.noise = sound;

	// personal instance method:
	critter.talk = function() {
		console.log(this.noise);
	}

	return critter;
}
var sheep = makeAnimal('baa');
sheep.talk();
{% endhighlight %}

Disadvantage: all animal instances have identical duplicate methods.
How can we share them between instances?

### Shared instance method patterns

- Global Freelance function or method.

	**EXERCISE:**  write a animal factory with a global shared instance method

<!-- Freelance method in closure, not global

	- Named meta-factory

	**EXERCISE:** write a function which returns a animal factory,
 	whose instances share a method in a closure

	- IIFE!

	**EXERCISE:** write an immediately-invoked anonymous function which returns a animal factory, whose instances share a method in the IIFE's closure. 
-->

- Method initially attached to factory:

{% highlight javascript %}
function makeAnimal(sound) {
	var critter = {};
	critter.noise = sound;
	critter.talk = makeAnimal.talk;
	return critter;
}
makeAnimal.talk = function() {
	console.log(this.noise);
}
var sheep = makeAnimal('baa');
sheep.talk();
{% endhighlight %}

- Method attached to prototype... coming up ahead!

<!--
### Freelance initializer method
{% highlight javascript %}
function initAnimal(sound) {
	this.noise = sound;
	// personal instance method:
	this.talk = function() {
		console.log(this.noise)
	}
}
var sheep = {};
initAnimal.call(sheep,1,5);
answer = sheep.talk();
{% endhighlight %}

-->

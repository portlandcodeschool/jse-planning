


CLOSURES



Remember how lexical scoping works: functions look "outward" to resolve variables.




Review of Scope :

Predict what will happen in each of the following programs:

1.

```
	var x=1, y=1;
	function fun() {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun();
	console.log('x='+x, 'y='+y);
```

/**
How can we represent exactly what's happening?

Principles:
every function call generates a "scope" (aka "environment", "call object", "execution context")
Simple intution for scope: a "page" of variables

Diagram:
fun(____)
	 ||
	 VV
+---+,..
|   |:  :
|   |:  ;
+---+`''
 fun


Calling a function multiple times creates multiple independent "pages"

Each one sees outward, i.e....


* Every function remembers the scope/page it was born in *
(draw secret arrow)




Revisit each scope example, and determine its output:

*/
1.

```
	var x=1, y=1;
	function fun() {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun();
	console.log('x='+x, 'y='+y);
```

2.

```
	var x=1, y=1;
	function fun(x) {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun(2);
	console.log('x='+x, 'y='+y);
```

3.

```
	var x=1, y=1;
	function fun(z) {
		x=3;
		console.log('x='+x, 'y='+y);
	}
	fun(2);
	console.log('x='+x, 'y='+y);
```

4.

```
	var x=1, y=1;
	function fun(x) {
		x=3, y=3;
		if (x) {
			var y=4;
			console.log('x='+x, 'y='+y);
		}
		console.log('x='+x, 'y='+y);
	}
	fun(2);
	console.log('x='+x, 'y='+y);
```

5.

```
	var x=1, y=1;
	function showXY(x,y) {
		console.log('x='+x, 'y='+y);
	}
	function fun(x) {
		x=3;
		showXY(x,y);
	}
	fun(2);
	showXY(x,y);
```

6.

```
	var x=1, y=1;
	function showXY() {
		console.log('x='+x, 'y='+y);
	}
	function fun(x) {
		x=3;
		showXY();
	}
	fun(2);
	showXY();
```

7.

```
	var x=1, y=1;
	function fun(x) {
		function showXY() {
			console.log('x='+x, 'y='+y);
		}
		x=3;
		showXY();
	}
	fun(2);
	showXY();
```


"Closure" means:
the process by which variables are resolved, comprising two mechanisms:
1) functions remember (keep link to) where they were born, and
2) to resolve vars, we follow that chain of links, ending at the global scope


"A closure" or "the closure" (of a particular function call) is merely
the "parent" scope where that function was born; where it goes next to look for variables.

For example: the global scope is the closure of all global functions.


## Closure with Persistence


```
function outer() {
    var x=1;
    function inner() {
        return x;
    }
    return inner();
}
outer(); //--> 1
// But now scope is gone!
```

### Simple cases where function scopes expire:

```
function makePrimitive() {
    var x=1;
    return x;
}


function makeObject() {
    var obj = {};
    return obj;
}


function makeObject(id) {
    var obj = {id:id};  //copies id, but no persistent link
    return obj;
}


### Getter functions

// But contrast:
function  makeFunction() {
    var fn = function() {}
    return fn;
}
// Scope of makeFunction persists!


// Proof:
function  makeGetter(arg) {
    var getArg = function() {
        return arg;
    }
    return getArg;
}
var getter = makeGetter(7);
// function is done; is scope gone?
getter();//--> 7


A closure (i.e. scope) persists as long as *someone* (another function) needs it.  As long as there is a path of references/arrows to some descendent function, the closure remains active.


### Setter functions

function makeSetter(arg) {
    var setArg = function(val) {
        console.log("arg was "+arg+"; setting to "+val);
        arg = val;
    }
    return setArg;
}
var setter = makeSetter(11);
setter(5);
setter(13);
//makeSetter's scope is still there!
```

A closure acts as a "secret room" which can only be access by a function which was born there.



### Combine getter and setter in wrapper obj:

```
function makeAccessor() {
    var privateVal;
    function getFn() {
        return privateVal;
    };
    function setFn(val) {
        privateVal = val;
    };
    return {
        get:getFn,
        set:setFn
    }
}
var cache = makeAccessor();
cache.set(3);
cache.get();
cache.set(7);
cache.get();

### EXERCISE: combine getter and setter into single function!

```
function makeAccessor() {
    var privateVal;
    function accessFn(val) {
        //...
    }
    return accessFn;
}
// Use:
var cache = makeAccessor();
cache(7);
cache(); //-->7
cache(9);
cache(); //-->9




## Uses (Implications) of closure:

<!--
1. Easy to see: closure (non-local) variables are shared by all embedded (descendant) functions:

```
function outer () {
	var x=0;
	function set() {
		x=1;
	}
	function show() {
		console.log(x);
	}
	set();
	show();
}
outer();
```


1. A closure (i.e. scope) persists as long as *someone* (another function) needs it.  As long as there is a path of references/arrows to some descendent function, the closure remains active.

```
function outer() {
	var x=0;
	function show() {
		console.log(x);
	}
	return show;
}
var show = outer();
show();
```

A closure acts as a "secret room" which can only be access by a function which was born there.

1.  That's true for writing to variables as well as reading:

```
function outer() {
	var x=0;
	function show() {
		console.log(x);
	}
	function set() {
		x=1;
	}
	return {show:show, set:set}
}
var fnPair = outer();
fnPair.show();
fnPair.set();
fnPair.show();
```
-->


1. A factory function is the closure of any "personal" instance methods:

#### Personal methods using a data property:
```
function factory(id) {
	var instance = {};
	instance.id = id;
	instance.getID = function() {
		return this.id;
	}
	return instance;
}

var thing1 = factory(1);
console.log(thing1.getID());
```

#### Alternative: personal methods using closure:
```
function factory(id) {
	var instance ={}
	instance.getID = function() {
		return id;
	}
	return instance;
}
var thing2 = factory(2);
console.log(thing2.getID());
```

1. A factory is NOT the closure of any shared instance methods

You can't use closure to store multiple versions of a variable if functions are shared.



1.  Closure can be used to protect/privatize

Why privatize? Same reason for programming defensively:
not protection against malefactors, but against mistakes.

Makes code idiot proof.

Suppose you have coordinated variables:

// Consider the problem of maintaining self-consistent data across
// mutually-dependent variables:

var assets = 0;
var debt = 0;
var interestRate = 0;

function borrow(amount, rate) {
    debt += amount;
    assets += amount;
    interestRate = rate;
}

function compoundInterest() {
    debt *= (1 + interestRate);
}

function repay(amount) {
    assets -= amount;
    debt -= amount;
}


// Variables are public; nothing to prevent doing this:
//   debt -= 100;
// and forgetting this:
//  assets -= 100;


// To ensure valid relationships between variables,
// need to control access: individual variables can't be changed
// except by functions guaranteed to change both



//---
// Wrapping everything in manager object won't help:
var loanManager = {
    assets: 1000,
    debt: 1000,
    rate: 0,
    borrow: function(amount,rate) {
        this.assets += amount;
        this.debt += amount;
        this.rate = rate;
    }
    compoundInterest: function() {
        this.debt *= (1+this.rate);
    },
    repay: function(amount) {
        this.assets -= amount;
        this.debt -= amount;
    }
}
// Can still do:
loanManager.debt = 0;





// Another example of data inconsistency is pseudo-array:
var arr = {length:0;}
arr.push = function(val) {
    this[this.length] = val;
    return(++this.length);
}
// This is okay:
arr.push('a');
// But watch out for:
arr[0]='a';
arr[1]='b';
arr[2]='c';
// arr.length becomes invalid!




### Challenge

* Write a function that generates the next number each time it's called:

{% highlight javascript %}
sequence(); //=> 0
sequence(); //=> 1
sequence(); //=> 2
{% endhighlight %}

* Write a function, `counter` that returns your sequence generator:

{% highlight javascript %}
var sequence1 = counter();
var sequence2 = counter();
sequence1(); //=> 0
sequence1(); //=> 1
sequence2(); //=> 0
sequence1(); //=> 2
sequence2(); //=> 1
{% endhighlight %}

* Allow your counter to start at any number, for instance, `counter(5)`.
* Allow your counter to be reset:

{% highlight javascript %}
var sequence1 = counter();
var sequence2 = counter();
sequence1.next(); //=> 0
sequence1.next(); //=> 1
sequence2.next(); //=> 0
sequence1.next(); //=> 2
sequence1.reset(); //=> void
sequence1.next(); //=> 0
sequence2.next(); //=> 1
sequence1.reset(5); //=> void
sequence1.next(); //=> 5
{% endhighlight %}

## Advanced Scope

### The `var` keyword

Let's look at some examples to really understand `var`.

{% highlight javascript %}
var foo = 1;
function bar() {
  if (foo === 0) {
    var foo = 10;
  }
  console.log(foo);
}
bar();
{% endhighlight %}

{% highlight javascript %}
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
{% endhighlight %}

The above examples are taken (and slightly modified) from this excellent article on [_hoisting_][hoisting].

The main consideration is that any time you use `var`, you can consider that variable to be declared at the top of the function in which it's defined. It is good practice, therefore, to put `var` declarations at the top of the function to avoid confusion.

Here's another gotcha:

{% highlight javascript %}
var array = ["hello", "world"];
var callbacks = [];
for (var i = 0; i < array.length; i++) {
  callbacks.push(function() {
    console.log(array[i]);
  });
}
callbacks.forEach(function(c) { c(); });
{% endhighlight %}

* What's the intended result of this code?
* What's the actual result of this code?
* How can you avoid this gotcha?







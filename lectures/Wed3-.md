## JSON


### Review: Properties vs Variables


// Where they're stored
// Vars: live in a scope ("execution context")
// Props: live in an object

// How they're created
// Vars: must be declared with `var`
// Props: are created by assignment
var obj = {};
obj.prop = 1;

// Use before creation
// Vars: cause an error if not declared
// Props: return undefined if not declared


// How they're destroyed
// Vars: last until their scope expires
// Props: may be deleted manually

// How they appear in expressions
// Vars: need no prefix
// Props: must be prefixed with variable

// What they may be called
// Vars: have naming restrictions
// Props: can be named with any string



## References
// "The variable is not the object"
// Reference: an arrow from little box (variable or property) to big box.



### 8 Implications of References

1. null is not {}

```
var a = {}; //allocates big box and reference to it
var b = null; //makes arrow to nowhere

!null; //null is falsish
if (a) 'object!';
if (b) 'object!'; //nada
```


2. Object equality means identity:

```
var a = {};
var b = {};
// These look the same, but...
a==b;  //nope
a===b; //nope
```


3. Object assignment means aliasing/sharing:

```
var myRoom = {where:'PCS', tables:4};
var yourRoom = myRoom;
myRoom.tables--;
yourRoom.tables;
```



4. No intrinsic names
The table above has no record of being called either 'myRoom' or 'yourRoom'



5. Nesting means linking:

```
var duck = {feet:2, noise:'quack'};
var nest = {mama:duck};
```


6. Circular linking is OK:

var ernie={}, bert={};
ernie.bff = bert; bert.bff = ernie;






7. Deleting destroys links, not objects

delete ernie.bff;
bert;


// EXERCISE: Revisit References Puzzle (Ensure paper for everyone)

// EXERCISE: Circularity Puzzle



8. Passing objects (i.e. by reference) can have side-effects:

```
var myCar = {color:'red', wheels:4};

function paint(color) {
    color='blue';
}
paint(myCar.color);//color is a primitive, no change



function paint(obj) {
    obj.color='blue'
}
paint(myCar);//myCar is an obj and changes!

```


(### Object network)

## Functions are Objects Too!

Function definition makes small box (var) linked to big box


## Methods and 'this'



Here is a simple instance object representing a rectangle:
{% highlight javascript %}
var rect = {
	width:2,
	height:1
}
{% endhighlight %}

Here is an ordinary function which can compute a rectangle's area.  We might call it "freelance" since it belongs to no particular rectangle:
{% highlight javascript %}
function area(rect) { //needs target object as argument
	return rect.width * rect.height;
}
var answer = area(rect);
{% endhighlight %}

We can attach that function as a method:
{% highlight javascript %}
var rect1 = {
	width:1,
	height:2,
	area: function() { //no target arg needed
		return rect1.width * rect1.height;
	}
};
answer = rect1.area();
{% endhighlight %}

More examples of methods:
console.log
Math.sqrt
array.push...

### this

But a better alternative uses the keyword `this`:
{% highlight javascript %}
var rect2 = {
	width:2,
	height:3,
	area: function() {
		return this.width * this.height;
	}
};
answer = rect2.area();
{% endhighlight %}

_Why is using 'this' better?_



Adequate (for now) definition of 'this':
this object which owns the method containing 'this'


But not so simple


function myName() {
  return this.name;
}
var a = {name:'a', myName:myName};
var b = {name:'b', myName:myName};
a.myName(); //'a'
b.myName(); //'b'


Adequate (for now) definition of 'this':
this object which owns



### Array methods

array.push
array.pop
array.shift
array.unshift
array.concat
array.slice
array.join


Exercise:

Write a method `slice`


## Object patterns (T+2:20)




### Toolkit
```
// ---- Toolbox Example: Currency converter
var exchange = {
    rate: 1.10, //dollars per euro

    toDollars: function(euros) {
		return euros * this.rate;
    },

    toEuros: function(dollars) {
		return dollars / this.rate;
    },

    convert: function(string) {
		if (string[0]==='$')
		    return 'E'+this.toEuros(string.slice(1));
		if (string[0]==='E')
			return '$'+this.toDollars(string.slice(1));
		return this.toDollars(string);
    }
};
//call:
exchange.convert('$20.00');
```


### Index/dictionary

var dollarsPer = {
	dollar: 1,
	euro: 1.10,
	pound: 1.56,
	yen: 123.98,
	yuan: 6.21
}

### Exercise: (T+2:30)

1. Modify the exchange toolkit to have two data properties:

* a dictionary object listing all exchange rates;
* a string naming the toolkit's "home" currency (e.g. 'dollar'.)

In addition, give the toolkit three methods:

* `homeCurrency(unit)`: sets the home currency for the calculator (e.g. 'dollar');

* `convertTo(amount,toUnit)`: convert `amount` of home currency into the equivalent in `toCurrency`;

* `convertFrom(amount,fromUnit)`: convert 'amount' of foreign currency in `fromUnit`s to the 
equivalent in home currency (e.g. dollars).

2. Modify your converter 




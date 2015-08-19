
### Ternary conditional operator

? :


### Statements vs. Expressions

Statements include:
var
if ()

Nestable Expressions include:
all operators (&&, ||, ?:)
typeof
console.log()

---
## Repeated actions: Loops!

if (!thereYet) {
	driveABlock()
}

### While loops

while (!thereYet) {
	driveABlock()
}

How can we count to 10?

```
var x=0;
while (x<10) {
	console.log(x);
}
```
OOOPS! What's missing?

```
var x=0; //<<INIT
while (x<10) { //<< COND
	console.log(x); << WORK
	x = x+1; //<< CHANGE!
}
```

EXERCISE: While 1 & 2


### For loops



EXERCISE: For loops

---
## Arrays basics

EXERCISE: Be the Array!

Everybody think of an interesting expression; use two operators.

```
var left = [];
var right = [];

left[5] = right[5];

left.length;

var single = left.pop();
right.push(single)

var all = left.concat(right);
```

#### Array literal notation

Example: [1,2,3]

Define an array by enumerating all its elements at once, before using any


#### Indexing (Dereferencing)

Drawing: an array variable holds arrow to Big Box!
Big Box has series of compartments

Index operator _[_]  (arr[n]) means

* start at variable arr,
* follow arrow to BigBox,
* then go into Nth compartment

#### Reading elements


#### Writing elements



### EXERCISE: Arrays


## Arrays w. Loops


### EXERCISE: Arrays with Loops 1

### EXERCISE: Arrays with Loops 2

---
## Functions

Definition:
```
function double(n) {
	return n+n;
}
```

Alternative:
```
var double = function(n) {
	return n+n;
}
```

Usage:
```
double(3);
double('banana');
```

Functions are like _customizable operators_


### Inputs: Parameters vs. Arguments

Inputs: Arguments are copied into parameters, used as local variables


### Return values & Calling context

Output: Return value specifies replacement in calling context

Examples of calling context:
```
(1+double(5));
(Math.sqrt(4)/2)
console.log('Twice seven is '+double(7));
```

`return` Exits immediately
No return, or return w/o value --> undefined


Example:
function elementAt(array, idx) {

}


Example:
function push(array,item){
	
}

# Being the interpreter

Defines a variable (in same "table" as neighbors);
value is arrow to a Big Box!
Box with 
1) code stored for later
2) list of parameter names
3) arrow to table of variables


### Scope and Shadowing

A function starts a new table of variables!
Local variables shadow globals

```
var sum=0;
function mean(a,b) {
	var sum = a+b;
	return sum/2;
}
```

#### Return values vs. side-effect

Some operations which have side effects (e.g. setting variables) have their effects contained within the function;
function itself has no effects;

Examples of effect-free functions:
double(x)
mean(17,23)

Example of side-effect:
push()
console.log()


#EXERCISE: Fun with functions


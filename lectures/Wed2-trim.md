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

Functions are like...
	"procedures"
	repeatable actions
	customizable operators
	mini-programs
	building-blocks (molecules) of behavior


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

#### Function names

### EXERCISES
#### fun with functions

#### emulating array functions





# Being the interpreter (0:30)

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


## EXERCISE: Scope 
Predict what will happen in each of the following programs:

var x=1, y=1;
function fun(x) {
	x=3;
	console.log('x='+x, 'y='+y);
}
fun(2);
console.log('x='+x, 'y='+y);


var x=1, y=1;
function fun(z) {
	x=3;
	console.log('x='+x, 'y='+y);
}
fun(2);
console.log('x='+x, 'y='+y);


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



# Defensive Programming and Assertions (20 min)


revisit `function mean(nums){}`...

What can go wrong?

### Exercise: write assert

(Aside:
Notice that claim must be evaluated first, and only resulting value (Boolean?) is passed as argument
)

### Assertion purpose #1: catching invalid inputs
```
function mean(nums) {
	assert(typeof nums === 'object', "Argument should be an array");
}

Messages are nice, but program can't read them (only human).  How to let program (e.g. calling context) recognize problem?

#### Error-signaling return values

Imagine a function: overlap(str1,str2):
overlap('puppies','pie')--> 'pie'
overlap('turtles','less')-->'les'

What should function return for `overlap(17,false)`?
What about `overlap('beer','pong')`?

Error-signaling return value should be unmistakeable, distinct from valid outcomes


### Assertion purpose #2: retroactive testing
`assert()` appear outside function definition; instead uses it to test return value or side effect

assert(typeof overlap('beer','pong')==='string', "overlap must return a string")
assert(overlap('beer','pong')==='', "overlap must return '' when strings have no common letters")


### HW2 testing site?

http://pcstesting.herokuapp.com

## Codewars

Join Codewars to explore hundreds of fun coding challenges!
If you want to be be part of the PCS social network click [here](www.codewars.com/r/SvZjrQ) or join the clan 'PCS'




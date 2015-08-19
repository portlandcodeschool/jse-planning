## Seating shuffle!

## Morale boosting: exploration in twilight

HW2 solutions + HW3: coming
Tomorrow: HW2 review session


## Where to evaluate JS files

#### Scratchpad

#### node

REPL
REPL + .load
node file.js


#### JS within HTML

#### Websites:
Codepen, JSfiddle


## Generalize Arrays

Arrays are compound structure--
can talk about either the whole or individual parts

Parts are named with numbers

Generalize:

Object is generalization of Array, whose parts can be named by words/strings

var arr = [true,'banana',Infinity];
// Implicit keys: 0,1,2

var obj = {a:true, b:'banana', c:Infinity};
// Explicit keys: 'a','b','c'

// keys don't need to be sequential:
var obj2 = {true:true, banana:'banana', 'Infinity':Infinity}


Accessing elements works the same way with index operator: []
arr[1];  //getting element
arr[1] = 'pear';  //setting element

obj['b']
obj['b'] = 'pineapple' 


### no declaration needed
obj['pi'] = 3.14  //Incremental property creation


### Property = Key+Value


### Membership operators: [] vs .

Index/membership operator [] can _contain_ expressions
obj2['ban'+'ana']= 'yellow'

--> can contain variables
--> strings must be quoted


Objects have a second operator to access members: the "dot" operator:
obj.b
obj.b = 'blueberry'
--> property name is verbatim, cannot be expression
--> cannot be variable, replaced dynamicaly
--> need not (must not!) be quoted


EXAMPLE
```
var x='y',
	y='x';
obj = {x:0, y:1}
obj.x //0
obj[x] //1
obj['x'] //0
```


EXERCISE 1-2: Objects and Properties


### Arrays vs Objects

Arrays made with [], objects with {}
(Alternative: new Array(), new Object())

Arrays have _implicit_ keys, always integers, so enumerate only values: [true,'banana',Infinity];
Objects have _explicit keys, must be included: {a:true,b:'banana',c:Infinity}

Arrays have an implicit ordering (like an ice-cube tray); objects don't (like a bag)

Arrays have a length property which is automatically linked to keys; Objs don't.


Arrays are special type of object:
`typeof arr`
`arr instanceof Object`-->true
`obj instanceof Array`--> false



### Nested objects and Chained expressions

var duck = {noise:'quack', feet:2, canSwim:true};
var nest = {mama:duck};

Another way?
var nest = {mama:{noise:'quack', feet:2, canSwim:true}};


Another way?
var nest = {};
nest.mama = {noise:'quack', feet:2, canSwim:true};

Another way?
var nest = new Object;
nest.mama = new Object;
nest.mama.noise = 'quack'; // "chain" expression
nest.mama.feet = 2;
nest.mama.canSwim = true;
//Dotted Chain (always has form: var.prop.prop...


Another way?
var nest = new Object();
nest['mama'] = new Object();
nest['mama']['noise'];

(nest.mama).noise ///OK

What about
nest[mama['noise']]; //WRONG
nest.(mama.noise) //WRONG


EXERCISE 3-4


### Determining membership

operator `in`

or (almost!)

obj.key === undefined

### Looping over object properties

`for (... in ...)`

`Object.keys(arr)`


EXERCISE 5-8 (save 9 for home)


(#### for loops with objects)


## JSON

## References

Vars and props don't store objects, but references to them.

An object NAME IS NOT THE OBJECT, but a reference to it.  Consider it an arrow.

Name is little box; object is big box.

null

delete


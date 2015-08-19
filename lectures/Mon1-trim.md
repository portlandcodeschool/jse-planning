
## Admin

Warm-up: N-2

TAs

Doors, bathroom codes, WiFi, parking

Calendar: MW + 1 Sat/month; Labor day week off
Challenge Day this Sat: OES 10-2
Office hours on calendar

Slack
c
Syllabus

Advice: code a lot!
HWs: due Mon

node, Git: try installing, details Wed

Harvest & time tracking

Questions?

## Big picture: full stack

-   Point of the course: websites in JavaScript
-   Building websites
    -   Server
    -   Client
-   Client code
    -   runs in the browser
    -   tells the browser what to display
-   Server code
    -   runs on the host (define host!)
    -   server handles data
    -   server gives client code and html
    -   persistence
-   Database <==> Server <==> Client <==> UI
-   Course outline
    -   Basic JavaScript
    -   Client
        -   jQuery
        -   Backbone
    -   Server
        -   Node
    -   Persistence
        -   Databases
-   What is JavaScript
    -   Programming language
    -   A program is like a recipe or directions
    -   Computers need every detail spelled out
    -   A programming language is
        -   A way to give instructions to a computer
            -   Pre-defined instructions to give the computer
                -   Like "chop finely" or "turn left at the next light"
            -   A way to **execute** those instructions on a computer
-   What makes Javascript special?
    -   It was essentially **designed** for interacting with the browser
        -   Only more recently has it become useful for server-side programming
    -   All browsers have settle on Javascript as the language that they use for dynamic web pages
        -   In order for a programming language to be used in client side programming, the browser has to support it




## Console/REPL
Service entrance

Calculator

`1+2*3`

Programming generalizes...

### Operators

Funnel merge values

Nested funnels --> expression

##### Generalize: Number of Inputs

Unary, binary, ternary

##### Generalize: Positions of Inputs

Operator templates

Infix, prefix, postfix

##### Generalize: How to merge (More ops)

mod: `%`

`(4+(-1))*(5-1)/(7%4)`

##### Generalize: Precedence


##### Generalize Merging: ,


##### Generalize Merging: sameness ===



### Exercise: Invent an Operator! (5min)



### Variables

named box

`var x;`

volatile, not like algebra:
`(x=1, x=2, x=3)`

## Side-effects vs. Results

assignment operator `=`

console.log()

### Assignment

manipulator claw --> side-effects

### Exercise: parse and evaluate this! (5min)

`((4+(-1))*(x=(5-1))/(7%x) == x)`

##### Generalize merging: save for later

### Incremental Assignment

`x=x+7` --> `x+=7`

`x++; ++x`

### Declaration
`var x`
`var x=0` (initialization)

`var` always results in undefined;
side-effect only

Using undeclared vars is running with scissors

### Variable Names (Identifiers)

---

## Primitives and Types

operator `typeof`

### Numbers

No integers, only 'floats'

`typeof 1 === typeof -3.14159`

### Exercise: Experimenting w. Arithmetic (10min)


#### Infinity

isFinite()

#### NaN
`banana/2`

honorary number

never equal

isNaN()

### Boolean

Boolean operators return special type

`==` vs `===`

### undefined

`var x;`

`typeof blerg`

## Strings

`typeof typeof ____`

Empty string

Single vs double quote

(ES6 backtick quote)


#### Use vs. Mention  (N vs 'N')


#### Coercion

'1' == 1

### Concatenation


```
var numStudents=18;
var numHelpers=4;
"There are "+(numStudents+numHelpers)+" people in the room"
```

`"There are "+numStudents+numHelpers+" people in the room"` -->184

#### Exercises: fun with concat! (8m)

```
"3" + 4
"this" + "is" + "a" + "string"
+"30" + 5
+"stuff"
```

<!--```
var x='1';
var y = 2;
//intervening stuff...
var sum = x+y;//'12'!
```-->

### Exercise: Explain this: (5m)
```
var y;
y=x+1-1;//10
typeof y;//number
y=x-1+1;//1
typeof y;//number
```

###Exercise: Explain this too (5m)
```
var small=9;
var big=10
small< big;//true
x+small < x+big;//false!
```

### Exercises: Be the Interpreter

```
var x;
var y;
x = 10;
y = x;
y = y + 5;
console.log(x);
console.log(y);
```
Volunteer to trace on board?

```
var x = 20;
x = x + 5;
console.log(typeof x);
x = "a string";
console.log(typeof x);
console.log(typeof (x + undefined));
```
Volunteer to trace...

```
var x = 10;
var y = x;
var z = y;
y = z + z;
x = 2*y;
z = "" + x;
console.log(z + z);
```
Volunteer to trace...


With group:
```
var a=81, b=108;
while (b>0) {
	var t = b;
	b = a % b;
	a = t;
}
var g = a;
```

```
var a=60, b=84;
while (a!==b) {
	if (a>b)
		a-=b;
	else
		b-=a;
}
var g = b;
```

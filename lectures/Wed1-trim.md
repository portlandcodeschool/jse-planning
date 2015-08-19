Challenge course

## Be the Interpreter

Monday exercises 1-3

## Boolean operators

Boolean operators express basic logic of 'and', 'or', 'not'...

&&
||
!


### Exercise 1





## Simple conditionals

if (x<10) 'less';

### console.log

if (x<10) console.log(x);



## Truthiness: Boolean ops w. other vals

if (x) console.log(x);

Every value has truthiness!

Therefore Boolean ops work with non-Boolean values.


### Exercise 2

## More Conditionals: else, blocks

if (x<10) console.log('less') else console.log('not')

Scratchpad!

if (x<10)
	console.log('less')
else
	console.log('not')


# Conditional Blocks
What happens here?

```
var rainy=true, accessory, footwear;
if (rainy)
	accessory="umbrella";
	footwear="galoshes";
```

Correct:
```
if (rainy) {
	accessory="umbrella";
	footwear="galoshes";
}
```

```
if (rainy) {
	accessory="umbrella";
	footwear="galoshes";
} else {
	accessory= "sunscreen";
	footwear = "sandals";
}
```


## Boolean operators and short-circuting

### Exercise 3

Boolean ops are actually branching!

More like `if () ... else`
than like `A+B`

True definition: 

`A || B` means
`if (A) A else B`

`A && B` means
`if (A) B else A`


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



### For loops



# Node

# Git and Homework

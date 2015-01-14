
### Homework #1 Solutions

**1)** (_Difficulty: mixed_)
Before testing these expressions in the console, predict what their output will be.  If the output depends on x, identify the conditions when the expression will output true.  Assume the cases are independent, and x is reset to an unknown value before each.

Some of these are tricky!  Don't trust your first instinct.  


**a)** `"1" == 1`
<pre>
true.   The equality operator coerces string "1" to numeric 1 and finds 1==1.
</pre>

**b)** `"1" === 1`
<pre>
false.  The identity operator never coerces types; since types here differ, the values are not identical.
</pre>

**c)** `x == 'x'`
<pre>
false UNLESS x is literally string 'x'
</pre>

**d)** `x == (x+'')`
<pre> true UNLESS x is NaN, undefined, true, or false.  
If NaN:		NaN == (NaN + '')
			NaN == 'NaN'
			NaN == NaN  (which JS defines as false)
If undefined:
			undefined == (undefined + '')
			undefined == 'undefined'  (which JS defines as false)
If true:	true == (true+'')
			true == 'true'
			1 == 'true'
			1 == NaN
If false:	false == (false+'')
			false == 'false'
			0 == 'false'
			0 == NaN
</pre>

**e)** `'' == ' '`
<pre>
false.  Empty string '' is unequal to all non-empty strings.
</pre>

**f)** `x = true`
<pre>
true.  Whatever x was before, it gets reassigned to true, and the expression returns true.
</pre>

**g)** `var x; x == 'undefined'`
<pre>
false UNLESS x was declared earlier to be the string 'undefined'.  The first declaration `var x` sets x equal to undefined (special value), not string 'undefined'.  Subsequent declarations `var x` do nothing.
</pre>

**h)** `'9'<'10'`
<pre>
false.  Strings are compared alphabetically, and '9'>'1*' for any *.
</pre>

**i)** `typeof x + 1 === "number"`
<pre>
false.  This is really:
	(typeof x)+1 === "number"
	"*****"+1 === "number"
	"*****1" === "number"
</pre>

**j)** `typeof x % 2 === "number"`
<pre>
false.  This is really:
	(typeof x) % 2 === "number"
	"*****" % 2 === "number"
	NaN === "number"
</pre>

**k)** `typeof (x % 2) === "number"`
<pre> true.  The % operator always yields a number (possibly NaN).
</pre>

**l)** `x++ == ++x`
<pre> false UNLESS x is +-Infinity.  If x can be incremented (i.e. is a number or numeric string), the value on the right is 2 greater than that on the left (which makes them equal only for +-Infinity).  If x can't be incremented (e.g. is a non-numeric string like 'apple'), the expression is `NaN == NaN`.
</pre>

**m)** `++x == x++`
<pre> true UNLESS x is non-numeric string.  If non-numeric string (e.g. 'apple'), this becomes `NaN == NaN`.
</pre>

**n)** `"1"+x == 1+x`
<pre> true when x is any string:
	'1'+x == 1+x
	'1'+'****' == 1+x
	'1****' == 1+x
	'1****' == '1****'
</pre>

**o)** `"0"+1 == 1`
<pre> true:
	'0'+1 == 1
	'0'+'1' == 1
	'01' == 1
	1 == 1
</pre>

**p)** `(typeof (x+1))===(typeof x)`	
<pre> true if x is a number or string.  If number, then both (x+1) and x are type 'number'; if string, then both are type 'string'.  But if x is type 'boolean' then (x+1) is type 'number' (since true+1 is 2 and false+1 is 1).
</pre>

**q)** `(x*1 == x) || ((typeof x) != "number")`
<pre> true UNLESS x is NaN.  For non-numbers, the right-hand side of the || is true, and for numbers except NaN, the left side is true.  For NaN, both sides are false, so the whole thing is false.
</pre>

**r)** `(x=(typeof (x+(typeof x))))==x`
<pre> true.  For any x, this becomes:
	(x=(typeof (x+'*****')))==x
	(x=(typeof 'x*****'))==x
	(x='string') == x
	'string' == 'string'
</pre>

---

 **2)** (_Difficulty: easy_)

Assume variables x, y, and z are numbers.

**a)**
Write an expression for the mean (i.e. average) of x, y, and z.
```
(x+y+z)/3
```

**b)**
Write a series of expressions to adjust each of x, y, and z
halfway toward their mean.
```
var mean  = (x+y+z/3);
x = (x+mean)/2;
y = (y+mean)/2;
z = (z+mean)/2;
```
or
```
x+= (mean-x)/2;
y+= (mean-y)/2;
z+= (mean-z)/2;
```

---

**3)** (_Difficulty: easyish_)

Suppose you're encoding geometric shapes in a Cartesian coordinate system, and you represent a rectangle with four numeric variables:

- _l_ : horizontal position of left edge;
- _r_ : horizontal position of right edge;
- _t_ : vertical position of top edge;
- _b_ : vertical position of bottom edge.

**a)**
Write an expression for the rectangle's area.
```
var area = (r-l)*(t-b)
```

**b)**
Write an expression which is true if the rectangle is taller than it is wide, and false otherwise.
```
var isTall = (t-b)>(r-l);
```

**c)**
Write an expression for the circumference of the biggest circle which can fit inside the rectangle.
```
var smallerDiam;
var isTall = (t-b)>(r-l);

if (isTall) {
	smallerDiam = r-l;
} else {
	smallerDiam = t-b;
//OR:
var smallerDiam = isTall? (r-l): (t-b);
//OR:
var smallerDiam = (r-l)*isTall + (t-b)*(!isTall);

var circumference = smallerDiam * Math.PI;
```

**d)**
Write an expression for the area of the smallest circle which completely encloses (i.e. circumscribes) the rectangle.
```
var w = r-l,
	h = t-b,
	diamSquared = h*h + w*w,
	radiusSquared = diamSquared/4,
	area = Math.PI * radiusSquared;
```

**e)**
Imagine subdividing your rectangle into 3 equal rows and 3 equal columns, which would create 9 smaller rectangles, identical in shape but varying by position.
Define four new variables describing the centermost small rectangle.
(Hint: one of the many solutions is very similar to the solution of **2b** above.)

Solution using weighted means:
```
var lc = (2*l + r)/3;
var rc = (2*r + l)/3;
var tc = (2*t + b)/3;
var bc = (2*b + t)/3;
```
Solution using widths:
```
var miniWidth = (r-l)/3;
var miniHeight = (t-b)/3;
var lc = l + miniWidth; // == l*3/3 + (r-l)/3 == (3*l+r-l)/3 == (2*l+r)/3, as above
var rc = r - miniWidth;
var bc = b + miniHeight;
var tc = t - miniHeight;
```
---

**4)** (_Difficulty: easyish_)

**a)**
Given a particular R and C, find the corresponding N.  That is, write an expression for variable N containing variables R and C.
```
n = 8*r + c;
```

**b)**
Given N, find R.  Write an expression for R which contains N.
```
r = Math.floor(n/8);
```

**c)**
Given N, find C.  Write an expression for C which contains N.
```
c = n%8;
```

**d)**
```
var color = (r%2 == c%2) ? 'black' : 'white';
//OR
var color = ((r+c)%2 == 0) ? 'black' : 'white';
//OR
var color = ((r+c+1)%2) ? 'black' : 'white';
//OR
var color = ((r+n)%2 == 0) ? 'black' : 'white';
//OR many others...
```
---

**5)** (_Difficulty: moderate_)

Suppose you represent a fraction (_n/d_) with 2 integer variables: _n_ for the numerator and _d_ for the denominator.
If _n_ is greater than _d_, the fraction is "improper", but it can be rewritten as a proper fraction.  For example, "7/4" is improper, but it can be rewritten "1 3/4", which is proper.

Write an expression for a string expressing the proper form of an improper fraction _n/d_.  When _n==7_ and _d==4_, your resulting string should be "1 3/4".  You may assume both _n_ and _d_ are positive integers and _n_ > _d_.

(_Hint: you'll need the modulo operator _%_, and you'll probably want to create a couple of extra variables._)
```
var remainder = n % d;
var evenlyDivisible = n - remainder;
var wholes = evenlyDivisible / d;       //always an integer!
var result = wholes + ' ' + remainder + '/' + d;
```

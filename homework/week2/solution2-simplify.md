

**a)**

Original:
```
var i;
if ((n - Math.floor(n)) >= .5) {
   i = Math.ceil(n);
} else {
  i = Math.floor(n);
}
```

Solution:
```
var i = Math.round(n);
```

---

**b)**

Original:
```
var y, xIsFalse = (x? false : true);
if (xIsFalse)
   y = false;
else
   y = x;
```

Solutions:
```
var y = (x? x: false);
```
OR
```
var y = x || false;
```

---

**c)**

Original:
```
for (var count = 15 - i ; count < 15 ; count=count+1) {
    i = i-1;
    console.log(i+1)
}
```

Solutions:
```
for ( ; i>0; i--) {
    console.log(i);
}
```
OR
```
while (i>0) {
      console.log(i);
      i--;
}
```
OR
```
while (i>0) {
      console.log(i--);
}
```

---

**d)**

Original:
```
var x;
if (a) {
   if (b) {
     x = 0;
   } else {
     x = 1;
   }
} else {
  if (b) {
    x = 1;
  } else {
    x = 2;
  }
}
```

Solutions:
```
var x;
if (a && b) {
   x = 0;
} else if (a || b) {
  x = 1;
} else {
  x = 2;
}
```
OR
```
var x = (a && b)? 0: ((a||b)? 1: 2);
```
OR
```
var x = 0;
if (!a) x++;
if (!b) x++;
```
OR
```
var x = (a? 0: 1) + (b? 0: 1);
```
OR
```
var x = (!a*1) + (!b*1);
```
A brief explanation of the last solution:
whatever value _a_ starts with, `!a` will be the opposite boolean, and that will be auto-converted to either 0 or 1 by the numeric operation `(!a*1)`.  An initially falsish _a_ will produce 1 and truish _a_ will produce 0, likewise with _b_, so the sum _x_ is the number of falsish inputs.

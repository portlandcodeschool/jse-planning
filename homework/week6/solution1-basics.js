**1a)**

```
function Ctor() {
	this.a = 0;
	this.b = 1;
}

var obj1 = new Ctor();
var obj2 = new Ctor();

var obj3 = {};
Ctor.call(obj3); // initializes obj3 properties
obj3 // {a:0, b:1}

obj1.c = 2; // obj2.c remains undefined

obj1.constructor.prototype.d = 3;

obj1.d // 3
obj2.d // 3
obj3.d // undefined
```
Because obj1 and obj2 are made by new, they are automatically linked to Ctor.prototype.
But obj3 is made (implicitly) with 'new Object', so its proto is Object.prototype,
and it will not inherit from Ctor.prototype.




**1b)**

The prototype which is created automatically when its constructor is defined is given a property 'constructor' which is then inherited by the constructor's instances.
So objB.constructor is B.
But replacing the default prototype with a new object, as with
```
A.prototype = ...
```
doesn't reset the constructor property on the new object.   Therefore objA inherits the new prototype's original constructor, which is Object.
So objA.constructor is Object, not A.






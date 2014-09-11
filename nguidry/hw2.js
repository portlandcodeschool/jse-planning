// 1a

var printFraction = function(n,d) {
	var n;
	var d;
	var x = Math.floor(n/d);
	var result = x + " " + (n%d) + "/" + d;
	return result;
}

//1b

var printFraction = function(n,d) {
	var n,
		d,
		x = Math.floor(n/d),
		result = "";
	if (n<d) {
		result = (n%d) + "/" + d;
	} else if (n%d === 0) {
		result = n/d;
	} else {
		result = x + " " + (n%d) + "/" + d;
	}

	return result;
}

//2a

//2b
var x,
	y, 
	xIsFalse = (x? false : true);
if (xIsFalse) {
   y = false;
}
else {
   y = x;
 }

 y || x;
}

//2c

//2d

//3 - stuck on addGift function 

var dayNum = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];

var giftList = ["a partridge in a pear tree", "two turtle doves", "three french hens", "four calling birds", "five golden rings", "six geese a laying", "seven swans a swimming", "eight maids a milking", "nine ladies dancing", "ten lords a leaping", "eleven pipers piping", "twelve drummers drumming"];

var giftsRecd = "";

var addGift = function() {
    
    for (var x = 1; x > -1; x--) {
		giftsRecd += giftList[x] + ",\n";
	}
   return giftsRecd;
}

addGift();

var singCarol = function() {
	var lyrics; 
    for (var i = 0; i < dayNum.length; i++) {
        addGift();
        lyrics += "On the " + dayNum[i] + " day of Christmas\nMy true love gave to me:\n"; 
	}
	return lyrics;
}


singCarol(); 

//4a

/* Write a function `and2(a,b)` which tries to simulate the && operator: it should always return the same result as 
`(a && b)` for any values of _a_ and _b_.  (For example, `and2((0>1),true)` should return _false_.)  But you can't use && itself 
within your function! */

var and2 = function(a,b) {
	if (a === true) {
        return b;
    } else {
        return a;};
};

//4b

//4c

//4d

//5a

//5b

//5c

















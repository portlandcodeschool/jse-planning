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

Math.round(n);

//2b 

x || y;

//2c

for (var i; i > 0; i--) {
    console.log(i);
}

//2d -- ????

a && b;

//3 

var dayNum = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"],
    giftList = ["A partridge in a pear tree", "Two turtle doves", "Three french hens", "Four calling birds", "Five golden rings", "Six geese a laying", "Seven swans a swimming", "Eight maids a milking", "Nine ladies dancing", "Ten lords a leaping", "Eleven pipers piping", "Twelve drummers drumming"],
    giftsRecd = "",
    i,
    lyrics = "";

function addGift() {
       giftsRecd = "";
       if (i === 0) {
           giftsRecd += giftList[i] + "\n";
       } 
       else {
           for (var x = i; x > 0; x--) {
                giftsRecd += giftList[x] + ",\n";
            }
           giftsRecd += "And " + giftList[0].toLowerCase() + ".\n";
       }
}

function singCarol() {
    for (i = 0; i < dayNum.length; i++) {
        lyrics += "On the " + dayNum[i] + " day of Christmas\nMy true love gave to me:\n"; 
        addGift();
        lyrics += giftsRecd + "\n";
    }
	return lyrics;
}

singCarol(); 

//4a -- incomplete

/* Write a function `and2(a,b)` which tries to simulate the && operator: it should always return the same result as 
`(a && b)` for any values of _a_ and _b_.  (For example, `and2((0>1),true)` should return _false_.)  But you can't use && itself 
within your function! */

function and2(a,b) {
    if (a) {
       b;
    } else {
       a;
    }
}

//4b

//4c

//4d

//5a

//5b

//5c

















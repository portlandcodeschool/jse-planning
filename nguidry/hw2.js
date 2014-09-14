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

//2d

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

//4a

function and2(a,b) {
    if (a) {
       return b;
    } else {
       return a;
    }
}

//4b 

function and3(a,b,c) {
	if (a == true) {
		if (b == true) {
			if (c == true){return true;} 
			   else {return false;}
        }
        else {return false;}
    }
    else {return false;}
}    

//4c

var values = [true, true, true, true, false, true];

var n = values.length;

function andN(n, values) {
	for (n; n > 0; n--) {
        if (values[n] == false) {return false;} 
  	}
    return true;
}

andN(n, values);

//4d
/*
The andN function evaluates first for falseyness, and the && operator evaluates for truthiness. 
The andN function has to evaluate for falseyness so it knows when to stop and trigger the return, 
in order to return the result correctly. 

Some types will not be evaluated "correctly" by the andN function. For example, inserting NaN into 
the values array for the andN function will return true, because the loop is checking for anything 
that is specifically false, and NaN is not specifically false. However, running NaN against a true 
function with the && operator will always return "NaN", since NaN in a simple expression will always 
results in a NaN return.
*/















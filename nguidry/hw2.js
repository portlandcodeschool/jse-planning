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

printFraction(7,4);

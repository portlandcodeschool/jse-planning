// Part A:
function printFraction(n,d) {
  var remainder = n%d;
  var wholes = (n - remainder)/d;
  return wholes + ' ' + remainder + '/' + d;
}

//Part B:
function printFraction(n.d) {
  if (!n) // if numerator is zero, return early with just 0
  	return "0";
  //otherwise:
  var remainder = n%d;
  var wholes = (n - remainder)/d;
  var output = '';
  if (wholes) // if non-zero whole units
    output += (wholes + ' ');  // include it
  if (remainder) // if non-zero remainer,
    output += (remainder + '/' + d); // include it
  return output;
}


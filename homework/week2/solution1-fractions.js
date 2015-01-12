// Part A:
function fractionString(n,d) {
  var remainder = n%d;
  var wholes = (n - remainder)/d; //always integer
  return wholes + ' ' + remainder + '/' + d;
}

//Part B:
function fractionString(n,d) {
  if (!n) {// if numerator is zero, return early with just 0
  	return "0";
  }
  //otherwise:
  var remainder = n%d;
  var wholes = (n - remainder)/d;
  var output = ''; //initially blank output, augmented below

  // These conditions are independent; either or both may be true:
  if (wholes) // if non-zero whole units
    output += (wholes + ' ');  // include it in output

  if (remainder) // if non-zero remainer,
    output += (remainder + '/' + d); // include it too
  
  return output;
}


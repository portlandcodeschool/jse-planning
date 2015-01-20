// a)  Some equivalent solutions:

function and2(a,b) {
	if (a) {
		return b;
	} else {
		return a;
	}
}

function and2(a,b) {
	if (a) return b;
	return a;
}

function and2(a,b) {
	return (a? b: a);  //ternary conditional operator
}

// b) Some equivalent solutions:

function and3(a,b,c) {
	if (a) {
		if (b) {
			return c;
		} else {
			return b;
		}
	} else {
		return a;
	}
}

function and3(a,b,c) {
	if (a) {
		if (b) return c;
		else return b;
	}
	return a;
}

function and3(a,b,c) {
  return a? (b? c: b): a;   //nested ternary conditional operator
}

function and3(a,b,c) {
  return (and2(and2(a,b),and2(b,c)))
}

function and3(a,b,c) {
  return (and2(and2(a,b),c))
}

// c)

function andN(values) {
	var n = values.length;
  	for (var i=0; i<n; i++) {
    	if (!values[i]) {
			return values[i]; //return first falsish val
		}
  	}
  	if (n>0) {
    	return values[n-1]; //or else last (truish) val
    }
    return true; // only when n is 0;
}

/*
d)

The operators && and || are "short-circuiting", meaning that they only evaluate their operands as needed, left to right.  But a function call evaluates all its arguments before the function begins.  You can test this simply by using an undeclared variable in && or || and comparing that with the result from and2:

`false && undeclaredVar` vs `and2(false, undeclaredVar)`

Therefore the two forms may leave their environment in a different state.
For example:

`and3(x=0,x=1,x=2)` returns 0, just like `and3(0,1,2)`, but it leaves x equal to 2.

`(x=0) && (x=1) && (x==2)` also returns 0, but it evaluates only the `(x==0)` clause, so x remains 0.

The same difference can appear with any expressions which produces side effects.  For example, this expression:

`backupIsSuccessful(file) && deleteOriginal(file)`

will only delete the file if the backup is successful (returns true).  But this:

`and2( backupIsSuccessful(file), deleteOriginal(file) )`

will always delete the file, even if the backup fails (returns false).

*/


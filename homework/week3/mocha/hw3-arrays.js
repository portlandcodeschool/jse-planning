var array = [];
describe('Array.push', function() {
  it('should return the number passed in to it', function() {
    assert.equal(array.push(1), 1);
  });
  it('should result in an array with a single value when called on an empty array', function() {
    assert.equal(array[0], 1);
  });
  it('should append the value passed in to it to the end of the array', function() {
    array.push(2);
    assert.equal(array[1], 2);
  });
  it('should increase the length of the array', function() {
    assert.equal(array.length, 2);
  });
});
describe('Array.pop', function() {
  it('should return the value of the final object in the array', function() {
    assert.equal(array.pop(), 2);
  });
  it('should remove the last value from the array', function() {
    assert.equal(array[1], undefined);
  });
  it('should decrease the length of the array', function() {
    assert.equal(array.length, 1);
  });
  it('should leave an empty array when called on an array with a single item', function() {
    array.pop();
    assert.equal(array[0], undefined);
  });
  it('should return undefined when called on an empty array', function() {
    assert.equal(array.pop(), undefined);
  });
  it('should not reduce the length of an empty array', function() {
    assert.equal(array.length, 0);
  });
});
describe('Array.join', function() {
  it('should return an empty string when called on an empty array', function() {
    assert.equal(array.join(' '), '');
  });
  it('should return only the contents of the array when called on an array with a single item', function() {
    array.push('a');
    assert.equal(array.join(), 'a');
  });
  it('should use the specified character between array elements', function() {
    array.push('b');
    array.push('c');
    assert.equal(array.join('_'), 'a_b_c');
  });
  it('should use a comma between elements when nothing is specified', function() {
    assert.equal(array.join(','), 'a,b,c');
  });
  it('should leave the original array unchanged', function() {
    assert.equal(array[0], 'a');
    assert.equal(array[1], 'b');
    assert.equal(array[2], 'c');
  });
});

var array = {
  length:0,

  push: function(val) {
    this[this.length] = val;
    this.length += 1;
    return this.length;
  },

  pop: function() {
    if (this.length<1)
      return undefined; //nothing to pop
    this.length -= 1;
    var lastVal = this[this.length]; //keep copy of last item
    delete this[this.length]; // destroy last item
    return lastVal; //return copy
  },

  join: function(delim) {
    if (delim === undefined)
      delim = ',';  // use comma as default delimiter if none is provided

    var str = ''; //accumulate result string here
    for (var i=0; i<this.length; i++) {
      if (this[i]!==undefined) // unless element is undefined...
        str += this[i];	// append it to str
      if (i < this.length - 1) // if another element follows...
        str += delim;  // append delimiter
    }
    return str;
  }
}; //end array defn


// -------- Part c --------
// To test a custom array implementation (see problem 2), simply
// comment out the initial var array = []; and include your array
// object. Be sure to use a variable name of array to refer to it!

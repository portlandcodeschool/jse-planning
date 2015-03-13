describe('makeDeque factory', function() {
  it('should be a function', function() {
    assert.isFunction(makeDeque);
  });
});
describe('makeDeque', function() {
  var inputArray = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth'];
  var testDeck;
  it('should be an object', function() {
    assert.isObject(testDeck = makeDeque(inputArray));
  });
  it('should contain an array of all the values passed into it', function() {
    assert.deepEqual(testDeck.array, inputArray);
  });
  describe('instance.length', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.length);
    });
    it('should return the length of the internal array', function() {
      assert.equal(testDeck.length(), 10);
    });
  });
  describe('instance.top', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.top);
    });
    it('should return the last item in the array', function() {
      assert.equal(testDeck.top(), 'tenth');
    });
    it('should not change the length of the deque', function() {
      assert.equal(testDeck.length(), 10);
    });
  });
  describe('instance.bottom', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.bottom);
    });
    it('should return the first item in the array', function() {
      assert.equal(testDeck.bottom(), 'first');
    });
    it('should not change the length of the deque', function() {
      assert.equal(testDeck.length(), 10);
    });
  });
  describe('instance.pop', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.pop);
    });
    it('should return the last (or "top") item of the deque', function() {
      assert.equal(testDeck.pop(), 'tenth');
    });
    it('should remove the returned item from the array', function() {
      assert.deepEqual(testDeck.array, ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth']);
    });
    it('should decrease the length of the deque by one', function() {
      assert.equal(testDeck.length(), 9);
    });
    it('should return undefined when called on an empty deque', function() {
      assert.isUndefined(makeDeque([]).pop());
    });
  });
  describe('instance.push', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.push);
    });
    it('should return the new length of the deque', function() {
      assert.equal(testDeck.push('tenth'), '10');
    });
    it('should add an item to the end (or "top") of the deque', function() {
      assert.deepEqual(testDeck.array, ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth']);
    });
    it('should increase the length of the deque', function() {
      assert.equal(testDeck.length(), 10);
    });
  });
  describe('instance.shift', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.shift);
    });
    it('should return the first (or "bottom") item of the deque', function() {
      assert.equal(testDeck.shift(), 'first');
    });
    it('should remove the returned item from the array', function() {
      assert.deepEqual(testDeck.array, ['second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth']);
    });
    it('should decrease the length of the deque by one', function() {
      assert.equal(testDeck.length(), 9);
    });
    it('should return undefined when called on an empty deque', function() {
      assert.isUndefined(makeDeque([]).shift());
    });
  });
  describe('instance.unshift', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.unshift);
    });
    it('should return the new length of the deque', function() {
      assert.equal(testDeck.unshift('first'), '10');
    });
    it('should add an item to the beginning (or "bottom") of the deque', function() {
      assert.deepEqual(testDeck.array, ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth']);
    });
    it('should increase the length of the deque', function() {
      assert.equal(testDeck.length(), 10);
    });
  });
  describe('instance.cut', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.cut);
    });
    it('should put the second half of the deque in front of the first half', function() {
      testDeck.cut();
      assert.deepEqual(testDeck.array, ['sixth', 'seventh', 'eigth', 'ninth', 'tenth','first', 'second', 'third', 'fourth', 'fifth']);
    });
    it('should split towards the end (or "top") of the array if the array length it odd', function() {
      testDeck.pop();
      testDeck.cut();
      assert.deepEqual(testDeck.array, ['first', 'second', 'third', 'fourth','sixth', 'seventh', 'eigth', 'ninth','tenth']);
    });
    it('should not change deques with fewer than two items', function() {
      var singleItemDeque = makeDeque([1]);
      singleItemDeque.cut();
      assert.deepEqual(singleItemDeque.array, [1]);
    });
  });
  describe('instance.sort', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.sort);
    });
    it('should sort the deque in lexical order if no arguments are given', function() {
      testDeck.sort();
      assert.deepEqual(testDeck.array, ['eigth', 'first', 'fourth', 'ninth', 'second', 'seventh', 'sixth', 'tenth','third']);
    });
    it('should sort the deque according to the provided function if one is given', function() {
      testDeck.sort(function(a,b) { return a>b? -1 : 1;} );
      assert.deepEqual(testDeck.array, ['third', 'tenth', 'sixth', 'seventh', 'second', 'ninth', 'fourth', 'first', 'eigth']);
    });
  });
  describe('instance.map', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.map);
    });
    it('should return a new array based on the provided function', function() {
      var testMap = testDeck.map(function(x) { return x.toUpperCase();});
      assert.deepEqual(testMap, ['THIRD', 'TENTH', 'SIXTH', 'SEVENTH', 'SECOND', 'NINTH', 'FOURTH', 'FIRST', 'EIGTH']);
    });
  });
  describe('instance.shuffle', function() {
    it('should be a function', function() {
      assert.isFunction(testDeck.shuffle);
    });
    it('should not add to or remove from deque\'s array', function() {
      testDeck.shuffle();
      assert.sameMembers(testDeck.array, ['third', 'tenth', 'sixth', 'seventh', 'second', 'ninth', 'fourth', 'first', 'eigth']);
    });
    it('should change the order of the contents of the array', function() {
      assert.notDeepEqual(testDeck.array, ['third', 'tenth', 'sixth', 'seventh', 'second', 'ninth', 'fourth', 'first', 'eigth']);
    });
  });
  describe('Deque security', function() {
    it('should allow previously included items to be added back to the deque', function() {
      testDeck.push('fifth');
      assert.sameMembers(testDeck.array, ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth']);
    });
    it('should return false when new items are pushed or unshifted', function() {
      assert.equal(testDeck.push('eleven'), false);
      assert.equal(testDeck.unshift('eleven'), false);
    });
    it('should not modify the deque\'s array when invalid attempts are made', function() {
      assert.sameMembers(testDeck.array, ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth']);
    });
  });
});

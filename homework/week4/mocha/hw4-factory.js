// card instances needed for assertions:
var card0 = makeCard(0);
var card3 = makeCard(3);
var card5 = makeCard(5);
var card51 = makeCard(51);

describe('makeCard', function() {
  it('should be a function', function() {
    assert.isFunction(makeCard);
  });
  // changed from testing for false (as original instructions
  // wanted) because null != false
  it('should return a false-y value when passed 52', function() {
    assert.notOk(makeCard(52));
  });
  it('should return a false-y value when passed "0"', function() {
    assert.notOk(makeCard("0"));
  });
  it('should return a false-y value when passed -1', function() {
    assert.notOk(makeCard(-1));
  });
  it('should return a false-y value when passed false', function() {
    assert.notOk(makeCard(false));
  });
  it('should return a false-y value when passed true', function() {
    assert.notOk(makeCard(true));
  });
  describe('makeCard.rank', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.rank);
    });
    it('should return 1 for card0', function() {
      assert.equal(card0.rank(), 1);
    });
    it('should return 1 for card0', function() {
      assert.equal(card3.rank(), 1);
    });
    it('should return 1 for card0', function() {
      assert.equal(card51.rank(), 13);
    });
  });
  describe('makeCard.suit', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.suit);
    });
    it('should return 1 for card0', function() {
      assert.equal(card0.suit(), 1);
    });
    it('should return 2 for card5', function() {
      assert.equal(card5.suit(), 2);
    });
    it('should return 4 for card51', function() {
      assert.equal(card51.suit(), 4);
    });
  });
  describe('makeCard.color', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.color);
    });
    it('should return "red" for card0', function() {
      assert.equal(card0.color(), 'red');
    });
    it('should return "black" for card3', function() {
      assert.equal(card51.color(), 'black');
    });
  });
  describe('makeCard.name', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.cardName);
    });
    it('should return "red" for card0', function() {
      assert.equal(card5.name(), 'Two of Diamonds');
    });
    it('should return "black" for card51', function() {
      assert.equal(card51.name(), 'King of Clubs');
    });
  });
  describe('makeCard.isCard', function() {
    it('should be a function', function() {
      assert.isFunction(makeCard.isCard);
    });
    it('should be a shared, not an instance, function', function() {
      assert.isUndefined(card5.isCard);
    });
    it('should return true for card0', function() {
      assert.isTrue(makeCard.isCard(card0));
    });
    it('should return true for card51', function() {
      assert.isTrue(makeCard.isCard(card51));
    });
    it('should return a false-y value for 0', function() {
      assert.notOk(makeCard.isCard(0));
    });
    it('should return a false-y value for an empty object', function() {
      assert.notOk(makeCard.isCard({}));
    });
  });
  describe('makeCard.fullSet', function() {
    it('should be an array', function() {
      assert.isArray(makeCard.fullSet);
    });
    it('should have 52 items', function() {
      assert.lengthOf(makeCard.fullSet, 52);
    });
    it('should have a card object in position 0', function() {
      assert.isTrue(makeCard.isCard(makeCard.fullSet[0]));
    });
    it('should contain objects that match previously defined individual cards', function() {
      assert.deepEqual(makeCard.fullSet[5], card5);
    });
    it('should contain objects that match previously defined individual cards', function() {
      assert.deepEqual(makeCard.fullSet[51], card51);
    });
  });
  describe('makeCard shared methods', function() {
    it('should have created two different objects for card0 and card3', function() {
      assert.notDeepEqual(card0, card3);
    });
    it('should share rank functions between different card instances', function() {
      assert.deepEqual(card0.rank, card3.rank);
    });
    it('should share suit functions between different card instances', function() {
      assert.deepEqual(card0.suit, card3.suit);
    });
    it('should share name functions between different card instances', function() {
      assert.deepEqual(card0.name, card3.name);
    });
  });
});

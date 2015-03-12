// TESTING:
// var assert = require('assert');
describe('rank', function() {
  it('should return 1 when the card ID is 0', function() {
    assert.equal(rank(0), 1);
  });
  it('should return 1 when the card ID is 3', function() {
    assert.equal(rank(3), 1);
  });
  it('should return 13 when the card ID is 51', function() {
    assert.equal(rank(51), 13);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(isNaN(rank(52)), true);
  });
  it('should return NaN when the card ID is "0"', function() {
    assert.equal(isNaN(rank('0')), true);
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(isNaN(rank(-1)), true);
  });
  it('should return NaN when the card ID is 2.5', function() {
    assert.equal(isNaN(rank(2.5)), true);
  });
  it('should return NaN when the card ID is undefined', function() {
    assert.equal(isNaN(rank(undefined)), true);
  });
});

describe('suit', function() {
  it('should return 1 when the card ID is 0', function() {
    assert.equal(suit(0), 1);
  });
  it('should return 2 when the card ID is 5', function() {
    assert.equal(suit(5), 2);
  });
  it('should return 4 when the card ID is 51', function() {
    assert.equal(suit(0), 1);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(isNaN(suit(52)), true);
  });
  it('should return NaN when the card ID is false', function() {
    assert.equal(isNaN(suit(false)), true);
  });
  it('should return NaN when the card ID is true', function() {
    assert.equal(isNaN(suit(true)), true);
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(isNaN(suit(-1)), true);
  });
  it('should return NaN when the card ID is 3.14', function() {
    assert.equal(isNaN(suit(3.14)), true);
  });
});

describe('cardID', function() {
  it('should return 0 when the input is (1,1)', function() {
    assert.equal(cardID(1,1), 0);
  });
  it('should return 51 when the input is (13,4)', function() {
    assert.equal(cardID(13,4), 51);
  });
  it('should return 30 when the input is (8,3)', function() {
    assert.equal(cardID(8,3), 30);
  });
  it('should return NaN when the input is (0,1)', function() {
    assert.equal(isNaN(cardID(0,1)), true);
  });
  it('should return NaN when the input is ("1",1)', function() {
    assert.equal(isNaN(cardID('1',1)), true);
  });
  it('should return NaN when the input is (1,5)', function() {
    assert.equal(isNaN(cardID(1,5)), true);
  });
  it('should return NaN when the input is (14,1)', function() {
    assert.equal(isNaN(cardID(14,1)), true);
  });
  it('should return NaN when the input is (-1,-1)', function() {
    assert.equal(isNaN(cardID(-1,-1)), true);
  });
  it('should return NaN when the input is (0.5,1)', function() {
    assert.equal(isNaN(cardID(0.5,1)), true);
  });
  it('should return NaN when the input is (1,NaN)', function() {
    assert.equal(isNaN(cardID(1,NaN)), true);
  });
});

describe('color', function() {
  it('should return "red" when the card ID is 0', function() {
    assert.equal(color(0), 'red');
  });
  it('should return "black" when the card ID is 2', function() {
    assert.equal(color(2), 'black');
  });
  it('should return NaN when the card ID is "apple"', function() {
    assert.equal(isNaN(color("apple")), true);
  });
  it('should return NaN when the card ID is true', function() {
    assert.equal(isNaN(color(true)), true);
  });
  it('should return NaN when the card ID is false', function() {
    assert.equal(isNaN(color(false)), true);
  });
});

describe('name', function() {
  it('should return "Two of Diamonds" when the card ID is 5', function() {
    assert.equal(name(5), 'Two of Diamonds');
  });
  it('should return "King of Clubs" when the card ID is 51', function() {
    assert.equal(name(51), 'King of Clubs');
  });
  it('should return NaN when the card ID is -1', function() {
    assert.equal(isNaN(name(-1)), true);
  });
  it('should return NaN when the card ID is 52', function() {
    assert.equal(isNaN(name(52)), true);
  });
  it('should return NaN when the card ID is NaN', function() {
    assert.equal(isNaN(name(NaN)), true);
  });
});

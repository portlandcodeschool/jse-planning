var initialObject = {};
describe('copy', function() {
  it('should create a copy of the object passed in to it', function() {
    var obj = {a:1, b:2};
    assert.deepEqual(obj, copy(obj));
  });
});
describe('equal', function() {
  it('should return true when passed two identical objects', function() {
    assert.equal(equal({a:0,b:1,c:2}, {a:0,b:1,c:2}), true);
  });
  it('should return false when passed two completely different objects', function() {
    assert.equal(equal({a:0,b:1,c:2}, {d:3,e:4,f:5}), false);
  });
  it('should return false when passed two objects with the same properties and different values', function() {
    assert.equal(equal({a:0,b:1,c:2},{a:3,b:4,c:5}), false);
  });
  it('should return false when one otherwise identical object has an extra property', function() {
    assert.equal(equal({a:0,b:1,c:2}, {a:0,b:1,c:2,d:3}), false);
  });
});
describe('similar', function() {
  it('should return true when passed two identical objects', function() {
    assert.equal(similar({a:0,b:1,c:2}, {a:0,b:1,c:2}), true);
  });
  it('should return false when passed two completely different objects', function() {
    assert.equal(similar({a:0,b:1,c:2}, {d:3,e:4,f:5}), false);
  });
  it('should return true when passed two objects with the same properties and different values', function() {
    assert.equal(similar({a:0,b:1,c:2},{a:3,b:4,c:5}), true);
  });
  it('should return false when one otherwise similar object has an extra property', function() {
    assert.equal(equal({a:0,b:1,c:2}, {a:1,b:2,c:1,d:3}), false);
  });
});
describe('union', function() {
  it('should merge objects with different properties', function() {
    assert.deepEqual( union({a:1, b:2}, {c:3, d:4}), {a:1, b:2, c:3, d:4});
  });
  it('should use the properties of the first parameter if there is a conflict', function() {
    assert.deepEqual( union({a:1, b:1}, {b:0, c:0}), {a:1, b:1, c:0});
  });
  it('should work with empty objects', function() {
    assert.deepEqual(union({a: undefined}, {}), {a: undefined});
  });
  it('should work even if the empty object is the first parameter', function() {
    assert.deepEqual(union({}, {a: undefined}), {a: undefined});
  });
  it('should work when objects contain references to themselves', function() {
    assert.deepEqual(union(testVar = {a:1}, {a:2, b: testVar}), {a:1, b: testVar});
  });
});
describe('intersection', function() {
  it('should return an object showing the shared properties of the parameters', function() {
    assert.deepEqual( intersection( {a:0, b:0}, {b:0, c:1}), {b:0});
  });
  it('should return the value of the first object if they are different', function() {
    assert.deepEqual( intersection( {a:0, b:0}, {b:1, c:1}), {b:0});
  });
  it('should return an empty object if there are no shared properties', function() {
    assert.deepEqual( intersection( {a:0, b:0}, {c:1, d:1}), {});
  });
});
describe('subtract', function() {
  it('should return the properties of the first object not in the second', function() {
    assert.deepEqual(subtract({a:0,b:0}, {b:1,c:0}), {a:0});
  });
  it('should return an empty object if the objects are similar', function() {
    assert.deepEqual(subtract({a:0,b:0}, {b:1,a:0}), {});
  });
  it('should return the first object if there are no shared properties', function() {
    assert.deepEqual(subtract({a:0,b:0,c:3}, {x:4,y:1,z:0}), {a:0,b:0,c:3});
  });
});

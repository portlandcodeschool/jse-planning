describe('people', function() {
  it('should be an object', function() {
    assert.typeOf(people, 'object');
  });
  describe('people.index', function() {
    it('should be an object', function() {
      assert.typeOf(people.index, 'object');
    });
  });
  describe('people.meet', function() {
    people.meet('Frodo', 'Samwise');
    it('should be a function', function() {
      assert.typeOf(people.meet, 'function');
    });
    // Apparently hoisting means that everyone gets passed into the index
    // before the tests run, even though the friend index counts don't
    // get updated? Weird stuff.
    it('should update people.index with the two names passed in', function() {
      assert.deepEqual(Object.getOwnPropertyNames(people.index), ['Frodo', 'Samwise', 'Theoden', 'Eowyn', 'Tom', 'Boromir', 'Faramir', 'Denethor']);
    });
    it('should update each person\'s friend index', function() {
      assert.deepEqual(people.index.Frodo.friends, {'Samwise': 1, 'Tom': 1, 'Boromir': 1, 'Faramir': 1});
      assert.deepEqual(people.index.Samwise.friends, {'Frodo': 1, 'Tom': 1, 'Boromir': 1, 'Faramir': 1});
    });
    it('should return the total number of times the two people have met', function() {
      assert.equal(people.meet('Frodo', 'Samwise'), 2);
    });
    it('should not have any effect when meeting oneself', function() {
      people.meet('Frodo', 'Frodo');
      assert.deepEqual(Object.getOwnPropertyNames(people.index), ['Frodo', 'Samwise', 'Theoden', 'Eowyn', 'Tom', 'Boromir', 'Faramir', 'Denethor']);
      assert.deepEqual(people.index.Frodo.friends, {'Samwise': 2, 'Tom': 1, 'Boromir': 1, 'Faramir': 1});
    });
  });
  describe('people.haveMet', function() {
    people.meet('Theoden', 'Eowyn');
    it('should be a function', function() {
      assert.typeOf(people.haveMet, 'function');
    });
    it('should should return a number greater than zero if the people have met', function() {
      assert.typeOf(people.haveMet('Frodo', 'Samwise'), 'number');
      assert.equal(people.haveMet('Frodo', 'Samwise') > 0, true);
    });
    it('should return a falsish value if either person doesn\'t exist', function() {
      // Somewhat tortured syntax required because
      // assert.equal(undefined, false) returns false
      assert.equal(!people.haveMet('John', 'Frodo'), true);
      assert.equal(!people.haveMet('John', 'Ronald'), true);
    });
    it('should return a falsish value if the people exist but haven\'t met', function() {
      assert.equal(!people.haveMet('Frodo', 'Theoden'), true);
    });
  });
  describe('people.friendsOf', function() {
    people.meet('Tom', 'Frodo');
    people.meet('Tom', 'Samwise');
    people.meet('Boromir', 'Frodo');
    people.meet('Boromir', 'Samwise');
    people.meet('Eowyn', 'Faramir');
    people.meet('Faramir', 'Boromir');
    people.meet('Faramir', 'Denethor');
    people.meet('Boromir', 'Denethor');
    people.meet('Faramir', 'Frodo');
    people.meet('Faramir', 'Samwise');
    it('should be a function', function() {
      assert.typeOf(people.friendsOf, 'function');
    });
    it('should return a comma-separated, alphabetized string of friends\'s names', function() {
      assert.equal(people.friendsOf('Frodo'), 'Boromir,Faramir,Samwise,Tom');
      assert.equal(people.friendsOf('Faramir'), 'Boromir,Denethor,Eowyn,Frodo,Samwise');
      assert.equal(people.friendsOf('Denethor'), 'Boromir,Faramir');
    });
  });
  describe('people.friendsOfFriendsOf', function() {
    it('should be a function', function() {
      assert.typeOf(people.friendsOfFriendsOf, 'function');
    });
    it('should return a comma-separated, alphabetized string of 2nd-degree friends\'s names', function() {
      assert.equal(people.friendsOfFriendsOf('Tom'), 'Boromir,Faramir,Frodo,Samwise,Tom');
      assert.equal(people.friendsOfFriendsOf('Faramir'), 'Boromir,Denethor,Eowyn,Faramir,Frodo,Samwise,Theoden,Tom');
      assert.equal(people.friendsOfFriendsOf('Denethor'), 'Boromir,Denethor,Eowyn,Faramir,Frodo,Samwise');
    });
  });
});

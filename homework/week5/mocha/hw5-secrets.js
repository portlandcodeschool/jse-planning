describe('makeUser', function() {
  var user = makeUser('shackleton', 'meow');
  var user2 = makeUser('blagdaross', 'neigh');
  it('should be a function', function() {
    assert.isFunction(makeUser);
  });
  it('should not have a name property accessible', function() {
    assert.isUndefined(user.name);
  });
  it('should not have a passwd property accessible', function() {
    assert.isUndefined(user.passwd);
  });
  describe('<instance>.getName', function() {
    it('should be a function', function() {
      assert.isFunction(user.getName);
    });
    it('should return the name that was passed in to makeUser', function() {
      assert.equal(user.getName(), 'shackleton');
    });
  });
  describe('<instance>.validate', function() {
    it('should return false if the parameter doesn\'t match the password', function() {
      assert.isFalse(user.validate('guess'));
    });
    it('should return true if the parameter matches the password', function() {
      assert.isTrue(user.validate('meow'));
    });
  });
  describe('<instance>.record', function() {
    it('should be a function', function() {
      assert.isFunction(user.record);
    });
    it('should include the user\'s name and the parameter in the log, separated by a colon', function() {
      user.record('play with me');
      assert.equal(makeUser.getLog(), 'shackleton:play with me');
    });
  });
  describe('makeuser.sharedLog', function() {
    it('should be hidden inside a closure', function() {
      assert.isUndefined(makeUser.sharedLog);
    });
  });
  describe('makeUser.getLog', function() {
    it('should be a function', function() {
      assert.isFunction(makeUser.getLog);
    });
    it('should return the entire log if no parameter is passed in', function() {
      user2.record('onward!');
      assert.equal('shackleton:play with me\nblagdaross:onward!', makeUser.getLog());
    });
    it('should return only the log entries for the user parameter if one is supplied', function() {
      assert.equal('shackleton:play with me', makeUser.getLog(user));
    });
  });
});

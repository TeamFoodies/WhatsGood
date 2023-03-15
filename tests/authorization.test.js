const Authorization = require('../backend/src/models/authorization.model');

describe('Authorization', () => {
  // Test whether the isActive method correctly identifies a non-expired timeout
  test('isActive returns true when not timed out', () => {
    // create new authorization with 1 second remaining before timeout
    const auth = new Authorization('auth_key', 'username');
    auth.timeout = Date.now() + 1000;

    expect(auth.isActive()).toBe(true);
  });

  // Test whether the isActive method correctly identifies an expired timeout
  test('isActive returns false when timed out', () => {
    // create new authorization with 1 second past timeout
    const auth = new Authorization('auth_key', 'username');
    auth.timeout = Date.now() - 1000;

    expect(auth.isActive()).toBe(false);
  });

});

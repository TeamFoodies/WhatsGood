const KEY_TIMEOUT_MS = 300000;

// Represents an authenticated user
module.exports = class Authorization {
  constructor(auth_key, username) {
    this.auth_key = auth_key;
    this.username = username;
    this.timeout = Date.now() + KEY_TIMEOUT_MS;
  }

  // With any activity of the user, move the timeout expiration to later
  bump() {
    this.timeout = Date.now() + KEY_TIMEOUT_MS;
  }

  // Returns whether the authorization has timed out
  isActive() {
    return Date.now() < this.timeout;
  }
}
// Temporary holder for authorized keys
const authorizedKeys = [ "EXAMPLE_KEY" ];

// Returns the authorized key
function login(username, password) {
  // TEMPORARY: look for hardcoded username and password
  if (username === "JohnD" && password === "Foodie100") {
    return authorizedKeys[0];
  } else {
    return null;
  }
}

exports.authorizedKeys = authorizedKeys;
exports.login = login;
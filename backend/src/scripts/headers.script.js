const create_header = require('./create_header.script');

exports.PLAIN = create_header('text/plain');
exports.JSON = create_header('application/json');
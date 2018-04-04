'use strict';

//not sure what goes in this file

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/brewtrackr';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/brewtrackr';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
'use strict';

//not sure what goes in this file
//use this file to easily configure values for the Mongo Database URL 
//and the PORT the application will run on


//from server.js, we ask for the database_url  for the production
//database along with th eURL

//test_database_url will be used for test integration tests which seed and tear
//down the database so we would not want tests to use production database


exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/brewtrackr';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/brewtrackr';

exports.PORT = process.env.PORT || 8080

exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
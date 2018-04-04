
'use strict';
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const {router: usersTouer} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const {PORT, DATABASE_URL} = require('./config');

mongoose.Promise = global.Promise;
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));


// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve(server);
      }).on('error', err => {
          reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
          if (err) {
              reject(err);
              // so we don't also call `resolve()`
              return;
          }
          resolve();
      });
  });
}


if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = {app, runServer, closeServer};


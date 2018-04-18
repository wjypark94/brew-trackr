'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

mongoose.Promise = global.Promise;

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const {DATABASE_URL, PORT} = require('./config');

const brewRouter = require('./brewRouter');
const { Brew } = require('./models');

const app = express();
const jsonParser = bodyParser.json();

//telling our app to use express.static middleware
//saying that static assets are located in a folder called public
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('common'));


app.use('/brewlist', brewRouter);
app.use('/login', jsonParser, authRouter);
app.use('/user-acc/', usersRouter);

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


const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
    return res.json({
      data: 'My BrewList'
    });
  });

  
  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });
    
    app.get('/placesnew.html', (req, res) => {
        res.sendFile(__dirname + '/public/placesnew.html');
    });
    
    app.get('/editbrew.html', (req, res) => {
        res.sendFile(__dirname + '/public/editbrews.html');
    });
    
    app.use('*', function (req, res) {
      return res.status(404).json({ message: 'Not Found' });
    });


let server;

//runServer is responsible for coordinating the connection
//to the database and the running of the HTTP server
//use Mongoose to connect to the database using the URL from config.js
function runServer(databaseUrl, port=PORT){
    return new Promise(function(resolve, reject){
        mongoose.connect(databaseUrl, function(err){
                if(err){
                    return reject(err);
                }
                console.log(`mongoose connected to ${databaseUrl}`);
                server = app.listen(port, function(){
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', function(err){
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

//closeServer needs access to a server object but that only 
//gets created wen runServer runs so we declare server here 
//and then assign a value to it in run

//responsible for disconnecting from the database and
//closing down the app

function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }

//useful trick for making this file both an executabel script 
//and a module
if (require.main === module) {
  runServer(DATABASE_URL).catch(err=> console.log(err));
}

module.exports = {app, runServer, closeServer};
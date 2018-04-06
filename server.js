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

const app = express();

//telling our app to use express.static middleware
//saying that static assets are located in a folder called public
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('common'));

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


const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'My List'
  });
});

let server;
let port;

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

function closeServer(){
    return new Promise(function(resolve, reject){
        mongoose.disconnect().then(()=>{
            return new Promise(function(resolve, reject){
                console.log("closing server");
                server.close(err=>{
                    if(err){
                        console.log(err);
                        return reject(err);
                    }
                    resolve();
                });
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
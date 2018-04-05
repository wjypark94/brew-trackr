'use strict'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

app.use(morgan('common'));

//telling our app to use express.static middleware
//saying that static assets are located in a folder called public
app.use(express.static('public'));

mongoose.Promise = global.Promise;

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
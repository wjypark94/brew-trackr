'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

//post request to register a new user
//ensure that username and password are defiend and
//ensure that they are in the req.body
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    // checking that all the fields are strings
    const stringFields = ['username', 'password', 'firstName', 'lastName'];
    const nonStringField = stringFields.find(
        field => field in req.body && typeof req.body[field] !== 'string'
    );

    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }

    // If username or password aren't trimmed, we give an error.
    // Users might expect these to work without trimming, such as using
    // 'foobar ' as a password.  We need to reject such values explicitly
    // so that the user knows whats happening rather than silently trimming them
    // We silently trim other fields such as firstName and lastName because
    // they aren't credentials used to log in so its less of a problem
    const explicitlyTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicitlyTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );

    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {
            min: 1
        },
        password: {
            min: 7,
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
            'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field => 
        'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField
                ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
                : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }

    let {username, password, firstName = '', lastName = ''} = req.body;
    // username and password come in pre-trimmed, otherwise an error is thrown
    firstName = firstName.trim();
    lastName = lastName.trim();

    return User 
        .find({username})
        .count()
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
        // If there's no existing user, hash the password
        // hashing is a process that converts raw plain text password
        // to a string of unguessable characters
            return User.hashPassword(password);
        })
        .then(hash => {
            return User
            .create({
                username,
                password: hash,
                firstName,
                lastName
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(err => {
        // If user with requested name already exists, promise is rejected with error object
        // Forward validation errors on to the client, otherwise give a 500 error
        // because something unexpected has happened
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: 'Internal server error'});
        });
});

module.exports = {router};

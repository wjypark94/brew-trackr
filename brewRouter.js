const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Brew} = require('./models');


//GET User
router.get('/user/:userId', (req, res) => {
  Brew
    .find({userId: req.params.userId})
    .then(brew => {
      res.json({
        brew: brew.map(
          (brew) => brew.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

//GET brew by ID
router.get('/:id', (req, res) => {
  Brew
    .findById(req.params.id)
    .then(brew => res.json(brew.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/', (req, res) => {

  const requiredFields = ['title', 'userId'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Brew
    .create({
      title: req.body.title,
      img: req.body.img,
      userId: req.body.userId
    })
    .then(brew => res.status(201).json(brew.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


module.exports = router;
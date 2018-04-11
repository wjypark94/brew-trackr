
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// this is my schema to represent a new recipe post
const newBrewSchema = mongoose.Schema({
  userId: {type: String},
  id: {type: String},
  title: {type: String, required: true},
  content: {type: String, required: true},
});

newBrewSchema.methods.serialize = function() {

  return {
    id: this._id,
    userId: this.userId,
    title: this.title,  
    content: this.content,
  };
}

const Brew = mongoose.model('Brew', newBrewSchema);

module.exports = {Brew};
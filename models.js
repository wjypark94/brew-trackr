
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// this is my schema to represent a new brew post
const newBrewSchema = mongoose.Schema({
  userId: {type: String},
  id: {type: String},
  title: {type: String, required: true},
  img: {type: String},
  content: {type: String},
  address: {type: String},
  type: {type: String},
});

newBrewSchema.methods.serialize = function() {

  return {
    id: this._id,
    userId: this.userId,
    title: this.title,  
    img: this.img,
    content: this.content,
    address: this.address,
    type: this.type,
  };
}

const Brew = mongoose.model('Brew', newBrewSchema);

module.exports = {Brew};
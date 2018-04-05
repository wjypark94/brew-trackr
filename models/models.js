'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL);


let brewSchema = mongoose.Schema(
    {
        name: String,
        address: String
    }
)


let userSchema = mongoose.Schema (
    {
        userName: String,
        password: String,
        brew: [brewSchema]
    }
)

userSchema.methods.userData = function(){
    return{
        userName: this.userName,
        brew: this.brew,
        _id = this._id
    }
}

userSchema.methods.forAuthToken = function(){
    return {
        userName: this.userName,
        _id: this._id
    }
}

userSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10);
}

let Users = mongoose.model('User', userSchema);

module.exports = {Users};
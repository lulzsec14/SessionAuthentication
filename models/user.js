// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: [20, 'Name can not be longer than 20 characters!'],
    required: [true, 'Please provide the name of the student!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your college Email Id'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    minLength: 8,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
  },
});
// ------------------------------------

// Exports
const Users = mongoose.model('Users', userSchema);
module.exports = Users;
// ------------------------------------

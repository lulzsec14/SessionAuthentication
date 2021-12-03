// Imports
const mongoose = require('mongoose');
// ------------------------------------

// Schema
const adminSchema = mongoose.Schema({
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
      /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@chitkarauniversity.edu.in/,
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
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
// ------------------------------------

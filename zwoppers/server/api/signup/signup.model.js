'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignupSchema = new Schema({
  email: { type: String, lowercase: true }
});

/**
 * Validations
 */

// Validate empty email
SignupSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');


module.exports = mongoose.model('Signup', SignupSchema);

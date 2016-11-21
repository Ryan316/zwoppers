'use strict';

var Signup = require('./signup.model');
var config = require('../../config/environment');

/**
 * Creates a new signup
 */
exports.create = function (req, res, next) {
  var newSignup = new Signup(req.body);
  console.log(req.body);
  console.log(newSignup);
  newSignup.save(function(err, user) {
    console.log(err);
    res.json(201);
  });
};

'use strict';

var _ = require('lodash');

var User = require('./user.model');
var Item = require('../item/item.model');
var Wanted = require('../wanted/wanted.model');
var ForgotPasswordEntry = require('./forgotpasswordentry.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mail = require('../../config/mail')

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';

  newUser.activateToken = newUser.newGuid();
  newUser.status = 0;

  newUser.save(function(err) {
    if (err) return validationError(res, err);
    
    mail.sendActivateAccountMessage(newUser.email, newUser.activateToken);
    res.json(201);
  });
};

exports.update = function (req, res, next) {
  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) {
    if (err) { return res.send(500, err); }

    if(!user) { return res.send(404); }

    // never update these directly
    delete req.user.salt;
    delete req.user.hashedPassword;

    var updated = _.merge(user, req.user);

    updated.save(function (err, user) {
      if (err) return validationError(res, err);

      return res.json(200, user);
    });
  });
};

exports.activate = function (req, res, next) {
  var activateToken = String(req.body.activateToken);
  var email = String(req.body.email);

  User.findOne({
    email: email.toLowerCase(),
    activateToken: activateToken,
    status: 0
  }, function(err, user) {
    if (err) return res.send(500);

    if (!user) {
      User.findOne({
        pendingEmail: email.toLowerCase(),
        activateToken: activateToken,
        status: 1
      }, function(err, user) {
        if (err) return res.send(500);

        if(!user){
          return res.send(401);
        }

        user.email = email;
        user.pendingEmail = '';
        user.activateToken = '';
        user.save(function(err) {
          if (err) return validationError(res, err);
          
          return res.send(200);
        });
      });
    }
    else{
      user.activateToken = '';
      user.status = 1;
      user.save(function(err) {
        if (err) return validationError(res, err);

        User.remove({email: email.toLowerCase(), status: 0}, function(err, user) {
          if(err) return res.send(500, err);
          return res.send(200);
        });
      });
    }
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Disables a user
 */
exports.destroy = function(req, res) {
  var email = String(req.body.email);

  User.findOne({email: email, status: 1}, function(err, user) {
    if(err) return res.send(500, err);

    if(!user){
      return res.send(401);
    }

    user.status = 0;
    user.save(function(err) {
      if (err) return validationError(res, err);
      
      return res.send(204);
    });
  });
};

exports.changeEmail = function(req, res, next) {
  var userId = req.user._id;
  var newEmail = String(req.body.newEmail);

  User.findOne({email: newEmail.toLowerCase(), status: 1} , function (err, user) {
    if(user) {
      res.send(403);
    }
    else{
      User.findById(userId, function (err, user) {
        user.pendingEmail = newEmail;
        user.activateToken = user.newGuid();
        user.save(function(err) {
          if (err) return validationError(res, err);

          mail.sendUpdateEmailMessage(user.pendingEmail, user.activateToken);

          res.send(200);
        });
      });
    }
  });
};

/**
 * Change a user's password
 */
exports.changePassword = function(req, res, next) {
  var resetToken = User.ObjectId(req.body.resetToken);
  var email = String(req.body.email);
  var newPass = String(req.body.newPassword);

  ForgotPasswordEntry.findOne({resetToken: resetToken, email: email.toLowerCase()}, function (err, entry) {
    if (err) return res.send(500);

    if(!entry){
      return res.send(401);
    }

    User.findOne({email: email.toLowerCase(), status: 1}, function(err, user){
      if (err) return res.send(500);

      if(!user){
        return res.send(401);
      }

      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);

        ForgotPasswordEntry.remove({email: email.toLowerCase()}, function(err) {
          if(err) return res.send(500, err);
          return res.send(200);
        });
      });      
    });
  });
};

exports.forgotPassword = function(req, res, next) {
  var email = String(req.body.email);

  User.findOne({email: email.toLowerCase(), status: 1}, function (err, user) {
    if(err) return res.send(500, err);

    var resetToken = ForgotPasswordEntry.newGuid();

    var newEntry = new ForgotPasswordEntry();
    newEntry.email = email;
    newEntry.resetToken = resetToken;

    newEntry.save(function(err) {
      if (err) return validationError(res, err);

      mail.sendResetPasswordMessage(email, resetToken);

      res.json(200);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


exports.myItems = function(req, res, next) {
  var userId = req.user._id;

  Item.find({
    userId: userId
  }, function(err, items) {
    if (err) return res.json(500, err);

    res.json(items);
  });
};

exports.myItem = function(req, res, next) {
  var userId = req.user._id;
  var itemId = req.params.id;

  Item.findOne({
    _id: itemId,
    userId: userId 
  }, function(err, item) {
    if (err) return res.json(500, err);

    res.json(item);
  });
};

exports.destroyMyItem = function(req, res, next) {
  var userId = req.user._id;
  var itemId = req.params.id;

  Item.findOneAndRemove({
    _id: itemId,
    userId: userId 
  }, function(err) {
    if (err) return res.json(500, err);

    res.json(204);
  });
};

exports.updateMyItem = function(req, res, next) {
  var userId = req.user._id;
  var itemId = req.params.id;

  Item.findOne({
    _id: itemId,
    userId: userId
  }, function(err, item) {
    if (err) { return res.send(500, err); }

    if(!item) { return res.send(404); }

    var updated = _.merge(item, req.body);

    updated.save(function (err, item) {
      if (err) return validationError(res, err);

      return res.json(200, item);
    });
  });
};

exports.createMyItem = function(req, res, next) {
  var userId = req.user._id;

  var newItem = new Item(req.body);
  newItem.userId = userId;

  newItem.save(function(err, item) {
    if (err) return validationError(res, err);
    
    res.json(201, item);
  });
};

exports.showItems = function(req, res, next) {
  var userId = req.params.id;

  Item.find({
    userId: userId
  }, function(err, items) {
    if (err) return res.json(500, err);

    res.json(items);
  });
};

exports.myWantedItems = function(req, res, next) {
  var userId = req.user._id;

  Wanted.find({
    userId: userId
  }, function(err, items) {
    if (err) return res.json(500, err);

    res.json(items);
  });
};

exports.myWantedItem = function(req, res, next) {
  var userId = req.user._id;
  var itemId = req.params.id;

  Wanted.findOne({
    _id: itemId,
    userId: userId 
  }, function(err, item) {
    if (err) return res.json(500, err);

    res.json(item);
  });
};

exports.destroyMyWantedItem = function(req, res, next) {
  var userId = req.user._id;
  var itemId = req.params.id;

  Wanted.findOneAndRemove({
    _id: itemId,
    userId: userId 
  }, function(err) {
    if (err) return res.json(500, err);

    res.json(204);
  });
};

exports.updateMyWantedItem = function(req, res, next) {
  var userId = req.user._id;
  var itemId = req.params.id;

  Wanted.findOne({
    _id: itemId,
    userId: userId
  }, function(err, item) {
    if (err) { return res.send(500, err); }

    if(!item) { return res.send(404); }

    var updated = _.merge(item, req.body);

    updated.save(function (err, item) {
      if (err) return validationError(res, err);

      return res.json(200, item);
    });
  });
};

exports.createMyWantedItem = function(req, res, next) {
  var userId = req.user._id;

  var newItem = new Wanted(req.body);
  newItem.userId = userId;

  newItem.save(function(err, item) {
    if (err) return validationError(res, err);
    
    res.json(201, item);
  });
};

exports.showWantedItems = function(req, res, next) {
  var userId = req.params.id;

  Wanted.find({
    userId: userId
  }, function(err, items) {
    if (err) return res.json(500, err);

    res.json(items);
  });
};
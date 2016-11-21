'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.delete('/me', auth.isAuthenticated(), controller.destroy);
router.patch('/me/email', auth.isAuthenticated(), controller.changeEmail);
router.patch('/me/password', controller.changePassword);
router.post('/forgotpassword', controller.forgotPassword);
router.patch('/activation', controller.activate);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.patch('/me', auth.isAuthenticated(), controller.update);

router.get('me/items', auth.isAuthenticated(), controller.myItems);
router.get('me/items/:id', auth.isAuthenticated(), controller.myItem);
router.delete('me/items/:id', auth.isAuthenticated(), controller.destroyMyItem);
router.patch('me/items/:id', auth.isAuthenticated(), controller.updateMyItem);
router.post('me/items', auth.isAuthenticated(), controller.createMyItem);

router.get('/:id/items', controller.showItems);

router.get('me/wants', auth.isAuthenticated(), controller.myWantedItems);
router.get('me/wants/:id', auth.isAuthenticated(), controller.myWantedItem);
router.delete('me/wants/:id', auth.isAuthenticated(), controller.destroyMyWantedItem);
router.patch('me/wants/:id', auth.isAuthenticated(), controller.updateMyWantedItem);
router.post('me/wants', auth.isAuthenticated(), controller.createMyWantedItem);

router.get('/:id/wants', controller.showWantedItems);

module.exports = router;

/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/items', require('./api/item'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/signups', require('./api/signup'));

  app.use('/auth', require('./auth'));

  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
  
};

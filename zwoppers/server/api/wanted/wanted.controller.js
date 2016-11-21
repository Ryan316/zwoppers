'use strict';

var _ = require('lodash');
var Wanted = require('./wanted.model');

// Get a single wanted
exports.show = function(req, res) {
  Wanted.findById(req.params.id, function (err, wanted) {
    if(err) { return handleError(res, err); }
    if(!wanted) { return res.send(404); }
    return res.json(wanted);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
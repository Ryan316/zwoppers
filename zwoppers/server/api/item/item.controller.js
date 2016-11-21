'use strict';

var _ = require('lodash');
var Item = require('./item.model');

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    return res.json(item);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
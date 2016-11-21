'use strict';

var mongoose = require('mongoose'),
  mongoosastic = require('mongoosastic'),
  Schema = mongoose.Schema;

var WantedSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: { type: String, es_indexed: true },
  description: { type: String, es_indexed: true },
  price: { type: Number, es_indexed: true },
  status: {
    type: Number,
    es_indexed: true,
    default: 1
  },
  category: { type: Number, default: 0, es_indexed: true },
  condition: { type: Number, default: 0, es_indexed: true },
  tradeTags: { type: String, es_indexed: true }
});

module.exports = mongoose.model('Wanted', WantedSchema);
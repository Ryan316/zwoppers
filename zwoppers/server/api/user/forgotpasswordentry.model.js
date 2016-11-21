'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ForgotPasswordEntrySchema = new Schema({
  resetToken: Schema.Types.ObjectId,
  email: { type: String, lowercase: true }
});

ForgotPasswordEntrySchema.statics = {
  newGuid: function(){
    return mongoose.Types.ObjectId();
  }
};

module.exports = mongoose.model('ForgotPasswordEntry', ForgotPasswordEntrySchema);

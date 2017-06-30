// Patterns for "Short Text" field

var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

// Create a schema
var patternSchema = new Schema({
	name: {type: String, required: true, unique: true},
	pattern: {type: String, required: true},
	fields: [String],
	enabled: {type: Boolean, required: true, default: true},
	created_at: Date,
	updated_at: Date
});

patternSchema.pre('save', function(next){
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Pattern = mongoose.model('Pattern', patternSchema);

module.exports = Pattern;
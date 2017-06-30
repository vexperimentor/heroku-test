var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

var numberingSchema = new Schema({
	name: {type: String, required: true, unique: true},
	units: [String],
	created_at: Date,
	updated_at: Date
});

numberingSchema.pre('save', function(next){
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Numbering = mongoose.model('Numbering', numberingSchema);

module.exports = Numbering;
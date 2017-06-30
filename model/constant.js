// Constants for Expressions

var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

// Create a schema
var constantSchema = new Schema({
	name: {type: String, required: true, unique: true},
	value: {type: String, required: true},
	enabled: {type: Boolean, required: true, default: true}
});

var Constant = mongoose.model('Constant', constantSchema);

module.exports = Constant;
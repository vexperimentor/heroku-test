var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: {type: String, required: true},
	parent_id: {type: String, default: ''}
});

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;
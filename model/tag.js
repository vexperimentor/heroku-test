// Tags for dynos

var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

var tagSchema = new Schema({
	name: {type: String, required: true, unique: true}
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
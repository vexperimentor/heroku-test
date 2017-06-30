var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

var argSchema = new Schema({
	name: {type: String, required: [true, 'Argument name required']},
	type: {type: String, required: [true, 'Argument type required'], enum: ['String', 'Int', 'Boolean', 'Float', 'Date']},
	is_optional: {type: Boolean, default: true}
});

var functionSchema = new Schema({
	name: {type: String, required: [true, 'Function name required'], unique: [true, 'Function name conflict']},
	space: {type: String, required: false, default: '', enum: ['Math', 'Finance', 'String', 'Main']},
	arguments: [argSchema],
	description: {type: String, required: false, default: ''},
	example: {type: String, required: false, default: ''}
});

var Func = mongoose.model('SDFunction', functionSchema);
module.exports = Func;
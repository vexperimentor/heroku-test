var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

var paramSchema = new Schema({
	name: String,
	v_type: String,
	v_default: String
});
var functionSchema = new Schema({
	owner_id: String,
	info: {
		name: String,
		description: String,
		js_code: String,
		params: [paramSchema],
		return: {
			name: String,
			description: String,
			v_type: String
		},
		is_public: {type: Boolean, default: false}
	}
});

var Func = mongoose.model('Func', functionSchema);
module.exports = Func;
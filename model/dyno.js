var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var dynoSchema = new Schema({
	_access: { type: ObjectId, ref: 'Access' },
	info : {
		name: String,
		description: String,
		locale: {type: String, default: 'en'},
		locale_date: {type: String, default: 'en'},
		category: String,
		tags: [String],
		allow_comments: {type: Boolean, default: true},
		allow_rating: {type: Boolean, default: true},
		html_code: String,
		created_at: Date,
		modified_at: Date,
		is_draft: {type: Boolean, default: true},
		is_public: {type: Boolean, default: false}
	},
	owner_id : String, // ID to user entry
	template_id: String, // ID to self
	shared_user_ids: [String], // Collection of IDs to user entry
	function_ids: [String], // Collection of IDs to function entry used in the dyno
	variable_ids: [String] // Collection of IDs to variable entry created and used in the dyno
});

dynoSchema.pre('save', function(next){
	var currentDate = new Date();

	this.info.modified_at = currentDate;

	if (!this.info.created_at)
		this.info.created_at = currentDate;
	next();
});
// dynoSchema.pre('update', function(next){
// 	var currentDate = new Date();

// 	this.info.modified_at = currentDate;

// 	if (!this.info.created_at)
// 		this.info.created_at = currentDate;
// 	next();
// });

var Dyno = mongoose.model('Dyno', dynoSchema);
module.exports = Dyno;
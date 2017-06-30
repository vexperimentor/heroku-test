var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var answerSchema = new Schema({
	name: String,
	value: String
});
var submissionSchema = new Schema({
	info: {
		answers: [answerSchema], //Collection of var/alias : value mapping
		comment: String, //Comment by the submitter
		submitted_at: Date
	},
	_submitter: { type: ObjectId, ref: 'User' },
	dyno_id: String
});

submissionSchema.pre('save', function(next){
	var currentDate = new Date();

	this.info.submitted_at = currentDate;

	next();
});

var Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
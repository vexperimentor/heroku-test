// Access traits of a Dyno
var express = require('express');
var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Dyno = require('./dyno');

// Create a schema
var accessSchema = new Schema({
	_dyno : { type: ObjectId, ref: 'Dyno' },
	type : {type: Number, max: 2, default: 2}, // 0 : Private and No share, 1 : Private and share, 2 : Public
	allow_templating : {type: Boolean, default: false},
	require_submission : {type: Boolean, default: true},
	status_featured: {type: Number, max: 2, default: 0}, // 0 : not submitted for featured, 1 : submitted for featured, 2 : featured
	shared_users: [String], // Raw email for now
});

accessSchema.post('save', function(doc){
  var currentDate = new Date();

	Dyno.findByIdAndUpdate(doc._dyno, { _access: doc._id, $set:{'info.modified_at': currentDate} }, function(err, obj){
		//Error updating corresponding Dyno
    console.log("UPDATED DYNO SUCCESSFULLY!!! - " + currentDate);
	});
});

var Access = mongoose.model('Access', accessSchema);

module.exports = Access;
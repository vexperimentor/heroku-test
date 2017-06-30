var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Submission = require('../model/submission');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var authHelper = require('../helpers/authorize');
var config = require('../config');
var jwt = require('jsonwebtoken');

router.get('/', authHelper.userTokenHandler);

router.post('/submit', function(req, res){
	var dyno_id = req.body.dyno_id;
	var answers = req.body.answer;
	var obj_user;
	var token = req.headers['x-access-token'];
	if (token){
		obj_user = jwt.verify(token, config.secret);
	} else {
		obj_user = {'_id' : '58ca14d5b68d1200117bca1d'}; // id for anonymous user submission
	}


	var newSubmission = new Submission({
		_submitter: obj_user._id,
		dyno_id: dyno_id,
		info: {
			answers: answers
		}
	});
	newSubmission.save(function(err){
		if (err){
			console.log('Error Submitting response');
			res.status(500).json({msg: 'Data format error'});
		} else {
			console.log('Submission succeeed.');
			console.log(newSubmission);		

			res.status(201).json({
				submission: newSubmission
			});	
		}

	});
});


router.get('/:dyno_id', function(req, res){
	var dyno_id = req.params.dyno_id;

	Submission
	.find({ dyno_id: dyno_id })
	.populate('_submitter').exec(function(err, arr_submissions){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				submissions: arr_submissions
			});
		}
	});
});
module.exports = router;
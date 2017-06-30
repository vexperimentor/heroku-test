var User = require('../model/user');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../config');

router.post('/forgot', function(req, res){
	var email = req.body.email;
	User.find({email:email}, function(err, arr_users){
		if (err) throw err;

		if (arr_users.length == 0){
			//No such email found
			res.status(404).json({
				msg: 'No such email registered.'
			});
		}else{
			var obj_user = arr_users[0];
			var Email = require('./emails');
			var Verifier = require('../helpers/verify');
			var verify_code = Verifier.generateVerificationCode(email);
			

			User.update({_id: ObjectId(obj_user._id)}, {verify_code: verify_code}, {multi:false}, function(err, num_affected){
				if (err) throw err;

				Email.sendRecoverEmail(email, obj_user._id, verify_code);
				res.status(200).json({
					msg: 'Recovery mail sent.'
				});
			});
		}
	});
});

router.post('/reset', function(req, res){
	var oid = req.body.id;
	var verify_code =req.body.verify_code;
	var password = req.body.password;

	User.find({_id: ObjectId(oid), verify_code: verify_code}, function(err, arr_users){
		if (err) throw err;

		if (arr_users.length == 0){
			//No such credentials
			res.status(404).json({
				msg: 'Invalid token.'
			});
		}else{
			var obj_user = arr_users[0];

			User.update({_id:ObjectId(oid)}, {verify_code:"", password:password}, {multi:false}, function(err, num_affected){
				if (err) throw err;

				res.status(200).json({
					msg: 'Password Reset.'
				});
			});
		}
	})
});

module.exports = router;
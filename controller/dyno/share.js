var express = require('express');
var router = express.Router();
var Dyno = require('../../model/dyno');
var Access = require('../../model/access');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var emailSender = require('../emails');
var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');
var urlHelper = require('../../helpers/url');

router.post('/', function(req, res){
	var data = req.body;
	var currentDate = new Date();
	var obj_user = authHelper.getUser(req, res);
	if (!obj_user) return null;

	Dyno.findById({owner_id: obj_user._id, _id: ObjectId(data._dyno)}).exec(function(err, obj_dyno){
		if (obj_dyno == null) {
			res.status(401).json({
				msg: 'Not Authorized'
			});
			return;
		}

		var newAccess = Access(data);
		
		newAccess.save(function(err){
			if (err) {
				errorHelper(err, res);
			}else{
				res.status(201).json({
					access: newAccess,
					modified_at: currentDate
				});

				if (data.shared_users == null) return;
				for (var i in data.shared_users){
					emailSender.sendEmail(data.shared_users[i], "document_shared", {
						":sender_name": obj_user.username,
						":document_url": urlHelper.documentUrl(req, data._dyno)
					});
				}
				
			}
		});
	});
});

router.put('/:dyno_id', function(req, res){
	var data = req.body;
	var currentDate = new Date();
	var obj_user = authHelper.getUser(req, res);

	if (!obj_user) return null;

	Dyno.findById({owner_id: obj_user._id, _id: ObjectId(data._dyno)}).exec(function(err, obj_dyno){
		if (obj_dyno == null) {
			res.status(401).json({
				msg: 'Not Authorized'
			});
			return;
		}

		delete data._id;
		Access.update({_dyno: data._dyno}, data, {multi:false}, function(err, num_affected){
			if (err) {
				errorHelper(err, res);
			}else{
				res.status(200).json({
					msg: 'Access updated',
					modified_at: currentDate
				});

				if (data.shared_users == null) return;
				for (var i in data.shared_users){
					emailSender.sendEmail(data.shared_users[i], "document_shared", {
						":sender_name": obj_user.username,
						":document_url": urlHelper.documentUrl(req, data._dyno)
					});
				}			
			}
		});
	});
});

module.exports = router;
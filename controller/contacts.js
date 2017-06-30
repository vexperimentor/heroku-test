var express = require('express');
var router = express.Router();
var User = require('../model/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../config');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res){
	User.find({admin:false, role:'reader'}, function(err, arr_users){
			if (err) throw err;

			console.log("Fetching contact List successful");
			console.log(arr_users);

			res.status(200).json({
				contacts: arr_users
			});
	});
});

module.exports = router;
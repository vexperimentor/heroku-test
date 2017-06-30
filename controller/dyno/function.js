var express = require('express');
var router = express.Router();
var Func = require('../../model/function');
var Dyno = require('../../model/dyno');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
	var token = req.headers['x-access-token'];

	var obj_user = jwt.verify(token, config.secret);
	var newFunc = Func(req.body);
	newFunc.owner_id = obj_user._id;

	newFunc.save(function(err){
		if (err){
			console.log('Error Creating a Function');
			res.status(500).json({msg: 'Data format error'});
		}

		console.log('New Function created.');
		console.log(newFunc);

		res.status(201).json(newFunc);
	});
});
router.get('/', function(req, res){
	var token = req.headers['x-access-token'];
	if (!token) {
		res.status(200).json({
			funcs: []
		});
		return;
	}
	var obj_user = jwt.verify(token, config.secret);

	console.log("User ID: " + obj_user._id);
	Func.find({owner_id: obj_user._id}, function(err, funcs){
		if (err) throw err;

		console.log("Fetching user's function list successful");
		res.status(200).json({
			funcs: funcs
		});
	});
});

module.exports = router;
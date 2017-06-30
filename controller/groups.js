var express = require('express');
var router = express.Router();
var Group = require('../model/usergroup');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

router.post('/', function(req, res){
	var newGroup = Group(req.body);

	Group.find({groupname: req.body.groupname}, function(err, arr_groups){
		if (err) throw err;

		if (arr_groups.length > 0){
			res.status(409).json({
				msg: 'Duplicated Group Name.'
			});
		}else{
			newGroup.save(function(err){
				if (err) throw err;

				console.log("New group created!");
				console.log(newGroup);

				res.status(201).json(newGroup);
			});
		}
	});
	
});
router.put('/:group_oid', function(req, res){
	var group_oid = req.params.group_oid;
	if (group_oid == null || group_oid == undefined){
		res.status(400).json({
			msg: 'Need Group Id.'
		});
		res.done();
	}

	Group.update({_id: ObjectId(group_oid)}, req.body, {multi:false}, function(err, num_affected){
		if (err) throw err;

		if (num_affected == 0){
			res.status(404).json({
				msg: 'No Group found.'
			});
		}else{
			console.log("Updating Group successful");
			console.log(num_affected);

			res.status(200).json({
				msg: 'Group updated.'
			});
		}
	});
});
router.delete('/:group_oid', function(req, res){
	var group_oid = req.params.group_oid;
	if (group_oid == null || group_oid == undefined){
		res.status(400).json({
			msg: 'Need Group Id.'
		});
		res.done();
	}

	Group.findById(ObjectId(group_oid), function(err, group){
		if (err) throw err;

		if (group == null){
			res.status(404).json({
				msg: 'No Group found.'
			});
		}else{
			group.remove(function(err){
				if (err) throw err;

				console.log("Removing Group successful");

				res.status(200).json({
					msg: 'Group updated.'
				});
			});			
		}
	});
});
router.get('/', function(req, res){
	Group.find({}, function(err, arr_groups){
			if (err) throw err;

			console.log("Fetching Group List successful");
			console.log(arr_groups);

			res.status(200).json({
				groups: arr_groups
			});
	});
});
router.get('/:group_oid', function(req, res){
	var group_oid = req.params.group_oid;
		//Fetch specific group
		Group.findById(ObjectId(group_oid), function(err, group){
			if (err) throw err;

			console.log("Fetching Group successful");
			console.log(group);

			res.status(200).json(group);
		});
});

module.exports = router;
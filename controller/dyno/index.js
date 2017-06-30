var express = require('express');
var _ = require('underscore');
var router = express.Router();
var Dyno = require('../../model/dyno');
var Tag = require('../../model/tag');
var Var = require('../../model/variable');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var authHelper = require('../../helpers/authorize');


var config = require('../../config');
var jwt = require('jsonwebtoken');

var errorHelper = require('../../helpers/error');

//Sub routes
router.use('/public', require('./public'));
router.use('/public/*', require('./public'));
router.use('/featured', require('./featured'));
router.use('/featured/*', require('./featured'));
// router.use('*', authHelper.userTokenHandler);

router.use('/var', require('./var'));
router.use('/function', require('./function'));
router.use('/replicate', require('./replicate'));
router.use('/share', require('./share'));
router.use('/others', require('./others'));
router.use('/templates', require('./templates'));
router.use('/access', require('./access'));
router.use('/archive', require('./archive'));

//Route handlers
router.get('/', function(req, res){
	var token = req.headers['x-access-token'];
	var obj_user = jwt.verify(token, config.secret);

	Dyno.find({owner_id: obj_user._id}, function(err, dynos){
		if (err){
			res.status(500).json({
				msg: 'Error while fetching Dynos'
			});
		}

		console.log("Fetching user's dyno list successful");
		res.status(200).json({dynos: dynos});
	});
});
router.put('/:dyno_id', function(req, res){
	var dyno_id = req.params.dyno_id;

	var arr_raw_tags = req.body.info.rawTags;
	var arr_id_tags = [];
	var tag_addition_promise;
	if (arr_raw_tags != null){
		Tag.find().where('name').in(arr_raw_tags).exec(function(err, records){
			if (err){
				errorHelper(err, res);
				return;
			}

			// Exclude already existing tags
			for (var i in records){
				var tag = records[i];
				arr_id_tags.push(tag._id);

				var tag_index = arr_raw_tags.indexOf(tag.name);
				arr_raw_tags.splice(tag_index, 1);
			}

			// Register new tags
			var count_register = arr_raw_tags.length;
			if (count_register == 0){
				updateDyno();
			}

			for (var i in arr_raw_tags){
				var tag_name = arr_raw_tags[i];
				var newTag = Tag({name: tag_name});
				newTag.save(function(err, tag){
					if (err){
						errorHelper(err, res);
					}else{
						arr_id_tags.push(tag._id);
						count_register --;
						if (count_register == 0)
							updateDyno();
					}
				});
			}
		});
	}else{
		updateDyno();
	}

	function updateDyno(){
		delete req.body.info.rawTags;
		var currentDate = new Date();
		req.body.info.tags = arr_id_tags;
		req.body.info.modified_at = currentDate;

		Dyno.update({_id: ObjectId(dyno_id)}, req.body, {multi:false}, function(err, num_affected){
			if (err){
				res.status(500).json({
					msg: 'Error while updating Dyno'
				});
				res.done();
			}

			if (num_affected == 0){
				res.status(404).json({
					msg: 'No Dyno found.'
				});
			}else{
				console.log("Updating Dyno successful");
				console.log(num_affected);

				res.status(200).json({
					msg: 'Dyno updated.',
					modified_at: currentDate
				});
			}
		});
	}
	
});
router.get('/:dyno_id', function(req, res){
	var dyno_id = req.params.dyno_id;

	Dyno
	.findById(dyno_id)
	.populate('_access').exec(function(err, obj_dyno){
		if (err){
			console.log('Error Fetching Dyno');
			res.status(500).json({msg: 'DB access error'});
		}

		console.log("Fetching Dyno successful");

		res.status(200).json({dyno: obj_dyno});
	});
});
router.delete('/draft', function(req, res){
	var token = req.headers['x-access-token'];
	var obj_user = jwt.verify(token, config.secret);

	Dyno.find({owner_id: obj_user._id, 'info.is_draft':true}).remove(function(err, dynos){
		if (err){
			res.status(500).json({
				msg: 'Error while cleaning Draft'
			});
		}

		res.status(200).json();
	});
});

router.delete('/:dyno_id', function(req, res){
	var dyno_id = req.params.dyno_id;

	var token = req.headers['x-access-token'];
	var obj_user = jwt.verify(token, config.secret);

	Dyno.find({owner_id: obj_user._id, _id: ObjectId(dyno_id)}).remove(function(err, dynos){
		if (err){
			res.status(500).json({
				msg: 'Error while cleaning Draft'
			});
			return;
		}

		res.status(200).json({id: dyno_id});
	});
});

router.post('/', function(req, res){
	//Create a blank new Dyno
	var token = req.headers['x-access-token'];

	var obj_user = jwt.verify(token, config.secret);
	var newDyno = Dyno(req.body); //Only info part is filled
	console.log(req.body);
	newDyno.owner_id = obj_user._id;

	//Temp : Assign sample variables
	Var.find({}, function(err, arr_vars){
		if (err){
			console.log('Error Fetching Variables');
			res.status(500).json({msg: 'DB access error'});
		}
		var arr_var_ids = [];
		for (var i in arr_vars){
			arr_var_ids.push(arr_vars[i]._id);
		}

		newDyno.variable_ids = [];//arr_var_ids;
		newDyno.save(function(err){
			if (err) {
				console.log('Error Creating a Dyno');
				res.status(500).json({msg: 'Data format error'});
			}

			console.log('New Dyno created.');
			console.log(newDyno);

			res.status(201).json({
				dyno: newDyno
			});	
		});
	});	
});

module.exports = router;
var express = require('express');
var router = express.Router();

var Constant = require('../../model/constant');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.post('/', authHelper.adminTokenHandler);
router.put('/*', authHelper.adminTokenHandler);
router.delete('/*', authHelper.adminTokenHandler);

router.post('/', function(req, res){
	var newConstant = Constant(req.body);

	newConstant.save(function(err){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(201).json({
				constant: newConstant
			});
		}	
	});
});

router.delete('/:constant_id', function(req, res){
	var constant_id = req.params.constant_id;

	if (!constant_id){
		res.status(400).json({
			description: 'Need Constant ID'
		});
	}

	Constant.findById(ObjectId(constant_id), function(err, field){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (field == null){
			res.status(404).json({
				description: 'No Constant Found'
			});
			return;
		}

		field.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Constant Removed'
				})
			}
		});
	});
});

router.put('/:constant_id',  function(req, res){
	var constant_id = req.params.constant_id;

	if (!constant_id){
		res.status(400).json({
			description: 'Need Constant ID'
		});
	}

	Constant.update({_id: ObjectId(constant_id)}, req.body, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Constant Found'
			});
			return;
		}

		res.status(200).json({
			description: 'Constant updated'
		});
	});
});

router.get('/', function(req, res){
	Constant.find({}, function(err, arr_constants){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				constants: arr_constants
			});
		}
	});
});

module.exports = router;
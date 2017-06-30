var express = require('express');
var router = express.Router();

var SDF = require('../../model/SDF');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.post('/', authHelper.adminTokenHandler);
router.put('/*', authHelper.adminTokenHandler);
router.delete('/*', authHelper.adminTokenHandler);

router.post('/', function(req, res){
	var newSDF = SDF(req.body);

	newSDF.save(function(err){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(201).json({
				function: newSDF
			});
		}	
	});
});

router.delete('/:function_id', function(req, res){
	var function_id = req.params.function_id;

	if (!function_id){
		res.status(400).json({
			description: 'Need Function ID'
		});
	}

	SDF.findById(ObjectId(function_id), function(err, func){
		if (err){
			errorHelper(err, res);
		}

		if (func == null){
			res.status(404).json({
				description: 'No Function Found'
			});
			return;
		}

		func.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Function Removed'
				})
			}
		});
	});
});

router.put('/:function_id',  function(req, res){
	var function_id = req.params.function_id;

	if (!function_id){
		res.status(400).json({
			description: 'Need Function ID'
		});
	}

	SDF.update({_id: ObjectId(function_id)}, req.body.data, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Function Found'
			});
		}

		res.status(200).json({
			description: 'Function updated'
		});
	});
});

router.get('/', function(req, res){
	SDF.find({}, function(err, arr_functions){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				functions: arr_functions
			});
		}
	});
});

router.get('/:function_id', function(req, res){
	var function_id = req.params.function_id;

	var filterParam = {};
	if (function_id){
		filterParam._id = ObjectId(function_id);
	}

	SDF.find(filterParam, function(err, arr_functions){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				functions: arr_functions
			});
		}
	});
});

module.exports = router;
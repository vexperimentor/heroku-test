var express = require('express');
var router = express.Router();

var Numbering = require('../../model/numbering');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.post('/', authHelper.adminTokenHandler);
router.put('/*', authHelper.adminTokenHandler);
router.delete('/*', authHelper.adminTokenHandler);

router.post('/', function(req, res){
	var newUnit = Numbering(req.body);

	newUnit.save(function(err){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(201).json({
				unit: newUnit
			});
		}	
	});
});

router.delete('/:unit_id', function(req, res){
	var unit_id = req.params.unit_id;

	if (!unit_id){
		res.status(400).json({
			description: 'Need Unit ID'
		});
	}

	Numbering.findById(ObjectId(unit_id), function(err, field){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (field == null){
			res.status(404).json({
				description: 'No Unit Found'
			});
			return;
		}

		field.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Unit Removed'
				})
			}
		});
	});
});

router.put('/:unit_id',  function(req, res){
	var unit_id = req.params.unit_id;

	if (!unit_id){
		res.status(400).json({
			description: 'Need Unit ID'
		});
	}

	Numbering.update({_id: ObjectId(unit_id)}, req.body, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Unit Found'
			});
			return;
		}

		res.status(200).json({
			description: 'Unit updated'
		});
	});
});

router.get('/', function(req, res){
	Numbering.find({}, function(err, arr_units){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				units: arr_units
			});
		}
	});
});

module.exports = router;
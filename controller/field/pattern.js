var express = require('express');
var router = express.Router();

var Pattern = require('../../model/pattern');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.post('/', authHelper.adminTokenHandler);
router.put('/*', authHelper.adminTokenHandler);
router.delete('/*', authHelper.adminTokenHandler);

router.post('/', function(req, res){
	var newPattern = Pattern(req.body);

	newPattern.save(function(err){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(201).json({
				pattern: newPattern
			});
		}	
	});
});

router.delete('/:pattern_id', function(req, res){
	var pattern_id = req.params.pattern_id;

	if (!pattern_id){
		res.status(400).json({
			description: 'Need Pattern ID'
		});
	}

	Pattern.findById(ObjectId(pattern_id), function(err, field){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (field == null){
			res.status(404).json({
				description: 'No Pattern Found'
			});
			return;
		}

		field.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Pattern Removed'
				})
			}
		});
	});
});

router.put('/:pattern_id',  function(req, res){
	var pattern_id = req.params.pattern_id;

	if (!pattern_id){
		res.status(400).json({
			description: 'Need Pattern ID'
		});
	}

	Pattern.update({_id: ObjectId(pattern_id)}, req.body, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Pattern Found'
			});
			return;
		}

		res.status(200).json({
			description: 'Pattern updated'
		});
	});
});

router.get('/', function(req, res){
	Pattern.find({}, function(err, arr_patterns){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				patterns: arr_patterns
			});
		}
	});
});

module.exports = router;
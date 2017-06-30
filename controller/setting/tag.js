var express = require('express');
var router = express.Router();

var Tag = require('../../model/tag');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.post('/', authHelper.adminTokenHandler);
router.put('/*', authHelper.adminTokenHandler);
router.delete('/*', authHelper.adminTokenHandler);

router.post('/', function(req, res){
	var newTag = Tag(req.body);

	newTag.save(function(err){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(201).json({
				tag: newTag
			});
		}	
	});
});

router.delete('/:tag_id', function(req, res){
	var tag_id = req.params.tag_id;

	if (!tag_id){
		res.status(400).json({
			description: 'Need Tag ID'
		});
	}

	Tag.findById(ObjectId(tag_id), function(err, field){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (field == null){
			res.status(404).json({
				description: 'No Tag Found'
			});
			return;
		}

		field.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Tag Removed'
				})
			}
		});
	});
});

router.put('/:tag_id',  function(req, res){
	var tag_id = req.params.tag_id;

	if (!tag_id){
		res.status(400).json({
			description: 'Need Tag ID'
		});
	}

	Tag.update({_id: ObjectId(tag_id)}, req.body, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Tag Found'
			});
			return;
		}

		res.status(200).json({
			description: 'Tag updated'
		});
	});
});

router.get('/', function(req, res){
	Tag.find({}, function(err, arr_tags){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				tags: arr_tags
			});
		}
	});
});

module.exports = router;
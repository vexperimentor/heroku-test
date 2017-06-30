var express = require('express');
var router = express.Router();

var Category = require('../../model/category');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.post('/', authHelper.adminTokenHandler);
router.put('/*', authHelper.adminTokenHandler);
router.delete('/*', authHelper.adminTokenHandler);

router.post('/', function(req, res){
	var newCategory = Category(req.body);

	newCategory.save(function(err){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(201).json({
				category: newCategory
			});
		}	
	});
});

router.delete('/:category_id', function(req, res){
	var category_id = req.params.category_id;

	if (!category_id){
		res.status(400).json({
			description: 'Need Category ID'
		});
	}

	Category.findById(ObjectId(category_id), function(err, field){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (field == null){
			res.status(404).json({
				description: 'No Category Found'
			});
			return;
		}

		field.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Category Removed'
				})
			}
		});
	});
});

router.put('/:category_id',  function(req, res){
	var category_id = req.params.category_id;

	if (!category_id){
		res.status(400).json({
			description: 'Need Category ID'
		});
	}

	Category.update({_id: ObjectId(category_id)}, req.body, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
			return;
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Category Found'
			});
			return;
		}

		res.status(200).json({
			description: 'Category updated'
		});
	});
});

router.get('/', function(req, res){
	Category.find({}, function(err, arr_categories){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				categories: arr_categories
			});
		}
	});
});

module.exports = router;
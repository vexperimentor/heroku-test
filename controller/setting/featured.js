var express = require('express');
var router = express.Router();
var Dyno = require('../../model/dyno');
var Access = require('../../model/access');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.put('/*', authHelper.adminTokenHandler);

router.get('/', function(req, res){
	var data = req.body;
	var obj_user = authHelper.getUser(req, res);	
	if (!obj_user) return null;

	Access
	.find({type: 2, status_featured: {$ne: 0}})
	.populate('_dyno').exec(function(err, arr_records){
		if (err){
			errorHelper(err, res);
		}else{
			res.status(200).json({
				featured: arr_records
			});
		}
	});
});

router.put('/:access_id', function(req, res){
	var data = req.body;
	var access_id = req.params.access_id;
	
	Access.update({_id: ObjectId(access_id)}, data, {multi:false}, function(err, num_affected){
		if (err) {
			errorHelper(err, res);
		}else{
			res.status(200).json({
				msg: 'Access updated'
			});	
		}
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Var = require('../../model/variable');
var Dyno = require('../../model/dyno');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res){
	var arr_ids = req.query.ids;
	if (!(arr_ids instanceof Array)){
		arr_ids = [arr_ids];
	}
	var arr_obj_ids = [];
	for (var i in arr_ids){
		arr_obj_ids.push(ObjectId(arr_ids[i]));
	}
	console.log(arr_obj_ids);
	Var.find({_id: {$in: arr_obj_ids}}, function(err, arr_vars){
		if (err){
			console.log('Error Fetching Variables');
			res.status(500).json({msg: 'DB Access Error'});
		}

		console.log('Fetching Variables Successful.');
		console.log(arr_vars);
		res.status(200).json(
			{
				vars: arr_vars
			}
		);
	});
});
router.delete('/:var_id', function(req, res){
	var var_id = req.params.var_id;

	if (!var_id){
		res.status(400).json({
			description: 'Need Variable ID'
		});
	}

	Var.findById(ObjectId(var_id), function(err, variable){
		if (err){
			errorHelper(err, res);
		}

		if (variable == null){
			res.status(404).json({
				description: 'No Variable Found'
			});
			return;
		}

		variable.remove(function(err){
			if (err){
				errorHelper(err, res);
			}else{
				res.status(200).json({
					description: 'Variable Removed'
				})
			}
		});
	});
});
router.post('/', function(req, res){
	//Registration of Variable with no affiliation
	var newVar = Var(req.body);

	newVar.save(function(err){
		if (err) {
			console.log('Error Creating a Variable');
			console.dir(err);
			res.status(500).json({msg: 'Data Format Error'});
			return;
		}

		console.log('New Variable created.');
		console.log(newVar);

		res.status(201).json({var: newVar});
	});
});
router.put('/:var_id',  function(req, res){
	var var_id = req.params.var_id;

	if (!var_id){
		res.status(400).json({
			description: 'Need Variable ID'
		});
	}

	Var.update({_id: ObjectId(var_id)}, req.body.data, {multi:false}, function(err, num_affected){
		if (err){
			errorHelper(err, res);
		}

		if (num_affected == 0){
			res.status(404).json({
				description: 'No Variable Found'
			});
		}

		res.status(200).json({
			description: 'Variable updated'
		});
	});
});

router.post('/assign', function(req, res){
	//Assigning an already existing Variable to a dyno :: Temporary
	var dyno_id = req.body.dyno_id;
	var var_id = req.body.var_id;

	Dyno.findById(ObjectId(dyno_id), function(err, obj_dyno){
		if (err) throw err;

		console.log('Fetching Dyno successful');

		var arr_variable_ids = obj_dyno.variable_ids;
		arr_variable_ids.push(var_id);
		obj_dyno.variable_ids = arr_variable_ids;
		obj_dyno.save(function(err){
			if (err) throw err;

			console.log('Assigning Var to Dyno successful');

			res.status(200).json({msg: 'success'});
		});
	});
});
router.delete('/assign/:var_id', function(req, res){
	//Assigning an already existing Variable to a dyno :: Temporary
	var dyno_id = req.query.dyno_id;
	var var_id = req.params.var_id;

	Dyno.findById(ObjectId(dyno_id), function(err, obj_dyno){
		if (err) throw err;

		console.log('Fetching Dyno successful');

		var arr_variable_ids = obj_dyno.variable_ids;
		arr_variable_ids.splice(arr_variable_ids.indexOf(var_id), 1);
		obj_dyno.variable_ids = arr_variable_ids;
		obj_dyno.save(function(err){
			if (err) throw err;

			console.log('Unassigning Var to Dyno successful');

			res.status(200).json({msg: 'success'});
		});
	});
});
router.post('/:dyno_id', function(req, res){
	//Registration of Variable local to a dyno
});

module.exports = router;
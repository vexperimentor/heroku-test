var express = require('express');
var router = express.Router();
var Var = require('../../model/variable');
var Dyno = require('../../model/dyno');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.get('/:dyno_id', function(req, res){
  var dyno_id = req.params.dyno_id;
  var currentDate = new Date();
  var obj_user = authHelper.getUser(req, res);
  if (!obj_user) return null;

  Dyno.findById(dyno_id).exec(function(err, obj_dyno){
    var newDyno = Dyno({info: obj_dyno.info});
    newDyno.info.name = newDyno.info.name + " - Copied";
    newDyno.owner_id = obj_user._id;

    newDyno.variable_ids = obj_dyno.variable_ids;
    newDyno.save(function(err){
      if (err) {
        errorHelper(err, res);
      }else{
        res.status(201).json({
          dyno: newDyno
        });
      }
    });
  });
});

module.exports = router;
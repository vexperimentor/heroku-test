var express = require('express');
var router = express.Router();
var Dyno = require('../../model/dyno');
var Access = require('../../model/access');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var emailSender = require('../emails');
var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');
var urlHelper = require('../../helpers/url');
router.get('/:dyno_id', function(req, res){
  var dyno_id = req.params.dyno_id;
  var obj_user;
  // var obj_user = authHelper.getUser(req, res);
  // console.log('obj_user: ', obj_user)
  // if (!obj_user) {
  //   res.status(401).json({
  //     msg: 'Not Authorized'
  //   });
  //   return;
  // }


  Access.find({_dyno: dyno_id})
  .populate('_dyno').exec(function(err, access_objs){
    if (err){
      errorHelper(err, res);
      return;
    }

    if (access_objs.length == 0){
      res.status(404).json({
        msg: 'Dyno not found'
      });
      return;
    }

    var access = access_objs[0];
    obj_user = authHelper.getUser(req, res, access.type);
    if (obj_user && access._dyno.owner_id == obj_user._id)
    {
      res.status(200).json({
        submission: false
      });
      return;
    }
    switch (access.type){
      case 0:
        res.status(401).json({
          msg: 'Not Authorized'
        });
        break;
      case 1: //Private
        if (obj_user && access.shared_users.indexOf(obj_user.email) != -1)
          res.status(200).json({
            submission: access.require_submission
          });
        else if (obj_user)
          res.status(401).json({
            msg: 'Not Authorized'
          });
        break;
      default:
        res.status(200).json({
          submission: access.require_submission
        });
    }
  });
});

module.exports = router;
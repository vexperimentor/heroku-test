var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Dyno = require('../../model/dyno');
var Access = require('../../model/access');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var emailSender = require('../emails');
var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');
var urlHelper = require('../../helpers/url');

router.delete('/:dyno_id', function(req, res){

});

router.get('/:dyno_id', function(req, res){
  var dyno_id = req.params.dyno_id;
  var obj_user = authHelper.getUser(req, res);

  if (!obj_user) {
    res.status(401).json({
      msg: 'Not Authorized'
    });
    return;
  }

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

    if (access.type != 2) {
      res.status(401).json({
          msg: 'Not Authorized'
      });
    }else {
      if (access.shared_users.indexOf(obj_user.email) != -1){
        res.status(200).json({
          new: false
        });
        return;
      }else{
        Access.update({_dyno: dyno_id}, {shared_users: _.union(access.shared_users, [obj_user.email])}, {multi: false}, function(err, num_affected){
          if (err) {
            errorHelper(err, res);
          }else{
            res.status(200).json({
              new: true
            });       
          }
        });
      }
    }
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var User = require('../../model/user')
var Dyno = require('../../model/dyno');
var Access = require('../../model/access');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var config = require('../../config');
var authHelper = require('../../helpers/authorize');
var errorHelper = require('../../helpers/error');

router.get(['/:user_name', '/'], function(req, res){
  var author_name = req.params.user_name;
  var data = req.body;
  // var obj_user = authHelper.getUser(req, res);
  // if (!obj_user) return null;

  Access
  .find({type: 2, status_featured: {$ne: 2}})
  .populate("_dyno").exec(function(err, _arr_access){
    if (err) {
      errorHelper(err, res);
      return;
    }else if (_arr_access.length == 0){
      returnDynos();
      return;
    }

    // Edge case : Legacy Access Objects not being cleaned up (in absence of the dyno)
    var arr_access = [];
    for (var i in _arr_access){
      if (_arr_access[i]._dyno != null)
        arr_access.push(_arr_access[i]);
    }

    var arr_users = {};
    var count_to_handle = arr_access.length;
    for (var i in arr_access){
      var access = arr_access[i];

      User.findById(access._dyno.owner_id).exec(function(err, user){
        arr_users[user._id] = user;
        count_to_handle --;
        if (count_to_handle == 0)
          returnDynos();
      });
    }

    function returnDynos(){
      var arr_thick_access = [];
      for (var i in arr_access){
        var access = JSON.parse(JSON.stringify(arr_access[i]));
        access._sharer = arr_users[access._dyno.owner_id];
        
        if ((author_name!=undefined) && (access._sharer.username != author_name)){
          // Reject works of other authors when author is set.
          continue;
        }

        arr_thick_access.push(access);
      }

      res.status(200).json({
        result: arr_thick_access
      });
    }
  });
});

module.exports = router;
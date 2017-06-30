var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Email = require('./emails');

router.get('/:verify_code', function(req, res){
	var verify_code = req.params.verify_code;

	User.findOne({verify_code: verify_code}, function(err, user){
		if (user != null){
			user.enabled = true;
			user.save(function(err){
				if (err) throw err;

				console.log("Confirmed via Email");

				Email.sendSuccessEmail(user.email);
				res.redirect('/register.html#/confirmed/'+user.email);
			});
			
		}else{
			res.send("Invalid Action!");
		}
	});
	
});

module.exports = router;
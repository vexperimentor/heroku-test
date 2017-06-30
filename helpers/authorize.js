var config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = {
	creatorTokenHandler : function(req, res, next){
		var token = req.headers['x-access-token'];

		jwt.verify(token, config.secret, function(err, obj_user){
			if (err){
				console.log(err);
				res.status(401).json({
					msg: 'Not Authorized'
				});
				return;
			}

			if (obj_user.role == 'creator'){
				next();				
			}else{
				res.status(401).json({
					msg: 'Not Authorized'
				});
			}
		});
	},
	adminTokenHandler: function(req, res, next){
		var token = req.headers['x-access-token'];

		jwt.verify(token, config.secret, function(err, obj_user){
			if (err){
				console.log(err);
				res.status(401).json({
					msg: 'Not Authenticated'
				});
				return;
			}

			if (obj_user.admin){
				next();				
			}else{
				res.status(401).json({
					msg: 'Not Authorized'
				});
			}
		});
	},
	userTokenHandler: function(req, res, next){
		var token = req.headers['x-access-token'];

		jwt.verify(token, config.secret, function(err, obj_user){
			if (err){
				console.log(err);
				res.status(401).json({
					msg: 'Not Authorized'
				});
				return;
			}

			if (obj_user.admin == false){
				next();				
			}else{
				res.status(401).json({
					msg: 'Not Authorized : Admin'
				});
			}
		});
	},
	getUser: function(req, res, accessType){
		var token = req.headers['x-access-token'];
		try{
			var obj_user = jwt.verify(token, config.secret);
			return obj_user;
		}catch(err){
			if (accessType && accessType === 2) { // public dyno
				return null;
			}
			res.status(401).json({
				msg: 'Not Authorized'
			});
			return null;
		}
	}
}
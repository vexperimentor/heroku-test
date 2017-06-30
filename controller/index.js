var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/authorize');

router.use('/user', require('./users'));
router.use('/group', require('./groups'));
router.use('/verify', require('./verify'));
router.use('/support', require('./support'));
router.use('/setting', require('./setting'));

router.use('/dyno', require('./dyno'));
router.use('/dyno*', authHelper.userTokenHandler);

router.use('/contacts*', authHelper.userTokenHandler);
router.use('/contacts', require('./contacts'));

// router.use('/assignments*', authHelper.userTokenHandler);
router.use('/assignments', require('./assignments'));

router.use('/function', require('./function'));
router.use('/field', require('./field'));

router.get('/', function(req, res){
	res.status(200).json({message: 'API server is up and running!'});
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.use('/pattern', require('./pattern'));
router.use('/numbering', require('./numbering'));
router.use('/constant', require('./constant'));
// router.use('/udf', require('./custom'));

module.exports = router;
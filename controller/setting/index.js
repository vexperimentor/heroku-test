var express = require('express');
var router = express.Router();

router.use('/category', require('./category'));
router.use('/tag', require('./tag'));
router.use('/featured', require('./featured'));
// router.use('/udf', require('./custom'));

module.exports = router;
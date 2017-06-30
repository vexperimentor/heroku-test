var express = require('express');
var router = express.Router();

router.use('/sdf', require('./system'));
// router.use('/udf', require('./custom'));

module.exports = router;




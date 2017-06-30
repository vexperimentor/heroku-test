var express = require('express');
var app = express();
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var node_env = process.env.NODE_ENV || 'dev';

// use morgan to log requests to the console
app.use(morgan('dev'));

// Serve front-end files
if (node_env === 'dev'){
	app.use(express.static('frontend'));
} else {
	app.use(express.static('dist'));
	app.use(express.static('frontend'));
}

// All routes will be prefixed with /api
app.use('/api', require('./controller'));

// Start the server
app.listen(port);
console.log('API server has started on port ' + port);
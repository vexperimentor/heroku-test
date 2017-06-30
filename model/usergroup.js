// grab the things we need
var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

// create a schema
var groupSchema = new Schema({
  groupname: { type: String, required: true, unique: true},
  role: {type: Number, max:5, required: true, default: 3}
});

// the schema is useless so far
// we need to create a model using it
var Group = mongoose.model('UserGroup', groupSchema);

// make this available to our users in our Node applications
module.exports = Group;
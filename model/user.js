// grab the things we need
var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongodb);
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  updatePassword: {type: Boolean, required: false, default: false},
  lastname: { type: String, required: false, default:''},
  firstname: { type: String, required: false, default:''},
  aboutme: { type: String, required: false, default:''},
  group: {type: String, required: false, default:''},
  admin: {type: Boolean, default: false},
  role: {type: String, required: false, default:'creator'},
  verify_code: {type: String, required:false, default:''},
  enabled: {type:Boolean, required:true, default: false},
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next){
   // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});


userSchema.pre('update', function(next){
  var query = this;
  var update = query.getUpdate();
  if (!update.$set.updatePassword) {
      return next();
  }
  bcrypt.hash(this.getUpdate().$set.password, null, null, function(err, hash) {
    if (err) return next(err);
    update.$set.password = hash;
    update.$set.updatePassword = false;
    next();
  });
});

userSchema.methods.comparePassword = function (attemptedPassword, cb){
    bcrypt.compare(attemptedPassword, this.password, function(err, res) {
      if (err) return cb(err);
      cb(null, res);
    });
}
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

var priority = ['low', 'normal', 'high'];

/**
 * User Schema
 */
var UserSchema = new Schema({
  taskId: {type: String},
  title: {type: String},
  desc: {type: String},
  date: {type: Date},
  isDone: {type: Boolean, default: false},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  priority: {type: String},
  keywords: {type: String}
});

/**
 * Virtuals
 */

// Basic info to identify the current authenticated user in the app
UserSchema
  .virtual('taskInfo')
  .get(function () {
    return {
      'title': this.title,
      'owner': this.owner,
      'isDone': this.isDone
    };
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function () {
    return {
      'title': this.title,
      'owner': this.owner,
      'isDone': this.isDone,
      'date': this.date,
      'keywords': this.keywords
    };
  });

/**
 * Validations
 */
var validatePresenceOf = function (value) {
  return value && value.length;
};

// Validate empty email
UserSchema
  .path('title')
  .validate(function (title) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return title.length;
  }, 'title cannot be blank');


// Validate name is not taken
UserSchema
  .path('title')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({title: value}, function (err, task) {
      if (err) throw err;
      if (task) {
        if (self.id === task.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'The specified title is already in use.');

/**
 * Methods
 */
UserSchema.methods = {
  /**
   *
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  mustBeHigherDisplayed: function () {
    return "must be in RED ";
  }

};

mongoose.model('Task', UserSchema);

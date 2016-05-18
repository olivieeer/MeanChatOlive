'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  passport = require('passport');

/**
 * Create task
 */
exports.create = function (req, res, next) {
  var newTask = new Task(req.body);
  newTask.priority = 'low';

  console.log(req.body);
  newTask.save(function (err) {
    if (err) return res.json(400, err);

    req.logIn(newTask, function (err) {
      if (err) return next(err);

      return res.json(req.task.taskInfo);
    });
  });
};

/**
 *  Get profile of specified task
 */
exports.show = function (req, res, next) {
  var taskId = req.params.id;

  task.findById(taskId, function (err, task) {
    if (err) return next(new Error('Failed to load task'));

    if (task) {
      res.send({profile: task.profile});
    } else {
      res.send(404, 'task_NOT_FOUND');
    }
  });
};


/**
 * Get current task
 */
exports.me = function (req, res) {
  res.json(req.task || null);
};

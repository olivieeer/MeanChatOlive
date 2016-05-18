'use strict';

angular.module('chatApp',[])
  .controller('MainCtrl', [ function ( $scope, chatroom ) {
    $scope.getMessages = chatroom.getMessages;
    $scope.getVisitors = chatroom.getVisitors;
    $scope.showTodoList1 = false;
    $scope.essai = 42;

    $scope.sendMessage = function () {
      if (!$scope.newMessage) {
        return;
      }
      chatroom.sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };

    /*
    $scope.task = {
      'title' : String,
      'owner' : User,
      'date' : Date,
      keyWords : String[],
      'priority' : String
    }*/

    $scope.task = {
      'title' : '',
      'owner' : '',
      'date' : new Date(),
      'priority' : 'low'
    };
    $scope.todos = [];
    $scope.markAll = false;

    $scope.showTodoList = function () {
      alert('uifigij');
      $scope.showTodoList1 = true;
    };

    $scope.addTodo = function () {
      if (event.keyCode == 13 && $scope.todoText) {
        $scope.task.title = $scope.todoText;
        $scope.todos.push({text: $scope.todoText, done: false});
        $scope.todoText = '';
      }
    };

    $scope.getTotalTodos = function () {
      return $scope.todos.length;
    };

    $scope.isTodo = function () {
      return $scope.todos.length > 0;
    };

    $scope.toggleEditMode = function () {
      $(event.target).closest('li').toggleClass('editing');
    };
    $scope.editOnEnter = function (todo) {
      if (event.keyCode == 13 && todo.text) {
        $scope.toggleEditMode();
      }
    };

    $scope.remaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.hasDone = function () {
      return ($scope.todos.length != $scope.remaining());
    };

    $scope.itemText = function () {
      return ($scope.todos.length - $scope.remaining() > 1) ? 'items' : 'item';
    };

    $scope.toggleMarkAll = function () {
      angular.forEach($scope.todos, function (todo) {
        todo.done = $scope.markAll;
      });
    };

    $scope.clear = function () {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };

  }]);

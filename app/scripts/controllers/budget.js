'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:BudgetCtrl
 * @description
 * # BudgetCtrl
 * Controller of the chatApp
 */
angular.module('chatApp')
  .controller('BudgetCtrl', function ($scope, Auth, $location) {
    $scope.essai = Auth;
    $scope.errors = {};

    if (Auth.isLoggedIn()) {
      $location.path('/budget');
    }


  });

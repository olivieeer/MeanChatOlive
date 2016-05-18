'use strict';

angular.module('chatApp')
  .factory('Task', function ($resource) {
    return $resource('/api/tasks/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  });

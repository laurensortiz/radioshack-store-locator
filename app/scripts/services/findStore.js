'use strict';

angular.module('mobileCommerceApp')
  .factory('findStore', function ($http, $q) {

    var service = {};


    service.getClosestStores = function (zipCode) {
      var deferred = $q.defer();
      var rejectCallback = function () {
        deferred.reject();
      };
      $http({
        method: 'GET',
        url: 'http://radioshack.77.cr/api/getClosestStores?zipCode='+zipCode
      }).then(function (response) {
        deferred.resolve(response.data);
      });

      return deferred.promise;
    };


    return service;

  });

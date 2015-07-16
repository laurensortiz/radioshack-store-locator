'use strict';

angular.module('mobileCommerceApp')
  .controller('MenuTopCtrl', function ($scope, $location,$rootScope) {
    $scope.locatorBox = false;
    $rootScope.zipCode = '';


    $scope.findStore = function(zipcode){

      if(zipcode !== null){
        $rootScope.zipCode =zipcode;
        $location.path('/stores_closest');
      }

    };


  });

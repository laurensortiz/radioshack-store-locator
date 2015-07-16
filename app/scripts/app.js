'use strict';

angular
  .module('mobileCommerceApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/home.html',
        controller: 'MainCtrl'
      })
      .when('/stores_closest',{
        templateUrl : '../views/storesClosest.html',
        controller:'StoresClosestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

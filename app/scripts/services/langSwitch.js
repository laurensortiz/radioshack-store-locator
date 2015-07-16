'use strict';

angular.module('mobileCommerceApp')
  .factory('langSwitch', ['$http', '$q', function ($http, $q) {
    return{
      //this function load the correct jason usin the country code.
      getLanguages: function (lang) {
        var deferred = $q.defer();
        $http.get('scripts/i18n/lang_' + lang + '.json').success(function (data) {
          deferred.resolve(data);
        }).error(function () {
          deferred.reject();
        });
        return deferred.promise;
      },
      //this call the geocoder json file, to get the country code
      // TODO this service is not in use -- erase ---
      getCountryCode: function (lat, lng) {
        var deferred = $q.defer();
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true').success(function (data) {
          deferred.resolve(data);
        }).error(function () {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  }]);
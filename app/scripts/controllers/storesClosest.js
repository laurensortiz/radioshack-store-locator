'use strict';

angular.module('mobileCommerceApp')
  .controller('StoresClosestCtrl', function ($scope,$rootScope,findStore) {
    $scope.queryZipCode = $rootScope.zipCode;
    //Just for testing
    $scope.queryZipCode = '75017';
    $scope.todayIs = '';
    $scope.storesClosest = [];

    var date = new Date(),
        weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        todayIs = weekday[date.getDay()];

    findStore.getClosestStores($scope.queryZipCode).then(function(data){


      _.each(data, function(store){
        var storeName = store.Store.StoreName,
            address = '',
            city = store.Store.MailingAddress.City,
            countryCode = store.Store.MailingAddress.CountryCode,
            postalCode = store.Store.MailingAddress.PostalCode,
            distance = store.Distance,
            phoneAreaCode = store.Store.TelephoneNumber.AreaCode,
            phoneExchange = store.Store.TelephoneNumber.ExchangeNumber,
            phoneStation = store.Store.TelephoneNumber.StationNumber,
            openingTime = convertTime(_.find(store.Store.StoreHours, function(todayIs){ return todayIs;}).OpeningTime),
            closingTime = convertTime(_.find(store.Store.StoreHours, function(todayIs){ return todayIs;}).ClosingTime),
            coordinatesLatitude = store.Store.Coordinates.Latitude,
            coordinatesLongitude = store.Store.Coordinates.Longitude;


        if(_.isEmpty(store.Store.MailingAddress.AddressLine2)){
          address = store.Store.MailingAddress.AddressLine1;
        }else{
          address = store.Store.MailingAddress.AddressLine2;
        }

        $scope.storesClosest.push({
          name : storeName,
          address : address,
          city : city,
          countryCode : countryCode,
          postalCode : postalCode,
          distance : distance,
          phoneAreaCode : phoneAreaCode,
          phoneExchange : phoneExchange,
          phoneStation : phoneStation,
          openingTime :openingTime,
          closingTime : closingTime,
          coordinatesLatitude : coordinatesLatitude,
          coordinatesLongitude : coordinatesLongitude
        });
      });

    });

    var convertTime = function(hour){
      var timeString = hour;
      var H = +timeString.substr(0, 2);
      var h = (H % 12) || 12;
      var ampm = H < 12 ? 'am' : 'pm';
      timeString = h + timeString.substr(2, 3) + ampm;
      return timeString;
    };

  });

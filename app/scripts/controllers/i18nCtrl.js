
'use strict';

angular.module('mobileCommerceApp').controller('i18nCtrl',
  ['$scope', 'langSwitch', function ($scope, langSwitch) {

    //set english as default language
    $scope.countryCode = 'US';//use ISO 3166-1-alpha-2 code
    //call the service function and send the contry code as a parameter
    //to load the correct json.
    langSwitch.getLanguages($scope.countryCode).then(function (data) {
      //fill the $scope object the json data(languages)
      $scope.languagesJSON = data[$scope.countryCode];
    });
    var getUserLang = navigator.language || navigator.userLanguage, userLang = getUserLang.trim().toUpperCase();
    if (userLang) {
      if (userLang.length > 2) {
        $scope.countryCode = userLang.substr(userLang.length - 2);
        langSwitch.getLanguages($scope.countryCode).then(function (data) {
          //fill the $scope object the json data(languages)
          $scope.languagesJSON = data[$scope.countryCode];
        });
      } else {
        $scope.countryCode = userLang;
        langSwitch.getLanguages($scope.countryCode).then(function (data) {
          //fill the $scope object the json data(languages)
          $scope.languagesJSON = data[$scope.countryCode];
        });
      }
    }
    //model dropdown languages menu.
    $scope.pageLanguages = [
      {lang: 'Español', shortCode: 'ES'},
      {lang: 'English', shortCode: 'US'}
    ];

    //this function change the language reciving a parameter from dropdown languages menu.
    //ng-click(language)
    $scope.showCheck = false;
    $scope.changeLang = function (language) {
      //evaluate what is the parameter value
      $scope.showCheck = true;
      $scope.countryCode = language.shortCode;
      langSwitch.getLanguages($scope.countryCode).then(function (data) {
        $scope.languagesJSON = data[$scope.countryCode];
      });
    };
  }
  ]);
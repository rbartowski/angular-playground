'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('AdvertiserListCtrl', ['$scope', 'AdvertiserService',
  function AdvertiserListController($scope, AdvertiserService){

    AdvertiserService.getAll().then(function(advertisers){
      $scope.advertisers = advertisers;
    })
    .catch(function(err) {
      console.log(err);
    });

  }
]);

appControllers.controller('AdvertiserEditCtrl',
  ['$scope', '$routeParams', '$log', '$window', 'AdvertiserService',
  function AdvertiserEditController($scope, $routeParams, $log, $window, AdvertiserService){

    AdvertiserService.get($routeParams.id).then(function(advertiser){
      $scope.advertiser = advertiser;
    })
    .catch(function(err) {
      console.log(err);
    });

    $scope.update = function (isValid) {

      if(isValid) {
        $log.log('***Saving advertiser***'
          + '\n id: ' + $scope.advertiser.id
          + '\n Name: ' + $scope.advertiser.name
          + '\n Email: ' + $scope.advertiser.email
          + '\n Owner Name: ' + $scope.advertiser.ownerName
        );
        $window.location.href = '#/advertisers';
      }

    }
  }
]);

appControllers.controller('DogeCtrl', ['$scope', 'DogeService',
  function DogeController($scope, DogeService) {
    var controller = this;

    controller.getRandomInt = function () {
      return Math.floor(Math.random() * (4 - 0 + 1));
    }

    DogeService.getImgSrc().then(function(imgsrc) {
      $scope.imgSource = imgsrc[controller.getRandomInt()];
    })
    .catch(function(err) {
      console.log(err);
    });


  }
]);

appControllers.controller('SomeCtrl', ['$scope',
  function SomeController($scope) {

  }
])
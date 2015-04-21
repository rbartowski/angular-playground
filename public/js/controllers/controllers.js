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

appControllers.controller('AdvertiserDetailsCtrl',
  ['$scope', '$stateParams', '$log', '$window', 'advertiser',
  function AdvertiserDetailsController(
    $scope,
    $stateParams,
    $log,
    $window,
    advertiser) {

    $scope.advertiser = advertiser;
    $scope.advertiser.created = Date.parse($scope.advertiser.created);

    $scope.update = function () {

        $log.log('***Saving advertiser***'
          + '\n id: ' + $scope.advertiser.id
          + '\n Name: ' + $scope.advertiser.name
          + '\n Email: ' + $scope.advertiser.email
          + '\n Owner Name: ' + $scope.advertiser.ownerName
          );
        $window.location.href = '#/advertisers';

    }
  }
  ]);

appControllers.controller('AdvertiserDetailsGeneralCtrl',
  ['$scope', '$stateParams', '$log', '$window',
  function AdvertiserDetailsGeneralController($scope, $stateParams, $log){
    //testing access to parent scope
    $log.log('AdvId:' + $stateParams.id);
    $log.log('AdvName' + $scope.advertiser.name);
  }
  ]);

appControllers.controller('AdvertiserDetailsCreativeCtrl',
  ['$scope', '$stateParams',
  function AdvertiserDetailsCreativeController($scope, $stateParams){

  }
  ]);

appControllers.controller('AdvertiserDetailsSettingsCtrl',
  ['$scope', '$stateParams',
  function AdvertiserDetailsSettingsController($scope, $stateParams){

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
  ]);

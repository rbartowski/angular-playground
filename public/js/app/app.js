'use strict';

var app = angular.module('app', [
  'appControllers',
  'appServices',
  'ui.router'
]);

//routing
app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.
      state('advertisers', {
        url: '/advertisers',
        templateUrl: 'public/templates/advertiser/advertiser-list.html',
        controller: 'AdvertiserListCtrl'
      }).
      state('advertiserDetails', {
        url: '/advertisers/:id/details',
        abstract: true,
        templateUrl: 'public/templates/advertiser/advertiserDetails/advertiser-details.html',
        controller: 'AdvertiserDetailsCtrl',
        resolve: {
          advertiser: function($stateParams, AdvertiserService) {
            return AdvertiserService.get($stateParams.id);
          }
        }
      }).
      state('advertiserDetails.general', {
        url: '',
        templateUrl: 'public/templates/advertiser/advertiserDetails/advertiser-general-tab.html',
        controller: 'AdvertiserDetailsGeneralCtrl'
      }).
      state('advertiserDetails.creative', {
        url: '/creative',
        templateUrl: 'public/templates/advertiser/advertiserDetails/advertiser-creatives-tab.html',
        controller: 'AdvertiserDetailsCreativeCtrl'
      }).
      state('advertiserDetails.settings', {
        url: '/settings',
        templateUrl: 'public/templates/advertiser/advertiserDetails/advertiser-settings-tab.html',
        controller: 'AdvertiserDetailsSettingsCtrl'
      }).
      state('doge', {
        url: '/Doge',
        templateUrl: 'public/templates/doge.html',
        controller: 'DogeCtrl'
      }).
      state('fun', {
        url: '/SomePage',
        templateUrl: 'public/templates/somepage.html',
        controller: 'SomeCtrl'
      });
  }
]);

//trying custom directive
app.directive('drawing', function(){
  return {
    restrict: 'A',
    link: function(scope, element){
      var ctx = element[0].getContext('2d'),
        drawing = false,
        lastX,
        lastY,
        currentX,
        currentY;

      element.bind('mousedown', function(event){
        if(event.offsetX!==undefined){
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else { // Firefox compatibility
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }

        // begins new line
        ctx.beginPath();

        drawing = true;
      });
      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          if(event.offsetX!==undefined){
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }

      });
      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });

      // canvas reset
      function reset(){
       element[0].width = element[0].width;
      }

      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = '#4bf';
        // draw it
        ctx.stroke();
      }
    }
  };
});

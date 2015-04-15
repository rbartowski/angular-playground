'use strict';

var advertiserApp = angular.module('advertiserApp', [
  'ngRoute',
  'appControllers',
  'appServices'
]);

//routing
advertiserApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/advertisers', {
        templateUrl: 'http/partials/advertiser-table.html',
        controller: 'AdvertiserListCtrl'
      }).
      when('/advertisers/:id/edit', {
        templateUrl: 'http/partials/advertiser-edit.html',
        controller: 'AdvertiserEditCtrl'
      }).
      when('/Doge', {
        templateUrl: 'http/partials/doge.html',
        controller: 'DogeCtrl'
      }).
      when('/SomePage', {
        templateUrl: 'http/partials/somepage.html',
        controller: 'SomeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

//trying custom directive
advertiserApp.directive("drawing", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      var ctx = element[0].getContext('2d').
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
        ctx.strokeStyle = "#4bf";
        // draw it
        ctx.stroke();
      }
    }
  };
});

'use strict';

var appServices = angular.module('appServices', []),
  apiUrl = 'http://localhost:3000';

appServices.factory('AdvertiserService', ['$http','$q',
  function AdvertiserService($http, $q){

    function getAll(){
      var defer = $q.defer();

      $http.get(apiUrl + '/advertisers').success(function(data) {
        defer.resolve(data);

      })
      .error(function(err) {
        defer.reject(err);
      });

      return defer.promise;
    }

    function get(id) {
      var defer = $q.defer();

      $http.get(apiUrl + '/advertisers/' + id).success(function(data) {
        defer.resolve(data);
      })
      .error(function(err) {
        defer.reject(err);
      });

      return defer.promise;
    }

    return {
      getAll: getAll,
      get: get
    };

  }
]);

appServices.factory('DogeService', ['$http','$q',
  function DogeService($http, $q){

    function getImgSrc(){
      var defer = $q.defer();

      $http.get(apiUrl + '/doges').success(function(data) {
        defer.resolve(data);
      })
      .error(function(err) {
        defer.reject(err);
      });

      return defer.promise;
    }


    return {
      getImgSrc: getImgSrc
    };

  }
]);
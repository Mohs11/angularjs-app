'use strict';

/**
 * @ngdoc overview
 * @name footballApp
 * @description
 * # footballApp
 *
 * Main module of the application.
 */
var football = angular.module('football', ['ngRoute', 'ngAnimate']);

football.config(['$routeProvider', function($routeProvider){
  
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'footballController'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo : '/home'
    });
}]);


football.controller('footballController', ['$scope', '$http', function($scope, $http){

  $http.get('data/clubs.json').then(function(response){
    $scope.clubs = response.data;
  });

  $scope.leagueIncludes = [];

  $scope.includeLeague = function(league) {
    var i = $.inArray(league, $scope.leagueIncludes);
    if (i > -1) {
      $scope.leagueIncludes.splice(i, 1);
    } else {
      $scope.leagueIncludes.push(league);
    }
  }

  $scope.leagueFilter = function(club) {
    if ($scope.leagueIncludes.length > 0 ) {
      if ($.inArray(club.league, $scope.leagueIncludes) < 0)
          return;
    }

    return club;
  }

}]);

  

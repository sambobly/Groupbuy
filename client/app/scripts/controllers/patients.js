'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('clientApp')
    .controller('PatientsController', ['$scope', '$resource', function ($scope, $resource) {
       var Patients = $resource('/api/patients');
        $scope.patients = Patients.query();
        console.log("hi");

    }]);

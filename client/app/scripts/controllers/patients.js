'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('clientApp')
    .controller('PatientsController', ['$scope', 'patient', function ($scope, patient) {
        $scope.patient = patient.query();
        console.log("hi");

    }]);

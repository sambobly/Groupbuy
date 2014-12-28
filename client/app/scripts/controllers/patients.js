'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('clientApp')
    .controller('PatientsController', ['$scope', '$resource', '$location', '$routeParams', 'patientData', function ($scope, $resource, $location, $routeParams, patientData) {
        var Patients = $resource('/api/patients');
        $scope.data = patientData.data;
        $scope.patients = Patients.query();
        $scope.patients = patientData.data;

        $scope.data.patientId = $routeParams.patientId;
        $scope.formData = {
            newPatientFirstName: '',
            newPatientLastName: ''
        };
        $scope.navNewPatient = function() {
            return $location.url('/patient/new');
        };
        $scope.navHome = function() {
            return $location.url('/');
        };
        $scope.createPatient = function() {
            return patientData.createPatient($scope.formData);
        };


        // patientData.createPatient = function(newPatient) {};
        //if (newPatient.newPatientFirstName === '' || newPatient.newPatientLastName === '') {
        //    alert('Neither the First nor the Last name are allowed to be left blank.');
         //   return false;
         //   $scope.data;
        //    data = {
            //    new_patient: {
          //          FirstName: newPatient.newPatientFirstName,
          //          LastName:  newPatient.newPatientLastName
          //      }
         //   }
          //  };
          //  $http.post('./patients.json', data).success(function(data) {},
         //       patientData.data.patients.push(data),

         //       console.log('Successfully created patient.'),
          //  error(function() {
         //       return console.error('Failed to create new patient.');
        //    }));
       //  return true;
        }])

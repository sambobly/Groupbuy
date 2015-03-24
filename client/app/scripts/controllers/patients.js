'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('clientApp')
    .controller('PatientsController', ['$scope', '$resource', '$location', '$routeParams', 'patientData', 'Patient', function ($scope, $resource, $location, $routeParams, patientData, Patient) {
      $scope.patient = new Patient();
      $scope.patients = function() {
          $scope.patient.query()
              .then(function(response) {
                  console.log("SUCCESS", response);
              })
              .catch(function(response) {
                  console.log("FAILURE!", response);
              });
      },
        $scope.formData = {
            newPatientFirstName: '',
            newPatientLastName: '',
            newPatientEmail: '',
            newPatientTitle: '',
            newPatientDateOfBirth: '',
            newPatientGender: '',
            newPatientConcessionType: '',
            newPatientAddress: '',
            newPatientMedicareNumber: '',
            newPatientEmergencyContact: '',
            newPatientReferralType: '',
            newPatientPhoneNumber: '',
            newPatientReferringDoctor: '',
        };
        $scope.navNewPatient = function() {
            return $location.url('/patient/new');
        };
        $scope.navHome = function() {
            return $location.url('/');
        };
        $scope.createPatient = function() {
          $scope.patient.create()
            .then(function(response) {
              console.log("SUCCESS", response);
            })
            .catch(function(response) {
              console.log("FAILURE!", response);
            });
        };
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.example = {
            value: new Date(2013, 9, 22)
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

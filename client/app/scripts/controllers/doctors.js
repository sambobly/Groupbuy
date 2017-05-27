'use strict';


angular.module('clientApp')
    .controller('DoctorsController', ['$scope', '$resource', '$location', '$routeParams', 'Doctor', 'Patient', '$modal', '$http', '$timeout', '$interval', function ($scope, $resource, $location, $routeParams, Doctor, Patient, $modal, $http, $timeout, $interval) {

        $scope.doctor = new Doctor();

        Doctor.query().then(function(doctors){
            $scope.doctors = doctors;
        });

        $scope.patient = new Patient();

        Patient.query().then(function(patients){
            $scope.patients = patients;
        });
//        $scope.formData = {
//            productName: '',
//            productPrice: ''
//        };

        angular.extend ($scope.doctor, {
            name: '',
            first_name: '',
            last_name: '',
            position: ''
        });
        $scope.createDoctor = function() {
            $scope.doctor.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.destroyDoctor = function() {
            $scope.doctor.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateDoctor = function(doctor) {
            $scope.doctor.name = $scope.doctor.firstName + " " + $scope.doctor.lastName;
            $scope.doctor.update(doctor)
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.select = function (doctor) {
            $scope.doctor = doctor
        }
    }])





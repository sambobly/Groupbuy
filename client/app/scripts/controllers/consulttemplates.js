'use strict';

angular.module('clientApp')
    .controller('ConsultTemplatesController', ['$scope', '$resource', '$location', '$modal', '$routeParams', 'Consult_Template', 'Consult', 'Patient', 'Doctor', function ($scope, $resource, $location, $modal, $routeParams, Consult_Template, Consult, Patient, Doctor) {
        $scope.consult_template = new Consult_Template();

        Consult_Template.query().then(function(Consult_Templates){
            $scope.consult_templates = Consult_Templates;
        });

        $scope.consult = new Consult();

        Consult.query().then(function(Consults) {
            $scope.consults = Consults;
        });

        $scope.patient = new Patient();

        Patient.query().then(function(Patients) {
            $scope.patients = Patients;
        });

        $scope.doctor = new Doctor();

        Doctor.query().then(function(Doctors) {
            $scope.doctors = Doctors;
        });
        $scope.data = {

        };

        $scope.group = {};

        $scope.set = function() {
            Patient.get({id:2543}).then(function(patient){
                $scope.patient = patient;
                console.log("HELLO", $scope.patient, patient);
                debugger;
            });
        };
        $scope.formData = {
            consult_templateName: '',
            consult_templateContent: ''
        };
        $scope.createConsultTemplate = function() {
            console.log($scope.consult_template);
            $scope.consult_template.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                })  ;
        };

        $scope.updateConsultTemplate = function() {
            $scope.consult_template.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyConsultTemplate = function() {
            $scope.consult_template.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.createConsult = function() {
            $scope.consult.create();
        };
        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'templatesModal.html',
                controller: function ($scope, $modalInstance, Consult_Templates) {
                    $scope.consult_templates = Consult_Templates;


                    $scope.selected = {
                        Consult_Template: $scope.consult_templates[0],
                    };

                    $scope.consult_template = {
                        Consult_Template: $scope.consult_templates[0],
                    };
                    $scope.ok = function () {
                        console.log($scope.consult_template, $scope.selected)
                        $scope.formData = {
                            Consult_TemplateName: $scope.selected.name,
                            Consult_TemplateContent: $scope.selected.content,
                        };
                        $modalInstance.close($scope.selected.consult_template);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    Consult_Templates: function () {
                        return $scope.consult_templates;
                    }
                }
            });

            modalInstance.result.then(function (selectedConsult_Template) {
                $scope.selected = selectedConsult_Template;
                $scope.consult_template = selectedConsult_Template;
            });
        };
    }])


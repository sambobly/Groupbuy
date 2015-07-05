'use strict';


angular.module('clientApp')
    .controller('ConsultsController', ['$scope', '$resource', '$location', '$routeParams', 'Consult', 'Template', 'Patient', '$modal', function ($scope, $resource, $location, $routeParams, Consult, Template, Patient, $modal) {

        $scope.consult = new Consult();

        $scope.template = new Template();

        $scope.patient = new Patient();

        Consult.query().then(function(consults){
            $scope.consults = consults;
        });

        Template.query().then(function(templates) {
            $scope.templates = templates;
        });

        Patient.query().then(function(patients) {
            $scope.patients = patients;
        });

        $scope.formData = {
            consultPatient: '',
            consultDoctor: '',
            consultAppointment: '',
            consultDate: '',
            consultTime: '',
            consultNote: ''

        };
        $scope.createConsult = function() {
            $scope.consult.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateConsult = function() {
            $scope.consult.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyConsult = function() {
            $scope.consult.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Consult, Patient) {
                    $scope.consult = new Consult();

                    $scope.patient = new Patient();

                    Patient.query().then(function(patients) {
                        $scope.patients = patients;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.consult);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createConsult = function() {
                        $scope.consult.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                },
                size: size,
                resolve: {
                    consult: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedConsult) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, consult) {
                    $scope.consult = consult;

                    $scope.ok = function () {
                        $modalInstance.close($scope.consult);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateConsult = function(consult) {
                        $scope.consult.update(consult)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyConsult = function(consult) {
                        $scope.consult.delete(consult)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };
                },
                size: size,
                resolve: {
                    consult: function () {
                        return selectedConsult;
                    }
                }
            });

            modalInstance.result.then(function (selectedConsult) {
                $scope.selected = selectedConsult;
                $scope.consult = selectedConsult;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



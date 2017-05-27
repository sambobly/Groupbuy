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

//        $scope.formData = {
//            consultPatient: '',
//            consultDoctor: '',
//            consultAppointment: '',
//            consultDate: '',
//            consultTime: '',
//            consultNote: '',
//
//
//        };

        angular.extend ($scope.consult, {
            patient: '',
            doctor: '',
            appointment: '',
            date: '',
            time: '',
            note: '',
            patient_Id: Number(),
            doctor_Id: Number(),
            appointment_Id: Number()

        });

        $scope.createConsult = function() {
            $scope.consult.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.testCreate = function(template, consult) {
            var consult = new Consult({patient_id: 23456, note:"HERE"});
            consult.create().then(function (result) {

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
//                    $scope.testCreate = function() {
////                        $scope.consult = new Consult();
////
////                        var consult = new Consult({note:$scope.consult.note, doctor:$scope.consultDoctor});
////                        consult.create().then(function (result) {
////
////                        });
////                    };
//                        angular.forEach($scope.consult, function(consult) {
//                            $scope.consult = consult;
//                            $scope.consult = Consult.get(consult.id);
//
//
////                    $scope.procurator.$$hashkey = "object:5";
////                console.log('SPLIT', $scope.invoice.procurators);
//                            console.log(JSON.stringify(consult));
////                    $scope.procurator.update(procurator)
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        });
//                            new Consult({}).create();
////                    Widget.get({id: 1})
//
//                        })
//
//                    };

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

//                    $scope.consult.patient = consult.getPatient();
//                    console.log("call from modal", $scope.consult.patient, $scope.consult);
                    $scope.consult.appointment = consult.getAppointment();
                    console.log("call from modal", $scope.consult.appointment, $scope.consult);


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



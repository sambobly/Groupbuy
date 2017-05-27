'use strict';


angular.module('clientApp')
    .controller('TestsController', ['$scope', '$resource', '$location', '$routeParams','$modal', 'Test', 'Tax', 'Concession_type', 'Appointment', 'Patient', 'Meeting', 'Invoice', 'Template', 'Doctor',  function ($scope, $resource, $location, $routeParams, $modal, Test, Tax, Concession_type, Appointment, Patient, Meeting, Invoice, Template, Doctor) {

        $scope.today = new Date();

        $scope.hidePopup = function() {
            $scope.isPopupVisible = true

        };

        $scope.showPopup = function() {
            $scope.isPopupVisible = false;

        };

        $scope.test = new Test();

        $scope.oneAtATime = true;

        Test.query().then(function(tests){
            $scope.tests = tests;
        });


        $scope.tax = new Tax();

        $scope.isCollapsed = false;

        Tax.query().then(function(Taxes){
            $scope.taxes = Taxes;
        });

        $scope.appointment = new Appointment();

        Appointment.query().then(function(appointments) {
            $scope.appointments = appointments;
            console.log("Appointments", $scope.appointments)
        });

        $scope.patient = new Patient();

        Patient.query().then(function(patients) {
            $scope.patients = patients;
            console.log("Patients", $scope.patients)
        });

        $scope.template = new Template();

        Template.query().then(function(Templates) {
            $scope.templates = Templates;
            console.log("Templates", $scope.templates)
        });

        $scope.doctor = new Doctor();

        Doctor.query().then(function(Doctors) {
            $scope.doctors = Doctors;
            console.log("Doctors", $scope.doctors);
        });

        $scope.getPatientDetails = function (appointment, patient, meeting, invoices) {
            $scope.patientId = appointment.getPatientId();
//            $scope.nestObject = Nest.getNestObject();
            console.log("SUCCESS", $scope.nest);
//            console.log("Nest Object = ");
//            console.log($scope.nestObject);

            Patient.get({id:$scope.patientId}).then(function(patient){
//                $scope.myNest = myNest;
                $scope.patient = patient;

                console.log("myNest = ");
                console.log(patient);
                $scope.isPopupVisible = true;
                $scope.isPopup2Visible = true;
                $scope.patient = patient;
                $scope.patient.meetings = patient.getMeetings();
                $scope.meeting = meeting;
                $scope.patient.invoices = patient.getInvoices();
                $scope.invoices = invoices;
                console.log("call from modal", $scope.patient.meeting, $scope.patient, $scope.meetings, $scope.invoices);


            });


        };

        $scope.showPopup = function (patient, meeting) {
            $scope.isPopup2Visible = true;
            $scope.patient = patient;
            $scope.patient.meetings = patient.getMeetings();
            $scope.meeting = meeting;
            console.log("call from modal", $scope.patient.meeting, $scope.patient, $scope.meetings);


        };

        $scope.showPopup3 = function (meeting) {
            $scope.isPopupVisible3 = true;
            $scope.meeting = meeting;
            console.log("anything2", $scope.meeting)

            $scope.ok = function () {
                $modalInstance.close($scope.meeting);
                console.log("am i here", $scope.meeting);

            };



        };

        $scope.showPopup2 = function() {
            $scope.isPopupVisible2 = true
            $scope.meeting1 = new Meeting();

//            $scope.createEgg1 = function(egg) {
//                new Egg({id:egg.id, nest:egg.nestId}).update() // would generate a PUT to /stores/123/items/1
//
//            };

        };

        $scope.createMeeting1 = function() {
            $scope.meeting1.content = $scope.template.name;
            $scope.meeting1.patient_id = $scope.patient.id;
            console.log($scope.meeting1.content, $scope.template.name);
            debugger;
            $scope.meeting1.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.concession_type = new Concession_type();

        Concession_type.query().then(function(concession_types){
            $scope.concession_types = concession_types;
        });

        $scope.tests = function() {
            $scope.test.query()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        },

            $scope.formData = {
                testName: '',
                expenseConcessionType: ''


            };
        $scope.createTest = function() {
            $scope.test.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateTest = function() {
            $scope.test.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyTest = function() {
            $scope.test.delete()
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
                controller: function ($scope, $modalInstance, Test, Tax, Concession_type) {
                    $scope.test = new Test();


                    $scope.tax = new Tax();

                    Tax.query().then(function(taxes){
                        $scope.taxes = taxes;
                    });

                    $scope.concession_type = new Concession_type();

                    Concession_type.query().then(function(concession_types){
                        $scope.concession_types = concession_types;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.test);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createTest = function() {
                        $scope.test.create()
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
                    test: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedPatient) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, test, patient, Concession_type) {
                    $scope.patient = patient;

                    $scope.test = test;


                    $scope.concession_type = new Concession_type();

                    Concession_type.query().then(function(concession_types){
                        $scope.concession_types = concession_types;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.patient);
                        console.log("SUCCESS", $scope.patient);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updatePatient = function(patient) {
                        $scope.patient.update(patient)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyPatient = function(patient) {
                        $scope.patient.delete(patient)
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
                    patient: function () {
                        return selectedPatient;
                    }
                }
            });

            modalInstance.result.then(function (selectedPatient) {
                $scope.selected = selectedPatient;
                $scope.patient = selectedPatient;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'templatesModal.html',
                controller: function ($scope, $modalInstance, templates) {
                    $scope.templates = templates;


                    $scope.selected = {
                        template: $scope.templates[0],
                    };

                    $scope.template = {
                        template: $scope.templates[0],
                    };
                    $scope.ok = function () {
                        $scope.formData = {
                            templateName: $scope.selected.name,
                            templateContent: $scope.selected.content,
                        };
                        $modalInstance.close($scope.selected.template);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    templates: function () {
                        return $scope.templates;
                    }
                }
            });

            modalInstance.result.then(function (selectedTemplate) {
                $scope.selected = selectedTemplate;
                $scope.template = selectedTemplate;
            });
        };
        $scope.filterAfterFilterIds = [];
//        function isExist(arr,str) {
//
//            for (var i = 0; i < arr.length; i++) {
//                if (arr[i] === 'kamal') {
//
//                    // Return index
//                    return i;
//                } else {
//                    /* If value is not found return -1. */
//                    return -1;
//                }
//            }
//        }
        $scope.testfilter5 = function (callback, appointments) {
            debugger;
            $scope.selection = [];
            var idx = $scope.selection.true;
            $scope.useFilterIds = {};
            var uniqueItems = function (data, key) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var value = data[i][key];
                    if (result.indexOf(value) == -1) {
                        result.push(value);
                    }

                }
                return result;
            };
            $scope.$watch(function () {
                return {
                    useFilterIds: $scope.useFilterIds
                }}, function (value) {
                debugger;
                $scope.filterIdsGroup = uniqueItems(callback, 'filterId');
                var selected;
                debugger;
                selected = false;
                var p = callback.id;
//                for (var p) {
//              var what, L= arguments.length, ax;

//                    if (selected == true) {
//                        debugger;
////                        selected = true;
//                        if (callback.id) {
//                            filterAfterFilterIds.push(p);
//                            break;
//                        }
//                    }
//                }

                console.log($scope.filterAfterFilterIds);
                debugger;

                    if ($scope.filterAfterFilterIds.length == 0) {
                        $scope.filterAfterFilterIds.push(p);
                        console.log("This being fired?");
                        debugger;
                    }else{
                        for (var i = 0; i < $scope.filterAfterFilterIds.length; i++) {
                            debugger;
                            if ($scope.filterAfterFilterIds.indexOf(p) === -1) {
                              return  $scope.filterAfterFilterIds.push(p);
                                console.log('New veggies collection is : ' + p);
                            } else if ($scope.filterAfterFilterIds.indexOf(p)  > -1) {
                                $scope.filterAfterFilterIds.splice($scope.filterAfterFilterIds.indexOf(p), 1);
                                debugger
                                console.log(p + ' already exists in the veggies collection.');
                            }
//                            if ($scope.filterAfterFilterIds[i] == p) {
//                            return console.log("Otherwise");
//                            debugger;
//                            }else{
//                                $scope.filterAfterFilterIds.push(p);
//                                console.log("Is THIS being fired");
//                                debugger;
//                            }
                        }
                    };

//                $scope.filterAfterFilterIds.push(p);

//                $scope.testFix = function() {
//                    if(callback.id){
//
//                        for (var i = 0; i < $scope.filterAfterFilterIds.length; i++) {
//
//                                if (callback.id == $scope.filterAfterFilterIds) {
//                                    return $scope.filterAfterFilterIds = [];
//                                    debugger;
//                                }
////
//                            debugger;
//                        };
//                    }else{
//                        $scope.filterAfterFilterIds.push(p);
//                        console.log("Otherwise")
//                        debugger;
//                    }
//                    console.log("Test", $scope.filterAfterFilterIds, )
//                };



                $scope.doctorFilter = $scope.filterAfterFilterIds;

                debugger;
//
                console.log($scope.doctorFilter, $scope.filterAfterFilterIds);
//
                debugger;
//
            }, true)
            $scope.$watch('filtered', function (newValue) {
                    if (angular.isArray(newValue)) {
                        console.log(newValue.length);
                    }
                },
                true);
        };
        var testId = null;
        $scope.$watch('doctorFilter', function (newVal) {
            testId = $scope.doctorFilter;
            $scope.filteredAppointmentsTest = Appointment.query().then(function(appointments, appointment) {
//                $scope.appointment = appointments(appointment);
                if(testId){
                    $scope.filteredAppointments = [];
                    debugger;
                for (var i = 0; i < testId.length; i++) {
                    angular.forEach($scope.appointments, function(appointment) {
                        $scope.appointment = appointment;
                        debugger;
                        if (testId[i] == appointment.doctorId) {
                        return $scope.filteredAppointments.push(appointment);
                            debugger;
                    }
                        });
//                    for (var z = 0; z< appointments.length; z++) {
//                    if (testId[i] == appointments[z]) {
//                        return $scope.filteredAppointments = appointments;
//                        console.log("In the watch")
//                    }
                    debugger;
                };
                }else{
                    $scope.filteredAppointments = appointments;
                    console.log("None selected")
                    debugger;
                }
                console.log("Test", $scope.filteredAppointments, testId)
            });
            debugger;
            console.log("doctor filter", testId);
//
        }, true);

//            $scope.appointments = Appointments;
//            debugger;
//            if(testId){
//                debugger;
//                for (var i = 0; i < testId.length; i++) {
//                    if (testId[i] == Appointment.doctor_id) {
//                        return Appointment;
//
//                    }
//                    debugger;
//                };
////
//            }else{
//                return Appointments;
//                debugger;
//            }
////
////        };
//
    }])



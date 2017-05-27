    'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('clientApp')
    .controller('PatientsController', ['$scope', '$http', '$stateParams', '$resource', '$location', '$routeParams', '$modal', 'Patient','Concession_type', 'Product', 'Meeting', 'Appointment', function ($scope, $http, $resource, $stateParams, $location, $routeParams, $modal, Patient, Concession_type, Product, Meeting, Appointment) {
      $scope.patient = new Patient();

//      $scope.patient = $scope.patients[$stateParams.id];



        $scope.availableSearchParams = [
          { key: "firstname", name: "First Name", placeholder: "Name..." },
          { key: "lastname", name: "Last Name", placeholder: "Name..." },

      ];
      Patient.query().then(function(patients) {
          console.log(patients);
          $scope.patients = patients;
      });

      $scope.test = function() {
            var data = ({
                contactName : "CONTACT NAME",
                patient : "2747"
            });
          $scope.patientId = "2747";
//          debugger;
          Patient.get({id:$scope.patientId}).then(function(patient){
//              debugger;
//                $scope.myNest = myNest;
              $scope.patient = patient;
              console.log(patient)
          });
//              debugger;
//            debugger;

//            data = ({
//                contactName : this.contactName
//            })
            console.log("TEST 212121");
            $http.post('/api/patients/test', data);
//            debugger;
//                success(function(data){
//                    console.log("TEST")
//                });
        };

      $scope.concession_type = new Concession_type();

      Concession_type.query().then(function(concession_types){
            $scope.concession_types = concession_types;
        });

      $scope.product = new Product();

      Product.query().then(function(products) {
            $scope.products = products;
      });

      $scope.meeting = new Meeting();

      Meeting.query().then(function(meetings) {
          $scope.meetings = meetings;
      });


      $scope.appointment = new Appointment();

      Appointment.query().then(function(appointments) {
          $scope.appointments = appointments;
      });

      $scope.getAppointments = function(patient) {
        $scope.patient.appointments = patient.getAppointments();
      };

        $scope.getInvoices = function(patient) {
            $scope.patient.invoices = patient.getInvoices();
        };

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
            newPatientReferringDoctor: ''

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
        $scope.changeView = function(patient){
            $scope.patient = patient;
            var earl = '/patients/23519';
            $location.path(earl);
        };
        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Patient, Concession_type, Product) {
                    $scope.patient = new Patient();

                    $scope.concession_type = new Concession_type();

                    Concession_type.query().then(function(concession_types){
                        $scope.concession_types = concession_types;
                    });

                    $scope.product = new Product();

                    Product.query().then(function(products){
                        $scope.products = products;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.patient);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createPatient = function() {
                        $scope.patient.save()
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
                controller: function ($scope, $modalInstance, patient, Concession_type) {
                    $scope.patient = patient;
                    debugger;
                    $scope.patient.meetings = patient.getMeetings();

                    console.log($scope.patient);

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
                                debugger;
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

//        $scope.patientnotes = function (patient) {
//
//
//            $scope.patient = patient;
//
//            $scope.concession_type = new Concession_type();
//
//            Concession_type.query().then(function(concession_types){
//                $scope.concession_types = concession_types;
//            });
//
//            $scope.ok = function () {
//                $modalInstance.close($scope.patient);
//                console.log("SUCCESS", $scope.patient);
//
//            };
//
//            $scope.cancel = function () {
//                $modalInstance.dismiss('cancel');
//            };
//
//            $scope.updatePatient = function(patient) {
//                $scope.patient.update(patient)
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            };
//
//            $scope.destroyPatient = function(patient) {
//                $scope.patient.delete(patient)
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            };
//        };
//
//
//
//
//
//
////        $scope.today = function() {
////            $scope.dt = new Date();
////        };
////        $scope.today();
////
////        $scope.clear = function () {
////            $scope.dt = null;
////        };
////
////        // Disable weekend selection
////        $scope.disabled = function(date, mode) {
////            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
////        };
////
////        $scope.toggleMin = function() {
////            $scope.minDate = $scope.minDate ? null : new Date();
////        };
////        $scope.toggleMin();
////
////        $scope.open = function($event) {
////            $event.preventDefault();
////            $event.stopPropagation();
////
////            $scope.opened = true;
////        };
////
////        $scope.dateOptions = {
////            formatYear: 'yy',
////            startingDay: 1
////        };
////
////        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
////        $scope.format = $scope.formats[0];
////        $scope.example = {
////            value: new Date(2013, 9, 22)
////        };
//
//        // patientData.createPatient = function(newPatient) {};
//        //if (newPatient.newPatientFirstName === '' || newPatient.newPatientLastName === '') {
//        //    alert('Neither the First nor the Last name are allowed to be left blank.');
//         //   return false;
//         //   $scope.data;
//        //    data = {
//            //    new_patient: {
//          //          FirstName: newPatient.newPatientFirstName,
//          //          LastName:  newPatient.newPatientLastName
//          //      }
//         //   }
//          //  };
//          //  $http.post('./patients.json', data).success(function(data) {},
//         //       patientData.data.patients.push(data),
//
//         //       console.log('Successfully created patient.'),
//          //  error(function() {
//         //       return console.error('Failed to create new patient.');
//        //    }));
//       //  return true;
        }])

angular.module('clientApp')
    .controller('PatientNotesController', ['$scope', '$stateParams', '$resource', '$location', '$routeParams', '$modal', 'Patient','Concession_type', 'Product', 'Appointment', function ($scope, $resource, $stateParams, $location, $routeParams, $modal, Patient, Concession_type, Product, Appointment) {

        $scope.isPopupVisible = false;

        $scope.showPopup = function () {
            $scope.isPopupVisible = true;
        };

        $scope.showPopup1 = function () {
            $scope.isPopupVisible = true;
        };

            $scope.patient = patient;
//           Have to get query parameter (patient id) and pass into controller FIGURE OUT
//        Patient.get(patientId).then function(patient) {
//                                 $scope.patient = patient
//        patient.getAppointments(function(appointmentss){
//            console.log("anything")
//            $scope.appointments = appointments;
//        });
//
///    }
//        Also need to change href to patientnotes/{{patientId}}
            $scope.concession_type = new Concession_type();
//            console.log("above")

            patient.getAppointments(function(appointmentss){
                console.log("anything")
                $scope.appointments = appointments;
            });

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

            $scope.appointment = function (appointment) {
                appointment.show();
            }

        console.log("hi", $scope.patient, $scope.appointments);
        console.log("below")

        $scope.isPatientVisible = false;

    }
]
)

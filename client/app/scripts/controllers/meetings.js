'use strict';


angular.module('clientApp')
    .controller('MeetingsController', ['$scope', '$resource', '$location', '$routeParams', 'Meeting', '$modal', function ($scope, $resource, $location, $routeParams, Meeting, $modal) {

        $scope.meeting = new Meeting();

        Meeting.query().then(function(meetings){
            $scope.meetings = meetings;
        });

        angular.extend ($scope.meeting, {
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

        $scope.createMeeting = function() {
            $scope.meeting.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateMeeting = function() {
            $scope.meeting.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyMeeting = function() {
            $scope.meeting.delete()
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
                controller: function ($scope, $modalInstance, Meeting) {
                    $scope.meeting = new Meeting();

                    $scope.ok = function () {
                        $modalInstance.close($scope.meeting);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createMeeting = function() {
                        $scope.meeting.create()
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
                    meeting: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedMeeting) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, meeting) {
                    $scope.meeting = meeting;
//    $scope.consult.appointment = consult.getAppointment();
//                    console.log("call from modal", $scope.consult.appointment, $scope.consult);
                   $scope.meeting.patient = meeting.getPatient();
                    console.log("call from modal", $scope.meeting.patient, $scope.meeting);
                    $scope.meeting.doctor = meeting.getDoctor();
                    console.log("call from modal", $scope.meeting.doctor, $scope.meeting);
                    $scope.meeting.appointment = meeting.getAppointment();
                    console.log("call from modal", $scope.meeting.appointment, $scope.meeting);


                    $scope.ok = function () {
                        $modalInstance.close($scope.meeting);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.showPopup = function () {
                        $scope.isPopupVisible = true;
                    };

                    $scope.showPopup2 = function () {
                        $scope.isPopupVisible2 = true;
                    };

                    $scope.updateMeeting = function(meeting) {
                        $scope.meeting.update(meeting)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible = false;

                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyMeeting = function(meeting) {
                        $scope.meeting.delete(meeting)
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
                    meeting: function () {
                        return selectedMeeting;
                    }
                }
            });

            modalInstance.result.then(function (selectedMeeting) {
                $scope.selected = selectedMeeting;
                $scope.meeting = selectedMeeting;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



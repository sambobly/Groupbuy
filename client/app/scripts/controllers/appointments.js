angular.module('clientApp')
    .controller('AppointmentsController', ['$scope', '$resource', '$location', '$routeParams', 'Appointment', '$modal', function ($scope, $resource, $location, $routeParams, Appointment, $modal) {

        $scope.appointment = new Appointment();


        Appointment.query().then(function(appointments){
            $scope.appointments = appointments;
        });
        $scope.formData = {
            appointmentStartTime: '',
            appointmentEndTime: '',
            appointmentPatientName: '',
            appointmentDoctorName: ''
        };
        $scope.createAppointment = function() {
            $scope.appointment.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                })};
        $scope.eventSources = [];
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
    }]);

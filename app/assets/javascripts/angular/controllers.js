var opthoApp = angular.module('opthoApp', []);

opthoApp.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments')
    $scope.appointments = Appointment.query();
}])
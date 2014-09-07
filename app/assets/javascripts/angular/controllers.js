var opthoApp = angular.module('opthoApp', []);

opthoApp.controller('CalendarListCtrl', ['$scope', 'Appointment', function($scope, Appointment) {
    $scope.appointments = Appointment.query();
}])
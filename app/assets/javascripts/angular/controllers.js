var opthoApp = angular.module('opthoApp', []);

console.log('hi');
opthoApp.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments');
    console.log('hi');
    $scope.appointments = Appointment.query();
}])
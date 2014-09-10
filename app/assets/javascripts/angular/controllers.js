opthoApp.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments');
    console.log('hi');
    $scope.appointments = Appointments.query();
}])
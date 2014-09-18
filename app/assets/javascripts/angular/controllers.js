opthoApp.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments/findByDate');
    today = new Date();
    yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    $scope.appointments = Appointments.query({start: today.getTime(), end: yesterday.getTime()});
}])

opthoApp.controller('ImageCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('app/sampleimages.json').success(function(data) {
            $scope.images = data;
        });

        $scope.orderProp = 'age';
    }]);

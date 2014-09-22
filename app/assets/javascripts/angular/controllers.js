var opthoControllers = angular.module('opthoControllers', []);

opthoControllers.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments/findByDate');
    today = new Date();
    yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    $scope.appointments = Appointments.query({start: today.getTime(), end: yesterday.getTime()});
}]);


opthoControllers.controller('ImageCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
            $http.get('/assets/sampleimages.json').success(function(data) {
                $scope.image = data;
                $scope.mainImageUrl = data.images[0];
            });
    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}]);


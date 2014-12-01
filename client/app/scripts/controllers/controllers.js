var clientControllers = angular.module('clientControllers', []);

clientControllers.controller('PtntInfoCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http)
{
    $scope.query = {}
    $scope.queryBy = '$'
    $http.get('/images/samplepatients.json').success(function(data) {
        $scope.patients = data.patients;
    });
}]);

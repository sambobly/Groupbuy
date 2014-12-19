var clientControllers = angular.module('clientControllers', []);

clientControllers.controller('PtntInfoCtrl', ['$scope', '$routeParams', '$resource', function($scope, $routeParams, $resource)
{
    var Patients = $resource('/api/patients');
    $scope.patients = Patients.query();
    $scope.query = {}
    $scope.queryBy = '$'
 //   $http.get('/images/samplepatients.json').success(function(data) {
   //     $scope.patients = data.patients;
   // });

}]);

angular.module('clientApp')
    .controller('DemoCtrl' ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
    $scope.events = [];

    $scope.dayConfig = {
        viewType: "Day"
    };

    $scope.weekConfig = {
        visible: false,
        viewType: "Week"
    };

}]);
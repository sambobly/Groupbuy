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
        $scope.images = data.images;
        $scope.mainImageUrl = data.images[0];
    });
}]);
opthoControllers.controller('PtntInfoCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.query = {}
    $scope.queryBy = '$'
    $http.get('/assets/samplepatients.json').success(function(data) {
        $scope.patients = data.patients;
    });
}]);
opthoControllers.controller('PathologyController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.query = {}
    $scope.queryBy = '$'
    $http.get('/assets/samplepathology.json').success(function(data) {
        $scope.pathology = data.pathology;
    });
}]);
opthoControllers.controller('ConsultController', ['$scope', function($scope) {
    $scope.master = {};

    $scope.update = function(consult) {
        $scope.master = angular.copy(consult);
    };

    $scope.reset = function() {
        $scope.consult = angular.copy($scope.master);
    };

    $scope.reset();

}])
opthoControllers.controller('MedicationController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/assets/samplemedications.json').success(function(data) {
        $scope.medications = data.medications
        $scope.pastmedications = [
            {name: 'Pantoprazole'},
            {name: 'Pregabalin'}];
        $scope.mypastmedications = $scope.pastmedications[2];
    });
}]);
opthoControllers.controller('PastAppointmentsController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/assets/samplepastappointments.json').success(function(data) {
        $scope.pastappointments = data.pastappointments
    });
}]);
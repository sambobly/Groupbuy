var opthoApp = angular.module('opthoApp', [
'ngRoute',
'ngResource',
'opthoControllers',
'opthoDirectives',
'opthoServices',
'textAngular'
]);


opthoApp.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/consultations/app/sampleimages.json', {
        templateUrl: 'consultations/show',
        controller: 'ImageCtrl'
    }).otherwise({
            redirectTo: '/images'
        });
}]);


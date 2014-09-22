var opthoApp = angular.module('opthoApp', [
'ngRoute',
'ngResource'
]);

opthoApp.config(['$routeProvider',
function($routeProvider) {
    when('/consultations/app/sampleimages.json', {
        templateUrl: 'consultations/show',
        controller: 'ImageCtrl'
    }),
        otherwise({
            redirectTo: '/images'
        });
}])
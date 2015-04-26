var opthoApp = angular.module('opthoApp', [
'ngRoute',
'ngResource',
'opthoControllers',
'opthoDirectives',
'opthoServices',
'textAngular',
'ezfb'
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
opthoApp.config(['ezfbProvider',
    function (ezfbProvider) {
    ezfbProvider.setLocale('zh_TW');
}]);
opthoApp.config(['ezfbProvider',
    function (ezfbProvider) {
    ezfbProvider.setInitParams({
        // This is my FB app id for plunker demo app
        appId: '614823908618705',

        // Module default is `v1.0`.
        // If you want to use Facebook platform `v2.0`, you'll have to add the following parameter.
        // https://developers.facebook.com/docs/javascript/reference/FB.init/v2.0
        version: 'v2.0'
    });
}]);

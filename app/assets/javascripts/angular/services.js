var opthoServices = angular.module('opthoServices', ['ngResource']);

opthoServices.factory('Appointment', ['$resource',
    function($resource){
        return $resource('Appointments/:appointmentId.json', {}, {
            query: {method:'GET', params:{appointmentId:'appointments'}, isArray:true}
        });
    }]);
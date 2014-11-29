var opthoServices = angular.module('opthoServices', ['ngResource']);


//opthoServices.factory('AppointmentService', function($http, $q) {
  //  var service = {
    //    getAppointments: function() {
      //      var d = $q.defer();
        //    $http.jsonp('Appointments/findbydate')
          //      .then(function(data, status) {
            //        if(data.status == 200)
              //          d.resolve(data.data.responseData.feed.entries);
                //    else
                  //      d.reject(data);
          //      });
       //     return d.promise
    //    }
  //  };
    // return service;
   // });

var opthoServices = angular.module('opthoServices', ['ngResource']);

opthoServices.factory('AppointmentService', ['$resource',
  function($resource){
    return $resource('Appointments/:appointmentId.json', {}, {
      query: {method:'GET', params:{appointmentId:'appointments'}, isArray:true}
        });
    }]);

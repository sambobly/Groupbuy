var clientServices = angular.module('clientServices', ['ngResource']);


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


clientServices.factory('AppointmentService', ['$resource',
  function($resource){
    return $resource('Appointments/:appointmentId.json', {}, {
      query: {method:'GET', params:{appointmentId:'appointments'}, isArray:true}
        });
    }]);

clientServices.factory('patientData', ['$http',
    function($http) {
        var patientData;
        patientData = {
            data: {
                patients: [
                    {
                        FirstName: 'Loading',
                        LastName: ''
                    }
                ]
            },
            isLoaded: false
        };
        patientData.loadPatients = function(deferred) {
            if (!patientData.isLoaded) {
                return $http.get('/api/patients.json').success(function(data) {
                    patientData.data.patients = data;
                    patientData.isLoaded = true;
                    console.log('Successfully loaded patients.');
                    if (deferred) {
                        return deferred.resolve();
                    }
                }).error(function() {
                        console.error('Failed to load patients.');
                        if (deferred) {
                            return deferred.resolve();
                        }
                    });
            } else {
                if (deferred) {
                    return deferred.resolve();
                }
            }
        };

        patientData.createPatient = function(newPatient) {
            var data;
            if (newPatient.newPatientFirstName === '' || newPatient.newPatientLastName === '') {
                alert('Neither the Title nor the Body are allowed to be left blank.');
                return false;
            }
            data = {
                new_patient: {
                    FirstName: newPatient.newPatientFirstName,
                    LastName: newPatient.newPatientLastName
                }
            };
            $http.post('./api/patients', data).success(function(data) {
                patientData.data.patients.push(data);
                return console.log('Successfully created patient.');
            }).error(function() {
                    return console.error('Failed to create new patient.');
                });
            return true;
        };
    return patientData;
    }])

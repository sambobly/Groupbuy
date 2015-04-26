//exampleAppointments = angular.module('exampleAppointments', ['ngresource']).
  //  factory('Appointments', ['$resource', ($resource)->
    //$resource('/appointments.json', {}, {
      //  query: { method: 'GET', isArray: true },
        //create: { method: 'POST'}
    //})
    //]).
    //factory('Appointmenta', ['$resource', ($resource)->
      //  $resource('/appointments/:task_id.json', {}, {
        //    show: { method: 'GET'},
          //  update: { method: 'PUT'},
            // destroy: { method: 'DELETE'}
        // })
    // ])
var opthoModules = angular.module('opthoModules', []) ;

opthoModules.provider ('facebook', function facebookProvider ($injector) {
    this.initialized = false;
    var defaultParams = { appId: '', status: true, cookie: true, xfbml: true };
    var facebookEvents = {
        'auth': ['authResponseChange', 'statusChange', 'login', 'logout']
    };

    var Q = [];

    this.init = function (params) {
        window.fbAsyncInit = function() {
            angular.extend (defaultParams, params);
            FB.init(defaultParams);

            this.initialized = true;
            console.log ("Facebook initialization done.");

            processPostInitializeQ ();
        };
    };

    function executeWhenInitialized (callback, self, args) {
        console.log ("adding to Q: ", callback);
        Q.push ([callback, self, args]);
    };


    var processPostInitializeQ = function () {
        console.log ('Processing Q messages.');
        while (item = Q.shift ()) {

            func = item[0];
            self = item[1];
            args = item[2];

            func.apply (self, args);
        }
    };


    this.$get = ["$rootScope", "$q",  function ($rootScope, $q) {
        var promise = function (func) {
            var deferred = $q.defer ();

            func (function (response) {
                if (response && response.error) {
                    deferred.reject (response);
                } else {
                    deferred.resolve (response);
                }

                $rootScope.$apply ();
            });

            return deferred.promise;
        };

        var registerEventHandlers = function () {
            angular.forEach (facebookEvents, function (events, domain) {
                angular.forEach (events, function (_event) {
                    FB.Event.subscribe (domain + '.' + _event, function (response) {
                        $rootScope.$broadcast('fb.' + domain + '.' + _event, response);
                    });
                });
            });
        };

        var login = function (params) {
            return promise (function (callback) {
                FB.login (function (response) {
                    callback (response);
                }, params);
            });
        }

        var api = function (path) {
            return promise (function (callback) {
                FB.api (path, function (response) {
                    callback (response);
                });
            });
        }

        if (!this.initialized) {
            executeWhenInitialized (registerEventHandlers, this, []);
        } else {
            registerEventHandlers ();
        }

        var provider = this;
        return  {
            initialized: function () {
                return provider.initialized;
            },

            init: provider.init,
            api: api,
            login: login
        }
    }];
});
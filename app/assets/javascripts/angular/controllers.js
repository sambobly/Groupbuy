var opthoControllers = angular.module('opthoControllers', []);
 opthoControllers.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments/findByDate');
    today = new Date();
    yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    $scope.appointments = Appointments.query({start: today.getTime(), end: yesterday.getTime()});
  }]);
//opthoControllers.controller('CalendarListCtrl', function($scope, AppointmentService) {
  //  AppointmentService.getAppointments()
    //    .then(function(data) {
      //      $scope.appointments = data;
       // })
// });

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
        $scope.isPopupVisible = false;
        $scope.showPopup = function(pathology) {
            $scope.isPopupVisible = true;
        };
        $scope.closePopup = function(){
            $scope.isPopupVisible = false
        };
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

}]);
opthoControllers.controller('MedicationController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/assets/samplemedications.json').success(function(data) {
        $scope.medications = data.medications;
        $scope.pastmedications = [
            {name: 'Pantoprazole'},
            {name: 'Pregabalin'}];
        $scope.mypastmedications = $scope.pastmedications[2];
        $scope.newmedications = data.newmedication
        $scope.isPopupVisible = false;
        $scope.showPopup = function(newmedication) {
            $scope.isPopupVisible = true;
        };
        $scope.closePopup = function(){
            $scope.isPopupVisible = false
        };
        $scope.saveMedication = function() {
            $scope.isPopupVisible = false
            $scope.newmedications.push($scope.medications);
        };
    });
}]);
opthoControllers.controller('PastAppointmentsController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/assets/samplepastappointments.json').success(function(data) {
        $scope.pastappointments = data.pastappointments
        $scope.isPopupVisible = false;
        $scope.showPopup = function(pastappointment) {
            $scope.isPopupVisible = true;
            $scope.selectedpastappointment = pastappointment;
        };
        $scope.closePopup = function() {
            $scope.isPopupVisible = false
        }
    });
}]);
opthoControllers.controller('EmailController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/assets/sampleemails.json').success(function(data) {
        $scope.emails = data.emails;
        $scope.sentEmails = data.sentEmails;
        $scope.isPopupVisible = false;
        $scope.isComposePopupVisible = false;
        $scope.composeEmail = {};

        $scope.sendEmail = function() {
            $scope.isComposePopupVisible = false;
            $scope.composeEmail.from = "me";
            $scope.composeEmail.date = new Date();
            $scope.sentEmails.push($scope.composeEmail);
        };

        $scope.showComposePopup = function() {
            $scope.composeEmail = {};
            $scope.isComposePopupVisible = true;
        };

        $scope.closeComposePopup = function() {
            $scope.isComposePopupVisible = false;
        };

        $scope.showPopup = function(email) {
            $scope.isPopupVisible = true;
            $scope.selectedEmail = email;
        };

        $scope.closePopup = function() {
            $scope.isPopupVisible = false;
        };
        $scope.activeTab = "inbox";
        $scope.forward = function() {
            $scope.isPopupVisible = false;
            $scope.composeEmail = {};
            angular.copy($scope.selectedEmail, $scope.composeEmail);

            $scope.composeEmail.body =
                "\n-------------------------------\n"
                    + "from: " + $scope.composeEmail.from + "\n"
                    + "sent: " + $scope.composeEmail.date + "\n"
                    + "to: " + $scope.composeEmail.to + "\n"
                    + "subject: " + $scope.composeEmail.subject + "\n"
                    + $scope.composeEmail.body;

            $scope.composeEmail.subject = "FW: " + $scope.composeEmail.subject;
            $scope.composeEmail.to = "";
            $scope.composeEmail.from = "me";
            $scope.isComposePopupVisible = true;
        };
        $scope.reply = function() {
            // hide the view details popup
            $scope.isPopupVisible = false;

            // create an empty composeEmail object the compose
            // email popup is bound to
            $scope.composeEmail = {};

            // copy the data from selectedEmail into composeEmail
            angular.copy($scope.selectedEmail, $scope.composeEmail);

            // edit the body to prefix it with a line and the
            // original email information
            $scope.composeEmail.body =
                "\n-------------------------------\n"
                    + "from: " + $scope.composeEmail.from + "\n"
                    + "sent: " + $scope.composeEmail.date + "\n"
                    + "to: " + $scope.composeEmail.to + "\n"
                    + "subject: " + $scope.composeEmail.subject + "\n"
                    + $scope.composeEmail.body;

            // prefix the subject with “RE:”
            $scope.composeEmail.subject = "RE: " + $scope.composeEmail.subject;

            // the email is going to the person who sent it
            // to us so populate the `to` with `from`
            $scope.composeEmail.to = $scope.composeEmail.from;

            // it’s coming from us
            $scope.composeEmail.from = "me";

            // show the compose email popup
            $scope.isComposePopupVisible = true;
        };
    });
}]);
opthoControllers.controller('MainCtrl', function($scope, ezfb, $window, $location, $q) {

    updateMe();

    updateLoginStatus()
        .then(updateApiCall);

    /**
     * Subscribe to 'auth.statusChange' event to response to login/logout
     */
    ezfb.Event.subscribe('auth.statusChange', function (statusRes) {
        $scope.loginStatus = statusRes;

        updateMe();
        updateApiCall();
    });

    $scope.login = function () {
        /**
         * Calling FB.login with required permissions specified
         * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
         */
        ezfb.login(null, {scope: 'email,user_likes'});

        /**
         * In the case you need to use the callback
         *
         * ezfb.login(function (res) {
     *   // Executes 1
     * }, {scope: 'email,user_likes'})
         * .then(function (res) {
     *   // Executes 2
     * })
         *
         * Note that the `res` result is shared.
         * Changing the `res` in 1 will also change the one in 2
         */
    };

    $scope.logout = function () {
        /**
         * Calling FB.logout
         * https://developers.facebook.com/docs/reference/javascript/FB.logout
         */
        ezfb.logout();

        /**
         * In the case you need to use the callback
         *
         * ezfb.logout(function (res) {
     *   // Executes 1
     * })
         * .then(function (res) {
     *   // Executes 2
     * })
         */
    };

    $scope.share = function () {
        var no = 1,
            callback = function (res) {
                console.log('FB.ui callback execution', no++);
                console.log('response:', res);
            };

        ezfb.ui(
            {
                method: 'feed',
                name: 'angular-easyfb API demo',
                picture: 'http://plnkr.co/img/plunker.png',
                link: 'http://plnkr.co/edit/qclqht?p=preview',
                description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
                    ' Facebook integration in AngularJS made easy!' +
                    ' Please try it and feel free to give feedbacks.'
            },
            callback
        )
            .then(callback);
    };

    /**
     * For generating better looking JSON results
     */
    var autoToJSON = ['loginStatus', 'apiRes'];
    angular.forEach(autoToJSON, function (varName) {
        $scope.$watch(varName, function (val) {
            $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
        }, true);
    });

    /**
     * Update api('/me') result
     */
    function updateMe () {
        ezfb.getLoginStatus()
            .then(function (res) {
                // res: FB.getLoginStatus response
                // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
                return ezfb.api('/me');
            })
            .then(function (me) {
                // me: FB.api('/me') response
                // https://developers.facebook.com/docs/javascript/reference/FB.api
                $scope.me = me;
            });
    }

    /**
     * Update loginStatus result
     */
    function updateLoginStatus () {
        return ezfb.getLoginStatus()
            .then(function (res) {
                // res: FB.getLoginStatus response
                // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
                $scope.loginStatus = res;
            });
    }

    /**
     * Update demostration api calls result
     */
    function updateApiCall () {
        return $q.all([
                ezfb.api('/me'),
                ezfb.api('/me/likes')
            ])
            .then(function (resList) {
                // Runs after both api calls are done
                // resList[0]: FB.api('/me') response
                // resList[1]: FB.api('/me/likes') response
                $scope.apiRes = resList;
            });

    }
});
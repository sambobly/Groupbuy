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

}])
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
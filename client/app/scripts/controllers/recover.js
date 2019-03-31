angular.module('clientApp')
    .controller('RecoversController', ['$scope', '$window', '$route', '$http', '$q', '$timeout', '$resource', '$location', '$routeParams', '$stateParams', 'Consumer', '$modal', '$anchorScroll', 'User', 'userService', 'Auth', function ($scope, $window, $route, $http, $q, $timeout, $resource, $location, $routeParams, $stateParams, Consumer, $modal, $anchorScroll, User, userService, Auth) {
        $scope.isPopupVisiblePWordEmail = false;
        $scope.isPopupVisiblePWordEmailFail = false;
        $scope.isPopup11Visible = false;

        $scope.userService = userService;
        $scope.user = userService.user;

        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });

        $scope.testGet = function(text, consumer) {
//            angular.forEach($scope.consumers, function(consumer){
//                if (consumer.email == text){
//                    console.log("correct consumer", consumer)
//                } else {
//                    console.log("wrong one")
//                };
//            })
            $scope.consumer.email = $scope.text.email
            $scope.text.dateOfBirth = ($scope.text.year + "-" + $scope.text.month + '-' + $scope.text.day)
            consumer = $scope.consumers;
            angular.forEach($scope.consumers, function(consumer){
                if (consumer.email == $scope.text.email){
                    console.log("correct consumer", consumer, consumer.dateOfBirth);
                    $scope.consumer = consumer;
                    if (consumer.dateOfBirth == $scope.text.dateOfBirth) {

                        var parameters = ({
                            email: $scope.consumer.email
                        });
                        console.log(parameters, "test resend confirmation");
                        Auth.resetPassword(parameters).then(function() {
                            console.log("sent")
                            $scope.isPopupVisiblePWordEmail = true;
                            $scope.isPopupVisiblePWordEmailFail = false;
                        });
                        console.log("put email here");
                        debugger;
                    } else {
                        $scope.isPopupVisiblePWordEmail = false;
                        $scope.isPopupVisiblePWordEmailFail = true;
                        console.log("date of birth does not match");
                        debugger;

                    }
//                    $scope.isPopupVisiblePWordEmailFail = false;

                } else {
                    $scope.isPopupVisiblePWordEmail = false;
                    $scope.isPopupVisiblePWordEmailFail = true;
                    console.log("others")

                };
            });
//                .then(function() {
//                    console.log("then function working?")
////                    debugger;
////                   if ($scope.consumer.dateOfBirth == $scope.text.dateOfBirth) {
////                    var parameters = ({
////                        email: $scope.consumer.email
////                    });
////                    console.log(parameters, "test resend confirmation");
////                       debugger;
////                   } else {
////                       console.log("wrong one")
////                       $scope.isPopupVisiblePWordEmail = false;
////                       $scope.isPopupVisiblePWordEmailFail = true;
////                   };
//                   });
            debugger;
            console.log("test again)", consumer)
        };


    }])
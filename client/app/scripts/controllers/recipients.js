'use strict';


angular.module('clientApp')
    .controller('RecipientsController', ['$scope', '$resource', '$location', '$routeParams', 'Recipient', '$modal', function ($scope, $resource, $location, $routeParams, Recipient, $modal) {
        $scope.recipient = new Recipient();

        Recipient.query().then(function(recipients){
            $scope.recipients = recipients;
        });
//        $scope.formData = {
//            productName: '',
//            productPrice: ''
//        };

        angular.extend ($scope.recipient, {
            appointment_Id: Number(),
            first_name: '',
            last_name: '',
            name: '',
            email: ''
        })
        $scope.createRecipient = function() {
            $scope.recipient.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.destroyRecipient = function() {
            $scope.recipient.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateRecipient = function(recipient) {
            $scope.recipient.update(recipient)
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
    }])





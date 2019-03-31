'use strict';


angular.module('clientApp')
    .controller('ClaimsController', ['$scope', '$http', '$resource', '$location', '$state','$stateParams', '$routeParams', 'Merchandise', 'Consumer', 'Claim', '$modal', function ($scope, $http, $resource, $location, $state, $stateParams, $routeParams, Merchandise, Consumer, Claim, $modal) {

        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });

        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });

        $scope.claim = new Claim();

        Claim.query().then(function(claims){
            $scope.claims = claims;
        });


        angular.extend ($scope.merchandise, {
            value: Number(),
            category: '',
            title: '',
            description: '',
            start: '',
            end: ''
        });

        $scope.createClaim = function() {
            $scope.claim.merchandiseId = $stateParams.merchandiseId;
            console.log($scope.claim.merchandiseId, "claim merchandise Id")
            $scope.claim.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateClaim = function() {
            console.log("fired")
            $scope.claim.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyClaim = function() {
            $scope.claim.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.getRelatives = function(claim, merchandise, consumer) {
            $scope.merchandiseId = claim.getMerchandiseId();
            $scope.consumerId = claim.getConsumerId();
            console.log($scope.merchandise, "merchandise up here");
            $scope.claim = claim;
            debugger;
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                $scope.consumer  = consumer;
            });
            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise){
                $scope.merchandise  = merchandise;
            });
            console.log($scope.merchandise, "merchandise", $scope.consumer, consumer);
            debugger;
        };

        $scope.getRelatives2 = function (merchandise) {
            $scope.merchandise.claims = merchandise.getClaims();
            console.log($scope.merchandise.claims, "Claimed")
            debugger;
        };
        $scope.assessRoute = function() {
            console.log("claim", $stateParams, $stateParams.merchandiseId)

        }

//        $scope.goTo = function(merchandise) {
//            $scope.merchandise = merchandise;
//            var Id = $scope.merchandise.id;
//            $routeParams.merchandiseId = $scope.merchandise.id;
//            debugger;
//            $state.go('merchandises/.merchandiseId');
//        };




    }])



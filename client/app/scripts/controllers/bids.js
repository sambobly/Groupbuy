'use strict';


angular.module('clientApp')
    .controller('BidsController', ['$scope', '$http', '$resource', '$location', '$state', '$routeParams', '$stateParams', 'Merchandise', 'Consumer', 'Bid', '$modal', function ($scope, $http, $resource, $location, $state, $routeParams, $stateParams, Merchandise, Consumer, Bid, $modal) {

        $scope.assessRoute = function() {
            console.log("claim", $stateParams, $stateParams.bidId)

        };

        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });

        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });

        $scope.bid = new Bid();

        Bid.query().then(function(bids){
            $scope.bids = bids;
        });


        angular.extend ($scope.merchandise, {
            value: Number(),
            category: '',
            title: '',
            description: '',
            start: '',
            end: ''
        });

        $scope.createBid = function() {

            $scope.bid.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateBid = function() {
            $scope.bid.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyBid = function() {
            $scope.bid.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.getRelatives = function(bid, merchandise, consumer) {
            $scope.merchandiseId = bid.getMerchandiseId();
            $scope.consumerId = bid.getConsumerId();

            debugger;
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                $scope.consumer  = consumer;
            });
            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise){
                $scope.merchandise  = merchandise;
            });
            console.log(consumer.avatar, consumer.firstName, consumer.lastName);
            debugger;
        };

        $scope.testRelatives = function(bid, merchandise, consumer) {
            $scope.bid.id = $stateParams.bidId;
            console.log($scope.bid.id, $stateParams.bidId)
            Bid.get({id:$stateParams.bidId}).then(function(bid){
                $scope.bid = bid;
                (console.log("bid", $scope.bid, bid))
            });

//            $scope.merchandiseId = bid.getMerchandiseId();
//            $scope.consumerId = bid.getConsumerId();
//
//            debugger;
//            Consumer.get({id:$scope.consumerId}).then(function(consumer){
//                $scope.consumer  = consumer;
//            });
//            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise){
//                $scope.merchandise  = merchandise;
//            });
//            console.log(consumer.avatar, consumer.firstName, consumer.lastName);
//            debugger;
        };

        $scope.goTo = function(merchandise) {
            $scope.merchandise = merchandise;
            var Id = $scope.merchandise.id;
            $routeParams.merchandiseId = $scope.merchandise.id;
            debugger;
            $state.go('merchandises/.merchandiseId');
        };

        $scope.getAll = function(bid) {
            $scope.bid = bid;
            $scope.merchandiseId = bid.merchandiseId;
            $scope.consumerId = bid.consumerId;
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                $scope.consumer  = consumer;
                console.log(consumer);
            });
            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise){
                $scope.merchandise  = merchandise;
                console.log("merchandise", merchandise);
            });
            debugger;
        };


    }])



'use strict';


angular.module('clientApp')
    .controller('WishesController', ['$scope', '$http', '$resource', '$location', '$state', '$routeParams', 'Wish', 'Consumer', 'Merchandise', '$modal', function ($scope, $http, $resource, $location, $state, $routeParams, Wish, Consumer, Merchandise,  $modal) {

        $scope.wish = new Wish();

        Wish.query().then(function(wishes){
            $scope.wishes = wishes;
        });

        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });

        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });
//        angular.extend ($scope.ticket, {
//            value: Number(),
//            consumer_id: '',
//            merchandise_id: '',
//            bid_id: '',
//            win: Boolean()
//
//        });
        $scope.test = function() {
            console.log("fired")
        };
        $scope.select = function (wish, consumer, merchandise) {
            $scope.wish = wish;
            $scope.consumerId = wish.getConsumerId();
            debugger;
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                console.log(Consumer);
                $scope.consumer  = consumer;
            });
            console.log(consumer);
            debugger;
            $scope.merchandiseId = wish.getMerchandiseId();
            debugger;
            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise){
                $scope.merchandise  = merchandise;
            });
            console.log(merchandise);
            debugger;
        };
        $scope.createWish = function() {
            console.log("wish create fired");
            $scope.wish.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateWish = function() {
            $scope.wish.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyWish = function() {
            $scope.wish.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

//        $scope.getRelatives = function(bid, merchandise, consumer) {
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
//            console.log(merchandise);
//            debugger;
//        };
//        $scope.goTo = function(merchandise) {
//            $scope.merchandise = merchandise;
//            var Id = $scope.merchandise.id;
//            $routeParams.merchandiseId = $scope.merchandise.id;
//            debugger;
//            $state.go('merchandises/.merchandiseId');
//        };




    }])



'use strict';


angular.module('clientApp')
    .controller('TicketsController', ['$scope', '$http', '$resource', '$location', '$state', '$routeParams', 'Ticket', '$modal', function ($scope, $http, $resource, $location, $state, $routeParams, Ticket, $modal) {

        $scope.ticket = new Ticket();

        Ticket.query().then(function(tickets){
            $scope.tickets = tickets;
        });



//        angular.extend ($scope.ticket, {
//            value: Number(),
//            consumer_id: '',
//            merchandise_id: '',
//            bid_id: '',
//            win: Boolean()
//
//        });

        $scope.createTicket = function() {
            $scope.ticket.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateTicket = function() {
            $scope.ticket.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyTicket = function() {
            $scope.ticket.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.set = function(ticket) {
            $scope.ticket = ticket;
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



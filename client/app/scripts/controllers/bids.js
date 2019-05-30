'use strict';


angular.module('clientApp')
    .controller('BidsController', ['$scope', '$http', '$resource', '$location', '$state', '$routeParams', '$stateParams', 'Merchandise', 'Consumer', 'Bid', '$modal', 'User', 'userService', 'Combination',  function ($scope, $http, $resource, $location, $state, $routeParams, $stateParams, Merchandise, Consumer, Bid, $modal, User, userService, Combination) {
        $scope.userService = userService;
        $scope.user = userService.user;

        $scope.assessRoute = function() {
            console.log("claim", $stateParams, $stateParams.bidId)

        };
        $scope.combination = new Combination();

        Combination.query().then(function(combinations){
            $scope.combinations = combinations;
        });
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

        $scope.testRelatives = function(bid, merchandise, consumer, user, combination) {
            $scope.user = userService.user;
            user = $scope.user;

            debugger;
            angular.forEach($scope.consumers, function(consumer) {
                console.log("consumer", consumer)
                if(consumer.userId == user.id){
                    console.log("SUCCESS")
                    $scope.consumer = consumer;
                    debugger;
                };
            });

            $scope.merchandise.id = $stateParams.merchandiseId;
            console.log($scope.merchandise.id, $stateParams.merchandiseId);
            debugger;

            Merchandise.get({id:$stateParams.merchandiseId}).then(function(merchandise){
                $scope.merchandise = merchandise;
                (console.log("merchandise", $scope.merchandise, merchandise));
                $scope.combinationId = merchandise.getCombinationId();
                Combination.get({id:$scope.combinationId}).then(function(combination){
                    debugger;
                    console.log(combination);
                    $scope.combination = combination
                });
                $scope.merchandise.bids = merchandise.getBids().then(function(merchandise){
                    console.log($scope.merchandise.bids)
                    $scope.selectedBids = []
                    angular.forEach($scope.merchandise.bids, function(bid) {
                        $scope.bid = bid;
                        if (bid.consumerId == $scope.consumer.id) {
                            $scope.selectedBids.push(bid);
                            console.log("selected bids", $scope.selectedBids)
                            debugger;
                        }
                    })
                    $scope.updateBidTest = function(bid) {
                        $scope.bid = bid;
                        debugger;
                        new Bid({id:bid.id, answer:bid.answer}).update();
                        console.log("bid", bid);
                        debugger;

//                        $scope.bid.update()
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
                    };

                    $scope.updateAllBidsTest = function(bid) {
                        angular.forEach($scope.selectedBids, function(bid) {
                            $scope.bid = bid;
                            debugger;
                            new Bid({id:bid.id, answer:bid.answer}).update();
                            console.log("bid", bid);
                            debugger;
                        })


                    };

                    $scope.countWinsTest = function(bid) {
                        angular.forEach($scope.selectedBids, function(bid) {
                            $scope.bid = bid;
                            var str = $scope.combination.result;
                            var answer = $scope.bid.answer;
                            var result = answer.split(",")
                            console.log($scope.merchandise, merchandise, $scope.combination, $scope.combination.result);
                            console.log("result", result)
                            debugger;
                            var here = []

                            angular.forEach(result, function(value, key) {
                                console.log(result, $scope.answer, value, key);
                                str.search(value);
                                debugger;
                                console.log(str.search(value))
                                if (str.search(value) >=0) {
                                    here.push("W")
                                    console.log(here)
                                } else {
                                    console.log("incorrect!")
                                }
                                here.length;
                                console.log("here.length", here.length)
                                debugger;
                            })
                            new Bid({id:bid.id, score:here.length}).update();
                            debugger;

                        })
                    }

                    $scope.findWinner = function(merchandise, bid) {
                        Merchandise.get({id:$stateParams.merchandiseId}).then(function(merchandise){
                        $scope.merchandise = merchandise;
                        debugger;
                        var pushList = [];
                        var topScorers = [];
                        var topBid = [];
                        var winner = [];
                        $scope.merchandise.bids = merchandise.getBids().then(function(merchandise){
                            angular.forEach($scope.merchandise.bids, function(value, key) {
                                console.log("testPush", value, key);
                                pushList.push(value.score);
                                console.log("pushList", pushList)
                            });
                            var maxScoreValue = Math.max.apply(Math, pushList);
                            console.log(Math.max.apply(Math, pushList), maxScoreValue, pushList, "scores")
                            angular.forEach($scope.merchandise.bids, function(value, key) {
                                if (value.score == maxScoreValue) {
                                    topScorers.push(value)
                                    console.log(topScorers, "topScorers");
                                } else {
                                    console.log(value, "not Top")
                                };
                            });
                            angular.forEach(topScorers, function(value, key) {
                                console.log("testPush", value, key);
                                topBid.push(value.value);
                                console.log("topBid", topBid)
                            });
                            var maxTopBid = Math.max.apply(Math, topBid);
                            angular.forEach(topScorers, function(value, key) {
                                if (value.value == maxTopBid) {
                                    winner.push(value)
                                    console.log(winner, "winner");
                                } else {
                                    console.log(value, "close but no cigar")
                                };
                            })
                        });
                        });
                    }

                });

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



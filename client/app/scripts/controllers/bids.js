'use strict';


angular.module('clientApp')
    .controller('BidsController', ['$scope', '$http', '$resource', '$location', '$state', '$routeParams', '$stateParams', '$timeout', 'Merchandise', 'Consumer', 'Bid', '$modal', 'User', 'userService', 'Combination',  function ($scope, $http, $resource, $location, $state, $routeParams, $stateParams, $timeout, Merchandise, Consumer, Bid, $modal, User, userService, Combination) {
        $scope.userService = userService;
        $scope.user = userService.user;

        $scope.assessRoute = function() {
            console.log("claim", $stateParams, $stateParams.bidId, ENV['AWS_ACCESS_KEY_ID'])

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
            $scope.testRelatives();
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

        $scope.isPopupVisibleSubmitNo = false;
        $scope.isPopupVisibleSubmitYes = false;

        $scope.findCombination = function () {
          debugger;
          angular.forEach($scope.combinations, function(combination) {
            if (combination.complete == 0) {
              debugger;
              $scope.combination = combination
            } else {
              console.log("already complete")
            }
          });
        }

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
            $scope.isPopupVisibleSubmitYes = true;
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

                    $scope.listComboOne ={
                        "1a": combination.onea,
                        "1b": combination.oneb
                    };
                    $scope.listComboTwo = {
                        "2a": combination.twoa,
                        "2b": combination.twob
                    };
                    $scope.listComboThree = {
                        "3a": combination.threea,
                        "3b": combination.threeb
                    };
                    $scope.listComboFour = {
                        "4a": combination.foura,
                        "4b": combination.fourb
                    };
                    $scope.listComboFive = {
                        "5a": combination.fivea,
                        "5b": combination.fiveb
                    };
                    $scope.listComboSix = {
                        "6a": combination.sixa,
                        "6b": combination.sixb
                    };
                    $scope.listComboSeven = {
                        "7a": combination.sevena,
                        "7b": combination.sevenb
                    };
                    $scope.listComboEight = {
                        "8a": combination.eighta,
                        "8b": combination.eightb
                    };
                    $scope.listComboNine = {
                        "9a": combination.ninea,
                        "9b": combination.nineb
                    };
                    $scope.listComboTen = {
                        "10a": combination.tena,
                        "10b": combination.tenb
                    };
                });
                $scope.merchandise.bids = merchandise.getBids().then(function(merchandise){
                    debugger;

                    if ($scope.merchandise.start != null && $scope.merchandise.winner < 1) {
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
                    $scope.updateBidTest2 = function(bid) {
                        $scope.bid = bid;
                        console.log(bid.answerOne, bid.answerTwo, bid.answerOneID, "find answer ID")
                        bid.answerTest = bid.answerOne + "," + bid.answerTwo + "," + bid.answerThree + "," + bid.answerFour + "," + bid.answerFive + "," + bid.answerSix + "," + bid.answerSeven + "," + bid.answerEight + "," + bid.answerNine + "," + bid.answerTen;
                        console.log(bid.answerTest, "bid.answerTest")
                        debugger;
                        new Bid({id:bid.id, answer:bid.answerTest, answerOne:bid.answerOne, answerTwo:bid.answerTwo, answerThree:bid.answerThree, answerFour:bid.answerFour, answerFive:bid.answerFive, answerSix:bid.answerSix, answerSeven:bid.answerSeven, answerEight:bid.answerEight, answerNine:bid.answerNine, answerTen:bid.answerTen}).update();
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
                            console.log(bid.answerOne, bid.answerTwo, bid.answerOneID, "find answer ID")
                            bid.answerTest = bid.answerOne + "," + bid.answerTwo + "," + bid.answerThree + "," + bid.answerFour + "," + bid.answerFive + "," + bid.answerSix + "," + bid.answerSeven + "," + bid.answerEight + "," + bid.answerNine + "," + bid.answerTen;
                            console.log(bid.answerTest, "bid.answerTest")
                            debugger;
                            new Bid({id:bid.id, answer:bid.answerTest, answerOne:bid.answerOne, answerTwo:bid.answerTwo, answerThree:bid.answerThree, answerFour:bid.answerFour, answerFive:bid.answerFive, answerSix:bid.answerSix, answerSeven:bid.answerSeven, answerEight:bid.answerEight, answerNine:bid.answerNine, answerTen:bid.answerTen}).update();
                            console.log("bid", bid);
                            debugger;
                        })


                    };

                    $scope.updateAllBidsSame = function(bid, bidAll) {
                        $scope.bidAll = bid;
                        debugger;
                        angular.forEach($scope.selectedBids, function(bid) {
                            bid.answerOne = $scope.bidAll.answerOne;
                            bid.answerTwo = $scope.bidAll.answerTwo;
                            bid.answerThree = $scope.bidAll.answerThree;
                            bid.answerFour = $scope.bidAll.answerFour;
                            bid.answerFive = $scope.bidAll.answerFive;
                            bid.answerSix = $scope.bidAll.answerSix;
                            bid.answerSeven = $scope.bidAll.answerSeven;
                            bid.answerEight = $scope.bidAll.answerEight;
                            bid.answerNine = $scope.bidAll.answerNine;
                            bid.answerTen = $scope.bidAll.answerTen;
                            debugger;
                            $scope.bid = bid;
                            console.log(bid.answerOne, bid.answerTwo, bid.answerOneID, "find answer ID")
                            bid.answerTest = bid.answerOne + "," + bid.answerTwo + "," + bid.answerThree + "," + bid.answerFour + "," + bid.answerFive + "," + bid.answerSix + "," + bid.answerSeven + "," + bid.answerEight + "," + bid.answerNine + "," + bid.answerTen;
                            console.log(bid.answerTest, "bid.answerTest")
                            debugger;
                            new Bid({id:bid.id, answer:bid.answerTest, answerOne:bid.answerOne, answerTwo:bid.answerTwo, answerThree:bid.answerThree, answerFour:bid.answerFour, answerFive:bid.answerFive, answerSix:bid.answerSix, answerSeven:bid.answerSeven, answerEight:bid.answerEight, answerNine:bid.answerNine, answerTen:bid.answerTen}).update();
                            console.log("bid", bid);
                            debugger;
                        })


//                        $scope.bid = bid;
//                        $scope.bid.answerOne = bid.answerOne;
//                        debugger;


                    };

                    $scope.countWinsTest = function(bid) {
                        console.log("why not firing?");
                        return $timeout(function() {
                        angular.forEach($scope.merchandise.bids, function(bid) {
                            $scope.bid = bid;
                            var str = $scope.combination.result;
                            if ($scope.bid.answer != null) {
                                var answer = $scope.bid.answer;
                            } else {
                                var answer = "n"
                            };

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
                            });
                            new Bid({id:bid.id, score:here.length}).update();
                            console.log("update scores", bid)
                            debugger;

                        })
                        }, 1);
                    };

                    $scope.findWinner = function(merchandise, bid) {
                        Merchandise.get({id:$stateParams.merchandiseId}).then(function(merchandise){
                          var currentTime = new Date();

                          $scope.merchandise = merchandise;
                          new Merchandise({id:merchandise.id, complete:"1", end:currentTime}).update()
                            .then(function(response) {
                              console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                              console.log("FAILURE!", response);
                            });
                         debugger;
                        var pushList = [];
                        var topScorers = [];
                        var topBid = [];
                        var winner = [];
                        var tieBreakWinner = [];
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
                                    console.log(value, "not Top");
                                    new Bid({id:value.id, success:"0", complete:"1"}).update()
                                        .then(function(response) {
                                            console.log("SUCCESS", response);
                                        })
                                        .catch(function(response) {
                                            console.log("FAILURE!", response);
                                        });

                                    console.log("Did not win", value);
                                    debugger;
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
                                    console.log(winner, winner.length, "winner");
                                } else {
                                    console.log(value, "close but no cigar");
                                    new Bid({id:value.id, success:"0", complete:"1"}).update()
                                        .then(function(response) {
                                            console.log("SUCCESS", response);
                                        })
                                        .catch(function(response) {
                                            console.log("FAILURE!", response);
                                        });

                                    console.log("Did not win", value);
                                    debugger;
                                };
                            });
                            var x = Math.floor(Math.random() * (winner.length));
                            console.log(x);
                            angular.forEach(winner, function(value,key) {
                                if (key == x) {
                                    tieBreakWinner.push(value)
                                    console.log(tieBreakWinner, "tieBreakWinner")
                                    new Bid({id:value.id, success:"1", complete:"1"}).update()
                                        .then(function(response) {
                                          debugger;
                                          console.log("SUCCESS", response);
                                          Bid.get({id:value.id}).then(function(bid){
                                          console.log("bid", bid);
                                          $scope.bid = bid;
                                          debugger;
                                          merchandise = $scope.merchandise;
                                          new Merchandise({id:merchandise.id, winner:bid.consumerId}).update().then(function(response){
                                            console.log(response, merchandise, "? updated merchandise with winner")
                                          });
                                            debugger;
                                          });
                                        })
                                        .catch(function(response) {
                                            console.log("FAILURE!", response);
                                        });

                                    console.log("win", value);
                                    debugger;
                                } else {
                                    console.log(value, "close but no cigar");
                                    new Bid({id:value.id, success:"0", complete:"1"}).update()
                                        .then(function(response) {
                                            console.log("SUCCESS", response);
                                        })
                                        .catch(function(response) {
                                            console.log("FAILURE!", response);
                                        });

                                    console.log("Did not win", value);
                                    debugger;
                                };
                            });
                        });
                        });
                    }
                    } else {
                        $scope.isPopupVisibleSubmitNo = true;

                        console.log ("No longer accepting winners!", $scope.merchandise)
                    }
                });

            });

              $scope.fireAll = function () {
                $scope.countWinsTest().then(function(result){
                    debugger;
                      $scope.findWinner();

                    })
              };

            $scope.mathsTest = function() {
                var x = Math.floor(Math.random() * 1);
                console.log(x);
            }
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
        $scope.entities = [{
            name: 'one',
            checked: false
        }, {
            name: 'two',
            checked: false
        }, {
            name: 'three',
            checked: true
        }, {
            name: 'four',
            checked: false
        }
        ]

        $scope.updateSelection = function(position, entities) {
            angular.forEach(entities, function(subscription, index) {
                if (position != index)
                    subscription.checked = false;
            });
        }

        $scope.updateAnswer = function() {
            $scope.bid.answer1 = bid.answer1;
            console.log("value", $scope.bid.answer1)
        }

        $scope.list = {
            City: [{name: "cityA"}, {name: "cityB"}],
            County: [{ name: "countyA"}, {name: "countyB"}],
            Town: [{ name: "townA"}, {name: "townB"}]
        };

        $scope.localityTypeRadio = 'City';
        $scope.localityTypeRadio1 = 'Stuff';
        $scope.removeDuplicates = function (merchandise, consumer) {
          Merchandise.get({id:$stateParams.merchandiseId}).then(function(merchandise){
            $scope.allBids = []
            $scope.loserRemoveDuplicates = []
            $scope.merchandise = merchandise;
            debugger;
            $scope.merchandise.bids = merchandise.getBids().then(function(response) {
              return $timeout(function() {
                angular.forEach(response, function(response) {
                $scope.allBids.push(response);
                console.log($scope.allBids, "allBids");
              });
              }, 1).then(function(response) {
                $scope.allBidsConsumerIds = [];

                console.log($scope.allBids, "allBids2");
                angular.forEach($scope.allBids, function(response) {
                $scope.allBidsConsumerIds.push(response.consumerId);
                console.log($scope.allBidsConsumerIds, "consumer Ids array")

                  if (response.success == true) {

                  debugger;
                  Consumer.get({id:response.consumerId}).then(function(consumer){
                    var data = ({
                      contactName : "CONTACT NAME",
                      consumer : consumer.id,
                      merchandise : merchandise.id

                    });
                    console.log("winner", data);
//                                $http.post('/api/consumers/test', data);
//                                console.log(consumer, "successful email")
//                     var index = $scope.allBids.indexOf(response);
//                     if (index > -1) { //if found
//                       $scope.allBids.splice(index, 1);
//                       console.log($scope.allBids, "all bids post removal")
//                     }

                    for( var i = 0; i < $scope.allBidsConsumerIds.length; i++){
                      if ( $scope.allBidsConsumerIds[i] === response.consumerId) {
                        $scope.allBidsConsumerIds.splice(i, 1);
                        i--;
                      }
                    };
                      console.log($scope.allBidsConsumerIds, "all bids post removal")
                  }).then(function(response){
                    console.log($scope.allBidsConsumerIds, "loser bids")
                    $scope.losersNoDup = [];
                    $scope.losersNoDup = $scope.allBidsConsumerIds.filter(function(elem, pos) {
                      return $scope.allBidsConsumerIds.indexOf(elem) == pos;
                    });
                    console.log($scope.losersNoDup, "no duplicates loser IDs");
                    angular.forEach($scope.losersNoDup, function(response) {
                    Consumer.get({id:response}).then(function(consumer){
                      var data = ({
                        contactName : consumer.firstName,
                        consumer : consumer.id,
                        merchandise : merchandise.id

                      });
                      console.log("losers", data);
                               $http.post('/api/consumers/fail', data);
                               console.log(consumer, "failed email")
                    });
                    });
                  });
                } else {
                  console.log("no winner found, no emails sent")

                  };
                });

              })

            })
          })
        }
        $scope.emailWinners = function (merchandise, consumer) {
            Merchandise.get({id:$stateParams.merchandiseId}).then(function(merchandise){
                $scope.allBids = []
                $scope.loserRemoveDuplicates = []
                $scope.merchandise = merchandise;
            debugger;
            $scope.merchandise.bids = merchandise.getBids()
                .then(function(response) {
                    debugger;

                    console.log("SUCCESS", response, $scope.merchandise.bids);
                    angular.forEach(response, function(response) {
                        $scope.allBids.push(response);

                        if (response.success == true) {
                            debugger;
                            Consumer.get({id:response.consumerId}).then(function(consumer){
                                var data = ({
                                    contactName : "CONTACT NAME",
                                    consumer : consumer.id,
                                    merchandise : merchandise.id

                                });
                                console.log("winner", data);
                               $http.post('/api/consumers/test', data);
                               console.log(consumer, "successful email")
                            })
                        } else {
//                            if($scope.loserRemoveDuplicates.indexOf(response.consumerId) === -1) {
//                                $scope.loserRemoveDuplicates.push(response);
//                                debugger;
//                                console.log($scope.loserRemoveDuplicates);
//                                debugger;
//                            }
                            const index = $scope.loserRemoveDuplicates.findIndex((e) => e.id === response.consumerId);
                                debugger;
                            if (index === -1) {
                                $scope.loserRemoveDuplicates.push(response);
                                debugger;
                            } else {
                                $scope.loserRemoveDuplicates[index] = response;
                                debugger;
                            }
                            debugger;
                            console.log($scope.loserRemoveDuplicates, "$scope.loserRemoveDuplicates")
                            Consumer.get({id:response.consumerId}).then(function(consumer){
                                var data = ({
                                    contactName : "CONTACT NAME",
                                    consumer : consumer.id,
                                    merchandise : merchandise.id

                                });
                                console.log("losers", data);
                               $http.post('/api/consumers/fail', data);
                               console.log(consumer, "failed email")
                            })
                        }
                    });
                    debugger;
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
            console.log(merchandise, $scope.merchandise.bids);
            debugger;
            });

        };

    }])



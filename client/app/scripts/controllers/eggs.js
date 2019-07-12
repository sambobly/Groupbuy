'use strict';


angular.module('clientApp')
    .controller('EggsController', ['$scope', '$q', '$rootScope', 'Auth', 'User', 'userService', '$resource', '$location', '$routeParams', '$anchorScroll', '$timeout', 'NgTableParams', 'Egg', 'Nest', '$modal', 'Merchandise', 'Consumer', 'Bid', 'Wish', function ($scope, $q, $rootScope, Auth, User, userService, $resource, $location, $routeParams, $anchorScroll, $timeout, NgTableParams, Egg, Nest, $modal, Merchandise, Consumer, Bid, Wish) {
        $scope.myDefaultImage = 'images/polo-shirt-1.png';

        $scope.userService = userService;
        $scope.user = userService.user;
        $scope.consumerFind = [];

        $('a[href^="#"]').on('click', function(event) {

            var target = $(this.getAttribute('href'));

            if( target.length ) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
            }

        });
//

        $scope.$on('devise:login', function(e, user) {
            $scope.isAuthenticated = true;
            $scope.user = user;

            if ($scope.user.id > 0) {
                console.log("user is", $scope.user);

            } else {
                console.log("No user logged in")
            };
            debugger;
            // You can get data of current user (getting user's name and etc.)
            console.log(user);
        });
//        $scope.$apply((function(user, consumer) {
//                    $scope.user = userService.user;
//                    user = $scope.user;
//                    if ($scope.consumerFind == 0) {
//                        angular.forEach($scope.consumers, function(consumer) {
//                            console.log("consumer", consumer)
//                            if(consumer.userId == user.id){
//                                console.log("SUCCESS")
//                                $scope.consumer = consumer;
//                                $scope.consumer2 = consumer;
//                                debugger;
//                            };
//                        });
//                        $scope.consumer1 = $scope.consumer;
//                        consumer = $scope.consumer;
//                        debugger;
//                        $scope.consumer2 = consumer;
//
//                    }
//        })())
        $scope.$watch('consumerFind', function (consumer) {
            debugger;
            setTimeout(function () {
                $scope.$apply(function(user, consumer) {
                    $scope.user = userService.user;
                    user = $scope.user;
                    if ($scope.consumerFind == 0) {
                        angular.forEach($scope.consumers, function(consumer) {
                            console.log("consumer", consumer)
                            if(consumer.userId == user.id){
                                console.log("SUCCESS", consumer)
                                $scope.consumer = consumer;
                                $scope.consumer2 = consumer;
                                $scope.creates = $scope.consumer.merchandises;
                                consumer.getMerchandises().then(function(response){
                                    console.log(response);
                                    $scope.consumer.merchandises = response;
                                    consumer.getBids().then(function(response){
                                        console.log(response);
                                        $scope.consumer.bids = response;
                                        consumer.getWishes().then(function(response){
                                            console.log(response);
                                            $scope.consumer.wishes = response;
                                            angular.forEach($scope.consumer.bids, function(bid, merchandise) {
                                                $scope.bid = bid;
                                                $scope.merchandiseId = bid.merchandiseId;
                                                if (bid.complete == 1) {
                                                    if (bid.success == 1) {
                                                        Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                                                            $scope.consumerWonMerchandise.push(merchandise);
                                                            debugger;
                                                            console.log(merchandise, "won merchandise");
                                                        })}else {
                                                        console.log("failed", merchandise)}
                                                } else {
                                                        $scope.consumerBids.push($scope.bid);
//                                                    PROBLEM IS HERE. AM SETTING SCOPE.BID PRIOR TO THE THEN -> ALL MERCHANDISE $scope.bid being the same
                                                    debugger;
                                                    Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                                                        $scope.merchandise = merchandise;
//                                                        $scope.merchandise.bidValue = $scope.bid.value;
                                                        $scope.consumerBidMerchandise.push($scope.merchandise);
                                                        debugger;
                                                        console.log($scope.merchandise, $scope.merchandise.bidValue, $scope.bid, "bid merchandise");
                                                    })
                                                }

                                            });

                                            angular.forEach($scope.consumer.wishes, function(wish, merchandise) {
                                                $scope.wish = wish;
                                                $scope.merchandiseId = wish.merchandiseId;
                                                Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                                                    $scope.consumerWishMerchandise.push(merchandise);
                                                    debugger;
                                                    console.log(merchandise);
                                                });
                                                console.log($scope.consumerBidMerchandise)

                                            });
                                            $scope.makeTodos();
                                            $scope.makeConsumerBidTodos();
                                            $scope.makeCreates();
                                            $scope.makeDreams();
                                            $scope.makeWins();

                                        })
                                    })
                                });
//
//                                debugger;
                            };
                        });
                        $scope.consumer1 = $scope.consumer;
                        consumer = $scope.consumer;
                        $scope.creates = $scope.consumer.merchandises;
                        debugger;
                        $scope.consumer2 = consumer;

                    }
                });
            }, 10000);
        });
//        $scope.$watch('consumerFind', function (consumer) {
//            debugger;
//            setTimeout(function () {
//                $scope.$apply(function(user, consumer) {
//                    $scope.user = userService.user;
//                    user = $scope.user;
//                    if ($scope.consumerFind == 0) {
//                        angular.forEach($scope.consumers, function(consumer) {
//                            console.log("consumer", consumer)
//                            if(consumer.userId == user.id){
//                                console.log("SUCCESS", consumer)
//                                $scope.consumer = consumer;
//                                $scope.consumer2 = consumer;
//                                $scope.consumer.merchandises = consumer.getMerchandises();
//                                $scope.consumer.bids = consumer.getBids();
//                                $scope.consumer.wishes = consumer.getWishes();
////                                angular.forEach($scope.consumer.bids, function(bid, merchandise) {
////                                    $scope.bid = bid;
////                                    $scope.merchandiseId = bid.merchandiseId;
////                                    if (bid.complete == 1) {
////                                        if (bid.success == 1) {
////                                            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
////                                                $scope.consumerWonMerchandise.push(merchandise);
////                                                debugger;
////                                                console.log(merchandise, "won merchandise");
////                                            })}else {
////                                            console.log("failed", merchandise)}
////                                    } else {
////                                        Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
////                                            $scope.consumerBidMerchandise.push(merchandise);
////                                            debugger;
////                                            console.log(merchandise, "bid merchandise");
////                                        })}
////
////                                });
////
////                                angular.forEach($scope.consumer.wishes, function(wish, merchandise) {
////                                    $scope.wish = wish;
////                                    $scope.merchandiseId = wish.merchandiseId;
////                                    Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
////                                        $scope.consumerWishMerchandise.push(merchandise);
////                                        debugger;
////                                        console.log(merchandise);
////                                    });
////                                    console.log($scope.consumerBidMerchandise)
////
////                                });
////                                $scope.makeTodos();
////                                $scope.makeCreates();
////                                $scope.makeDreams();
////                                $scope.makeWins();
////
////                                debugger;
//                            };
//                        });
//                        $scope.consumer1 = $scope.consumer;
//                        consumer = $scope.consumer;
//                        debugger;
//                        $scope.consumer2 = consumer;
//
//                    }
//                });
//            }, 10000);
//////            setTimeout(function () {
//////                $scope.$apply(function(user, consumer) {
//////                    $scope.user = userService.user;
//////                    user = $scope.user;
//////                    if ($scope.consumerFind == 0) {
//////                        angular.forEach($scope.consumers, function(consumer) {
//////                            console.log("consumer", consumer)
//////                            if(consumer.userId == user.id){
//////                                console.log("SUCCESS")
//////                                $scope.consumer = consumer;
//////                                $scope.consumer2 = consumer;
//////                                debugger;
//////                            };
//////                        });
//////                        $scope.consumer1 = $scope.consumer;
//////                        consumer = $scope.consumer;
//////                        debugger;
//////                        $scope.consumer2 = consumer;
//////
//////                    }
//////                });
//////            }, 10000);
//////            function currentConsumer(user, consumer, timeout) {
//////                $scope.user = userService.user;
//////                user = $scope.user;
//////                debugger;
//////                var deferred = $q.defer();
//////                $timeout(function() {
//////                    if (consumer.userId == user.id) {
//////                        $scope.consumer = consumer;
////////                               debugger;
//////                     deferred.resolve(consumer);
//////                    } else {
//////                        $scope.consumer = 'Failed';
//////                        deferred.reject(consumer);
//////                        debugger;
//////                    }
//////                }, timeout * 1000);
//////                return deferred.promise;
//////            }
//////            var q = $q.defer();
//////            $scope.user = userService.user;
//////                    user = $scope.user;
//////                    if ($scope.consumerFind == 0) {
//////                        angular.forEach($scope.consumers, function(consumer) {
//////                            console.log("consumer", consumer)
//////                            if(consumer.userId == user.id){
//////                                q.resolve(
//////                                    console.log("SUCCESS"),
//////                                $scope.consumer = consumer,
//////                                $scope.consumer2 = consumer
//////                            );
//////                                debugger;
//////                            };
//////                        });
//////                        $scope.consumer1 = $scope.consumer;
//////                        consumer = $scope.consumer;
//////                        debugger;
//////                        $scope.consumer2 = consumer;
//////
//////                    }
//////            return q.promise;
//////            $scope.consumer = $scope.consumer1;
//////            $scope.consumer2 = $scope.consumer;
//        });

        $scope.$watch('consumer2', function(consumer, bid) {
            $scope.consumer = $scope.consumer2;
            consumer = $scope.consumer;
            $scope.consumer = consumer;


        })
        $scope.testUser = function (user, consumer) {
            $scope.user = userService.user;
            user = $scope.user;
            if ($scope.consumerFind == 0) {
                angular.forEach($scope.consumers, function(consumer) {
                    console.log("consumer", consumer)
                    if(consumer.userId == user.id){

                       console.log("SUCCESS"),
                       $scope.consumer = consumer,
                       $scope.consumer2 = consumer
                        debugger;
                    };
                });
                $scope.consumer1 = $scope.consumer;
                consumer = $scope.consumer;
                debugger;
                $scope.consumer2 = consumer;

            }

        };

        $scope.isCollapsed = false;
        $scope.isCollapsed1 = false;
        $scope.isCollapsed2 = false;
        $scope.isCollapsed3 = false;

        $scope.isPopup3Visible = false;
        $scope.isPopup5Visible = true;

        $scope.egg = new Egg();
        $scope.nest = new Nest();
        var self = this;
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term

        // create the list of sushi rolls
        $scope.sushi = [
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
        ];
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

        $scope.wish = new Wish();

        Wish.query().then(function(wishes){
            $scope.wishes = wishes;
        });


//        $scope.todos = $scope.consumerBidMerchandises;
//        $scope.filteredTodos = [];
//        $scope.currentPage = 1;
//        $scope.numPerPage = 6;
//        $scope.maxSize = 100;
//
//        $scope.makeTodos = function() {
//            $scope.todos = $scope.consumerBidMerchandises;
////            for (var i=1;i<=1000;i++) {
////                $scope.todos.push({ text:'todo '+i, done:false});
////            }
//        };
//        $scope.makeTodos();
//
//        $scope.testPaginate = function(){
//            $scope.todos = $scope.consumerBidMerchandise;
//            console.log($scope.todos)
//            debugger;
//        }
        $scope.details = function(consumer) {
            $scope.consumer = consumer;
            debugger;
        }
        $scope.consumerDetails = function (consumer, size, selectedConsumer) {
            $scope.consumer = consumer;
            debugger;
            var modalInstance = $modal.open({
                templateUrl: 'detailsModal.html',
                controller: function ($scope, $modalInstance, Consumer) {
                    $scope.consumer = consumer;
                    debugger;

                    console.log($scope.consumer);

//                    $scope.concession_type = new Concession_type();



                    $scope.ok = function () {
                        $scope.isPopup3Visible = true;
                        $scope.isPopUp1Visible = false;

                        $modalInstance.close($scope.consumer);
                        console.log("SUCCESS", $scope.consumer);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateConsumer = function(consumer) {
                        $scope.consumer.update(consumer)
                            .then(function(response) {
                                debugger;
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };
//
//                    $scope.destroyPatient = function(patient) {
//                        $scope.patient.delete(patient)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
                },
                size: size,
                resolve: {
                    merchandise: function () {
                        return selectedConsumer;
                    }

                }
            });



            modalInstance.result.then(function (selectedConsumer) {
                $scope.selected = selectedConsumer;
                $scope.consumer = selectedConsumer;
                consumer = selectedConsumer;
                $scope.open(consumer);
                debugger

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());

                debugger


            });
        };

//        $scope.open = function(merchandise) {
//            $scope.isPopup3Visible = true;
//            $scope.merchandise = merchandise;
//            $scope.ctrlFlavor = merchandise.id;
//
//            debugger;
//        };
        $scope.ctrlFlavor = "blackberry";

        $scope.open1 = function(merchandise) {
            $scope.isPopup8Visible = true;
            $scope.isPopup5Visible = false;
            $scope.merchandise = merchandise;
            $scope.ctrlFlavor = merchandise.id;
            $anchorScroll(0, 0);

            debugger;


        };
        $scope.filteredTodos = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 3
            ,$scope.maxSize = 5;

        $scope.makeTodos = function() {
            $scope.todos = $scope.consumerBidMerchandise;
            console.log("$scope.todos", $scope.todos)
        };
        $scope.makeTodos();

        $scope.filteredConsumerBidTodos = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 3
            ,$scope.maxSize = 5;

        $scope.makeConsumerBidTodos = function() {
            $scope.consumerBidTodos = $scope.consumerBids;
            console.log("$scope.consumerBidTodos", $scope.consumerBidTodos)
        };
        $scope.makeConsumerBidTodos();

        $scope.filteredCreates = []
            ,$scope.currentPage2 = 1
            ,$scope.numPerPage2 = 3
            ,$scope.maxSize = 5;

        $scope.makeCreates = function() {
            $scope.creates = $scope.consumer.merchandises;
            debugger;
        };
        $scope.makeCreates();

        $scope.filteredDreams = []
            ,$scope.currentPage1 = 1
            ,$scope.numPerPage1 = 3
            ,$scope.maxSize = 5;

        $scope.makeDreams = function() {
            $scope.dreams = $scope.consumerWishMerchandise;
            console.log($scope.consumerWishMerchandise, "consumer wish merchandise")
            debugger;
        };
        $scope.makeDreams();
        $scope.filteredWins = []
            ,$scope.currentPage3 = 1
            ,$scope.numPerPage3 = 3
            ,$scope.maxSize = 5;

        $scope.makeWins = function() {
            $scope.wins = $scope.consumerWonMerchandise;
            console.log($scope.consumerWonMerchandise, "consumer wish merchandise")
            debugger;
        };
        $scope.makeWins();
        $scope.$watch('currentPage + numPerPage + consumerBidMerchandise', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
            $scope.filteredConsumerBidTodos = $scope.consumerBidTodos.slice(begin, end);
            console.log("Filtered Todos", $scope.filteredTodos)
            debugger;
        });

        $scope.$watch('currentPage2 + numPerPage2 + consumer.merchandises', function() {
            var begin = (($scope.currentPage2 - 1) * $scope.numPerPage2)
                , end = begin + $scope.numPerPage2;
            $scope.creates = $scope.consumer.merchandises;

            $scope.filteredCreates = $scope.creates.slice(begin, end);
            debugger;
        });
        $scope.$watch('currentPage1 + numPerPage1 + consumerWishMerchandise', function() {
            var begin = (($scope.currentPage1 - 1) * $scope.numPerPage1)
                , end = begin + $scope.numPerPage1;

            $scope.filteredDreams = $scope.dreams.slice(begin, end);
            debugger;
        });
        $scope.$watch('currentPage3 + numPerPage3 + consumerWonMerchandise', function() {
            var begin = (($scope.currentPage3 - 1) * $scope.numPerPage3)
                , end = begin + $scope.numPerPage3;

            $scope.filteredWins = $scope.wins.slice(begin, end);
            debugger;
        });
        $scope.select = function (consumer, merchandise, bid) {
            $scope.consumer = consumer;
            $scope.consumer.merchandises = consumer.getMerchandises();
            $scope.consumer.bids = consumer.getBids();
            $scope.consumer.wishes = consumer.getWishes();
            console.log($scope.consumer.merchandises, $scope.consumer.bids);
            var id = consumer.dateOfBirth
            $scope.consumer.day = id.slice(id.length - 2);
            $scope.consumer.month = id.slice(id.length - 5, id.length-3);
            $scope.consumer.year = id.slice(id.length - 10, id.length-6);
            console.log(consumer.dateOfBirth, $scope.consumer.day, $scope.consumer.month, $scope.consumer.year);
        };

        $scope.consumerBidMerchandise = [];
        $scope.consumerBids = [];
        $scope.consumerWishMerchandise = [];
        $scope.consumerWonMerchandise = [];
        $scope.testWatch1 = 0;

        $scope.$watch('consumer', function(consumer) {
            console.log("Fired on consumer select");
            $scope.consumer = consumer;
//            $scope.testUser($scope.user)
//                .then(function(consumer){
//                    debugger;
//                    return $scope.select(consumer)
//                })

            debugger;
//            clearTimeout(timeoutCode);  //does nothing, if timeout alrdy done
//            timeoutCode = setTimeout(function(){   //Set timeout
//                $scope.loading = true;
//                returnFactory.query($scope.query).then(function (returns) {
//                    angular.forEach($scope.consumer.bids, function(bid, merchandise) {
//                        $scope.bid = bid;
//                        $scope.merchandiseId = bid.merchandiseId;
//                        Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
//                            $scope.consumerBidMerchandise.push(merchandise);
//                            debugger;
//                            console.log(merchandise);
//                        });
//
//                    });
//
//                    angular.forEach($scope.consumer.wishes, function(wish, merchandise) {
//                        $scope.wish = wish;
//                        $scope.merchandiseId = wish.merchandiseId;
//                        Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
//                            $scope.consumerWishMerchandise.push(merchandise);
//                            debugger;
//                            console.log(merchandise);
//                        });
//                        console.log($scope.consumerBidMerchandise)
//
//                    });
//                });
//            },250);


            debugger;
        });

        $scope.$watch('testWatch', function(consumer,  merchandise, bid) {
            $scope.makeTodos();
            $scope.makeConsumerBidTodos();
            console.log("fired testWatch")
                debugger;
            $scope.makeCreates();
            $scope.makeDreams()
        });
        $scope.test1 = function (bid, consumer) {
//            consumer = $scope.consumer;
////            console.log("test fired");
////            debugger;
//            $scope.consumer.merchandises = consumer.getMerchandises();
//            debugger;
//            $scope.consumer.bids = consumer.getBids();
//            debugger;
//
//            $scope.consumer.wishes = consumer.getWishes();
//            console.log($scope.consumer.merchandises, $scope.consumer.bids);
//            var id = consumer.dateOfBirth
//            $scope.consumer.day = id.slice(id.length - 2);
//            $scope.consumer.month = id.slice(id.length - 5, id.length-3);
//            $scope.consumer.year = id.slice(id.length - 10, id.length-6);
//            console.log(consumer.dateOfBirth, $scope.consumer.day, $scope.consumer.month, $scope.consumer.year);
            angular.forEach($scope.consumer.bids, function(bid, merchandise) {
                $scope.bid = bid;
                $scope.merchandiseId = bid.merchandiseId;
                if (bid.complete == 1) {
                    if (bid.success == 1) {
                        Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                        $scope.consumerWonMerchandise.push(merchandise);
                        debugger;
                        console.log(merchandise, "won merchandise");
                 })}else {
                        console.log("failed", merchandise)}
                  } else {
                        Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                        $scope.merchandise.bidValue = $scope.bid.value;
                        $scope.consumerBidMerchandise.push(merchandise);
                        debugger;
                        console.log(merchandise, $scope.merchandise.bidValue, "bid merchandise");
                })}

            });

            angular.forEach($scope.consumer.wishes, function(wish, merchandise) {
                $scope.wish = wish;
                $scope.merchandiseId = wish.merchandiseId;
                Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                    $scope.consumerWishMerchandise.push(merchandise);
                    debugger;
                    console.log(merchandise);
                });
            console.log($scope.consumerBidMerchandise)

        });
            $scope.makeTodos();
            $scope.makeConsumerBidTodos();
            $scope.makeCreates();
            $scope.makeDreams();
            $scope.makeWins();

            debugger;
        };
        $scope.view = function (size, selectedMerchandise, merchandise, ctrlFlavor) {
            $scope.merchandise = selectedMerchandise;
            $scope.ctrlFlavor = $scope.merchandise.id;

            debugger;
            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, merchandise, Wish) {
                    $scope.merchandise = merchandise;
                    $scope.ctrlFlavor = merchandise.id;

                    debugger;

                    console.log($scope.merchandise);

//                    $scope.concession_type = new Concession_type();



                    $scope.ok = function () {
                        $scope.isPopup8Visible = true;
                        $scope.isPopup5Visible = false;

                        $modalInstance.close($scope.merchandise);
                        console.log("SUCCESS", $scope.merchandise);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.openSelected = function () {
                        $scope.isPopup3Visible = true;
                        $scope.isPopUp1Visible = false;
                        $scope.merchandise = merchandise;
                        $scope.ctrlFlavor = merchandise.id;
                        debugger;
                    };
                    $scope.addToWishlist = function() {
                        $scope.wish = new Wish;
                        debugger;
                        $scope.wish.merchandiseId = merchandise.id;
                        console.log("wish create fired");
                        $scope.wish.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                        $modalInstance.dismiss('cancel');

                    };
//                    $scope.updatePatient = function(patient) {
//                        $scope.patient.update(patient)
//                            .then(function(response) {
//                                debugger;
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
//
//                    $scope.destroyPatient = function(patient) {
//                        $scope.patient.delete(patient)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
                },
                size: size,
                resolve: {
                    merchandise: function () {
                        return selectedMerchandise;
                    }

                }
            });



            modalInstance.result.then(function (selectedMerchandise) {
                $scope.selected = selectedMerchandise;
                $scope.merchandise = selectedMerchandise;
                merchandise = selectedMerchandise;
                $scope.ctrlFlavor = merchandise.id;
                $scope.isPopup8Visible = true;
                $scope.isPopup5Visible = false;
                $scope.open(merchandise);
                $anchorScroll(0, 0);

                debugger;

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
//                $scope.isPopup8Visible = true;
//                $scope.isPopup5Visible = false;
                debugger;


            });
        };

        Nest.query().then(function(nests){
            $scope.nests = nests;
            console.log("Nests = ");
            console.log(nests);
        });

        Egg.query().then(function(eggs){
            $scope.eggs = eggs;
        });

        var self = this;
        var data = [{name: "Moroni", age: 50} /*,*/];
        self.tableParams = new NgTableParams({}, { dataset: data});
        debugger;
        $scope.getNestDetails = function (egg) {
            $scope.nestId = egg.getNestId();
//            $scope.nestObject = Nest.getNestObject();
            console.log("SUCCESS", $scope.nest);
//            console.log("Nest Object = ");
//            console.log($scope.nestObject);

            Nest.get({id:$scope.nestId}).then(function(nest){
//                $scope.myNest = myNest;
                $scope.nest = nest;

                console.log("myNest = ");
                console.log(nest);
                $scope.isPopupVisible = true;

            });

        };
//        $scope.formData = {
//            eggName: '',
//            eggNest_Id: ''
//        };

        angular.extend ($scope.egg, {
            name: '',
            nest_Id: Number(),
            content: ""
        }),

        $scope.createEgg = function() {
            $scope.egg.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateEgg = function() {
            $scope.egg.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyEgg = function() {
            $scope.egg.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.update = function (size, selectedEgg) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal2.html',
                controller: function ($scope, $modalInstance, Egg) {
                    $scope.egg = Egg;

                    $scope.ok = function () {
                        $modalInstance.close($scope.egg);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateEgg = function(egg) {
                        $scope.egg.update(egg)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyEgg = function(egg) {
                        $scope.egg.delete(egg)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };
                },
                size: size,
                resolve: {
                    tax: function () {
                        return selectedEgg;
                    }
                }
            });

        };
        $scope.findMerchandise = function() {
            angular.forEach($scope.consumerBids, function(value, key) {
//                if (value.merchandiseValue == null) {
//                    Merchandise.get({id:value.merchandiseId})
//                    debugger;
//                    $scope.bid1.merchandiseName = $scope.merchandise.title;
//                    $scope.bid1.merchandiseValue = $scope.merchandise.value;
//                    debugger;
//                }
                console.log(value, key);
                $scope.bid1 = value;
                debugger;
//                $scope.merchandiseId = value.merchandiseId;

                Merchandise.get({id:value.merchandiseId})
                    debugger;
                    $scope.bid1.merchandiseName = $scope.merchandise.title;
                    $scope.bid1.merchandiseValue = $scope.merchandise.value;
                    debugger;
        })
//            for (var i = 0; i < $scope.consumerBids.length; i++) {
//
//                console.log("bids", i, $scope.consumerBids);
//                debugger;
//                //Do something
//            }
        }
    }])



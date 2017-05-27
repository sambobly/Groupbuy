'use strict';


angular.module('clientApp')
    .controller('TwigsController', ['$scope', '$window', '$route', '$http', '$q', '$timeout', '$resource', '$location', '$routeParams', '$stateParams', 'Twig', 'Doctor', 'Letter', 'Merchandise', 'Ticket', 'Bid', 'Consumer', 'Wish', '$modal', '$anchorScroll', 'User', 'userService', 'Auth', function ($scope, $window, $route, $http, $q, $timeout, $resource, $location, $routeParams, $stateParams, Twig, Doctor, Letter, Merchandise, Ticket, Bid, Consumer, Wish, $modal, $anchorScroll, User, userService, Auth) {
        $window.Stripe.setPublishableKey('pk_test_nTvr3OV0TnAiWUdi8Mxcf3dM');

        $scope.stripeCallback = function (code, result) {
            debugger;
            if (result.error) {
                console.log("splice error")
                window.alert('it failed! error: ' + result.error.message);

            } else {
                console.log("splice success", result.id)
                window.alert('success! token: ' + result.id);
                $http.post('api/charges/create', result)
            }
        };
        $scope.assessRoute = function(flavor) {
            console.log($stateParams, $stateParams.merchandiseId)
            flavor = $stateParams.merchandiseId;
            $scope.setRun(flavor);
        }
        $scope.userService = userService;
        $scope.user = userService.user;
        function createPromise(name, timeout, willSucceed) {
            $scope[name] = 'Running';
            var deferred = $q.defer();
            $timeout(function() {
                if (willSucceed) {
                    $scope[name] = 'Completed';
                    deferred.resolve(name);
                } else {
                    $scope[name] = 'Failed';
                    deferred.reject(name);
                }
            }, timeout * 1000);
            return deferred.promise;
        }

        // Create 5 promises
        var promises = [];
        var names = [];
        for (var i = 1; i <= 5; i++) {
            var willSucceed = true;
            if (i == 2) willSucceed = false;
            promises.push(createPromise('Promise' + i, i, willSucceed));
        }

        // Wait for all promises
        $scope.Status1 = 'Waiting';
        $scope.Status2 = 'Waiting';
        $q.all(promises).then(
            function() {
                $scope.Status1 = 'Done';
            },
            function() {
                $scope.Status1 = 'Failed';
            }
        ).finally(function() {
                $scope.Status2 = 'Done waiting';
            });

        $scope.isCollapsed = false;

        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });

    $scope.ticket = new Ticket();

    Ticket.query().then(function(tickets){
        $scope.tickets = tickets;
    });

    $scope.Bid = new Bid();

    Bid.query().then(function(bids){
        $scope.bids = bids;
    });

    $scope.consumer = new Consumer();

    Consumer.query().then(function(consumers){
        $scope.consumers = consumers;
    });

    $scope.consumer = new Consumer();

    $scope.monitor = []
        $scope.$watch('monitor', function (flavor) {
            console.log($stateParams, $stateParams.merchandiseId)
            flavor = $stateParams.merchandiseId;
            $scope.setRun(flavor);
        });
        $scope.ctrlFlavor = "blackberry";

        $scope.isPopup3Visible = false;
        $scope.isPopup4Visible = false;

        $scope.open1 = function(merchandise) {
            $scope.isPopup3Visible = true;
            $scope.merchandise = merchandise;
            $scope.ctrlFlavor = merchandise.id;

            debugger;

        };

        $scope.testGet = function (flavor, merchandise, bid, ticket, consumer) {
            $scope.flavor = flavor;
            debugger;
            Merchandise.get({id:flavor}).then(function(merchandise){
                $scope.merchandise = merchandise;

            })
            debugger;

        };
        $scope.testOpen = function (merchandise) {
            $window.scrollTo(0, angular.element('aa-catg-head-banner').offsetTop);

            // call $anchorScroll()
            $scope.merchandise = merchandise;

            $scope.isPopup3Visible = true;
            $scope.isPopUpVisible1 = false;

        };

        $scope.setRun = function (flavor, merchandise, bid, ticket, wish, consumer, userService) {
            $scope.flavor = flavor;

            Merchandise.get({id:flavor}).then(function(merchandise){
                $scope.merchandise = merchandise;
            $scope.merchandise = merchandise;
            debugger;
            $scope.reset = true;
            $scope.merchandise.bids = merchandise.getBids();
            debugger;
            console.log($scope.merchandise.bids);
            $scope.bid = bid;
            $scope.wish = wish;
            $scope.merchandise.tickets = merchandise.getTickets();
            $scope.createBid = function() {
                $scope.bid = new Bid;
                console.log($scope.bid)
                $scope.bid.merchandiseId = merchandise.id;
                $scope.bid.consumerId = $scope.new.bidConsumerId;
                $scope.bid.value = $scope.new.bidValue;
                $scope.bid.comment = $scope.new.bidComment;
                $scope.bid.complete = "0";
                debugger;
                $scope.bid.create()
                    .then(function(response) {
                        console.log("SUCCESS", response);
                        $scope.merchandise.bid = $scope.payments_total();
                        $scope.merchandise.difference = $scope.value_remaining();
                        $scope.merchandise.update()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                        debugger;
                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
                $scope.merchandise.bids.push($scope.bid);
                debugger;
//                $scope.reset = false;
//                $timeout(function(){$scope.reset=true;},500);
            };
            $scope.addToWishlist = function(user, userService) {
                Auth.currentUser().then(function(user) {
                console.log(user);
                    angular.forEach($scope.consumers, function(consumer) {
                        console.log("consumer", consumer)
                        if(consumer.userId == user.id){
                            console.log("SUCCESS", consumer)
                            $scope.consumer = consumer;
                            $scope.consumer2 = consumer;
                            $scope.wish = new Wish;
                            debugger;
                            $scope.wish.merchandiseId = merchandise.id;
                            $scope.wish.consumerId = consumer.id;
                            debugger;
                            console.log("wish create fired");
                            $scope.wish.create()
                                .then(function(response) {
                                    console.log("SUCCESS", response);
                                })
                                .catch(function(response) {
                                    console.log("FAILURE!", response);
                                });
                        }

                });

            })};

            $scope.updateMerchandise = function (category){
                Category.get({id:merchandise.categoryId}).then(function(category){
                    $scope.category = category;
                    $scope.merchandise.categoryName = category.name;
                    $scope.merchandise.bid = $scope.payments_total();
                    $scope.merchandise.difference = $scope.value_remaining();
                    $scope.merchandise.update()
                        .then(function(response) {
                            console.log("SUCCESS", response);
                        })
                        .catch(function(response) {
                            console.log("FAILURE!", response);
                        });
                    debugger;
                })
//                debugger;
//                $scope.merchandise.categoryName = category.name;

            };
            console.log($scope.merchandise.tickets);
            $scope.ticket = ticket;
            debugger;

            $scope.back = function() {
                $route.reload();
                $window.location.reload();
                $scope.isPopup8Visible = false;
                $scope.isPopup5Visible = true;

                // call $anchorScroll()
                $anchorScroll(0, 0);
            };
            $scope.bidOpen = function() {
                $scope.isPopUp4Visible = true;
            };
            // set the location.hash to the id of
            // the element you wish to scroll to.

            $scope.payments_total = function () {
                var total = 0.00
                angular.forEach($scope.merchandise.bids, function(bid) {
                    total += (bid.value * 1);
                });
                return total
            };
            $scope.value_remaining = function () {
//            var total = 0.00;
                return ($scope.merchandise.value - $scope.payments_total());
                $scope.valueRemaining = value;
            };
            $scope.ticketCreate = function (merchandise, bid) {
//                $scope.merchandise = merchandise;
//                $scope.merchandise.bids = merchandise.getBids();
//                for (var i = 0; i<$scope.merchandise.bids.length; i++){
//                    console.log(bid, $scope.bid, "test")
//                    debugger;
//                };
                angular.forEach(merchandise.bids, function(value, key, ticket){
                    console.log(value);
                    $scope.bid = value;
//                    $scope.bid.value * 10 = ticketValue;

                    debugger;
                    console.log("Am i here?", $scope.bid, $scope.bid.value);
                    $scope.ticket = new Ticket;
                    $scope.ticket.bidId = $scope.bid.id;
                    $scope.ticket.merchandiseId = $scope.bid.merchandiseId;
                    $scope.ticket.consumerId = $scope.bid.consumerId;
                    for (var i = 0; i < $scope.bid.value; i++){
                        $scope.ticket.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
//                        console.log("Number");

                        debugger;
                    }
//                    ($scope.ticket.create()
//                        .then(function(response) {
//                            console.log("SUCCESS", response);
//                        })
//                        .catch(function(response) {
//                            console.log("FAILURE!", response);
//                        }));

                });
//                debugger;
//            $scope.bid = bid;
//            $scope.ticket.bidId = $scope.bid.id;
//            $scope.ticket.merchandiseId = $scope.merchandise.id;
                console.log("test", merchandise.bids)
                debugger;

            };
            $scope.ticketSimulate1 = function(merchandise, bid, ticket) {
                angular.forEach($scope.merchandise.tickets, function(value, key){
                    Bid.get({id:value.bidId}).then(function(bid){
                        $scope.bid = bid;

                    })
                    if (value.win == 1) {
                        new Bid({id:value.bidId, success:value.win, complete:"1"}).update()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });

                        console.log("win", value);
                        debugger;
                    }
                    else {
                        new Bid({id:value.bidId, complete:"1"}).update()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                        console.log("losers", value)
                    }
                    debugger

                })
            };
            $scope.ticketSimulate3 = function(merchandise, bid, ticket) {
                    $scope.merchandise = merchandise;
                    console.log("merchandise", merchandise)
                        new Merchandise({id:merchandise.id, complete:"1"}).update()
                    debugger;
//                angular.forEach($scope.merchandise.bids, function(value, key) {
//                    if (value.success == 1) {
//                        new Merchandise({id:value.merchandiseId, consumerId:value.consumerId}).update()
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//
//                        console.log("winner of merchandise", value);
//                        debugger;
//                    }
//                    else {
//                        console.log("losers", value)
//                    }
//                    debugger
//                })
            };
            $scope.ticketSimulate2 = function() {
                console.log($scope.tickets);
                debugger;
                angular.forEach($scope.tickets, function(value, key) {
                    new Ticket({id:value.id, win:value.win}).update()
                        .then(function(response) {
                            console.log("SUCCESS", response);
                        })
                        .catch(function(response) {
                            console.log("FAILURE!", response);
                        });
                    debugger;

                })
                console.log($scope.tickets);
            };
            $scope.ticketSimulate = function(merchandise, bid, ticket) {
                $scope.number = [];
                angular.forEach($scope.merchandise.tickets, function(value, key) {
                    $scope.number.push(key);
                    console.log($scope.number);
                    console.log($scope.number.length);
                    debugger;
                })
                var randomNumber = Math.floor(Math.random() * ($scope.number.length - 1));
                console.log(randomNumber)
                var x = Math.floor(Math.random() * ($scope.number.length - 1));
                console.log(x);
                angular.forEach(merchandise.tickets, function(value, key) {


                    if (key == x) {
                        $scope.ticket = ticket;
                        $scope.ticket = value;
                        debugger;
                        $scope.ticket.win = 1;
//                        $scope.ticket.update(ticket);
                        debugger;
//                        new Ticket({win:$scope.ticket.win}).update(ticket)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console .log("FAILURE!", response);
//                            });
                        debugger;
//                        new Ticket({win:$scope.ticket.win}).update;
//                        $scope.ticket.update(ticket)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                               });
                        debugger;
                        console.log("here", value)
                    }
                    else {
                        $scope.ticket = ticket;
                        $scope.ticket = value;
                        debugger;
                        $scope.ticket.win = 0;
//                        new Ticket({win:$scope.ticket.win}).update();
                        console.log("all other", value);
                    };
//                    new Ticket({win:ticket.win}).update();

//                    $scope.ticket.update(ticket);
                    debugger;
//                    for (var i = 0; i < merchandise.tickets.length; i++) {
//                        debugger;
//                        var x = 3;
//                        if (merchandise.tickets[key] == x){
//                            debugger;
//                            console.log("HERE", value)
//                        }
//                    }
                });
                $scope.tickets = [];

                angular.forEach(merchandise.tickets, function(value, ket){
                    $scope.tickets.push(value);
                    console.log($scope.tickets);
                    debugger;

                })
                console.log("simulate")
            };
            $location.hash('top');

                // call $anchorScroll()
                $anchorScroll();
        });
        }

        $scope.clickMe = function () {
            $scope.isPopup4Visible = true;
            debugger;
        }
//// setup e-mail data with unicode symbols
//        var mailOptions = {
//            from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//            to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//            subject: 'Hello ✔', // Subject line
//            text: 'Hello world 🐴', // plaintext body
//            html: '<b>Hello world 🐴</b>' // html body
//        };
//
//// send mail with defined transport object
//        transporter.sendMail(mailOptions, function(error, info){
//            if(error){
//                return console.log(error);
//            }
//            console.log('Message sent: ' + info.response);
//        });
        $scope.$watch('flavor', function (flavor) {
            console.log($scope.merchandise, "watch fired with ctrlFlavor??");
            $scope.setRun(flavor);
        });
        var uniqueItems = function (data, key) {
            var result = [];

            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];

                if (result.indexOf(value) == -1) {
                    result.push(value);
                }

            }
            return result;
        };

//        $scope.usePants = {};
//        $scope.useShirts = {};
//        $scope.useShoes = {};
//
//        $scope.players = [
//            {name: 'Bruce Wayne', shirt: 'XXL', pants: '42', shoes: '12'},
//            {name: 'Wayne Gretzky', shirt: 'XL', pants: '38', shoes: '10'},
//            {name: 'Michael Jordan', shirt: 'M', pants: '32', shoes: '9'},
//            {name: 'Rodman', shirt: 'XSXL', pants: '42', shoes: '11'},
//            {name: 'Jake Smitz', shirt: 'XXL', pants: '42', shoes: '12'},
//            {name: 'Will Will', shirt: 'XXLL', pants: '42', shoes: '12'},
//            {name: 'Youasdf Oukls', shirt: 'XL', pants: '38', shoes: '10'},
//            {name: 'Sam Sneed', shirt: 'XL', pants: '38', shoes: '10'},
//            {name: 'Bill Waxy', shirt: 'M', pants: '32', shoes: '9'},
//            {name: 'Javier Xavior', shirt: 'M', pants: '32', shoes: '9'},
//            {name: 'Bill Knight', shirt: 'M', pants: '32', shoes: '9'},
//            {name: 'One More', shirt: 'M', pants: '32', shoes: '9'},
//            {name: 'Player One', shirt: 'XXL', pants: '42', shoes: '11'},
//            {name: 'Space Cadet', shirt: 'XXL', pants: '42', shoes: '12'},
//            {name: 'Player Two', shirt: 'XXXXL', pants: '42', shoes: '12'}
//        ];

        // Watch the pants that are selected
//        $scope.$watch(function () {
//            return {
//                players: $scope.players,
//                usePants: $scope.usePants,
//                useShirts: $scope.useShirts,
//                useShoes: $scope.useShoes
//            }
//        }, function (value) {
//            var selected;
//
//            $scope.count = function (prop, value) {
//                return function (el) {
//                    return el[prop] == value;
//                };
//            };
//
//            $scope.pantsGroup = uniqueItems($scope.players, 'pants');
//            var filterAfterPants = [];
//            selected = false;
//            for (var j in $scope.players) {
//                var p = $scope.players[j];
//                for (var i in $scope.usePants) {
//                    if ($scope.usePants[i]) {
//                        selected = true;
//                        if (i == p.pants) {
//                            filterAfterPants.push(p);
//                            break;
//                        }
//                    }
//                }
//            }
//            console.log($scope.players, $scope.pantsGroup, $scope.usePants)
//            debugger;
//            if (!selected) {
//                filterAfterPants = $scope.players;
//            }
//
////            $scope.shirtsGroup = uniqueItems($scope.players, 'shirt');
////            var filterAfterShirts = [];
////            selected = false;
////            for (var j in filterAfterPants) {
////                var p = filterAfterPants[j];
////                for (var i in $scope.useShirts) {
////                    if ($scope.useShirts[i]) {
////                        selected = true;
////                        if (i == p.shirt) {
////                            filterAfterShirts.push(p);
////                            break;
////                        }
////                    }
////                }
////            }
////            if (!selected) {
////                filterAfterShirts = filterAfterPants;
////            }
//
////            $scope.shoesGroup = uniqueItems($scope.players, 'shoes');
////            var filterAfterShoes = [];
////            selected = false;
////            for (var j in filterAfterPants) {
////                var p = filterAfterPants[j];
////                for (var i in $scope.useShoes) {
////                    if ($scope.useShoes[i]) {
////                        selected = true;
////                        if (i == p.shoes) {
////                            filterAfterShoes.push(p);
////                            break;
////                        }
////                    }
////                }
////            }
////            if (!selected) {
////                filterAfterShoes = filterAfterPants;
////            }
//
//            $scope.filteredPlayers = filterAfterPants;
//            console.log($scope.filteredPlayers);
//        }, true);


        $scope.$watch('filtered', function (newValue) {
            if (angular.isArray(newValue)) {
                console.log(newValue.length);
            }
        },
            true);
        $scope.CurrentDate = new Date();

        $scope.twig = new Twig();

        Twig.query().then(function(twigs){
            $scope.twigs = twigs;
        });
        $scope.formData = {
            twigName: '',
            twigAmount: ''
        };

        $scope.test = function() {
            var data = ({
                contactName : "CONTACT NAME",
                twig : "twig"
            });
            $scope.twigId = "1";
            Twig.get({id:$scope.twigId}).then(function(twig){
                debugger;
//                $scope.myNest = myNest;
                $scope.twig = twig;
            });
//            debugger;

//            data = ({
//                contactName : this.contactName
//            })
            console.log("TEST 212121");
            $http.post('/api/twigs/test', data);
//            debugger;
//                success(function(data){
//                    console.log("TEST")
//                });
        };



        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd'
        });
        $scope.createTwig = function() {
            $scope.twig.create()
                .then(function(response) {
                    console.log("SUCCESS", response)
                    ;
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateTwig = function() {
            $scope.twig.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyTwig = function() {
            $scope.twig.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Twig) {
                    $scope.twig = new Twig();

                    $scope.ok = function () {
                        $modalInstance.close($scope.twig);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createTwig = function() {
                        $scope.twig.create()
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
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedTwig) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, twig) {
                    $scope.twig = twig;

                    $scope.ok = function () {
                        $modalInstance.close($scope.twig);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateTwig = function(twig) {
                        $scope.twig.update(twig)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyTwig = function(twig) {
                        $scope.twig.delete(twig)
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
                    twig: function () {
                        return selectedTwig;
                    }
                }
            });

            modalInstance.result.then(function (selectedTwig) {
                $scope.selected = selectedTwig;
                $scope.tax = selectedTwig;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.open = function (size, selectedTwig) {

            var modalInstance = $modal.open({
                templateUrl: 'emailModal.html',
                controller: function ($scope, $modalInstance, twig) {
                    $scope.twig = twig;

                    $scope.ok = function () {
                        $modalInstance.close($scope.twig);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateTwig = function(twig) {
                        $scope.twig.update(twig)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyTwig = function(twig) {
                        $scope.twig.delete(twig)
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
                    twig: function () {
                        return selectedTwig;
                    }
                }
            });

            modalInstance.result.then(function (selectedTwig) {
                $scope.selected = selectedTwig;
                $scope.tax = selectedTwig;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.testLetter = function () {
            $scope.user = userService.user;

            console.log($scope.user);
            debugger;
            var data = ({
                contactName : "CONTACT NAME",
//                letter : $scope.letter.id,
                user : $scope.user.id
            });
            console.log("TEST 212121", data);
            $http.post('/api/emails/test', data);
        }
    }])



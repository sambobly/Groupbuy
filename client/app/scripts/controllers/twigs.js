'use strict';


angular.module('clientApp')
    .controller('TwigsController', ['$scope', '$window', '$route', '$http', '$q', '$timeout', '$resource', '$location', '$routeParams', '$stateParams', 'Twig', 'Doctor', 'Letter', 'Merchandise', 'Ticket', 'Bid', 'Consumer', 'Wish', 'Combination', '$modal', '$anchorScroll', 'User', 'userService', 'Auth', '$cookies', 'Upload', function ($scope, $window, $route, $http, $q, $timeout, $resource, $location, $routeParams, $stateParams, Twig, Doctor, Letter, Merchandise, Ticket, Bid, Consumer, Wish, Combination, $modal, $anchorScroll, User, userService, Auth, $cookies, Upload) {

        $scope.isPopUpVisibleBid = false;
        $scope.isPopup9Visible = false;
        $scope.isPopupVisibleSubmit = true;




        $scope.myDefaultImage = 'images/polo-shirt-1.png';
        $scope.myDeaultPicture = 'images/polo-shirt-1.png'
        $scope.realImage = 'http://itsolutionstuff.com/upload/Laravel-mailchimp.png';
        $scope.noImage = 'http://itsolutionstuff.com/upload/no-image-available.png';
        $scope.testCheck = function(remember) {
            if (remember == true) {
                console.log("checked");

            }
            else {console.log("Not checked");
            }

        };

        var stripe = Stripe('pk_test_nTvr3OV0TnAiWUdi8Mxcf3dM');

// Create an instance of Elements.
        var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
            base: {
                color: '#32325d',
                lineHeight: '18px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

// Create an instance of the card Element.
        var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');

// Handle real-time validation errors from the card Element.
        card.addEventListener('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

// Handle form submission.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server.
                    stripeTokenHandler(result.token);
                }
            });
        });

// Submit the form with the token ID.
        function stripeTokenHandler(token, result, bid, consumer, merchandise) {
            // Insert the token ID into the form so it gets submitted to the server
            var form = document.getElementById('payment-form');
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);
            $scope.isPopupVisibleSubmit = false;



            // Submit the form
            debugger;
            bid = $scope.bid;
            consumer = $scope.consumer;
//                var data = ({
//                    amount : bid.amount,
//                    email : consumer.email
//                });
//            console.log("splice success", result.id)
//            window.alert('success! token: ' + result.id);
            debugger;
            bid.total = bid.amount*100;
            $scope.bidValue = bid.total;
            console.log("new bidValue", $scope.bidValue, result);
            debugger;
            var params = ({
                stripeToken : token.id,
                stripeTokenType : token.type,
//                stripeEmail : consumer.email,
                amount : bid.total
            });
            $http.post('/api/charges', params)
                .then(function(response) {
                    console.log("SUCCESS", response);
                    $scope.createBid();
                    $scope.confirm();
                    window.alert('Success! Bid created!');
                    $scope.isPopupVisibleSubmit = true;
                    $scope.isPopupVisibleSuccessBid = true;
                    $scope.isPopupVisibleFailBid = false;
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                    window.alert('invalid card number or ccv');
                    $scope.isPopupVisibleSubmit = true;
                    $scope.isPopupVisibleSuccessBid = false;
                    $scope.isPopupVisibleFailBid = true;
                });            debugger;
        }

        $scope.isPopupVisiblePWordEmail = false;
        $scope.isPopupVisiblePWordEmailFail = false;
        $scope.isPopup11Visible = false;
        $scope.text = function() {
            if (typeof cookie !== 'undefined') {
                $scope.text.email = cookie;
                $scope.text.password = cookie1;
            } else {
                console.log('undefined')
            }
        };
        $scope.setCookie = function(text){
            $cookies.put('someToken',text.email);
            $cookies.put('password', text.password)
            // Remove a cookie
        };

        $scope.getCookie = function() {
            var cookie = $cookies.get('someToken');
            var cookie1 = $cookies.get('password');
            console.log(cookie, cookie1);
            if (typeof cookie !== 'undefined') {
                $scope.text.email = cookie;
                $scope.text.password = cookie1;
            } else {
                console.log('undefined')
            }
        };

        $cookies.remove('cookieName');
        $window.Stripe.setPublishableKey('pk_test_nTvr3OV0TnAiWUdi8Mxcf3dM');
        $scope.taskData = [];
        function isPromiseLike(obj) {
            return obj && angular.isFunction(obj.then);
        }

        /*
         * Taken from - http://www.codeducky.org/q-serial/
         */



        $scope.testStripe = function() {
            console.log("test stripe")
            debugger;
        };

        $scope.stripeCallback = function (code, result, bid, consumer, merchandise) {
            if (result.error) {
                console.log("splice error")


            } else {
                bid = $scope.bid;
                consumer = $scope.consumer;
//                var data = ({
//                    amount : bid.amount,
//                    email : consumer.email
//                });
                console.log("splice success", result.id)
                window.alert('success! token: ' + result.id);
                $scope.isPopupVisibleSuccessBid = true;
                $scope.isPopupVisibleFailBid = false;

                debugger;
                bid.total = bid.amount*100;
                $scope.bidValue = bid.total;
                console.log("new bidValue", $scope.bidValue)
                debugger;
                var params = ({
                    stripeToken : result.id,
                    stripeTokenType : result.type,
                    stripeEmail : consumer.email,
                    amount : bid.total
                });
                $http.post('/api/charges', params)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                        $scope.createBid();
                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
            };
        };
        $scope.assessRoute = function(flavor) {
            console.log($stateParams, $stateParams.merchandiseId)
            flavor = $stateParams.merchandiseId;
            $scope.setRun(flavor);
        }
        $scope.claimRoute = function() {
            console.log("claim", $stateParams, $stateParams.merchandiseId)

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

    $scope.Combination = new Combination();

    Combination.query().then(function(combinations){
        $scope.combinations = combinations;
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
        $scope.isPopup5Visible = false;
        $scope.isPopup6Visible = false;
        $scope.isPopupvisibleloggedout = false;


        $scope.$watch('user', function (user) {
            console.log($scope.user, "watch fired with user");
            if ($scope.user.email != "") {
                console.log("can create merch")
                $scope.isPopup5Visible = true;
            } else {
                console.log("cannot create merch")
                $scope.isPopupvisibleloggedout = true;

            }

        });

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

        $scope.setRun = function (flavor, merchandise, bid, ticket, wish, consumer, code, result, userService) {
            $scope.flavor = flavor;

                Merchandise.get({id:flavor}).then(function(merchandise){
                    if(typeof merchandise != "undefined") {
                        Auth.currentUser().then(function(user) {
                            angular.forEach($scope.consumers, function(consumer) {
                                console.log("consumer", consumer)
                                if(consumer.userId == user.id){
                                    $scope.consumer = consumer;
                                    $scope.bidConsumerId = $scope.consumer.id;

                                    console.log("Set bid consumerId", consumer, $scope.consumer.id)
//                        console.log ("display claim", user)
                                }
                                else {
                                    console.log("Not set")
                                };
                            });
//                    if (user.id == $scope.merchandise.consumerId) {
//                        $scope.isPopup11Visible = true;
//                        console.log ("display claim", user)
//                    }else {
//                        console.log ("not the correct user")
//                    }

                        });
                    } else {
                        console.log("did not fire bidConsumerId set")
                    };
                    $scope.merchandise = merchandise;
            $scope.merchandise = merchandise;
            debugger;
            $scope.reset = true;
            $scope.merchandise.bids = merchandise.getBids().then(function(bids, bid){
                debugger;
                  angular.forEach(bids, function(bid, key) {
                      $scope.consumerId = bid.consumerId;
                      Consumer.get({id:$scope.consumerId}).then(function(consumer){
                          $scope.consumer  = consumer;
                          $scope.bid = bid;
                          $scope.bid.consumerName = consumer.name;
                          $scope.bid.consumerAvatar = consumer.avatar;
                          console.log("Fixing comment name etc", consumer, consumer.name, consumer.avatar, $scope.bid.consumerAvatar);
                          debugger;
                          Auth.currentUser().then(function(user) {
                              angular.forEach($scope.merchandise.bids, function(bid) {
                                  debugger;
                                  if(consumer.userId == user.id && bid.consumerId == consumer.id && $scope.merchandise.complete != "1"){
                                      debugger;
                                      console.log("can be claimed")
                                      $scope.isPopup9Visible = true;

                                  }
                                  else {
                                      console.log("not a winner")
                                  }
                                  console.log($scope.merchandise.bids, "merchandise bids");
                                  debugger;
                              });
                              console.log($scope.merchandise.bids, "merchandise bids");
                              debugger;
                          });
                      });
                  })
            });
            debugger;
            console.log($scope.merchandise.bids);
            $scope.bid = bid;
            $scope.wish = wish;
            if ($scope.merchandise.complete == "1") {
                $scope.isPopup5Visible = false;
                $scope.isPopup6Visible = true;
//                $scope.merchandise.bids = merchandise.getBids().then(function(bid){
//                    Auth.currentUser().then(function(user) {
//                    angular.forEach($scope.merchandise.bids, function(bid, consumer) {
//                        debugger;
//                        if(consumer.userId == user.id && bid.consumerId == consumer.id){
//                            debugger;
//                            console.log("can be claimed")
//                        }
//                        else {
//                            console.log("not a winner")
//                        }
//                        console.log($scope.merchandise.bids, "merchandise bids");
//                        debugger;
//                    });
//                        console.log($scope.merchandise.bids, "merchandise bids");
//                        debugger;
//                });
//                })
                Auth.currentUser().then(function(user) {
                    angular.forEach($scope.consumers, function(consumer) {
                        console.log("consumer", consumer)
                        if(consumer.userId == user.id  && consumer.id == $scope.merchandise.winner && $scope.merchandise.rescue != 1 && $scope.merchandise.paid != 1){
                            $scope.isPopup11Visible = true;
                            $scope.isPopup6Visible = false;

                            console.log("WINNER!")
//                        console.log ("display claim", user)
                        }
                        else {
                            console.log("NOT the winner!")
                        };

                    });

//                    if (user.id == $scope.merchandise.consumerId) {
//                        $scope.isPopup11Visible = true;
//                        console.log ("display claim", user)
//                    }else {
//                        console.log ("not the correct user")
//                    }


//                    if(consumer.userId == user.id && consumer.id == $scope.bid.consumerId){
//                         connsole.log("can be claimed")
//                     }
//                    else {
//                         console.log("not a winner")
//                     }
                });
            } else {
                console.log("cannot be claimed")
            };
//NOTE IF ANYTHING BREAKS IT IS LIKELY THE IF ELSE STATEMENT AOVE 15/9/18


//                        Auth.currentUser().then(function(user) {
//                            angular.forEach($scope.consumers, function(consumer) {
//                                console.log("consumer", consumer)
//                                if(consumer.userId == user.id && consumer.id == $scope.bid.consumerId}){
//                                    console.log ("Can submit their answers")
//                            });
//                        });
//                    }
//                    };
                $scope.createBid = function() {
                $scope.bid = new Bid;
                console.log($scope.bid)
                $scope.bid.merchandiseId = merchandise.id;
                    console.log(merchandise, "merchandise")
                    debugger;
                $scope.bid.merchandiseValue = merchandise.value;
                $scope.bid.merchandiseImage = merchandise.images.url;
                $scope.bid.merchandiseTitle = merchandise.title;
                $scope.bid.consumerId = $scope.consumer.id;
//                $scope.bid.value = $scope.new.bidValue;
                $scope.bid.value = $scope.bidValue/100;
                if (typeof $scope.new != "undefined") {
                    debugger;
                    $scope.bid.comment = $scope.new.bidComment;
                } else {
                    $scope.bid.comment = "No comment!"
                };
                debugger;

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
                });
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

                // call $anchorScroll()
                $anchorScroll(0, 0);
            };
            $scope.bidOpen = function() {
                if ($scope.isPopUp4Visible == false) {
                $scope.isPopUp4Visible = true;
                }else {$scope.isPopUp4Visible = false}
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
            $scope.ticketCreate = function (merchandise, ticket) {
                merchandise = $scope.merchandise;
                debugger;
// $scope.merchandise = merchandise;
//                $scope.merchandise.bids = merchandise.getBids();
//                for (var i = 0; i<$scope.merchandise.bids.length; i++){
//                    console.log(bid, $scope.bid, "test")
//                    debugger;
//                };
                var defer = $q.defer();
                $scope.bidTickets = [];
                $scope.bidTicketsFix = [];
                angular.forEach(merchandise.bids, function(value){
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
//                                 angular.forEach(response, function(data, key, value){
//                                     $scope.bidTickets.push(key);
//                                     console.log("SUCCESS", $scope.bidTickets);
//                                     debugger;})
//                                $scope.bidTickets.push(response.id);
                                 Ticket.get({id:response.id}).then(function(ticket){
                                     $scope.bidTickets.push(ticket);

//                                         $scope.bidTicketsFix.push(ticket);
                                     console.log($scope.bidTickets, "$scope.bidTicketsFix")
                                     debugger;
                                 });
//                                 angular.forEach($scope.bidTickets, function(ticket){
//                                     Ticket.get({id:response.id}).then(function(ticket){
//
//                                         if($scope.bidTicketsFix.indexOf(ticket.id) == -1) {
//                                             $scope.bidTicketsFix.push(ticket);
//                                         }
////                                         $scope.bidTicketsFix.push(ticket);
//                                         console.log($scope.bidTicketsFix, "$scope.bidTicketsFix")
//                                         debugger;
//                                     })
//                                 });

                                console.log("SUCCESS", response, $scope.bidTickets, $scope.bidTicketsFix);
                                debugger;
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
                    console.log($scope.tickets, "$scope.tickets outside")

                })

//                debugger;
//            $scope.bid = bid;
//            $scope.ticket.bidId = $scope.bid.id;
//            $scope.ticket.merchandiseId = $scope.merchandise.id;
                console.log("test", merchandise.bids);
                console.log("bidTickets", $scope.bidTickets);

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
                $scope.testEmail(merchandise);

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
            $scope.ticketSimulate = function() {

                $scope.merchandise.tickets = $scope.bidTickets
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
                angular.forEach($scope.merchandise.tickets, function(value, key) {


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
                });
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

                $scope.tickets = $scope.bidTickets;

//                            angular.forEach(merchandise.tickets, function(value, ket){
//                                $scope.tickets.push(value);
//                                console.log($scope.tickets);
//                                debugger;
//
//                            })
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
        $scope.confirm = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'confirmModal.html',
                controller: function ($scope, $modalInstance) {


                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
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
        $scope.fail = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'failModal.html',
                controller: function ($scope, $modalInstance) {


                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
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

        $scope.claimEmail = function(consumer) {
            var data = ({
                consumer: 9,
                merchandise: 26
            });
            debugger;
            $http.post('/api/consumers/test', data)
            debugger;
        };
        $scope.failEmail = function(consumer) {
            var data = ({
                consumer: 9,
                merchandise: 26
            });
            debugger;
            $http.post('/api/consumers/fail', data)
            debugger;
        };

        $scope.testLetter = function (consumer, user) {
            Auth.currentUser().then(function(user) {
                console.log(user, "current user")
            })
            $scope.user = userService.user;
            user = userService.user;
            debugger;
            Consumer.get({id:user.id}).then(function(consumer){
                $scope.consumer = consumer;
                console.log("consumer", consumer, $scope.consumer);

            });
            debugger;
            console.log($scope.user, consumer, $scope.consumer);
            debugger;
            var data = ({
                contactName : "CONTACT NAME",
//                letter : $scope.letter.id,
                consumer : $scope.consumer,
                email: $scope.consumer.email
            });
            console.log("TEST 212121", data);
            $http.post('/api/consumers/claim', data);
        };
        $scope.testEmail = function (merchandise, consumer) {
            $scope.merchandise = merchandise;
            $scope.merchandise.bids = merchandise.getBids()
                .then(function(response) {
                    debugger;

                    console.log("SUCCESS", response, $scope.merchandise.bids);
                    angular.forEach(response, function(response) {
                        if (response.success == true) {
                            debugger;
                        Consumer.get({id:response.consumerId}).then(function(consumer){
                            var data = ({
                                contactName : "CONTACT NAME",
                                consumer : consumer.id,
                                merchandise : merchandise.id

                            });
                            console.log("TEST 212121", data);
                            $http.post('/api/consumers/test', data);
                            console.log(consumer, "successful email")
                        })
                    } else {
                            Consumer.get({id:response.consumerId}).then(function(consumer){
                                var data = ({
                                    contactName : "CONTACT NAME",
                                    consumer : consumer.id,
                                    merchandise : merchandise.id

                                });
                                console.log("TEST 212121", data);
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

        };
        $scope.testAnswerEmail = function (merchandise, consumer) {
            $scope.merchandise = merchandise;
            $scope.merchandise.bids = merchandise.getBids()
                .then(function(response) {
                    debugger;

                    console.log("SUCCESS", response, $scope.merchandise.bids);
                    angular.forEach(response, function(response) {
                            debugger;
                            Consumer.get({id:response.consumerId}).then(function(consumer){
                                var data = ({
                                    contactName : "CONTACT NAME",
                                    consumer : consumer.id,
                                    merchandise : merchandise.id

                                });
                                console.log("TEST 212121", data);
                                $http.post('/api/consumers/answer', data);
                                console.log(consumer, "successful email")

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
        $scope.designWatch = function() {
            if ($scope.merchandise.rescue == 91234) {
                console.log($scope.merchandise, "watch fired to start tickets, rescue");
                debugger;
            } else (console.log ("Has not reached target"));
            debugger;
        };
        $scope.$watch('flavor', function (flavor, merchandise, bid) {
            $timeout(function () {

                console.log($scope.merchandise, "watch fired looking at ?? bids >= value");
            if ($scope.merchandise.bid >= $scope.merchandise.value && $scope.merchandise.complete == false) {
                console.log($scope.merchandise, "watch fired to start tickets");
                $scope.ticketCreate(merchandise, bid);
                debugger;
            } else (console.log ("Has not reached target"));
            debugger;
            },20000)
        });
        $scope.$watch('merchandise', function(merchandise) {
            if ($scope.merchandise.rescue == 91234) {
                console.log($scope.merchandise, "watch fired to start tickets, rescue");
                debugger;
            } else (console.log ("Rescue not initiated"));
            debugger;
        })
        $scope.$watch('bidTickets', function (merchandise, bid, ticket) {
            console.log('bid tickets still fired')
            if ($scope.merchandise.bid >= $scope.merchandise.value && $scope.merchandise.complete == false) {
            $timeout(function () {
                console.log("merchandise.getTickets", $scope.bidTickets)

            },10000).then(function() {




                            $scope.merchandise.tickets = $scope.bidTickets;
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
                            angular.forEach($scope.merchandise.tickets, function(value, key) {


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
                            });
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

                            $scope.tickets = $scope.bidTickets;

//                            angular.forEach(merchandise.tickets, function(value, ket){
//                                $scope.tickets.push(value);
//                                console.log($scope.tickets);
//                                debugger;
//
//                            })
                            console.log("simulate")
                        }).then(function() {
                                $scope.tickets = $scope.bidTickets;
                                $scope.ticketSimulate2(merchandise, bid, ticket)
                                console.log("ticket simulate2")
                            }).then(function() {
                                $scope.ticketSimulate1(merchandise, bid, ticket)
                                console.log("ticket simulate1")
                            }).then(function() {
                                merchandise = $scope.merchandise;
                                console.log("merchandise", merchandise)
                                new Merchandise({id:merchandise.id, complete:"1"}).update()
                                debugger;
                                console.log("ticket simulate3", merchandise)
                            });

            } else (console.log ("Has not reached target"));
        })

        $scope.emailConfirm = function (text) {
//            $window.location.href = 'api/users/sign_in'
            $scope.consumer.email = $scope.text.email;
            var parameters = ({
                email: $scope.consumer.email
            });
            console.log(parameters, "test resend confirmation");
            Auth.sendResetPasswordInstructions(parameters).then(function() {
                console.log("sent")
            });
//            $http.post('api/users/confirmation#create', data)

            debugger;
            console.log("resend confirmation email", $scope.consumer.email)
        };

        $scope.emailReset = function (text) {
//            $window.location.href = 'api/users/sign_in'
            $scope.consumer.email = $scope.text.email;
            var parameters = ({
                email: $scope.consumer.email
            });
            console.log(parameters, "test email Pword");
            Auth.resetPassword(parameters).then(function(new_data) {
                console.log(new_data, "reset password"); // => {id: 1, ect: '...'}
            });
//            $http.post('api/users/confirmation#create', data)

            debugger;
            console.log("resend PWORD email", $scope.consumer.email)
        };


//        $scope.testAll = function(merchandise, bid) {
//            $scope.merchandise = merchandise;
//            console.log("test All", $scope.merchandise)
//            Merchandise.get({id:$scope.merchandiseId}).then(function(result) {
//                $scope.ticketCreate(merchandise, bid).then(function () {
//                    merchandise.getTickets();
//                    console.log("merchandise.getTickets")
//                    debugger;
//                })
//
//            }).then(function () {
//                    merchandise.getTickets();
//                    console.log("merchandise.getTickets")
//                    debugger;
//                }).then(function(response) {
//                    $scope.ticketSimulate(merchandise, bid, ticket)
//                    console.log("ticket simulate2")
//                    debugger;
//                }).then(function() {
//                    $scope.ticketSimulate2(merchandise, bid, ticket)
//                    console.log("ticket simulate2")
//            }).then(function() {
//                    $scope.ticketSimulate1(merchandise, bid, ticket)
//                    console.log("ticket simulate1")
//            }).then(function() {
//                    $scope.ticketSimulate3(merchandise, bid, ticket)
//                    console.log("ticket simulate3")
//            })
//        }
//        $scope.testAll = function serial (merchandise, ticket) {
//            $scope.merchandise.tickets = $scope.bidTickets
//
//            $scope.number = [];
//            angular.forEach($scope.merchandise.tickets, function(value, key) {
//                $scope.number.push(key);
//                console.log($scope.number);
//                console.log($scope.number.length);
//                debugger;
//            })
//            var randomNumber = Math.floor(Math.random() * ($scope.number.length - 1));
//            console.log(randomNumber)
//            var x = Math.floor(Math.random() * ($scope.number.length));
//
//            console.log(x);
//            angular.forEach($scope.merchandise.tickets, function(value, key) {
//
//
//                if (key == x) {
//                    $scope.ticket = ticket;
//                    $scope.ticket = value;
//                    debugger;
//                    $scope.ticket.win = 1;
////                        $scope.ticket.update(ticket);
//                    debugger;
////                        new Ticket({win:$scope.ticket.win}).update(ticket)
////                            .then(function(response) {
////                                console.log("SUCCESS", response);
////                            })
////                            .catch(function(response) {
////                                console .log("FAILURE!", response);
////                            });
//                    debugger;
////                        new Ticket({win:$scope.ticket.win}).update;
////                        $scope.ticket.update(ticket)
////                            .then(function(response) {
////                                console.log("SUCCESS", response);
////                            })
////                            .catch(function(response) {
////                                console.log("FAILURE!", response);
////                               });
//                    debugger;
//                    console.log("here", value)
//                }
//                else {
//                    $scope.ticket = ticket;
//                    $scope.ticket = value;
//                    debugger;
//                    $scope.ticket.win = 0;
////                        new Ticket({win:$scope.ticket.win}).update();
//                    console.log("all other", value);
//                };
////                    new Ticket({win:ticket.win}).update();
//
////                    $scope.ticket.update(ticket);
//                debugger;
////                    for (var i = 0; i < merchandise.tickets.length; i++) {
////                        debugger;
////                        var x = 3;
////                        if (merchandise.tickets[key] == x){
////                            debugger;
////                            console.log("HERE", value)
////                        }
////                    }
//            });
//
//        }
        // Create a Stripe client.
//        var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
//
//// Create an instance of Elements.
//        var elements = stripe.elements();
//
//// Custom styling can be passed to options when creating an Element.
//// (Note that this demo uses a wider set of styles than the guide below.)
//        var style = {
//            base: {
//                color: '#32325d',
//                lineHeight: '18px',
//                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                fontSmoothing: 'antialiased',
//                fontSize: '16px',
//                '::placeholder': {
//                    color: '#aab7c4'
//                }
//            },
//            invalid: {
//                color: '#fa755a',
//                iconColor: '#fa755a'
//            }
//        };
//
//// Create an instance of the card Element.
//        var card = elements.create('card', {style: style});
//
//// Add an instance of the card Element into the `card-element` <div>.
//        card.mount('#card-element');
//
//// Handle real-time validation errors from the card Element.
//        card.addEventListener('change', function(event) {
//            var displayError = document.getElementById('card-errors');
//            if (event.error) {
//                displayError.textContent = event.error.message;
//            } else {
//                displayError.textContent = '';
//            }
//        });
//
//// Handle form submission.
//        var form = document.getElementById('payment-form');
//        form.addEventListener('submit', function(event) {
//            event.preventDefault();
//
//            stripe.createToken(card).then(function(result) {
//                if (result.error) {
//                    // Inform the user if there was an error.
//                    var errorElement = document.getElementById('card-errors');
//                    errorElement.textContent = result.error.message;
//                } else {
//                    // Send the token to your server.
//                    stripeTokenHandler(result.token);
//                }
//            });
//        });
        $scope.images = function() {
            var images = $scope.merchandise.images;
            $scope.filesToUpload = [];
            $scope.filesToUpload.push(images);
            console.log(images, $scope.filesToUpload);
            debugger;
            var merchandise = $scope.merchandise;
            $scope.upload = Upload.upload({
                url: '/api/merchandises/' + merchandise.id,
                method: 'PATCH',
                data: {images: $scope.merchandise.images},
                images: images,
                fileFormDataName: 'merchandise[images]',
                formDataAppender: function(fd, key, val) {
                    if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                            fd.append('merchandise['+key+']', v);
                            console.log(key, v)
                            debugger;
                        });
                    } else {
                        fd.append('merchandise['+key+']', val);
                        debugger;
                    }
                }
            });
            debugger;
        }

        $scope.testUpdate = function() {
            $scope.merchandise.description = ["shaz@hot.com", "team@team.com"];
            $scope.merchandise.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
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
        $scope.bidReveal = function(bid){
            debugger;
            var bid = $scope.bid;
            debugger;
            if (bid.amount >= 1 ) {
                $scope.isPopUpVisibleBid = true;
            } else {
                console.log("no bid")
            }
        };
        $scope.testSetCombination = function(merchandise, combination){
            $scope.merchandise = merchandise;
            $scope.combination = combination;
            Combination.query().then(function(combinations) {
                $scope.combinations = combinations
                console.log(merchandise, combination, combinations);
                angular.forEach(combinations, function(combination) {
                    if (combination.complete != true) {
                        $scope.merchandise.combinationId = combination.id;
                        $scope.merchandise.update();
                        debugger;
                    } else {
                        console.log("no combination added to merch")
                    }
                    console.log("? firing");
                });
            });
        }
    }])



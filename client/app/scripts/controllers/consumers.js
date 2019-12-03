'use strict';


angular.module('clientApp')
    .controller('ConsumersController', ['$scope', '$route', '$window', '$rootScope','userService', 'Auth', '$http', '$resource', '$location', '$routeParams', '$state', '$timeout', 'Consumer', 'Merchandise', 'Bid', 'Wish', 'User', '$modal', 'Upload', '$cookies',  function ($scope, $route, $window, $rootScope, userService, Auth, $http, $resource, $location, $routeParams, $state, $timeout, Consumer, Merchandise, Bid, Wish, User, $modal, Upload, $cookies) {
        $scope.userService = userService;
        $scope.user = userService.user;
         debugger;
        $scope.isPopupVisible8 = false;
        $scope.isPopupVisible9 = true;
        $scope.isPopupvisible15 = false;
        $scope.isPopupvisible16 = false;
        $scope.isPopupVisibleDuplicateEmail = false;

        $scope.consumerFind = [];

        $scope.testUserService = function() {
            $scope.userService = userService;
            debugger;
        }

      $scope.testUser = function(user) {
        return $timeout(function() {

          $scope.user = userService.user;
          user = $scope.user;
          debugger;
          console.log(user, "user");
        }, 1);
      };

        $scope.testUser2 = function(user) {
          debugger;
          $scope.testUser().then(function () {
            debugger;
            console.log("user from testUser");
            $scope.$watch('consumerFind', function (consumer) {

              debugger;
              setTimeout(function () {
                $scope.$apply(function(user, consumer) {
                  $scope.user = userService.user;
                  user = $scope.user;
                  console.log("user", user);
                  if ($scope.consumerFind == 0) {
                    angular.forEach($scope.consumers, function(consumer) {
                      console.log("consumer", consumer)
                      if(consumer.userId == user.id){
                        console.log("SUCCESS", consumer)
                        $scope.consumer = consumer;
                        debugger;
                        $scope.consumer2 = consumer;
                      }
                      else {
                        console.log("no one is logged in")
                      };
                    });
                  } else {
                    console.log("no one is logged in")
                  };
                  $scope.consumer1 = $scope.consumer;
                  consumer = $scope.consumer;
                  debugger;
                  $scope.consumer2 = consumer;


                });
              }, 100);
            });

            debugger;
          });
        };

        $scope.openPassword = function() {
            $scope.isPopupVisible8 = true;
            $scope.isPopupVisible9 = false
        };
        $scope.goBack = function() {
            $scope.isPopupVisible8 = false;
            $scope.isPopupVisible9 = true
        };
        $scope.filteredTodos = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

        $scope.makeTodos = function() {
            $scope.todos = [];
            for (var i=1;i<=1000;i++) {
                $scope.todos.push({ text:"todo "+i, done:false});
            }
        };
        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });

        $scope.user = new User();

        User.query().then(function(users){
            $scope.users = users;
          $scope.testUser2();

        });
        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });

        $scope.bid = new Bid();

        Bid.query().then(function(bids){
            $scope.bids = bids;
        });

        $scope.wish = new Wish();

        Wish.query().then(function(wishes){
            $scope.wishes = wishes;
        });

        var numberOfYears = (new Date()).getYear() - 10;
        var years = $.map($(Array(numberOfYears)), function (val, i) { return i + 1900; });
        var months = $.map($(Array(12)), function (val, i) { return i + 1; });
        var days = $.map($(Array(31)), function (val, i) { return i + 1; });

        var isLeapYear = function () {
            $scope.SelectedYear = $scope.consumer.year;
            var year = $scope.SelectedYear || 0;
            console.log($scope.SelectedYear, $scope.consumer.year);
            debugger;
            return ((year % 400 === 0 || year % 100 !== 0) && (year % 4 === 0)) ? 1 : 0;

        }

        var getNumberOfDaysInMonth = function () {
            $scope.SelectedMonth = $scope.consumer.month;
            var selectedMonth = $scope.SelectedMonth || 0;
            return 31 - ((selectedMonth === 2) ? (3 - isLeapYear()) : ((selectedMonth - 1) % 7 % 2));
        }

        $scope.UpdateNumberOfDays = function () {
            $scope.NumberOfDays = getNumberOfDaysInMonth();
        }

        $scope.NumberOfDays = 31;
        $scope.Years = years;
        $scope.Days = days;
        $scope.Months = months;

        $scope.openLogin = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'loginModal.html',
                controller: function ($scope, $modalInstance) {
                    $scope.signIn = function () {
                        var credentials = {
                            name: $scope.credentials.name,
                            email: $scope.credentials.email,
                            password: $scope.credentials.password
                        };
                        console.log("fired", credentials);
                        var user = {};
                        var currentUser = {};
                        Auth.login(credentials).then(function(user) {
                            $scope.user = user;
                            $scope.ctrlUser = user;
                            console.log(user, currentUser, user.name);
                            console.log(Auth._currentUser);// => {id: 1, ect: '...'}
                            debugger;
                            $scope.setCookie = function(){
                                $cookies.put('someToken', $scope.credentials.name);
                                $cookies.put('password', $scope.credentials.password)
                                var cookie3 = $cookies.get('someToken');
                                var cookie4 = $cookies.get('password');
                                console.log(cookie3, cookie4);
                            };

                        }, function(error) {
                            // Authentication failed...
                        });
                    };


                },
                size: size,
                resolve: {
                    widget: function () {
                        return ;
                    }
                }
            });

        };
        $scope.$on('devise:login', function(e, user) {
            $scope.isAuthenticated = true;
            $scope.user = user;
            debugger;
            // You can get data of current user (getting user's name and etc.)
            console.log(user);
        });
//
        var credentials = {
            name: 'Thomas',
            email: 'Thomas@hotmail.com',
            password: 'Thomas'
//              name: 'test',
//              email: 'test3@test.com',
//              password: 'asdfasdfasdf'
        };
        $scope.login = function() {
            var credentials = {
                name: 'Thomas',
                email: 'Thomas@hotmail.com',
                password: 'Thomas'
//              name: 'test',
//              email: 'test3@test.com',
//              password: 'asdfasdfasdf'
            };
            var user = {};
            var currentUser = {};
            user.name = credentials.name;
//            user.email = 'test@test.com'
            debugger;
//            $http.get('/api/devise/sessions', credentials);
//              $http.get('api/users/index');
//            debugger;
//            debugger;

//            $http({
//                method: 'Post',
//                url: 'http://localhost:9000/api/users/sign_in',
//                data: credentials
//            }).success(function(data, status, headers, config){
//                    console.log(data);
//                    debugger;
//            });

            Auth.login(credentials).then(function(user) {
                $scope.user = user;
                $scope.ctrlUser = user;
                console.log(user, currentUser, user.name);
                console.log(Auth._currentUser);// => {id: 1, ect: '...'}
                debugger;
            }, function(error) {
                // Authentication failed...
            });

        };

//        $scope.login = function(){
//            $scope.user = {name: 'test',
//                email: 'test3@test.com',
//                password: 'asdfasdfasdf'};
//
//            Auth.login($scope.user, config).then(function(user){
//                debugger;
//                $rootScope.user = user
//                debugger;
//                alert("You're all signed in, " + user.username);
//                $state.go('home');
//            }, function(response){
//                alert(response.data.error)
//            });
//        }
        $scope.logout = function() {

//            user.email = 'test@test.com'
            debugger;
//            $http.get('/api/devise/sessions', credentials);
//
//            debugger;
//            debugger;
            Auth.logout(credentials).then(function(oldUser) {
                console.log(oldUser); // => {id: 1, ect: '...'}
                debugger;
            }, function(error) {
                // Authentication failed...
            });

        };
        $scope.getUser = function(user) {
            $scope.userId = 7;
            $scope.userEmail = "tim1@tim.com";
            $scope.userName = "Tim";
            $scope.userPassword = "timtimtim";
            debugger;
            User.get({id: $scope.userId}).then(function(user){
                $scope.user  = user;
            });
            console.log(user);
            debugger;

        };
        $scope.getConsumer = function (consumer, user) {
            debugger;

            debugger;

            $scope.user = userService.user;
            user = $scope.user;
            User.get({id: 19}).then(function(user){
                $scope.user  = user;
            });

            debugger;
            $scope.user.consumers = user.getConsumers();
//            Consumer.get({id:user.id}).then(function(consumer) {
//                $scope.consumer = consumer;
//                console.log(consumer);
//                debugger;
//            });

        };
        $scope.getConsumerTrial = function (consumer) {
            Consumer.get({user:19}).then(function(consumer) {
                $scope.consumer = consumer;
                console.log(consumer);
                debugger;
            });
        }
        $scope.currentUser = function() {
//            var id = 1
//
////            $http.get('api/users/test', id)
//            debugger;
//            Auth.register(id).then(function(registeredUser) {
//                debugger;
//                console.log(registeredUser); // => {id: 1, ect: '...'}
//            }, function(error) {
//                // Registration failed...
//            });

            Auth.currentUser().then(function(user) {
                // User was logged in, or Devise returned
                // previously authenticated session.
                console.log(Auth._currentUser);

                $scope.user = user;
                $scope.ctrlUser = user;

                console.log("thrown", user);
                 debugger;// => {id: 1, ect: '...'}
            }, function(error) {
                console.log("Not picking up a session")
            });
        }
        $scope.testGet = function () {
            var id = 7
            $http.get('users/7')
            console.log("testGet");
            User.get({id: 7}).then(function(user){
                $scope.user  = user;
                debugger;
            });
        }
        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
                console.log("new session created", currentUser)
        });
//        $scope.user.credentials = { email: '', password: '' };
////
//        $scope.user.signIn = function(user) {
//            console.log(this, this.credentials, this.credentials.email);
//            var user = {};
//            user.name = this.credentials.name;
//            user.email = this.credentials.email;
//            user.password = this.credentials.password;
//            debugger;
//            // Code to use 'angular-devise' component
//            Auth.login(this.credentials).then(function() {
//                debugger;
//                $location.path("/");
//                debugger;
//                alert('Successfully signed in user!')
//            }, function(error) {
//                console.info('Error in authenticating user!');
//                alert('Error in signing in user!');
//            });
//        };

        $scope.signIn = function (remember) {
            var credentials = {
//                name: $scope.credentials.name,
                email: $scope.credentials.email,
                password: $scope.credentials.password
            };
            $scope.remember = true;
            console.log("fired", credentials);
            var user = {};
            var currentUser = {};
            Auth.login(credentials).then(function(user, remember) {
                $scope.user = user;
                $scope.ctrlUser = user;

                console.log(user, currentUser, user.name);
                console.log(Auth._currentUser);// => {id: 1, ect: '...'}
                debugger;
                if ($scope.remember == true) {
                    $cookies.put('someToken', $scope.credentials.email);
                    $cookies.put('password', $scope.credentials.password)
                    var cookie3 = $cookies.get('someToken');
                    var cookie4 = $cookies.get('password');
                    console.log(cookie3, cookie4);
                    debugger;
                } else {
                    console.log('Dont remember')
                };
                if (user.name !== undefined) {
                     console.log("have a user");
                    $rootScope.isPopupvisible66 = false;
                    $scope.isPopupvisible66 = $rootScope.isPopupvisible66;
                    $window.location.reload();
                    //                    $window.location.href = '/#/sticks';
                } else {
                    console.log("currentUser undefined")
                    $rootScope.isPopupvisible66 = true;
                    $scope.isPopupvisible66 = $rootScope.isPopupvisible66;
                }
            }).catch(function(error) {
                    console.log("FAILURE!", error);
                    debugger;
            });
        };
        $scope.makeTodos();

        $scope.$watch("currentPage + numPerPage", function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
        });

        $scope.route = function (consumer) {

        }
        $scope.select = function (consumer, merchandise, bid, wish) {
            $scope.consumer = consumer;
          console.log(consumer, "consumer")

          debugger;
            $scope.consumer.merchandises = consumer.getMerchandises();
            debugger;
            $scope.consumer.bids = consumer.getBids();
            $scope.consumer.wishes = consumer.getWishes();
            console.log($scope.consumer.merchandises, $scope.consumer.bids);
            debugger;
        };
        $scope.consumerBidMerchandise = [];
        $scope.consumerWishMerchandise = [];

        $scope.test1 = function (bid) {
            console.log("test fired");

            angular.forEach($scope.consumer.bids, function(bid, merchandise) {
                $scope.bid = bid;
                debugger;
                $scope.merchandiseId = bid.merchandiseId;
                Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                    $scope.consumerBidMerchandise.push(merchandise);

                    console.log(merchandise);
                });

                debugger;
            })
            console.log($scope.consumerBidMerchandise)

        }
        $scope.test2 = function (wish) {
            console.log("collect wish list merchandise");

            angular.forEach($scope.consumer.wishes, function(wish, merchandise) {
                $scope.wish = wish;
                debugger;
                $scope.merchandiseId = wish.merchandiseId;
                Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise) {
                    $scope.consumerWishMerchandise.push(merchandise);

                    console.log(merchandise);
                });

                debugger;
            })
            console.log($scope.consumerWishMerchandise)

        }
        $scope.test = function(bid, merchandise, consumer) {

            $scope.merchandiseId = bid.getMerchandiseId();
            $scope.consumerId = bid.getConsumerId();

            debugger;
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                $scope.consumer  = consumer;
            });
            Merchandise.get({id:$scope.merchandiseId}).then(function(merchandise){
                $scope.merchandise  = merchandise;
            });
            console.log(merchandise);
            debugger;
        };
        $scope.select2 = function (merchandise) {
            $scope.merchandise = merchandise;
            $scope.merchandise.bids = merchandise.getBids();
            debugger
        }
        angular.extend ($scope.consumer, {
            name: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            payment_method_id: Number(),
            public: '',
            gender: '',
            email: '',
            number: '',
            password: ''
        });
        $scope.goTo = function(merchandise) {
            $scope.merchandise = merchandise;
            var Id = $scope.merchandise.id;
            $routeParams.merchandiseId = $scope.merchandise.id;
            debugger;
            $state.go('merchandises/.merchandiseId');
        };
        $scope.createConsumer = function() {
            $scope.consumer = new Consumer;
            $scope.consumer.name = ($scope.consumer.firstName + " " + $scope.consumer.lastName);
            $scope.consumer.dateOfBirth = ($scope.consumer.year + "-" + $scope.consumer.month + '-' + $scope.consumer.day)
            debugger;
            $scope.consumer.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateConsumer = function() {
            $scope.consumer.dateOfBirth = ($scope.consumer.year + "-" + $scope.consumer.month + '-' + $scope.consumer.day)
            console.log($scope.consumer.avatar, $scope.consumer.avatar.name);
            var avatar = $scope.consumer.avatar;
            console.log(avatar);
            var consumer = $scope.consumer;
            $scope.upload = Upload.upload({
                url: '/api/consumers/' + consumer.id,
                method: 'PATCH',
                data: {name : $scope.consumer.name, avatar: $scope.consumer.avatar},
                avatar: avatar,
                fileFormDataName: 'consumer[avatar]',
                formDataAppender: function(fd, key, val) {
                    if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                            fd.append('consumer['+key+']', v);
                        });
                    } else {
                        fd.append('consumer['+key+']', val);
                    }
                }
            });
            debugger;
            $scope.consumer.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                    $scope.isPopupvisible15 = true;
                    $scope.isPopupvisible16 = false;
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                    $scope.isPopupvisible16 = true;
                });
        };
        $scope.avatar = function() {
            var avatar = $scope.consumer.avatar;
            console.log(avatar);
            var consumer = $scope.consumer;
            $scope.upload = Upload.upload({
                url: '/api/consumers/' + consumer.id,
                method: 'PATCH',
                data: {name : $scope.consumer.name, avatar: $scope.consumer.avatar},
                avatar: avatar,
                fileFormDataName: 'consumer[avatar]',
                formDataAppender: function(fd, key, val) {
                    if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                            fd.append('consumer['+key+']', v);
                        });
                    } else {
                        fd.append('consumer['+key+']', val);
                    }
                }
            });
            debugger;
        }
        $scope.destroyConsumer = function() {
            $scope.consumer.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.createUser2 = function () {
            $scope.user = new User;
//            $scope.user.name = $scope.consumer.firstName;
            $scope.user.password = $scope.consumer.password;
            $scope.user.email = $scope.consumer.email;
            $scope.user.name = ($scope.consumer.firstName + " " + $scope.consumer.lastName);
            $scope.user.dateOfBirth = ($scope.consumer.year + "-" + $scope.consumer.month + '-' + $scope.consumer.day);
            $scope.user.gender = $scope.consumer.gender;
            $scope.user.pronoun = $scope.consumer.pronoun;
            $scope.user.number = $scope.consumer.number;
            $scope.user.avatar = $scope.consumer.avatar;
            $scope.user.create().then(
                function(response) {
                console.log("SUCCESS", response);
                debugger;
                $scope.consumer = new Consumer;
                $scope.consumer.userId = $scope.user.id;
                $scope.consumer.user_id = $scope.user.id;
                $scope.consumer.name = $scope.user.name;
                $scope.consumer.firstName = $scope.user.name.split(' ').slice(0, -1).join(' ');
                $scope.consumer.lastName = $scope.user.name.split(' ').slice(-1).join(' ');
                $scope.consumer.email = $scope.user.email;
                $scope.consumer.dateOfBirth = $scope.user.dateOfBirth;
                $scope.consumer.gender = $scope.user.gender;
                $scope.consumer.pronoun = $scope.user.pronoun;
                $scope.consumer.number = $scope.user.number;
                $scope.consumer.avatar = $scope.user.avatar;
                    debugger;
                $scope.consumer.create();
                  $scope.successModal();

                  debugger;
            })
                .catch(function(error) {
                    console.log("FAILURE!", error);
                    $scope.isPopupVisibleDuplicateEmail = true;
                    debugger;
                });
            debugger;
        };
        $scope.createUser = function() {

            $scope.user = new User;
//            $scope.user.name = $scope.consumer.firstName;
            $scope.user.password = $scope.consumer.password;
            $scope.user.email = $scope.consumer.email;
            $scope.user.name = ($scope.consumer.firstName + " " + $scope.consumer.lastName);

            debugger;
//            new User({name: $scope.consumer.firstName, password: $scope.consumer.password}).create();
            debugger;
            $scope.user.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                    debugger;
                    $scope.consumer = new Consumer;
                    $scope.consumer.id = $scope.user.id;
                    $scope.consumer.name = $scope.user.name;
                    $scope.consumer.email = $scope.user.email;
                    debugger;
                    $scope.consumer.create();
                    debugger;
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                    debugger;
//                    $scope.consumer = new Consumer;
//                            $scope.consumer.userId = $scope.user.id;
//                            $scope.consumer.name = $scope.user.name;
//                            $scope.consumer.firstName = $scope.user.name.split(' ').slice(0, -1).join(' ');
//                            $scope.consumer.lastName = $scope.user.name.split(' ').slice(-1).join(' ');
//                            $scope.consumer.email = $scope.user.email;
//                            $scope.consumer.create();
//                    debugger;
                        var credentials = {
//                name: $scope.credentials.name,
                            email: $scope.consumer.email,
                            password: $scope.consumer.password
                        };
                        debugger;
                        console.log("fired", credentials);
                        var user = {};
                        var currentUser = {};
                        Auth.login(credentials).then(function(user) {
                            $scope.user = user;
                            $scope.ctrlUser = user;
                            console.log(user, currentUser, user.name);
                            console.log(Auth._currentUser);// => {id: 1, ect: '...'}
                            $scope.consumer = new Consumer;
                            $scope.consumer.userId = $scope.user.id;
                            $scope.consumer.name = $scope.user.name;
                            $scope.consumer.firstName = $scope.user.name.split(' ').slice(0, -1).join(' ');
                            $scope.consumer.lastName = $scope.user.name.split(' ').slice(-1).join(' ');
                            $scope.consumer.email = $scope.user.email;
                            $scope.consumer.create();

                            debugger;
                        });
                });
        };
        $scope.updateUser = function(user) {
            Auth.currentUser().then(function(user) {
                console.log(user);
                $scope.user = user;
                $scope.user.password = $scope.user.password;
                $scope.user.name = $scope.consumer.firstName;

                debugger;
                new User({id: user.id, name: $scope.consumer.firstName, password: $scope.user.password, current_password: $scope.consumer.oldword}).update()
                    .then(function(response) {
                        console.log("SUCCESS", response);
                        $scope.isPopupvisible15 = true;
                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
                debugger;
//                $scope.user.update()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
            });
            debugger;
//            $scope.user.update()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
        };

        $scope.destroyUser = function() {
            $scope.user.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.getMerchandise = function(consumer, merchandise) {
            $scope.consumer.merchandises = consumer.getMerchandises();
            $scope.consumer.bids = consumer.getBids();

            debugger;
//            $scope.merchandise = merchandise;
            debugger;
        };

        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Consumer) {
                    $scope.consumer = new Consumer();




                    $scope.ok = function () {
                        $modalInstance.close($scope.consumer);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createConsumer = function() {

                        $scope.consumer.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });

//                        new Letter({doctor_id:$scope.letter.doctor_id});
                        debugger;
                    };

                },
                size: size,
                resolve: {
                    consumers: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedConsumer) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, consumer) {
                    $scope.consumer = consumer;
                    $scope.patientId = letter.getPatientId();

                    $scope.ok = function () {
                        $modalInstance.close($scope.letter);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.showPopup = function () {
                        $scope.isPopupVisible = true;
                    };

                    $scope.showPopup2 = function () {
                        $scope.isPopupVisible2 = true;
                    };

                    $scope.updateConsumer = function(consumer) {
                        $scope.consumer.update(consumer)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible = false;

                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

//                    $scope.destroyLetter = function(letter) {
//                        $scope.letter.delete(letter)
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
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.$watch('consumerFind', function () {
                $scope.testUser2();
            debugger;
            // setTimeout(function () {
            //     $scope.$apply(function(user, consumer) {
            //         $scope.user = userService.user;
            //         user = $scope.user;
            //         console.log("user", user);
            //         if ($scope.consumerFind == 0) {
            //             angular.forEach($scope.consumers, function(consumer) {
            //                 console.log("consumer", consumer)
            //                 if(consumer.userId == user.id){
            //                     console.log("SUCCESS", consumer)
            //                     $scope.consumer = consumer;
            //                     debugger;
            //                     $scope.consumer2 = consumer;
            //                 }
            //                 else {
            //                     console.log("no one is logged in")
            //                 };
            //             });
            //         } else {
            //             console.log("no one is logged in")
            //         };
            //             $scope.consumer1 = $scope.consumer;
            //             consumer = $scope.consumer;
            //             debugger;
            //             $scope.consumer2 = consumer;
            //
            //
            //     });
            // }, 100);
        });
        $scope.$watch('consumer2', function(consumer, bid) {
            $scope.consumer = $scope.consumer2;
            consumer = $scope.consumer;
            $scope.consumer = consumer;
            $scope.consumer.day =  consumer.dateOfBirth.slice(-2);
            $scope.consumer.month = consumer.dateOfBirth.slice(-5, -3);
            $scope.consumer.year = consumer.dateOfBirth.slice(-10, -6)

            console.log($scope.consumer.month, $scope.consumer.year)


        })
       $scope.emailConfirm = function (consumer) {
           $scope.consumer = consumer;
           debugger;
           console.log("resend confirmation email", $scope.consumer.email)
       };

      $scope.successModal = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'successModal.html',
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
          $window.location.href = "#!/sticks";

        });
      };


    }])



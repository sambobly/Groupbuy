'use strict';


angular.module('clientApp')
    .controller('MerchandisesController', ['$scope', '$timeout', '$http', '$resource', '$location', '$state', '$routeParams', 'User', 'userService', 'Merchandise', 'Consumer', 'Bid', 'Wish', '$modal', 'Upload', 'Category', function ($scope, $timeout, $http, $resource, $location, $state, $routeParams, User, userService, Merchandise, Consumer, Bid, Wish, $modal, Upload, Category) {
        $scope.userService = userService;
        $scope.user = userService.user;
        $scope.isPopupvisiblesubmit = false;
        $scope.isPopupvisibleloggedout = false;

        $scope.loadUsers = function() {

            // Use timeout to simulate a 650ms request.
            return $timeout(function(merchandises) {

                Merchandise.query().then(function(merchandises){
                    $scope.merchandises = merchandises;
                });
            }, 650);
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

        $scope.wish = new Wish();

        Wish.query().then(function(wishes){
            $scope.wishes = wishes;
        });
        $scope.category = new Category();

        Category.query().then(function(categories){
            $scope.categories = categories;
        });

        $scope.$watch('user', function (user) {
                console.log($scope.user, "watch fired with user");
            if ($scope.user.email != "") {
                console.log("can create merch")
                $scope.isPopupvisiblesubmit = true;
            } else {
                console.log("cannot create merch")
                $scope.isPopupvisibleloggedout = true;

            }

        });
        angular.extend ($scope.merchandise, {
            value: Number(),
            category: '',
            title: '',
            description: '',
            start: '',
            end: ''
        });

        $scope.createMerchandise = function(user, category) {

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
            $scope.merchandise.consumerId = $scope.consumer.id;
            $scope.merchandise.categoryId = $scope.merchandise.category.id;
            $scope.merchandise.difference = $scope.merchandise.value;
            $scope.merchandise.complete = 'false';
            debugger;
            $scope.merchandise.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                    $scope.merchandise = response;
                    var images = $scope.selected.images;
                    console.log(images);
                    var merchandise = $scope.merchandise;
                    $scope.upload = Upload.upload({
                        url: '/api/merchandises/' + response.id,
                        method: 'PATCH',
                        data: {images: $scope.selected.images},
                        images: images,
                        fileFormDataName: 'merchandise[images]',
                        formDataAppender: function(fd, key, val) {
                            if (angular.isArray(val)) {
                                angular.forEach(val, function(v) {
                                    fd.append('merchandise['+key+']', v);
                                });
                            } else {
                                fd.append('merchandise['+key+']', val);
                            }
                        }
                    });
                    debugger;
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateMerchandise = function() {
            $scope.merchandise.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyMerchandise = function() {
            $scope.merchandise.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.searchFilter = function (merchandise, testText, selectedItem, searchText) {
            $scope.selectedItem = selectedItem;
            $scope.searchText = testText;
//            $scope.name = $scope.searchTextChange;
            $scope.filteredSearchMerchandises = [];
            debugger;
            angular.forEach($scope.merchandises, function(merchandise) {
//                $scope.merchandise = merchandise;
//                merchandise.title = name;
                var nameStringify = JSON.stringify(name);
                console.log(merchandise);
                debugger;
//                if (merchandise.search($scope.searchText)) {
//                    debugger;
//                    return $scope.filteredMerchandises.push(merchandise);
//                    debugger;
//
//                }
            });
        };

        $scope.test = function(merchandise) {
            angular.forEach($scope.merchandises, function(merchandise) {
                console.log(merchandise);
            })
        };
        $scope.getConsumer = function(merchandise, consumer) {
            $scope.consumerId = merchandise.getConsumerId();
            debugger;
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                $scope.consumer  = consumer;
            });
            console.log(consumer);
            debugger;
            $scope.merchandise.wishes = merchandise.getWishes();
            console.log($scope.merchandise.wishes)
            debugger;
        };
        $scope.goTo = function(merchandise, consumer) {
            $scope.merchandise = merchandise;
            var Id = $scope.merchandise.id;
            $routeParams.merchandiseId = $scope.merchandise.id;
            debugger;
            $state.go('merchandises/.merchandiseId');
        };
        $scope.set = function(merchandise, consumer) {
            $scope.merchandise = merchandise;
            $scope.merchandise.bids = merchandise.getBids();
            debugger;
            $scope.consumerId = merchandise.getConsumerId();
            Consumer.get({id:$scope.consumerId}).then(function(consumer){
                console.log(Consumer);
                $scope.consumer  = consumer;
            });
            console.log(consumer);
            debugger;

            $scope.merchandise.wishes = merchandise.getWishes();
            console.log($scope.merchandise.wishes, $scope.merchandise.bids)
            debugger;

        }
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
        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Merchandise) {
                    $scope.merchandise = new Merchandise();


                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createMerchandise = function() {

                        $scope.merchandise.create()
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
                    merchandise: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedMerchandise) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, merchandise) {
                    $scope.merchandise = merchandise;

                    $scope.ok = function () {
                        $modalInstance.close($scope.merchandise);
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

                    $scope.updateMerchandise = function(merchandise) {
                        $scope.merchandise.update()
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
                        return selectedMerchandise;
                    }
                }
            });

            modalInstance.result.then(function (selectedMerchandise) {
                $scope.selected = selectedMerchandise;
                $scope.merchandise = selectedMerchandise;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.images = function() {
            var images = $scope.merchandise.images;
            console.log(images);
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
                        });
                    } else {
                        fd.append('merchandise['+key+']', val);
                    }
                }
            });
            debugger;
        }


    }])



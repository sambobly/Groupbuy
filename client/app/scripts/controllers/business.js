'use strict';


angular.module('clientApp')
    .controller('BusinessController', ['$scope', '$resource', '$location', '$routeParams', 'Business', '$modal', function ($scope, $resource, $location, $routeParams, Business, $modal) {

        $scope.business = new Business();


        Business.query().then(function(businesses){
            $scope.businesses = businesses;
        });
        $scope.formData = {
            businessName: '',
            businessAddress: '',
            businessCity: '',
            businessState: '',
            businessPostcode: '',
            businessCountry: '',
            businessRegistrationname: '',
            businessRegistrationnumber: '',
            businessWebsite: '',
            businessContact: '',
            businessOnline: ''
        };
        $scope.createBusiness = function() {
            $scope.business.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateBusiness = function() {
            $scope.business.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyBusiness= function() {
            $scope.business.delete()
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
                controller: function ($scope, $modalInstance, Business) {
                    $scope.business = new Business();

                    $scope.ok = function () {
                        $modalInstance.close($scope.business);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createBusiness = function() {
                        $scope.business.create()
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
                    business: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedBusiness) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, business) {
                    $scope.business = business;

                    $scope.ok = function () {
                        $modalInstance.close($scope.business);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateBusiness = function(business) {
                        $scope.business.update(business)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyBusiness = function(business) {
                        $scope.business.delete(business)
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
                    business: function () {
                        return selectedBusiness;
                    }
                }
            });

            modalInstance.result.then(function (selectedBusiness) {
                $scope.selected = selectedBusiness;
                $scope.business = selectedBusiness;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



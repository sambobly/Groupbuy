'use strict';


angular.module('clientApp')
        .controller('PaymenttypesController', ['$scope', '$resource', '$location', '$routeParams', 'Payment_type', '$modal', function ($scope, $resource, $location, $routeParams, Payment_type, $modal) {

        $scope.payment_type = new Payment_type();


        Payment_type.query().then(function(payment_types){
            $scope.payment_types = payment_types;
        });
        $scope.formData = {
            payment_typeName: ''
        };
        $scope.createPayment_type = function() {
            $scope.payment_type.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updatePayment_type = function() {
            $scope.payment_type.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyPayment_type = function() {
            $scope.payment_type.delete()
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
                controller: function ($scope, $modalInstance, Payment_type) {
                    $scope.payment_type = new Payment_type();

                    $scope.ok = function () {
                        $modalInstance.close($scope.payment_type);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createPayment_type = function() {
                        $scope.payment_type.create()
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
                    payment_type: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedPayment_type) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, payment_type) {
                    $scope.payment_type = payment_type;

                    $scope.ok = function () {
                        $modalInstance.close($scope.payment_type);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updatePayment_type = function(payment_type) {
                        $scope.payment_type.update(payment_type)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyPayment_type = function(payment_type) {
                        $scope.payment_type.delete(payment_type)
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
                    payment_type: function () {
                        return selectedPayment_type;
                    }
                }
            });

            modalInstance.result.then(function (selectedPayment_type) {
                $scope.selected = selectedPayment_type;
                $scope.payment_type = selectedPayment_type;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



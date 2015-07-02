'use strict';


angular.module('clientApp')
    .controller('TaxesController', ['$scope', '$resource', '$location', '$routeParams', 'Tax', '$modal', function ($scope, $resource, $location, $routeParams, Tax, $modal) {

        $scope.tax = new Tax();


        Tax.query().then(function(taxes){
            $scope.taxes = taxes;
        });
        $scope.formData = {
            taxName: '',
            taxAmount: ''
        };
        $scope.createTax = function() {
            $scope.tax.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateTax = function() {
            $scope.tax.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyTax = function() {
            $scope.tax.delete()
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
                controller: function ($scope, $modalInstance, Tax) {
                    $scope.tax = new Tax();

                    $scope.ok = function () {
                        $modalInstance.close($scope.tax);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createTax = function() {
                        $scope.tax.create()
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
        $scope.update = function (size, selectedTax) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, tax) {
                    $scope.tax = tax;

                    $scope.ok = function () {
                        $modalInstance.close($scope.tax);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateTax = function(tax) {
                        $scope.tax.update(tax)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyTax = function(tax) {
                        $scope.tax.delete(tax)
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
                        return selectedTax;
                    }
                }
            });

            modalInstance.result.then(function (selectedTax) {
                $scope.selected = selectedTax;
                $scope.tax = selectedTax;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



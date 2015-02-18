'use strict';


angular.module('clientApp')
    .controller('ProductsController', ['$scope', '$resource', '$location', '$routeParams', 'Product', '$modal', '$log', function ($scope, $resource, $location, $routeParams, Product, $modal, $log) {
        $scope.product = new Product();
        $scope.products = function() {
            $scope.product.query()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        },

        $scope.formData = {
            newProductName: '',
            newProductPrice: ''
        };
        $scope.createProduct = function() {
            $scope.product.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.delete = function() {
            Product.delete(product);
        };


        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: function ($scope, $modalInstance, products) {
                    $scope.products = products;
                    $scope.selected = {
                        product: $scope.products[0]
                    };

                    $scope.ok = function () {
                        $modalInstance.close($scope.selected.product);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    products: function () {
                        return $scope.products;
                    }
                }
            });

            modalInstance.result.then(function (selectedProduct) {
                $scope.selected = selectedProduct;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])
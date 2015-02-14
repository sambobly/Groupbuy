'use strict';


angular.module('clientApp')
    .controller('ProductsController', ['$scope', '$resource', '$location', '$routeParams', 'Product', '$modal', '$log', function ($scope, $resource, $location, $routeParams, Product, $modal, $log) {
        $scope.product = new Product();

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

        this.modalUpdate = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'views/patients.html',
                controller: function ($scope, $modalInstance, product) {
                    $scope.product = products;
                },
                size: size,
                resolve: {
                    product: function() {
                        return $scope.products;
                    }
                }

            });

            modalInstance.result.then(function () {
                $scope.product
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])
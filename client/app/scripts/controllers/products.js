'use strict';


angular.module('clientApp')
    .controller('ProductsController', ['$scope', '$resource', '$location', '$routeParams', 'Product', function ($scope, $resource, $location, $routeParams, Product) {
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
    }])
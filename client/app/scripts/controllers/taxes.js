'use strict';


angular.module('clientApp')
    .controller('TaxesController', ['$scope', '$resource', '$location', '$routeParams', 'Tax', '$modal', function ($scope, $resource, $location, $routeParams, Tax, $modal    ) {

        $scope.tax = new Tax();


        Tax.query().then(function(taxes){
            $scope.taxes = taxes;
        });
        $scope.formData = {
            taxName: '',
            taxAmount: ''
        };
        $        scope.createTax = function() {
            $scope.tax.create()
                .then(function(response) {
                    c.$setValidity('unique', formData.isUnique);
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    c.$setValidity('unique', false)
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



    }])
'use strict';


angular.module('clientApp')
    .controller('CategoriesController', ['$scope', '$http', '$resource', '$location', '$state', '$routeParams', 'Category', 'Merchandise', '$modal', function ($scope, $http, $resource, $location, $state, $routeParams, Category, Merchandise, $modal) {

        $scope.category = new Category();

        Category.query().then(function(categories){
            $scope.categories = categories;
        });

        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises) {
            $scope.merchandises = merchandises;
        })

        angular.extend ($scope.category, {
            name: '',
            description: ''

        });

        $scope.createCategory = function() {

            $scope.category.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateCategoy = function() {
            $scope.category.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyCategory = function() {
            $scope.category.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
       $scope.open = function (category) {
          $scope.category = category;
           $scope.category.merchandises = category.getMerchandises  ();
           console.log($scope.category.merchandises)
           debugger;
       }
    }])



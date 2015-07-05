'use strict';


angular.module('clientApp')
    .controller('BillableitemsController', ['$scope', '$resource', '$location', '$routeParams', 'Billable_item', '$modal', function ($scope, $resource, $location, $routeParams, Billable_item, $modal) {

        $scope.billable_item = new Billable_item();


        Billable_item.query().then(function(billable_items){
            $scope.billable_items = billable_items;
        });
        $scope.formData = {
            billable_itemName: '',
            billable_itemType: '',
            billable_itemPrice: '',
            billable_itemTax: '',
            billable_itemTotal: ''
        };
        $scope.createBillable_item = function() {
            $scope.billable_item.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateBillable_item = function() {
            $scope.billable_item.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyBillable_item = function() {
            $scope.billable_item.delete()
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
                controller: function ($scope, $modalInstance, Billable_item) {
                    $scope.billable_item = new Billable_item();

                    $scope.ok = function () {
                        $modalInstance.close($scope.billable_item);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createBillable_item = function() {
                        $scope.billable_item.create()
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
                    billable_item: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedBillable_item) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, billable_item) {
                    $scope.billable_item = billable_item;

                    $scope.ok = function () {
                        $modalInstance.close($scope.billable_item);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateBillable_item = function(billable_item) {
                        $scope.billable_item.update(billable_item)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyBillable_item = function(billable_item) {
                        $scope.billable_item.delete(billable_item)
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
                    billable_item: function () {
                        return selectedBillable_item;
                    }
                }
            });

            modalInstance.result.then(function (selectedBillable_item) {
                $scope.selected = selectedBillable_item;
                $scope.billable_item = selectedBillable_item;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



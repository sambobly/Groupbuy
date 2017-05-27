'use strict';


angular.module('clientApp')
    .controller('BillableitemsController', ['$scope', '$resource', '$state', '$location', '$routeParams', 'Billable_item', 'Tax', '$modal', function ($scope, $resource, $state, $location, $routeParams, Billable_item, Tax, $modal) {
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term

        $scope.rowCollection = [
            {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
            {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
            {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
        ];

//        $scope.getters={
//            name: function (value) {
//                //this will sort by the length of the first name string
//                return value.name.length;
//            }
//        };
        $scope.data = {
            selectedShape: 'Circle'
        };
        $scope.shapes = ['Square', 'Circle', 'Triangle', 'Pentagon', 'Hexagon'];
        $scope.billable_item = new Billable_item();
//        $scope.selectedColour = $scope.colours[2]; // red.
//
//        $scope.colourChanged = function (value) {
//            var colourName = value ? value.name : "none";
//            $scope.message = "ac-change event fired for colour. New colour: " + colourName;
//            $scope.$digest();
//        };
//
//        $scope.colours = [
//            { name: 'black', id: 0 },
//            { name: 'white', id: 1 },
//            { name: 'red', id: 2 }]

        Billable_item.query().then(function(billable_items){
            $scope.billable_items = billable_items;
        });

        $scope.tax = new Tax();

        Tax.query().then(function(tax){
            $scope.tax = tax;
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
                controller: function ($scope, $modalInstance, Billable_item, Tax) {
                    $scope.billable_item = new Billable_item();

                    $scope.tax = new Tax();

                    Tax.query().then(function(taxes){
                        $scope.taxes = taxes;
                    });
                    $scope.ok = function () {
                        $modalInstance.close($scope.billable_item);
                    };


                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.testshow = function() {
                        $scope.isPopupVisible6 = true;
                    };

                    $scope.close = function () {
                        $modalInstance.close($scope.billable_item);
                    };


                    $scope.createBillable_item = function() {
                        $scope.billable_item.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible6 - false;
                                $scope.isPopupVisible5 = true
//                                $modalInstance.close($scope.billable_item);
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
                console.log("AM I FIRING??");
                $state.reload();
            });
        };
        $scope.update = function (size, selectedBillable_item) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                backdrop: 'static',
                controller: function ($scope, $modalInstance, billable_item) {
                    $scope.billable_item = billable_item;
                    console.log($scope.billable_item);
                    debugger;
                    $scope.ok = function () {
                        $modalInstance.close($scope.billable_item);
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

                    $scope.reload = function () {
                        $modalInstance.close();
                        $state.reload();

                    }

                    $scope.updateBillable_item = function(billable_item) {
                        $scope.billable_item.update(billable_item)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible = false;
                                $scope.isPopupVisible3 = true;
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyBillable_item = function(billable_item) {
                        $scope.billable_item.delete(billable_item)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible2 = false;
                                $scope.isPopupVisible4 = true;

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
                $state.reload();
                $scope.selected = selectedBillable_item;
                $scope.billable_item = selectedBillable_item;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



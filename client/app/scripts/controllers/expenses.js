'use strict';


angular.module('clientApp')
    .controller('ExpensesController', ['$scope', '$resource', '$location', '$routeParams','$modal', 'Expense', 'Tax', 'Concession_type',  function ($scope, $resource, $location, $routeParams, $modal, Expense, Tax, Concession_type) {

        $scope.expense = new Expense();


        Expense.query().then(function(expenses){
            $scope.expenses = expenses;
        });

        $scope.tax = new Tax();


        Expense.query().then(function(Taxes){
            $scope.taxes = Taxes;
        });

        $scope.concession_type = new Concession_type();

        Concession_type.query().then(function(concession_types){
            $scope.concession_types = concession_types;
        });

        $scope.expenses = function() {
            $scope.expense.query()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        },

        $scope.formData = {
            expenseDate: '',
            expenseVendor: '',
            expenseCategory: '',
            expenseAmount: '',
            expenseTax_type: '',
            expenseTaxAmount: '',
            expenseNote: '',
            expenseProduct: '',
            expenseConcessionType: '',
            expenseTest: ''


        };
        $scope.createExpense = function() {
            $scope.expense.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateExpense = function() {
            $scope.expense.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyExpense = function() {
            $scope.expense.delete()
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
                controller: function ($scope, $modalInstance, Expense, Tax, Concession_type) {
                    $scope.expense = new Expense();


                    $scope.tax = new Tax();

                    Tax.query().then(function(taxes){
                        $scope.taxes = taxes;
                    });

                    $scope.concession_type = new Concession_type();

                    Concession_type.query().then(function(concession_types){
                        $scope.concession_types = concession_types;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.expense);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createExpense = function() {
                        $scope.expense.create()
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
                    expense: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedExpense) {



            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, expense) {
                    $scope.expense = expense;

                    console.log("Success!", expense);

                    $scope.ok = function () {
                        $modalInstance.close($scope.expense);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateExpense = function(expense) {
                        $scope.expense.update(expense)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyExpense = function(expense) {
                        $scope.expense.delete(expense)
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
                    expense: function () {
                        return selectedExpense;
                    }
                }
            });

            modalInstance.result.then(function (selectedExpense) {
                $scope.selected = selectedExpense;
                $scope.expense = selectedExpense;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



'use strict';


angular.module('clientApp')
    .controller('TaxesController', ['$scope', '$resource', '$location', '$routeParams', 'Tax', 'Invoice', '$modal', function ($scope, $resource, $location, $routeParams, Tax, Invoice, $modal) {
        $('#timepicker1').timepicker();


        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };

        $scope.tax = new Tax();


        Tax.query().then(function(taxes){
            $scope.taxes = taxes;
        });
        $scope.formData = {
            taxName: '',
            taxAmount: ''
        };

        $scope.invoice = new Invoice();


        Invoice.query().then(function(invoices){
            $scope.invoices = invoices;
        });

        angular.extend ($scope.invoice, {
            date: '',
            patient: '',
            doctor: '',
            name:'',
            appointment: '',
            item: '',
            price: Number(),
            quantity: Number(),
            tax: Number(),
            discount: Number(),
            total: $scope.invoice.total,
            note: '',
            item_name: '',
            product:'',
            concession_type: '',
            lines:'',
            patient_id:''



        });
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

        $scope.createInvoice = function() {
            $scope.invoice.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateInvoice = function() {
            $scope.invoice.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyInvoice = function() {
            $scope.invoice.delete()
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


                    console.log($scope.tax, tax, $scope.tax.id);
                    $scope.ok = function () {
                        $modalInstance.close($scope.tax);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateTax = function(tax) {
                        $scope.tax.update(tax)
                            .then(function(response) {
                                console.log("SUCCESS", tax);
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


        $scope.update1 = function (size, selectedInvoice) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal1.html',
                controller: function ($scope, $modalInstance, invoice) {
                    $scope.invoice = invoice;

                    $scope.ok = function () {
                        $modalInstance.close($scope.invoice);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateInvoice = function(invoice) {
                        $scope.invoice.update(invoice)
                            .then(function(response) {
                                console.log("SUCCESS", invoice);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyInvoice = function(invoice) {
                        $scope.invoice.delete(invoice)
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
                    invoice: function () {
                        return selectedInvoice;
                    }
                }
            });

            modalInstance.result.then(function (selectedInvoice) {
                $scope.selected = selectedInvoice;
                $scope.invoice = selectedInvoice;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



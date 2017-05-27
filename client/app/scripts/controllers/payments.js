'use strict';


angular.module('clientApp')
    .controller('PaymentsController', ['$scope', '$resource', '$location', '$routeParams', 'Payment', 'Patient', 'Invoice','Payment_type', 'Appointment', 'Widget', 'Business', 'Product', '$modal', function ($scope, $resource, $location, $routeParams, Payment, Patient, Invoice, Payment_type, Appointment, Widget, Business, Product, $modal) {
        $scope.sortType     = 'id'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term


        $scope.search1 = function (invoice) {
            return
        };
        $scope.payment = new Payment();

        Payment.query().then(function(payments){
            $scope.payments = payments;
        });

        $scope.product = new Product();

        Product.query().then(function(products){
            $scope.products = products;
        });

        $scope.business = new Business();

        Business.query().then(function(businesses){
            $scope.businesses = businesses;
        });

        $scope.patient = new Patient();

        Patient.query().then(function(patients){
            $scope.patients = patients;
        });

        $scope.widget = new Widget();

        Widget.query().then(function(widgets){
            $scope.widgets = widgets;
        });
//        $scope.doctor = new Doctor();
//
//        Doctor.query().then(function(doctors){
//            $scope.doctors = doctors;
//        });

        $scope.invoice = new Invoice();

        Invoice.query().then(function(invoices){
            $scope.invoices = invoices;
        });

        $scope.payment_type = new Payment_type();

        Payment_type.query().then(function(payment_types){
            $scope.payment_types = payment_types;
        });

//        $scope.payment_type = new Payment_type();
//
//        payment_type.query().then(function(payment_types){
//            $scope.payment_type = payment_types;
//        });

        $scope.appointment = new Appointment();

        Appointment.query().then(function(appointments){
            $scope.appointments = appointments;
        });

        $scope.getInvoiceDetails = function (payment) {
            $scope.invoice = payment.getInvoice();
            console.log("SUCCESS", $scope.invoice);

        };

        $scope.invoices_total = function () {
            var total = 0.00
            angular.forEach($scope.patient.invoices, function(invoice) {
                total += (invoice.total * 1);
            });
            return total
        };
        $scope.payment_sub_total = function () {
            var total = 0.00
            angular.forEach($scope.invoice.payments, function(payment) {
                total += (payment.total * 1);
            });
            return total
        };
        $scope.addpayment_total = function () {
            var total = 0.00
            angular.forEach($scope.payments.test, function(payment) {
                total += (payment.total * 1);
            });
            return total
        };
        $scope.payments_total = function () {
            var total = 0.00
            angular.forEach($scope.patient.invoices, function(invoice) {
                total += (invoice.price * 1);
            });
            return total
        };
        $scope.paymentTotal = function() {
            return $scope.invoice.total - $scope.payment_sub_total() - $scope.addpayment_total();
        };
        $scope.difference_total = function () {
            return $scope.invoices_total() - $scope.payments_total();
        }

        angular.extend ($scope.payment, {
            date: "",
            note: "",
            total: Number(),
            discount: '',
            total: Number(),
            patient_id: $scope.patient.id,
            patient_name: $scope.patient.name,
//            doctor_id: $scope.doctor.id,
//            doctor_name: $scope.doctor.name,
            invoice_id: $scope.invoice.id,
//            paymentType_id: $scope.paymentType.id,
            appointment_id: $scope.appointment.id,



        });

        $scope.new = function(patient) {
           $scope.patient = patient;
           $scope.patient.invoices = patient.getInvoices();
            console.log($scope.patient.invoices);
//           $scope.invoices = $scope.patient.invoices;
            angular.forEach($scope.patient.invoices, function(invoice, patient, invoices) {
//                $scope.patient.invoices = invoices;
//                angular.forEach($scope.invoices, function(invoice){
//                    Invoice.get({id:invoice.id}).then(function(invoice){
//
//                        console.log(invoice);
//                        debugger;
//                });
//                });
//                console.log("HERE", $scope.patient.invoices, JSON.stringify(patient.invoices));
////                $scope.patient.invoices = invoices;
//                angular.forEach($scope.patient.invoices, function(invoice){
//                    Invoice.get({patient_id:patient.id}).then(function(invoice){
//
//                        console.log(invoice);
//                        debugger;
//                });
//                });
                Invoice.get({patient_id:$scope.patient.id}).then(function(invoice){
                    $scope.invoice = invoice;
               $scope.invoice.payments = invoice.getPayments();
                console.log($scope.invoice, $scope.invoice.payments)
               });
            });

            $scope.patient.payments = patient.getPayments();
            console.log($scope.patient.invoices, $scope.patient.payments)

        };
        $scope.newInvoice = function (patient) {
            $scope.isPopupVisible10 = true;
            $scope.invoice = new Invoice();
            $scope.invoice.patient_id = $scope.patient.id;
            $scope.invoice.total = "0";
            $scope.createInvoice = function(invoice) {
                $scope.invoice.create(invoice)
                    .then(function(response) {
                        $scope.invoice1 = response;
                        console.log("SUCCESS", response, response.id, $scope.invoice1);
                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
//                        $scope.invoice1 = _.find($scope.invoices, {'id': response.id});
                debugger;
            };
        };
        $scope.showPopup2 = function (patient) {
            $scope.isPopupVisible = true;
            $scope.patient = patient;
            $scope.patient.invoices = patient.getInvoices();
            console.log($scope.patient, $scope.patient.invoices);


        };

        $scope.open = function (size, selectedPatient) {

            var modalInstance = $modal.open({
                templateUrl: 'openModal.html',
                controller: function ($scope, $modalInstance, patient) {
                    $scope.patient = patient;
//                    $scope.getEggDetails = function (nest) {
//                        $scope.nest.eggs = nest.getEggs();
//                        console.log("call from get egg details", $scope.nest.eggs);
//
//                    };
                    $scope.patient.invoices = patient.getInvoices();
                    console.log("call from modal", $scope.patient.invoices, $scope.patient);

                    // /                    nest.getEggs(function(Eggs){
//            console.log("anything")
//            $scope.eggs = eggs
//        });
//                    $scope.Eggs = function (nest) {
//                        $scope.Eggs = nest.getEgg();
//                    };

                    $scope.ok = function () {
                        $modalInstance.close($scope.patient);
                        console.log("am i here", $scope.patient, $scope.patient.invoices);

                    };


                },
                size: size,
                resolve: {
                    patient: function () {
                        return selectedPatient;
                    }
                }
            });

        };

        $scope.addPayment = function() {
            $scope.invoice.payments.push({qty:0, cost:0, description:""});
        };

        $scope.createPayment = function() {
            $scope.payment.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updatePayment = function() {
            $scope.payment.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyPayment = function() {
            $scope.payment.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.showPopup = function(invoice, payment) {
            $scope.isPopupVisible = true;
            $scope.invoice = invoice
            $scope.invoice.widgets = invoice.getWidgets();
            $scope.invoice.payments = invoice.getPayments();
            console.log("call test modal", $scope.invoice, $scope.invoice.widgets, $scope.invoice.payments);
            console.log(payment);
            $scope.addPayment = function() {
                $scope.invoice.payments.push({qty:0, cost:0, description:""});
            };

            $scope.ok = function () {
                $modalInstance.close($scope.invoice.payments);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.invoice_sub_total = function() {
                var total = 0.00;
                angular.forEach($scope.invoice.payments, function(payment){
                    $scope.payment = payment;
                    total += (payment.total * 1);
                });
                return total
                console.log(total);
            };

            $scope.invoiceTotal = function() {
                return $scope.calculateTax() + $scope.invoice_sub_total();
            };
            $scope.grandTotal = function() {
                return $scope.invoice.total - $scope.invoice_sub_total();
                $scope.grandTotal = value;
            };
            $scope.createPayment = function() {
                $scope.payment.create()
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
            };

            $scope.createAll = function(invoice, payment) {
                angular.forEach($scope.invoice.payments, function(payment) {
                    $scope.payment = payment;
                    $scope.payment = Payment.get(payment.id);
                    $scope.payment.invoice_id = $scope.invoice.id;


//
                    console.log($scope.invoice.id, JSON.stringify(payment));
//
                    new Payment({id:payment.id, invoice_id:$scope.invoice.id, paymentType_id:payment.paymentType.id, total:payment.total, note:payment.note, date:payment.date, doctor:payment.doctor_id}).create();

                });
              $scope.invoice.name = "test";
                console.log($scope.invoice.name);
                $scope.invoice.update(invoice)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console .log("FAILURE!", response);
                    });

            };
//            $scope.createAll = function() {
//
//                angular.forEach($scope.invoice.payments, function(payment) {
//                    $scope.payment = payment;
//                    $scope.payment = Payment.get(payment.id);
////                            $scope.widget.product_id = $scope.product.id;
//
//
////                    $scope.procurator.$$hashkey = "object:5";
////                console.log('SPLIT', $scope.invoice.procurators);
//                    console.log(JSON.stringify(payment));
////                    $scope.procurator.update(procurator)
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        });
//                    new Payment({id:payment.id}).create();
////                    Payment.get({id:payment.id})
//
//                })
//
//            };
//
//                    $scope.destroyPayment = function(payment) {
//                        $scope.payment.delete(payment)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
        };

//        $scope.createAll = function() {
//
//            angular.forEach($scope.invoice.payments, function(payment) {
//                $scope.payment = payment;
//                $scope.payment = Payment.get(payment.id);
//
//
////                    $scope.procurator.$$hashkey = "object:5";
////                console.log('SPLIT', $scope.invoice.procurators);
//                console.log(JSON.stringify(payment));
////                    $scope.procurator.update(procurator)
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        });
//                new Payment({id:payment.id, note:payment.note, total:payment.total, invoice_id:payment.invoiceId, patient_id:payment.patientId}).create();
////                    Widget.get({id: 1})
//
//            })
//
//        };

        $scope.update = function (size, selectedPayment) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal2.html',
                controller: function ($scope, $modalInstance, payment) {
                    $scope.payment = payment;

                    $scope.payment.
                    console.log("call from modal", $scope.payment.invoice, $scope.payment);


                    $scope.ok = function () {
                        $modalInstance.close($scope.payment);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updatePayment = function(payment) {
                        $scope.payment.update(payment)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyPayment = function(payment) {
                        $scope.payment.delete(payment)
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
                    payment: function () {
                        return selectedPayment;
                    }
                }
            });

        };
        $scope.update2 = function (size, selectedInvoice) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal3.html',
                controller: function ($scope, $modalInstance, invoice) {
                    $scope.invoice = invoice;

                    $scope.invoice.payments = invoice.getPayments();
                    console.log("call from modal", $scope.invoice.payments, $scope.invoice);

                    $scope.addPayment = function() {
                        $scope.invoice.payments.push({qty:0, cost:0, description:""});
                    };

                    $scope.ok = function () {
                        $modalInstance.close($scope.invoice.payments);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.invoice_sub_total = function() {
                        var total = 0.00;
                        angular.forEach($scope.invoice.payments, function(payment, invoice){
                            $scope.payment = payment;
                            total += (payment.total);
                        });
                        return total
                        console.log(total);
                    };
                    $scope.grandTotal = function() {
                        return $scope.invoice.total - $scope.invoice_sub_total();
                        $scope.grandTotal = value;
                    };
                    $scope.createPayment = function() {
                        $scope.payment.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.createAll = function() {

                        angular.forEach($scope.invoice.payments, function(payment) {
                            $scope.payment = payment;
                            $scope.payment = Payment.get(payment.id);
//                            $scope.widget.product_id = $scope.product.id;


//                    $scope.procurator.$$hashkey = "object:5";
//                console.log('SPLIT', $scope.invoice.procurators);
                            console.log(JSON.stringify(payment));
//                    $scope.procurator.update(procurator)
//                        .then(function(response) {
//                            console.log("SUCCESS", response);
//                        })
//                        .catch(function(response) {
//                            console.log("FAILURE!", response);
//                        });
                            new Payment({id:payment.id}).create();
//                    Payment.get({id:payment.id})

                        })

                    };
//
//                    $scope.destroyPayment = function(payment) {
//                        $scope.payment.delete(payment)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
                },
                size: size,
                resolve: {
                    invoice: function () {
                        return selectedInvoice;
                    }
                }
            });

        };
        $scope.negativeValue=function(difference_total){
            var num = parseInt(difference_total);

            if(num > 0){
                var css = { 'color':'red' };
                return css;
            }
        };

        $scope.showInvoice = function (invoice, widget, procurators) {
            $scope.invoice = invoice;
            Invoice.get({id:$scope.invoice.id}).then(function(invoice, procurator, widget, product){

                $scope.invoice = invoice;
//                $scope.invoice.procurators = invoice.getProcurators();
                $scope.invoice.widgets = invoice.getWidgets();
                $scope.invoice.payments = invoice.getPayments();
                $scope.payments.test = [];

                $scope.addPayment1 = function(){
                    console.log("HERE", $scope.payments.test);
                    debugger;
                    $scope.payments.test.push({qty:0, cost:0, description:""});
                };
                $scope.removePayment1 = function(payment) {
                    $scope.payments.test.splice($scope.payments.test.indexOf(payment), 1);
                };
                console.log($scope.invoice.widgets);

            });
            $scope.isPopupVisible1 = true;


        };
        $scope.savePayment = function(invoice, payment) {
            angular.forEach($scope.payments.test, function(payment) {
                debugger;
                $scope.payment = payment;
                debugger;
                $scope.payment.invoice_id = $scope.invoice.id;
                new Payment({id:payment.id, invoice_id:$scope.invoice.id, total:payment.total, note:payment.note, date:payment.date, doctor_id:payment.doctor_id, patient_id:payment.patient_id}).create()
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console .log("FAILURE!", response);
                    });
                debugger;

            });
            $scope.invoice.price = $scope.payment_sub_total() + $scope.addpayment_total();
            console.log($scope.invoice.name);
            $scope.invoice.update(invoice)
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console .log("FAILURE!", response);
                });
        };
        $scope.ok1 = function (invoice, procurator, widget) {
            $scope.isPopupVisible = true;
            $scope.invoice = invoice;
            $scope.invoice = $scope.invoice1;
            console.log("Line 737", $scope.invoice1, $scope.invoice, $scope.invoice.widgets);

            $scope.invoice.procurators = invoice.getProcurators();
            $scope.invoice.widgets = invoice.getWidgets();
            console.log("Line 737", $scope.invoice1, $scope.invoice, $scope.invoice.widgets);

//                        $state.reload();
            console.log("TESTTESTTEST", $scope.patient, $scope.invoice);
            $scope.invoice_sub_total = function() {
                var total = 0.00;
//            console.log($scope.invoice.widgets)
                angular.forEach($scope.invoice.widgets, function(widget, payment, invoice, product, key){
//                %scope.widget.product.price = widget;
                    total += (widget.quantity * widget.product.price);
                });
                return total
                console.log(total);
            };
            $scope.calculateTax = function() {
                return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
            };
            $scope.invoiceTotal = function() {
                return $scope.calculateTax() + $scope.invoice_sub_total();
            };
            $scope.updateInvoice = function(invoice, widget) {
                $scope.invoice = invoice;
                debugger;

                $scope.removePayment = function(payment) {
                    $scope.invoice.payments.splice($scope.invoice.payments.indexOf(payment), 1);
                };
                $scope.isPopupVisible5 = true;
                angular.forEach($scope.invoice.widgets, function(widget) {
                    $scope.isPopUpVisible2 = true;
                    $scope.isPopupVisible6 = false;
                    $scope.widget = widget;
                    $scope.widget = Widget.get(widget.id);
                    $scope.widget.product_id = $scope.product.id;
                    $scope.widget.invoice_id = $scope.invoice.id;
                    $scope.widget.tax = $scope.invoice.tax;
//                $scope.widget.item = $scope.product.name;

//                    $scope.procurator.$$hashkey = "object:5";
//                console.log('SPLIT', $scope.invoice.procurators);
                    console.log(JSON.stringify(widget));
//                    $scope.procurator.update(procurator)
//                        .then(function(response) {
//                            console.log("SUCCESS", response);
//                        })
//                        .catch(function(response) {
//                            console.log("FAILURE!", response);
//                        });
                    new Widget({id:widget.id, invoice_id:$scope.invoice.id, product_id:widget.product.id, item:widget.product.name, price:widget.product.price, quantity:widget.quantity, tax:$scope.invoice.tax, total:(widget.product.price * widget.quantity)}).create();
                    debugger;

//                    Widget.get({id: 1})

                });
                $scope.invoice.total = $scope.invoiceTotal();
                $scope.invoice.payments = invoice.getPayments();
                $scope.here = function(){
                    console.log("HERE", $scope.invoice.payments)
                    $scope.invoice.payments.push({qty:0, cost:0, description:""});
                };
                console.log($scope.invoiceTotal(), $scope.invoice.total);
                $scope.invoice.update(invoice)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console .log("FAILURE!", response);
                        $scope.isPopupVisible7 = true;
                        $scope.isPopUpVisible2 = false;
                    });

                $scope.isPopUpVisible2 = true;

                $scope.createPayment = function(invoice, payment) {
                    angular.forEach($scope.invoice.payments, function(payment) {
                        debugger;
                        $scope.payment = payment;
                        debugger;
//                    $scope.payment = Payment.get(payment.id);
//                    debugger;
                        $scope.payment.invoice_id = $scope.invoice.id;


//
                        console.log($scope.invoice.id, JSON.stringify(payment));
//
                        new Payment({id:payment.id, invoice_id:$scope.invoice.id, paymentType_id:payment.paymentType.id, total:payment.total, note:payment.note, date:payment.date, doctor:payment.doctor_id}).create();

                    });
                };
            };
            $scope.showCreateInvoice = function() {
                $scope.isPopupVisible6 = true;
                console.log("HERE")
            };

        };
        $scope.addItem = function() {
            $scope.invoice.widgets.push({qty:0, cost:0, description:""});
        };

    }])



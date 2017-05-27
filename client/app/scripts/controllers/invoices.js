'use strict';


angular.module('clientApp')
    .controller('InvoicesController', ['$scope', '$resource', '$location', '$routeParams', '$state', 'Patient', 'Invoice', 'Product', 'Line', 'Procurator', 'Widget', 'Business', 'Payment_type', 'Payment', '$modal', function ($scope, $resource, $location, $routeParams, $state, Patient, Invoice, Product, Line, Procurator, Widget, Business, Payment_type, Payment, $modal) {

        $scope.patient = new Patient();

        Patient.query().then(function(patients) {
            $scope.patients = patients
            console.log($scope.patients);
        });

        $scope.payment = new Payment();

        Payment.query().then(function(payments) {
            $scope.payments = payments
        });

        $scope.product = new Product();

        $scope.line = new Line();

        $scope.procurator - new Procurator();

        $scope.widget = new Widget();

        $scope.invoice = new Invoice();

        $scope.business = new Business();

        $scope.payment_type = new Payment_type();

//        $scope.invoice = {
//            invoice: $scope.invoice[0]
//        };

        Invoice.query().then(function(invoices) {
            $scope.invoices = invoices
        });

        $scope.business = {
            business: $scope.business[0]
        };

        Business.query().then(function(businesses) {
            $scope.businesses = businesses
        });

        Payment_type.query().then(function(payment_types) {
            $scope.payment_types = payment_types
        });

        $scope.createLine = function() {
            $scope.line.create()
                .then(function(response) {
                    $scope.line = response;
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        angular.extend ($scope.invoice, {
            date: '',
            patient: '',
            doctor: '',
            appointment: '',
            item: '',
            price: Number(),
            quantity: Number(),
            tax: Number(),
            discount: Number(),
            total: $scope.invoice.total,
            note: '',
            product:'',
            concession_type: '',
            lines:''



        });

//        angular.extend ($scope.payment, {
//            date: "",
//            note: "",
//            total: Number(),
//            discount: '',
//            total: Number(),
//            patient_id: $scope.patient.id,
//            patient_name: $scope.patient.name,
////            doctor_id: $scope.doctor.id,
////            doctor_name: $scope.doctor.name,
//            invoice_id: $scope.invoice.id
////            paymentType_id: $scope.paymentType.id,
////            appointment_id: $scope.appointment.id,
//
//
//
//        });
        Line.query().then(function(lines){
            $scope.lines = lines;
        });

        Procurator.query().then(function(procurators){
            $scope.procurators = procurators;
        });



        Widget.query().then(function(widgets) {
            $scope.widgets = widgets;
        });
        angular.extend ($scope.widget, {
            invoiceId: '',
            invoice_id: Number,
            item: '',
            price: Number(),
            quantity: Number(),
            tax: Number(),
            discount: '',
            total: Number(),
            product_id: $scope.product.id,
            product_name: $scope.product.name
//            tax_id: $scope.tax.id,
//            tax_name: $scope.tax.name


        });

        $scope.change = function() {
            console.log($scope.product.name,
                $scope.product.price)
        };

        $scope.selectProduct = function(product) {
            Product.setSelectedProduct(product);
        };

        $scope.selectProduct = function() {
            $scope.selected = {
                product: $scope.product[0],
            };
            $scope.formData = {
                invoiceItem: $scope.selected.name,
                invoicePrice: $scope.selected.price}
        };
//
//
//
        $scope.createInvoice = function(invoice, procurator, widget, product) {
            $scope.invoice.create()
                .then(function(response) {
                    $scope.invoice = response;
                    invoice = response;
                    $scope.isPopupVisible = true;
                    $scope.invoice.procurators = invoice.getProcurators();
                    $scope.invoice.widgets = invoice.getWidgets();


                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });

        };


        $scope.createNewPayment = function(invoice, payment, widget){
            $scope.isPopUpVisible2 = true;

        };



        $scope.destroyInvoice = function() {
            $scope.expense.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
//        THIS ONE IS WITH PROCURATOR!!!
        $scope.showPopup = function (invoice, procurator, widget, product) {
            $scope.isPopupVisible = true;
            $scope.invoice = invoice;
            $scope.invoice.procurators = invoice.getProcurators();
            $scope.invoice.widgets = invoice.getWidgets();
//            debugger;

            console.log("call test modal", $scope.invoice);
            console.log(procurator);
            console.log(widget);
            console.log(product);
//            $scope.updateInvoice = function(widget, invoice) {
//
//                $scope.invoice.update(invoice)
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console .log("FAILURE!", response);
//                    });
//
            };
            $scope.updateAll = function(widget) {

                angular.forEach($scope.invoice.widgets, function(widget) {
                    $scope.widget = widget;
                    $scope.widget = Widget.get(widget.id);

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
                    new Widget({id:widget.id, product_id:widget.productId, invoice_id:widget.invoice_id, total:widget.total}).update();
//                    Widget.get({id: 1})

                })

            };
//            $scope.updateAll = function(procurator) {
//
//                angular.forEach($scope.invoice.procurators, function(procurator) {
//                    $scope.procurator = procurator;
//                    $scope.procurator = Procurator.get(procurator.id);
//
////                    $scope.procurator.$$hashkey = "object:5";
////                console.log('SPLIT', $scope.invoice.procurators);
//                 console.log(JSON.stringify(procurator));
////                    $scope.procurator.update(procurator)
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        });
//                    new Procurator({id:procurator.id, name:procurator.name}).update();
//
//                })
//
//            };
//            $scope.invoice_sub_total = function() {
//                var total = 0.00;
////            console.log($scope.invoice.widgets)
//                angular.forEach($scope.invoice.widgets, function(widget, invoice, product, key){
//                    $scope.widget.product = widget;
//                    total += (widget.quantity * widget.product.price);
//                });
//                console.log(total);
//
//                return total;
//            };
//
//            $scope.calculate_tax = function() {
//                return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
//            };
//            $scope.invoiceTotal = function() {
//                localStorage["invoice"] = JSON.stringify($scope.invoice);
//                var value = $scope.calculate_tax() + $scope.invoice_sub_total();
//                $scope.invoiceTotal = value;
////
//// invoice.total
//                return value;
//
//
//            };
//            $scope.updateInvoice = function() {
//                Invoice.get({id:invoice.id}).then(function (invoice) {
//                    invoice.update();
////                    new Invoice({id:invoice.id, total:invoice.total}).update();
//
//                });
//
//            };
//            $scope.updateInvoice = function(invoice) {
//                $scope.invoice - invoice;
//                $scope.invoice = Invoice.get(invoice.id);
//
//                $scope.calculate = function() {
//                    localStorage["invoice"] = JSON.stringify($scope.invoice);
//                    return $scope.calculate_tax() + $scope.invoice_sub_total();
//                };
//                $scope.invoice.total = invoice.calculate();
//
//                $scope.invoice.update(invoice)
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            };
        $scope.createAll = function() {

            angular.forEach($scope.invoice.widgets, function(widget) {
                $scope.widget = widget;
                $scope.widget = Widget.get(widget.id);
                $scope.widget.product_id = $scope.product.id;


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
                new Widget({id:widget.id, invoice_id:widget.invoice_id, product_id:widget.product.id, product_name:widget.product.name, price:widget.product.price, quantity:widget.quantity, total:widget.total}).create();
//                    Widget.get({id: 1})

            })

        };

//        $scope.test = function() {
//            Procurator.get({id: 1})
//        };
        $scope.test = function() {
            Widget.get({id: 1})
        };


//        $scope.updateAll = function(line) {
////
//            angular.forEach($scope.invoice.lines, function(line) {
//                $scope.line = line;
//                console.log('SPLIT', $scope.invoice.lines);
//                console.log(JSON.stringify($scope.line));
//                $scope.line.update()
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            })
//
//        };
//
//        $scope.showPopup = function (invoice, line) {
//            $scope.isPopupVisible = true;
//            $scope.invoice = invoice;
//            $scope.invoice.lines = invoice.getLines();
//            console.log("call test modal", $scope.invoice.lines, $scope.invoice);
//            console.log(line);

//            $scope.updateAll = function(invoice, line) {
////            THIS ONE CHAINS COMMANDS
//                $scope.invoice.update(invoice)
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//                angular.forEach($scope.invoice.lines, function(line) {
//                console.log('SPLIT', $scope.invoice.lines);
//                $scope.line.update(line)
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            })
//        };
//            THIS ONE JUST DOES UPDATE LINE

//            $scope.updateAll = function() {
////
////                angular.forEach($scope.invoice.lines, function() {
//                    $scope.line = new Line();
//                    console.log('SPLIT', $scope.invoice.lines);
//                    console.log($scope.line);
//                    $scope.createLine = function() {
//                        $scope.line.create()
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
////                })
//
//            };

//        };

//        $scope.updateAll = function(line) {
////
//            angular.forEach($scope.invoice.lines, function(line) {
//                $scope.line = line;
//                console.log('SPLIT', $scope.invoice.lines);
//                console.log(JSON.stringify($scope.line));
//                $scope.line.update()
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            })
//
//        };
//
//        $scope.updateLine = function(line) {
//            $scope.invoice.lines = $scope.line;
//            $scope.line.save(line)
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };

        $scope.showPopup2 = function () {
            $scope.isPopupVisible = true;
            $scope.invoice = new Invoice;
            $scope.invoice.lines = invoice;


        };

        $scope.showPopup4 = function() {
            $scope.isPopupVisible3 = true;
        };

        Product.query().then(function(products) {
            $scope.products = products;
        });

//        $scope.concession_type = new Concession_type();

//        Concession_type.query().then(function(concession_types){
//            $scope.concession_types = concession_types;
//        });



//
//        $scope.formData = {
//            newInvoiceDate: '',
//            newInvoicePatient: '',
//            newInvoiceDoctor: '',
//            newInvoiceAppointment: '',
//            newInvoiceItem: '',
//            newInvoicePrice: 0,
//            newInvoiceQuantity: 0,
//            newInvoiceTax: 0,
//            newInvoiceDiscount: 0,
//            newInvoiceTotal: 0,
//            newInvoiceNote: '',
//            newInvoiceName: '',
//            newInvoiceItemName: '',
//            newInvoiceProduct: '',
//            newInvoiceConcessionType: '',
//            newInvoiceLines: []
//        };

//
//        $scope.createLine = function() {
//            $scope.line.create()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };
//
//
        $scope.toggleChecked = function () {
            $scope.invoice.push($scope.line[0]);
        };
        $scope.logoRemoved = false;
        $scope.printMode = false;

//        var sample_invoice = {
//            tax: 13.00,
//            invoice_number: 10,
//            customer_info:  {name: "Mr. John Doe", web_link: "John Doe Designs Inc.", address1: "1 Infinite Loop", address2: "Cupertino, California, US", postal: "90210"},
//            company_info:  {name: "Metaware Labs", web_link: "www.metawarelabs.com", address1: "123 Yonge Street", address2: "Toronto, ON, Canada", postal: "M5S 1B6"},
//            items:[ {qty:10, description:'Gadget', cost:9.95}]};
//
//        if(localStorage["invoice"] == "" || localStorage["invoice"] == null){
//            $scope.invoice = sample_invoice;
//        }
//        else{
//            $scope.invoice =  JSON.parse(localStorage["invoice"]);
//        }

//        $scope.addItem = function() {
//            $scope.invoice.lines.push({qty:0, cost:0, description:""});
//        };
        $scope.addItem = function() {
            $scope.invoice.widgets.push({qty:0, cost:0, description:""});
        };
        $scope.removeLogo = function(element) {
            var elem = angular.element("#remove_logo");
            if(elem.text() == "Show Logo"){
                elem.text("Remove Logo");
                $scope.logoRemoved = false;
            }
            else{
                elem.text("Show Logo");
                $scope.logoRemoved = true;
            }

        };

        $scope.editLogo = function(){
            $("#imgInp").trigger("click");
        };

        $scope.showLogo = function() {
            $scope.logoRemoved = false;
        };
        $scope.removeItem = function(widget) {
            $scope.invoice.widgets.splice($scope.invoice.widgets.indexOf(widget), 1);
        };

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

        $scope.payment_sub_total = function() {
            var total = 0.00;
//            console.log($scope.invoice.widgets)
            angular.forEach($scope.invoice.payments, function(payment, invoice, product, key){
//                %scope.widget.product.price = widget;
                total += (payment.total * 1);
            });
            angular.forEach($scope.payments.test, function(payment, invoice, product, key){
//                %scope.widget.product.price = widget;
                total += (payment.total * 1);
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
        $scope.paymentTotal = function() {
            return $scope.invoice.total - $scope.payment_sub_total();
            $scope.paymentTotal = value;
        };


        $scope.printInfo = function() {
            window.print();
        };

        $scope.clearLocalStorage = function(){
            var confirmClear = confirm("Are you sure you would like to clear the invoice?");
            if(confirmClear){
                localStorage["invoice"] = "";
                $scope.invoice = sample_invoice;
            }
        };

        angular.module('jqanim', []).directive('jqAnimate', function(){
            return function(scope, instanceElement){
                setTimeout(function() {instanceElement.show('slow');}, 0);
            }
        });

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#company_logo').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        };

// window.onbeforeunload = function(e) {
//   confirm('Are you sure you would like to close this tab? All your data will be lost');
// };

        $(document).ready(function(){
            $("#invoice_number").focus();
            $("#imgInp").change(function(){
                readURL(this);
            });
        });
        $scope.createnew = function(size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, patient, Invoice, Product) {
//                    $scope.patient = patient;
//                    $scope.invoice.id = $scope.patient.id;

//                    console.log($scope.patient, patient, $scope.patient.firstName, $scope.patient.first_name);

                    $scope.invoice = new Invoice();

                    $scope.ok = function () {
                        $modalInstance.close($scope.patient);
                        console.log("SUCCESS", $scope.patient);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createInvoice = function(invoice) {
                        $scope.invoice.create(invoice)
                            .then(function(response) {

                                    $scope.invoice = response;
                                    console.log("FROM CREATE", $scope.invoice);
//                                    $scope.invoice = new Invoice;
//                                    $scope.invoice.procurators = invoice.getProcurators();
//                                    $scope.invoice.widgets = invoice.getWidgets();
////
//
//                                    console.log("call test modal", $scope.invoice);
//                                    console.log(procurator);
//                                    console.log(widget);
//                                    console.log(product);

                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });

                    };

                    $scope.destroyPatient = function(patient) {
                        $scope.patient.delete(patient)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };
                    $scope.ok = function (invoice) {
//                          $scope.invoice =  $scope.invoice.create(invoice)
//                                .then(function(response) {
//
//                                    $scope.invoice = invoice;
//                                    console.log($scope.invoice);
////                                    $scope.invoice = new Invoice;
////                                    $scope.invoice.procurators = invoice.getProcurators();
////                                    $scope.invoice.widgets = invoice.getWidgets();
//////
////
////                                    console.log("call test modal", $scope.invoice);
////                                    console.log(procurator);
////                                    console.log(widget);
////                                    console.log(product);
//
//                                    console.log("SUCCESS", response);
//                                })
//                                .catch(function(response) {
//                                    console.log("FAILURE!", response);
//                                });
//
//                        $scope.invoice = invoice;
//                        console.log($scope.invoice, invoice)

                        console.log("FROM OK", $scope.invoice);
                        Invoice.get({id:$scope.invoice.id}).then(function(invoice, procurator, widget, product){

                            $scope.invoice = invoice;
                            $scope.invoice.procurators = invoice.getProcurators();
                            $scope.invoice.widgets = invoice.getWidgets();


                            console.log("call test modal", $scope.invoice);
                            console.log("TEST @", invoice);
                            console.log(widget);
                            console.log(product);
                        });
                        $scope.invoice = invoice;
                        console.log("TEST 2", invoice, $scope.invoice);

                        $scope.isPopupVisible = true;

                        $modalInstance.close();
                    };
                },
                size: size,
                resolve: {
                    patient: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
            });
//            $scope.invoice = Invoice.get({id:1});
//            $scope.isPopupVisible = true;
//            $scope.invoice = new Invoice;
            console.log("FROM CLOSE", $scope.invoice);
            $scope.isPopupVisible = true;

//            Invoice.get({id:1}).then(function(invoice){
//                $scope.invoice = invoice;
//            });
        };

        $scope.new = function (patient) {
            $scope.isPopupVisible10 = true;
            $scope.patient = patient;
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
        };
        $scope.create = function (size, selectedPatient, Invoice, invoice) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',

                controller: function ($scope, $modalInstance, patient, Invoice, Product) {
                    $scope.patient = patient;
//                    $scope.invoice.id = $scope.patient.id;

                    console.log($scope.patient, patient, $scope.patient.firstName, $scope.patient.first_name);

                    $scope.invoice = new Invoice();
                    $scope.invoice.patient_id = $scope.patient.id;
                    $scope.invoice.total = "0";
                    $scope.ok = function () {
                        console.log($scope.invoice1);
                        $scope.invoice = $scope.invoice1;
                        debugger;
//                        $state.reload();
                        $modalInstance.close($scope.patient, $scope.invoice);
                        console.log("TESTTESTTEST", $scope.patient, $scope.invoice);
                        $scope.isPopupVisible = true;

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

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

                    $scope.destroyPatient = function(patient) {
                        $scope.patient.delete(patient)
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
//                        $scope.invoice = invoice;
                        return invoice;
                    },
                    patient: function () {
                        return selectedPatient;
                    },

                },
            });

            modalInstance.result.then(function (patient) {
                console.log(Invoice, invoice, $scope.invoice, $scope.invoice1);
                $scope.invoice = invoice;
                $scope.isPopupVisible = true;
                debugger;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                debugger;

            });
        };
        $scope.update = function (size, selectedInvoice) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, invoice) {
                    $scope.invoice = invoice;

                    $scope.ok = function () {
                        $modalInstance.close($scope.invoice);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.showCreateInvoice = function() {
                        $scope.isPopupVisible6 - true;
                    };

                    $scope.updateInvoice = function(widget, invoice) {
                        $scope.test=
                        angular.forEach($scope.invoice.widgets, function(widget) {
                            $scope.widget = widget;
                            $scope.widget = Widget.get(widget.id);

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
                            new Widget({id:widget.id, product_id:widget.productId, invoice_id:widget.invoice_id}).update();
//                    Widget.get({id: 1})

                        });
                        $scope.invoice.update(invoice)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyInvoice = function(invoice) {
                        $scope.invoice.delete(expense)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };
                    $scope.isPopupVisible = true;
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
        $scope.open = function (size, selectedInvoice) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal.html',
                controller: function ($scope, $modalInstance, invoice) {
                    $scope.invoice = invoice;
//
                    $scope.invoice.lines = invoice.getLines();
                    console.log("call from modal", $scope.invoice.lines, $scope.invoice);


                    console.log("anything2", $scope.invoice, $scope.invoice.lines)

                    $scope.ok = function () {
                        $modalInstance.close($scope.invoice);
                        console.log("am i here", $scope.invoice, $scope.invoice.lines);

                    };


                },
                size: size,
                resolve: {
                    invoice: function () {
                        return selectedInvoice;
                    }
                }
            });

        };

        $scope.test = function(invoice) {
            $scope.isPopUpVisible2 = true;

            $scope.invoice = invoice;

            $scope.invoice.payments = invoice.getPayments();
//            $scope.invoice.payments1 = invoice.getPayments();
            $scope.payments.test = [];

            console.log("AM I HERE Test", $scope.invoice.payments, $scope.payments)

            debugger;
            $scope.here = function(){
                console.log("HERE", $scope.invoice.payments);
                debugger;
                $scope.invoice.payments.push({qty:0, cost:0, description:""});
            };

            $scope.addPayment = function(){
                console.log("HERE", $scope.payments.test);
                debugger;
                $scope.payments.test.push({qty:0, cost:0, description:""});
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
                $scope.invoice.price = $scope.payment_sub_total();
                console.log($scope.invoice.name);
                $scope.invoice.update(invoice)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console .log("FAILURE!", response);
                    });
            };
            $scope.removePayment = function(payment) {
                $scope.invoice.payments.splice($scope.invoice.payments.indexOf(payment), 1);
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
//            $scope.invoice.payments = invoice.getPayments();

//            $scope.addPayment = function() {
//                $scope.invoice.payments.push({qty:0, cost:0, description:""});
//            };
            $scope.createPayment = function(invoice, payment) {
                angular.forEach($scope.payments, function(payment) {
                    debugger;
                    $scope.payment = payment;
                    debugger;
//                    $scope.payment = Payment.get(payment.id);
//                    debugger;
                    $scope.payment.invoice_id = $scope.invoice.id;


//
                    console.log($scope.invoice.id, JSON.stringify(payment));
//
//                    new Payment({id:payment.id, invoice_id:$scope.invoice.id, paymentType_id:payment.paymentType.id, total:payment.total, note:payment.note, date:payment.date, doctor:payment.doctor_id}).create()
                      new Payment({id:payment.id, invoice_id:$scope.invoice.id, total:payment.total, note:payment.note, date:payment.date, doctor:payment.doctor_id}).create()
                        .then(function(response) {
                            console.log("SUCCESS", response);
                        })
                        .catch(function(response) {
                            console .log("FAILURE!", response);
                        });
                    debugger;
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
            $scope.testPayment = function(invoice, payment) {
                angular.forEach($scope.invoice.payments, function(payment) {
                    debugger;
                    $scope.payment = payment;
                    debugger;
//                    $scope.payment = Payment.get(payment.id);
//                    debugger;
                    $scope.payment.invoice_id = $scope.invoice.id;


//
                    console.log($scope.invoice.id, JSON.stringify(payment));
//                    $scope.payment.update(invoice)
//                        .then(function(response) {
//                            console.log("SUCCESS", response);
//                        })
//                        .catch(function(response) {
//                            console .log("FAILURE!", response);
//                        });

                    new Payment({id:payment.id, invoice_id:$scope.invoice.id, total:payment.total, note:payment.note}).update()
                        .then(function(response) {
                            console.log("SUCCESS", response);
                        })
                        .catch(function(response) {
                            console .log("FAILURE!", response);
                        });
                    debugger;
                    new Payment({id:payment.id, invoice_id:$scope.invoice.id, total:payment.total, note:payment.note, date:payment.date, doctor_id:payment.doctor_id, patient_id:payment.patient_id}).create()
                        .then(function(response) {
                            console.log("SUCCESS", response);
                        })
                        .catch(function(response) {
                            console .log("FAILURE!", response);
                        });
                    debugger;

                });
                $scope.invoice.name = "test";
                $scope.invoice.price = $scope.payment_sub_total();
                console.log($scope.invoice.name);
                $scope.invoice.update(invoice)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console .log("FAILURE!", response);
                    });
            }

        };
        $scope.showCreateInvoice = function() {
            $scope.isPopupVisible6 = true;
            console.log("HERE")
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
                new Widget({id:widget.id, invoice_id:$scope.invoice.id, product_id:widget.product.id, item:widget.product.name, price:widget.product.price, quantity:widget.quantity, total:(widget.product.price * widget.quantity)}).create();
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
        $scope.addPayment = function() {
            $scope.invoice.payments.push({qty:0, cost:0, description:""});
            console.log("AM I HERE")

        };

    }])


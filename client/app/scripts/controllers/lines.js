'use strict';


angular.module('clientApp')
    .controller('LinesController', ['$scope', '$resource', '$location', '$routeParams', 'Line', 'Product', '$modal', function ($scope, $resource, $location, $routeParams, Line, Product, $modal) {

        $scope.line = new Line();

        $scope.product = new Product();

        Line.query().then(function(lines){
            $scope.lines = lines;
        });

        Product.query().then(function(products) {
            $scope.products = products;
        });

        angular.extend ($scope.line, {
            invoiceId: '',
            invoice_id: Number,
            item: '',
            price: Number(),
            quantity: Number(),
            tax: Number(),
            discount: '',
            total: Number(),
            product_id: $scope.product.id,
            product_name: $scope.product.name,

        });
        $scope.createLine = function() {
            console.log("Identifier", $scope.line, $scope.product.id, $scope.line.product.id);
//            $scope.line.product_id = $scope.product.id;
            $scope.line.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateLine = function() {
            $scope.line.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyLine = function() {
            $scope.line.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateAll = function() {
          angular.forEach(function(line) {
              console.log(line);
              $scope.line.save(line)
                  .then(function(response) {
                      console.log("SUCCESS", response);
                  })
                  .catch(function(response) {
                      console.log("FAILURE!", response);
                  });
                  })
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

        $scope.updateProduct = function() {
            $scope.product.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyProduct = function() {
            $scope.product.delete()
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
                controller: function ($scope, $modalInstance, Line) {
                    $scope.line = new Line();

                    $scope.ok = function () {
                        $modalInstance.close($scope.line);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createLine = function() {
                        $scope.line.create()
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
                    line: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedLine) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, line) {
                    $scope.line = line;

                    $scope.line.product = line.getProduct();
                    console.log("call from modal", $scope.line.product, $scope.line);

                    $scope.ok = function () {
                        $modalInstance.close($scope.line);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateLine = function() {
                        console.log(JSON.stringify($scope.line))
                        $scope.line.update()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyLine = function(line) {
                        $scope.line.delete(line)
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
                    line: function () {
                        return selectedLine;
                    }
                }
            });

        };
    }])



//'use strict';
//
//
//angular.module('clientApp')
//    .controller('InvoicesController', ['$scope', '$resource', '$location', '$routeParams', 'Invoice', 'Product', 'Line', 'Procurator', 'Widget', '$modal', function ($scope, $resource, $location, $routeParams, Invoice, Product, Line, Procurator, Widget, $modal) {
//
//
//        $scope.product = new Product();
//
//        $scope.line = new Line();
//
//        $scope.procurator - new Procurator();
//
//        $scope.widget = new Widget();
//
//        Line.query().then(function(lines){
//            $scope.lines = lines;
//        });
//
//        Procurator.query().then(function(procurators){
//            $scope.procurators = procurators;
//        });
//
//        Widget.query().then(function(widgets) {
//            $scope.widgets = widgets;
//        });
//        angular.extend ($scope.widget, {
//            invoiceId: '',
//            invoice_id: Number,
//            item: '',
//            price: Number(),
//            quantity: Number(),
//            tax: Number(),
//            discount: '',
//            total: Number(),
//            product_id: $scope.product.id,
//            product_name: $scope.product.name,
////            tax_id: $scope.tax.id,
////            tax_name: $scope.tax.name
//
//
//        });
////        THIS ONE IS WITH PROCURATOR!!!
//        $scope.showPopup = function (invoice, procurator, widget) {
//            $scope.isPopupVisible = true;
//            $scope.invoice = invoice;
//            $scope.invoice.procurators = invoice.getProcurators();
//            $scope.invoice.widgets = invoice.getWidgets();
//
//            console.log("call test modal", $scope.invoice);
//            console.log(procurator);
//            console.log(widget);
//            $scope.updateAll = function(widget) {
//
//                angular.forEach($scope.invoice.widgets, function(widget) {
//                    $scope.widget = widget;
//                    $scope.widget = Widget.get(widget.id);
//
////                    $scope.procurator.$$hashkey = "object:5";
////                console.log('SPLIT', $scope.invoice.procurators);
//                    console.log(JSON.stringify(widget));
////                    $scope.procurator.update(procurator)
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        });
//                    new Widget({id:widget.id, product_id:widget.productId}).update();
////                    Widget.get({id: 1})
//
//                })
//
//            };
////            $scope.updateAll = function(procurator) {
////
////                angular.forEach($scope.invoice.procurators, function(procurator) {
////                    $scope.procurator = procurator;
////                    $scope.procurator = Procurator.get(procurator.id);
////
//////                    $scope.procurator.$$hashkey = "object:5";
//////                console.log('SPLIT', $scope.invoice.procurators);
////                 console.log(JSON.stringify(procurator));
//////                    $scope.procurator.update(procurator)
//////                        .then(function(response) {
//////                            console.log("SUCCESS", response);
//////                        })
//////                        .catch(function(response) {
//////                            console.log("FAILURE!", response);
//////                        });
////                    new Procurator({id:procurator.id, name:procurator.name}).update();
////
////                })
////
////            };
//            $scope.invoice_sub_total = function() {
//                var total = 0.00;
////            console.log($scope.invoice.widgets)
//                angular.forEach($scope.invoice.widgets, function(widget, invoice, product, key){
//                    $scope.widget.product = widget;
//                    total += (widget.quantity * widget.product.price);
//                });
//                return total
//                console.log(total);
//            };
//            $scope.invoiceTotal = function() {
//                localStorage["invoice"] = JSON.stringify($scope.invoice);
//                return $scope.calculate_tax() + $scope.invoice_sub_total();
//            };
//            $scope.calculate_tax = function() {
//                return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
//            };
//        };
//        $scope.createAll = function() {
//
//            angular.forEach($scope.invoice.widgets, function(widget) {
//                $scope.widget = widget;
//                $scope.widget = Widget.get(widget.id);
//                $scope.widget.product_id = $scope.product.id;
//
//
////                    $scope.procurator.$$hashkey = "object:5";
////                console.log('SPLIT', $scope.invoice.procurators);
//                console.log(JSON.stringify(widget));
////                    $scope.procurator.update(procurator)
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        });
//                new Widget({id:widget.id, product_id:widget.product.id, product_name:widget.product.name, price:widget.product.price, quantity:widget.quantity, total:widget.total}).create();
////                    Widget.get({id: 1})
//
//            })
//
//        };
//
////        $scope.test = function() {
////            Procurator.get({id: 1})
////        };
//        $scope.test = function() {
//            Widget.get({id: 1})
//        };
//
////        $scope.updateAll = function(line) {
//////
////            angular.forEach($scope.invoice.lines, function(line) {
////                $scope.line = line;
////                console.log('SPLIT', $scope.invoice.lines);
////                console.log(JSON.stringify($scope.line));
////                $scope.line.update()
////                    .then(function(response) {
////                        console.log("SUCCESS", response);
////                    })
////                    .catch(function(response) {
////                        console.log("FAILURE!", response);
////                    });
////            })
////
////        };
//
////        $scope.showPopup = function (invoice, line) {
////            $scope.isPopupVisible = true;
////            $scope.invoice = invoice;
////            $scope.invoice.lines = invoice.getLines();
////            console.log("call test modal", $scope.invoice.lines, $scope.invoice);
////            console.log(line);
////
//////            $scope.updateAll = function(invoice, line) {
////////            THIS ONE CHAINS COMMANDS
//////                $scope.invoice.update(invoice)
//////                .then(function(response) {
//////                    console.log("SUCCESS", response);
//////                })
//////                .catch(function(response) {
//////                    console.log("FAILURE!", response);
//////                });
//////                angular.forEach($scope.invoice.lines, function(line) {
//////                console.log('SPLIT', $scope.invoice.lines);
//////                $scope.line.update(line)
//////                    .then(function(response) {
//////                        console.log("SUCCESS", response);
//////                    })
//////                    .catch(function(response) {
//////                        console.log("FAILURE!", response);
//////                    });
//////            })
//////        };
//////            THIS ONE JUST DOES UPDATE LINE
////
//////            $scope.updateAll = function() {
////////
////////                angular.forEach($scope.invoice.lines, function() {
//////                    $scope.line = new Line();
//////                    console.log('SPLIT', $scope.invoice.lines);
//////                    console.log($scope.line);
//////                    $scope.createLine = function() {
//////                        $scope.line.create()
//////                            .then(function(response) {
//////                                console.log("SUCCESS", response);
//////                            })
//////                            .catch(function(response) {
//////                                console.log("FAILURE!", response);
//////                            });
//////                    };
////////                })
//////
//////            };
////
////        };
////
////        $scope.updateAll = function(line) {
//////
////            angular.forEach($scope.invoice.lines, function(line) {
////                $scope.line = line;
////                console.log('SPLIT', $scope.invoice.lines);
////                console.log(JSON.stringify($scope.line));
////                $scope.line.update()
////                    .then(function(response) {
////                        console.log("SUCCESS", response);
////                    })
////                    .catch(function(response) {
////                        console.log("FAILURE!", response);
////                    });
////            })
////
////        };
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
//
//        $scope.showPopup2 = function () {
//            $scope.isPopupVisible = true;
//            $scope.invoice = new Invoice;
//            $scope.invoice.lines = invoice;
//
//
//        };
//
//        Product.query().then(function(products) {
//            $scope.products = products;
//        });
//
////        $scope.concession_type = new Concession_type();
//
////        Concession_type.query().then(function(concession_types){
////            $scope.concession_types = concession_types;
////        });
//
//
//        $scope.invoice = new Invoice();
//
//        $scope.invoice = {
//            invoice: $scope.invoice[0]
//        };
//
//        Invoice.query().then(function(invoices) {
//            $scope.invoices = invoices
//        });
//
//        angular.extend ($scope.invoice, {
//            date: '',
//            patient: '',
//            doctor: '',
//            appointment: '',
//            item: '',
//            price: Number(),
//            quantity: Number(),
//            tax: Number(),
//            discount: Number(),
//            total: $scope.invoice.total,
//            note: '',
//            product:'',
//            concession_type: '',
//            lines:'',
//
//
//
//        });
//
////        $scope.formData = {
////            newInvoiceDate: '',
////            newInvoicePatient: '',
////            newInvoiceDoctor: '',
////            newInvoiceAppointment: '',
////            newInvoiceItem: '',
////            newInvoicePrice: 0,
////            newInvoiceQuantity: 0,
////            newInvoiceTax: 0,
////            newInvoiceDiscount: 0,
////            newInvoiceTotal: 0,
////            newInvoiceNote: '',
////            newInvoiceName: '',
////            newInvoiceItemName: '',
////            newInvoiceProduct: '',
////            newInvoiceConcessionType: '',
////            newInvoiceLines: []
////        };
//        $scope.change = function() {
//            console.log($scope.product.name,
//                $scope.product.price)
//        };
//
//        $scope.selectProduct = function(product) {
//            Product.setSelectedProduct(product);
//        };
//
//        $scope.selectProduct = function() {
//            $scope.selected = {
//                product: $scope.product[0],
//            };
//            $scope.formData = {
//                invoiceItem: $scope.selected.name,
//                invoicePrice: $scope.selected.price}
//        };
//
//
//
//        $scope.createInvoice = function() {
//            $scope.invoice.create()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };
//
//        $scope.updateInvoice = function(invoice) {
//            $scope.calculate = function() {
//                localStorage["invoice"] = JSON.stringify($scope.invoice);
//                return $scope.calculate_tax() + $scope.invoice_sub_total();
//            };
//            $scope.invoice.total = invoice.calculate();
//
//            $scope.invoice.update(invoice)
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };
//
//        $scope.destroyInvoice = function() {
//            $scope.expense.delete()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
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
//        $scope.toggleChecked = function () {
//            $scope.invoice.push($scope.line[0]);
//        };
//        $scope.logoRemoved = false;
//        $scope.printMode = false;
//
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
//
////        $scope.addItem = function() {
////            $scope.invoice.lines.push({qty:0, cost:0, description:""});
////        };
//        $scope.addItem = function() {
//            $scope.invoice.widgets.push({qty:0, cost:0, description:""});
//        };
//        $scope.removeLogo = function(element) {
//            var elem = angular.element("#remove_logo");
//            if(elem.text() == "Show Logo"){
//                elem.text("Remove Logo");
//                $scope.logoRemoved = false;
//            }
//            else{
//                elem.text("Show Logo");
//                $scope.logoRemoved = true;
//            }
//
//        };
//
//        $scope.editLogo = function(){
//            $("#imgInp").trigger("click");
//        };
//
//        $scope.showLogo = function() {
//            $scope.logoRemoved = false;
//        };
//        $scope.removeItem = function(widget) {
//            $scope.invoice.widgets.splice($scope.invoice.widgets.indexOf(widget), 1);
//        };
//
////        $scope.invoice_sub_total = function() {
////            var total = 0.00;
//////            console.log($scope.invoice.widgets)
////            angular.forEach($scope.invoice.widgets, function(widget, invoice, product, key){
//////                %scope.widget.product.price = widget;
////                total += (widget.quantity * widget.product.price);
////            });
////            return total
////            console.log(total);
////        };
//
//
//
//        $scope.printInfo = function() {
//            window.print();
//        };
//
//        $scope.clearLocalStorage = function(){
//            var confirmClear = confirm("Are you sure you would like to clear the invoice?");
//            if(confirmClear){
//                localStorage["invoice"] = "";
//                $scope.invoice = sample_invoice;
//            }
//        };
//
//        angular.module('jqanim', []).directive('jqAnimate', function(){
//            return function(scope, instanceElement){
//                setTimeout(function() {instanceElement.show('slow');}, 0);
//            }
//        });
//
//        function readURL(input) {
//            if (input.files && input.files[0]) {
//                var reader = new FileReader();
//                reader.onload = function (e) {
//                    $('#company_logo').attr('src', e.target.result);
//                }
//                reader.readAsDataURL(input.files[0]);
//            }
//        };
//
//// window.onbeforeunload = function(e) {
////   confirm('Are you sure you would like to close this tab? All your data will be lost');
//// };
//
//        $(document).ready(function(){
//            $("#invoice_number").focus();
//            $("#imgInp").change(function(){
//                readURL(this);
//            });
//        });
//        $scope.create = function (size) {
//
//            var modalInstance = $modal.open({
//                templateUrl: 'createModal.html',
//                controller: function ($scope, $modalInstance, Invoice, Product, Concession_type) {
//                    $scope.invoice = new Invoice();
//
////                    $scope.concession_type = new Concession_type();
//
////                    Concession_type.query().then(function(concession_types){
////                        $scope.concession_types = concession_types;
////                    });
//
//                    $scope.product = new Product();
//
//                    Product.query().then(function(products){
//                        $scope.products = products;
//                    });
//
//                    $scope.ok = function () {
//                        $modalInstance.close($scope.invoice);
//                    };
//
//                    $scope.cancel = function () {
//                        $modalInstance.dismiss('cancel');
//                    };
//
//                    $scope.createInvoice = function() {
//                        $scope.invoice.create()
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
//
//
//                },
//                size: size,
//                resolve: {
//                    invoice: function () {
//                        return;
//                    }
//                }
//            });
//
//            modalInstance.result.then(function () {
//            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            });
//        };
//        $scope.update = function (size, selectedInvoice) {
//
//            var modalInstance = $modal.open({
//                templateUrl: 'updateModal.html',
//                controller: function ($scope, $modalInstance, invoice) {
//                    $scope.invoice = invoice;
//
//                    $scope.ok = function () {
//                        $modalInstance.close($scope.invoice);
//                    };
//
//                    $scope.cancel = function () {
//                        $modalInstance.dismiss('cancel');
//                    };
//
//                    $scope.updateInvoice = function(invoice) {
//                        $scope.invoice.update(invoice)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
//
//                    $scope.destroyInvoice = function(invoice) {
//                        $scope.invoice.delete(expense)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
//                },
//                size: size,
//                resolve: {
//                    invoice: function () {
//                        return selectedInvoice;
//                    }
//                }
//            });
//
//            modalInstance.result.then(function (selectedInvoice) {
//                $scope.selected = selectedInvoice;
//                $scope.invoice = selectedInvoice;
//            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            });
//        };
//        $scope.open = function (size, selectedInvoice) {
//
//            var modalInstance = $modal.open({
//                templateUrl: 'productsModal.html',
//                controller: function ($scope, $modalInstance, invoice) {
//                    $scope.invoice = invoice;
////
//                    $scope.invoice.lines = invoice.getLines();
//                    console.log("call from modal", $scope.invoice.lines, $scope.invoice);
//
//
//                    console.log("anything2", $scope.invoice, $scope.invoice.lines)
//
//                    $scope.ok = function () {
//                        $modalInstance.close($scope.invoice);
//                        console.log("am i here", $scope.invoice, $scope.invoice.lines);
//
//                    };
//
//
//                },
//                size: size,
//                resolve: {
//                    invoice: function () {
//                        return selectedInvoice;
//                    }
//                }
//            });
//
//        };
//
//    }])
//



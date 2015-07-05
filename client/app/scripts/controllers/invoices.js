'use strict';


angular.module('clientApp')
    .controller('InvoicesController', ['$scope', '$resource', '$location', '$routeParams', 'Invoice', 'Product', '$modal', function ($scope, $resource, $location, $routeParams, Invoice, Product, $modal) {
        $scope.product = new Product();

        Product.query().then(function(products) {
            $scope.products = products;
        });

        $scope.product = {
            product: $scope.product[0],
        };

        $scope.selected = {
            product: $scope.product[0]
        };

        $scope.invoice = new Invoice();

        $scope.invoice = {
            invoice: $scope.invoice[0]
        };

        Invoice.query().then(function(invoices) {
            $scope.invoices = invoices
        })
        Invoice.query().then(function(invoices){
            $scope.invoices = invoices;
        });
        $scope.formData = {
            invoiceDate: '',
            invoicePatient: '',
            invoiceDoctor: '',
            invoiceAppointment: '',
            invoiceItem: '',
            invoicePrice: '',
            invoiceQuantity: '',
            invoiceTax: '',
            invoiceDiscount: '',
            invoiceTotal: '',
            invoiceNote: '',
            invoiceName: '',
            invoiceItemName: ''
        };
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
            $scope.expense.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.toggleChecked = function () {
            $scope.invoice.push($scope.product[0]);
        };
        $scope.logoRemoved = false;
        $scope.printMode = false;

        var sample_invoice = {
            tax: 13.00,
            invoice_number: 10,
            customer_info:  {name: "Mr. John Doe", web_link: "John Doe Designs Inc.", address1: "1 Infinite Loop", address2: "Cupertino, California, US", postal: "90210"},
            company_info:  {name: "Metaware Labs", web_link: "www.metawarelabs.com", address1: "123 Yonge Street", address2: "Toronto, ON, Canada", postal: "M5S 1B6"},
            items:[ {qty:10, description:'Gadget', cost:9.95}]};

        if(localStorage["invoice"] == "" || localStorage["invoice"] == null){
            $scope.invoice = sample_invoice;
        }
        else{
            $scope.invoice =  JSON.parse(localStorage["invoice"]);
        }

        $scope.addItem = function() {
            $scope.invoice.items.push({qty:0, cost:0, description:""});
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
        $scope.removeItem = function(item) {
            $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
        };

        $scope.invoice_sub_total = function() {
            var total = 0.00;
            angular.forEach($scope.invoice.item, function(item, invoice, product, key){
                total += (item.qty * invoice.price);
            });
            return total;
        };
        $scope.calculate_tax = function() {
            return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
        };
        $scope.calculate_grand_total = function() {
            localStorage["invoice"] = JSON.stringify($scope.invoice);
            return $scope.calculate_tax() + $scope.invoice_sub_total();
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
        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Invoice, Product) {
                    $scope.invoice = new Invoice();

                    $scope.product = Product();

                    Product.query().then(function(products) {
                        $scope.products = products;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.invoice);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
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
                    $scope.change = function() {
                        console.log($scope.invoice.name,
                            $scope.invoice.price)
                    };

                    $scope.selectProduct = function() {
                        $scope.selected = {
                            product: $scope.product[0],
                        };
                        };
                },
                size: size,
                resolve: {
                    invoice: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
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

                    $scope.updateInvoice = function(invoice) {
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



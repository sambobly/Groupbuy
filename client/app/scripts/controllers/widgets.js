'use strict';


angular.module('clientApp')
    .controller('WidgetsController', ['$scope', '$resource', '$location', '$routeParams', 'Widget', 'Product', 'Tax', '$modal', function ($scope, $resource, $location, $routeParams, Widget, Product, Tax, $modal) {

        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.widget = new Widget();

        $scope.product = new Product();

        $scope.tax = new Tax();
        Product.query().then(function(products) {
            $scope.products = products;
        });

        Widget.query().then(function(widgets){
            $scope.widgets = widgets;
        });

        Tax.query().then(function(taxes){
            $scope.taxes = taxes;
        });

        $scope.getProductDetails = function (widget) {
            $scope.product = widget.getProduct();
            console.log("SUCCESS", $scope.product);

        };
        $scope.getTaxDetails = function (widget) {
            $scope.tax = widget.getTax();
            console.log("SUCCESS", $scope.tax);

        };
//        angular.extend ($scope.widget, {
//            invoiceId: '',
//            invoice_id: Number,
//            item: '',
//            price: Number(),
//            quantity: Number(),
//            tax: Number(),
//            discount: '',
//            total: Number(),
//            product_id: Number,
////            product: ''
//
//        });
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
            product_name: $scope.product.name,
            tax_id: $scope.tax.id,
            tax_name: $scope.tax.name


        });


//        $scope.createWidget = function() {
//            $scope.widget.create()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };

        // NOTE AS SOON AS YOU ADD PRODUCTS IN THE CONTROLLER IT BREAKS THE GET REQUEST!
        //     angular.extend ($scope.widget, {
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
//
//        });
        $scope.showPopup = function (widget, product) {
            $scope.isPopupVisible = true;
            $scope.widget = widget;
            $scope.products = widget.getProduct();
            $scope.product = product;
            console.log("call from modal", $scope.widget.products, $scope.widget, $scope.products);


        };

        $scope.createWidget = function() {
            console.log("Identifier", $scope.widget, $scope.product.id, $scope.widget.product.id);
            $scope.widget.product_id = $scope.product.id;
            $scope.widget.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateWidget = function() {
            $scope.widget.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyWidget = function() {
            $scope.widget.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.update = function (size, selectedWidget) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal2.html',
                controller: function ($scope, $modalInstance, widget) {

                    $scope.widget = widget;

                    $scope.widget.products = widget.getProduct();
                    $scope.product = product;
                    $scope.widget.tax = widget.getTax();
//                    $scope.widget.invoice = widget.getInvoice();

                    console.log("call from modal", $scope.widget.invoice, $scope.widget.tax, $scope.widget.product, $scope.widget);

                    $scope.ok = function () {
                        $modalInstance.close($scope.widget);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateWidget = function(widget) {
                        $scope.widget.update(widget)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyWidget = function(widget) {
                        $scope.widget.delete(widget)
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
                    widget: function () {
                        return selectedWidget;
                    }
                }
            });

        };
    }])



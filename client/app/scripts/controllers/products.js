'use strict';


angular.module('clientApp')
    .controller('ProductsController', ['$scope', '$resource', '$location', '$routeParams', 'Product', '$modal', function ($scope, $resource, $location, $routeParams, Product, $modal) {
        $scope.product = new Product();

        Product.query().then(function(products){
            $scope.products = products;
        });
//        $scope.formData = {
//            productName: '',
//            productPrice: ''
//        };

        angular.extend ($scope.product, {
            name: '',
            price: ''
        })
        $scope.createProduct = function() {
            $scope.product.create()
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
        $scope.updateProduct = function(product) {
            $scope.product.update(product)
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
                controller: function ($scope, $modalInstance, product) {
                    $scope.product = new Product();

                    $scope.ok = function () {
                        $modalInstance.close($scope.product);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createProduct = function() {
                        $scope.product.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible = true
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                                $scope.isPopupVisible5 = true;
                            });
                    };
                },
                    size: size,
                    resolve: {
                        product: function () {
                            return;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
       $scope.update = function (size, selectedProduct) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal.html',
                controller: function ($scope, $modalInstance, product) {
                    $scope.product = product;

                    $scope.ok = function () {
                        $modalInstance.close($scope.product);
                        console.log("SUCCESS", $scope.product);

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

                    $scope.updateProduct = function(product) {
                        $scope.product.update(product)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible = false;
                                $scope.isPopupVisible4 = true;

                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                                $scope.isPopupVisible5 = true;

                            });
                    };

                    $scope.destroyProduct = function(product) {
                        $scope.product.delete(product)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible2 = false;
                                $scope.isPopupVisible4 = true;

                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                                $scope.isPopupVisible5 = true;

                            });
                    };
                },
                size: size,
                resolve: {
                    product: function () {
                        return selectedProduct;
                    }
                }
            });

            modalInstance.result.then(function (selectedProduct) {
                $scope.selected = selectedProduct;
                $scope.product = selectedProduct;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
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
            $scope.invoice.items.push({qty:1, cost:1, description:"y"});
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
            angular.forEach($scope.invoice.items, function(item, key){
                total += (item.qty * item.cost);
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
    }])
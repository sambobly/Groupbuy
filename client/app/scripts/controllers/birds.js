'use strict';

angular.module('clientApp')
    .controller('BirdsController', ['$scope', '$resource', '$location', '$routeParams', '$timeout', 'Bird', 'Nest', 'Invoice', 'Doctor', 'Appointment', '$modal', 'Upload', function ($scope, $resource, $location, $routeParams, $timeout, Bird, Nest, Invoice, Doctor, Appointment, $modal, Upload) {
        $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
        $scope.slickConfig1Loaded = true;
        $scope.updateNumber1 = function () {
            $scope.slickConfig1Loaded = false;
            $scope.number1[2] = '123';
            $scope.number1.push(Math.floor((Math.random() * 10) + 100));
            $timeout(function () {
                $scope.slickConfig1Loaded = true;
            }, 5);
        };
        $scope.slickCurrentIndex = 0;
        $scope.slickConfig = {
            dots: true,
            autoplay: true,
            initialSlide: 3,
            infinite: true,
            autoplaySpeed: 1000,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    console.log('before change', Math.floor((Math.random() * 10) + 100));
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                    $scope.slickCurrentIndex = currentSlide;
                },
                breakpoint: function (event, slick, breakpoint) {
                    console.log('breakpoint');
                },
                destroy: function (event, slick) {
                    console.log('destroy');
                },
                edge: function (event, slick, direction) {
                    console.log('edge');
                },
                reInit: function (event, slick) {
                    console.log('re-init');
                },
                init: function (event, slick) {
                    console.log('init');
                },
                setPosition: function (evnet, slick) {
                    console.log('setPosition');
                },
                swipe: function (event, slick, direction) {
                    console.log('swipe');
                }
            }
        };

        //====================================
        // Slick 2
        //====================================
        $scope.number2 = [{label: 1, otherLabel: 1}, {label: 2, otherLabel: 2}, {label: 3, otherLabel: 3}, {
            label: 4,
            otherLabel: 4
        }, {label: 5, otherLabel: 5}, {label: 6, otherLabel: 6}, {label: 7, otherLabel: 7}, {label: 8, otherLabel: 8}];
        $scope.slickConfig2Loaded = true;
        $scope.updateNumber2 = function () {
            $scope.slickConfig2Loaded = false;
            $scope.number2[2] = 'ggg';
            $scope.number2.push(Math.floor((Math.random() * 10) + 100));
            $timeout(function () {
                $scope.slickConfig2Loaded = true;
            });
        };

        $scope.slickConfig2 = {
            autoplay: true,
            infinite: true,
            autoplaySpeed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
            method: {}
        };

        //====================================
        // Slick 3
        //====================================
        $scope.number3 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
        $scope.slickConfig3Loaded = true;
        $scope.slickConfig3 = {
            method: {},
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        //====================================
        // Slick 4
        //====================================
        $scope.number4 = [{label: 225}, {label: 125}, {label: 200}, {label: 175}, {label: 150}, {label: 180}, {label: 300}, {label: 400}];
        $scope.slickConfig4Loaded = true;
        $scope.updateNumber4 = function () {
            $scope.slickConfig4Loaded = false;
            $scope.number4[2].label = 123;
            $scope.number4.push({label: Math.floor((Math.random() * 10) + 100)});
            $timeout(function () {
                $scope.slickConfig4Loaded = true;
            });
        };
        $scope.slickConfig4 = {
            method: {},
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true
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
        $scope.bird = new Bird();

        $scope.nest = new Nest();

        $scope.invoice = new Invoice();

        $scope.doctor = new Doctor();

        $scope.appointment = new Appointment();

        Nest.query().then(function(nests) {
            $scope.nests = nests;
        });

        Bird.query().then(function(birds){
            $scope.birds = birds;
        });

        Doctor.query().then(function(doctors){
            $scope.doctors = doctors;
        });

        Appointment.query().then(function(appointments){
            $scope.appointments = appointments;
        });

        Invoice.query().then(function(invoices){
            $scope.invoices = invoices;
        });

        $scope.getNestDetails = function (bird) {
            $scope.nest = bird.getNest();
            console.log("SUCCESS", $scope.nest);

        };
        $scope.formData = {
            birdName: '',
            birdNest_Id: ''
        };
        $scope.formData = {
            invoicePatient_Id: ''
        };
        $scope.createBird = function() {
            $scope.bird.create()
                .then(function(response) {
                    $scope.bird = response;
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.createInvoice = function() {
            $scope.invoice.create()
                .then(function(response) {
                    $scope.invoice = response;
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.selectBird = function(bird) {
          $scope.bird = bird;
          console.log("bird", bird);
            // The location of Uluru
            var bird = bird;
            console.log('bird from map', bird, bird.latitude, bird.longitude);
            var uluru = {lat: parseFloat( bird.latitude ), lng: parseFloat( bird.longitude )};
          var locations = [
            ['Bondi Beach', -33.890542, 151.274856, 4],
            ['Coogee Beach', -33.923036, 151.259052, 5],
            ['Cronulla Beach', -34.028249, 151.157507, 3],
            ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
            ['Maroubra Beach', -33.950198, 151.259302, 1],
            ['uluru', {lat: parseFloat( bird.latitude ), lng: parseFloat( bird.longitude )}]
          ];
            // The map, centered at Uluru
            var map = new google.maps.Map(
              document.getElementById('map'), {zoom: 4, center: uluru});
            // The marker, positioned at Uluru
          var marker, i;

          for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }
        };
        $scope.updateBird = function() {
            $scope.bird.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyBird = function() {
            $scope.bird.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
      $scope.birdPhoto = function() {
        var photo = $scope.bird.photo;
        console.log(photo);
        var bird = $scope.bird;
        console.log($scope.bird.photo);
        $scope.upload = Upload.upload({
          url: '/api/birds/' + bird.id,
          method: 'PATCH',
          data: {name : $scope.bird.name, photo: $scope.bird.photo},
          photo: photo,
          fileFormDataName: 'bird[photo]',
          formDataAppender: function(fd, key, val) {
            if (angular.isArray(val)) {
              angular.forEach(val, function(v) {
                fd.append('bird['+key+']', v);
              });
            } else {
              fd.append('bird['+key+']', val);
            }
          }
        });
        debugger;
      }
        $scope.update = function (size, selectedBird) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal2.html',
                controller: function ($scope, $modalInstance, bird) {
                    $scope.bird = bird;

                    $scope.bird.nest = bird.getNest();
                    console.log("call from modal", $scope.bird.nest, $scope.nest, $scope.bird);

                    $scope.ok = function () {
                        $modalInstance.close($scope.bird);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateTax = function(bird) {
                        $scope.bird.update(bird)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyTax = function(bird) {
                        $scope.bird.delete(bird)
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
                    bird: function () {
                        return selectedBird;
                    }
                }
            });

        };

    }])



//angular.module('clientApp')
//    .controller('BirdsController', ['$scope', '$resource', '$location', '$routeParams', 'Bird', 'Nest', 'Invoice', 'Widget', 'Product', '$modal', function ($scope, $resource, $location, $routeParams, Bird, Nest, Invoice, Widget, Product, $modal) {
//
//        $scope.widget = new Widget();
//
//        $scope.invoice = new Invoice();
//
//        $scope.product = new Product();
//
//        Invoice.query().then(function(invoices) {
//            $scope.invoices = invoices
//        });
//
//        Widget.query().then(function(widgets) {
//            $scope.widgets = widgets
//        });
//        Product.query().then(function(products) {
//            $scope.products = products
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
//            lines:''
//
//
//
//        });
//
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
//            product_name: $scope.product.name
////            tax_id: $scope.tax.id,
////            tax_name: $scope.tax.name
//
//
//        });
//
//        $scope.createInvoice = function() {
//
//            $scope.invoice.create()
//                .then(function(response) {
//                    $scope.invoice = response;
//
//                    $scope.isPopupVisible = true;
//
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//
//        };
//
//
//
//
//
//
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
//
////        $scope.showPopup = function (invoice, widget, product) {
////            $scope.isPopupVisible = true;
////            $scope.invoice = invoice;
////            $scope.invoice.widgets = invoice.getWidgets();
////
////
////            console.log("call test modal", $scope.invoice);
////            console.log(widget);
//////            $scope.updateInvoice = function(widget, invoice) {
//////
//////                $scope.invoice.update(invoice)
//////                    .then(function(response) {
//////                        console.log("SUCCESS", response);
//////                    })
//////                    .catch(function(response) {
//////                        console .log("FAILURE!", response);
//////                    });
//////
////        };
//    }])



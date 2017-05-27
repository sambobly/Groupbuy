'use strict';


angular.module('clientApp')
    .controller('NestsController', ['$rootScope', '$scope', '$resource', '$location', '$routeParams', '$timeout', '$q', '$log', '$window', 'Nest', 'Egg', 'Merchandise', '$modal', function ($rootScope, $scope, $resource, $location, $routeParams, $timeout, $q, $log, $window, Nest, Egg, Merchandise, $modal) {

        $scope.nest = new Nest();

        Nest.query().then(function(nests){
            $scope.nests = nests;
        });
        console.log("anything", $scope.nests)


        $scope.egg = new Egg();

        Egg.query().then(function(eggs){
            $scope.eggs = eggs;
        });

        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });

        $scope.getNestDetails = function (egg) {
            $scope.nest = egg.getNest();
            console.log("nest success?", $scope.nest);

        };


        $scope.searchFilter = function (testText, testSelect, access, selectedItem, searchText, name, text) {
            $window.location.href = "/#/sticks";
            $scope.selectedItem = testSelect;
            $scope.searchText = testText;
            $scope.name = $scope.searchTextChange;
            $rootScope.filteredSearchMerchandises1 = [];
            debugger;
            angular.forEach($scope.merchandises, function(merchandise) {
//                $scope.merchandise = merchandise;
//                merchandise.title = name;
                var nameStringify = JSON.stringify(merchandise.title);
                debugger;
                if (nameStringify.search($scope.searchText) == 1) {
                    debugger;
                    return $rootScope.filteredSearchMerchandises1.push(merchandise);
                    debugger;

                }
                if (nameStringify.search($scope.selectedItem.title) == 1) {
                    debugger;
                    return $rootScope.filteredSearchMerchandises1.push(merchandise);
                    debugger;

                }
                $rootScope.filteredSearchMerchandises = $rootScope.filteredSearchMerchandises1;

            });
            console.log($rootScope.filteredSearchMerchandises1);
            $rootScope.filteredSearchMerchandises = $rootScope.filteredSearchmerchandises1;
            console.log("search merchandise from call", $rootScope.filteredSearchMerchandises);
            debugger;

        };
        $scope.$watch('filteredSearchMerchandises1', function (newVal, testSearch) {
            console.log($rootScope.filteredSearchMerchandises1, "filtered list watch");
//            $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
            $scope.filteredSearchMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {
                if ($rootScope.filteredSearchMerchandises1.length == 0) {
                    $rootScope.filteredSearchMerchandises = merchandises;
                    debugger;
                    console.log("All merchandise", $rootScope.filteredSearchMerchandises);
                    debugger;

                }
                else {
                    $rootScope.filteredSearchMerchandises = [];
                    $rootScope.filteredSearchMerchandises = $rootScope.filteredSearchMerchandises1;
                    console.log("filtered search merchandises", $rootScope.filteredSearchMerchandises)

                }
            })
        }, true);
//            debugger;
//            $scope.filteredMerchandisesSearchTest = Merchandise.query().then(function(merchandises, merchandise) {
//
//                if(testSearch.length == 0){
//                    $scope.filteredSearchMerchandises = merchandises;
//                    debugger;
//                    console.log("None selected", testId)
//                    debugger;
//                } else if (testSearch) {
//                    $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
//                    debugger;
//                }
//    //
//            }, true);
//                console.log("TestSearch", $scope.filteredSearchMerchandises, testId)
//        }, true);
        var usedKeys = {};
        var suggests;

        $scope.presEnter = function(e){
            debugger;
            var autoChild = document.getElementById('Auto').firstElementChild;
            var el = angular.element(autoChild);
            el.scope().$mdAutocompleteCtrl.hidden = true;
        };
        var self = this;

        $scope.searchText = null;
        $scope.querySearch = querySearch;
        $scope.selectedItem = null;

        $scope.selectedItemChange = selectedItemChange;
        $scope.searchTextChange = searchTextChange;
        $scope.selectedMerchandise = [];

        // is there any other way to trach changes?
        $scope.$watch('selectedMerchandise.length', function() {
            usedKeys = {};

            angular.forEach($scope.selectedMerchandise, function(item) {
                usedKeys[item.name] = true;
            });
        });

        function searchTextChange(text) {
            console.log('Text changed to ' + text);
            $scope.testText = text;
        };

        function selectedItemChange(item) {
            self.selectedItem = item;
            console.log('Item changed to ' + JSON.stringify(item));
            $scope.testSelect = item;
        };

        function fetchMerchandises(query) {
            var merchandises = loadMerchandises();
            var defer = $q.defer();

            $timeout(function() {
                suggests = merchandises;

                defer.resolve(merchandises);
            }, Math.random() * 1000, false);

            return defer.promise;
        }

        function querySearch(query, searchText) {
            var searchText = query;

            if (suggests) {
                var searchText = query;

                return suggests.filter(createFilterFor(query));

            } else {
                var searchText = query;


                // simulate async request
                return fetchMerchandises(query).then(function(suggests) {
                    return suggests.filter(createFilterFor(query));
                });
            }
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            $scope.lowercaseQuery = lowercaseQuery;
            return function filterFn(merchandise) {
                if (usedKeys[merchandise.name]) {
                    return false;
                }

                if (lowercaseQuery) {
                    return (merchandise._lowername.indexOf(lowercaseQuery) !== -1);
                }

                return true;
            };
        }

        function loadMerchandises(merchandise) {
            Merchandise.query().then(function(merchandises){
                $scope.merchandises = merchandises;
            });
            console.log($scope.merchandises);
            var merchandises = $scope.merchandises;
//            var veggies = [{
//                'name': 'Broccoli',
//                'type': 'Brassica'
//            }, {
//                'name': 'Cabbage',
//                'type': 'Brassica'
//            }, {
//                'name': 'Carrot',
//                'type': 'Umbelliferous'
//            }, {
//                'name': 'Lettuce',
//                'type': 'Composite'
//            }, {
//                'name': 'Spinach',
//                'type': 'Goosefoot'
//            }];

            return merchandises.map(function(merchandise) {
                merchandise._lowername = merchandise.title.toLowerCase();
                return merchandise;
            });
        }



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
        $scope.isPopupVisible = false;

        $scope.showPopup = function (nest, egg) {
            $scope.isPopupVisible = true;
            $scope.nest = nest;
            $scope.nest.eggs = nest.getEggs();
            $scope.egg = egg;
            console.log("call from modal", $scope.nest.eggs, $scope.nest, $scope.eggs);


        };

        $scope.showPopup2 = function() {
            $scope.isPopupVisible2 = true
            $scope.egg1 = new Egg();

//            $scope.createEgg1 = function(egg) {
//                new Egg({id:egg.id, nest:egg.nestId}).update() // would generate a PUT to /stores/123/items/1
//
//            };

        };

        $scope.createEgg1 = function() {
            $scope.egg1.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.showPopup3 = function (egg) {
            $scope.isPopupVisible3 = true;
            $scope.egg = egg;
//                    $scope.getEggDetails = function (nest) {
//                        $scope.nest.eggs = nest.getEggs();
//                        console.log("call from get egg details", $scope.nest.eggs);
//
//                    };
//                    $scope.nest.eggs = nest.getEggs();
//                    console.log("call from modal", $scope.nest.eggs, $scope.nest);

            // /                    nest.getEggs(function(Eggs){
//            console.log("anything")
//            $scope.eggs = eggs
//        });
//                    $scope.Eggs = function (nest) {
//                        $scope.Eggs = nest.getEgg();
//                    };
            console.log("anything2", $scope.egg)

            $scope.ok = function () {
                $modalInstance.close($scope.egg);
                console.log("am i here", $scope.egg);

            };



        };





        $scope.formData = {
            nestName: '',
        };

        $scope.getEggDetails = function (nest) {
            $scope.nest.eggs = nest.getEggs();
            console.log("SUCCESS", $scope.nest.eggs);

        };
        $scope.createNest = function() {
            $scope.nest.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateNest = function() {
            $scope.nest.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyNest = function() {
            $scope.nest.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.createEgg = function() {
            $scope.egg.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.updateEgg = function(egg) {
            $scope.egg.update(egg)
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyEgg = function(egg) {
            $scope.egg.delete(egg)
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.open = function (size, selectedNest) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal.html',
                controller: function ($scope, $modalInstance, nest) {
                    $scope.nest = nest;
//                    $scope.getEggDetails = function (nest) {
//                        $scope.nest.eggs = nest.getEggs();
//                        console.log("call from get egg details", $scope.nest.eggs);
//
//                    };
                    $scope.nest.eggs = nest.getEggs();
                    console.log("call from modal", $scope.nest.eggs, $scope.nest);

                    // /                    nest.getEggs(function(Eggs){
//            console.log("anything")
//            $scope.eggs = eggs
//        });
//                    $scope.Eggs = function (nest) {
//                        $scope.Eggs = nest.getEgg();
//                    };
                    console.log("anything2", $scope.nest, $scope.nest.eggs)

                    $scope.ok = function () {
                        $modalInstance.close($scope.nest);
                        console.log("am i here", $scope.nest, $scope.nest.eggs);

                    };


                },
                size: size,
                resolve: {
                    nest: function () {
                        return selectedNest;
                    }
                }
            });

        };

//        $scope.open2 = function (size, selectedEgg) {
//
//            var modalInstance = $modal.open({
//                templateUrl: 'productsModal2.html',
//                controller: function ($scope, $modalInstance, egg) {
//
//                    $scope.egg = egg;
////
//
//                    $scope.ok = function () {
//                        $modalInstance.close($scope.egg);
//                        console.log("am i here", $scope.egg);
//
//                    };
//
//
//                },
//                size: size,
//                resolve: {
//                    nest: function () {
//                        return selectedEgg;
//                    }
//                }
//            });
//
//        };

        $scope.open2 = function (size, selectedEgg) {

            var modalInstance = $modal.open({
                templateUrl: 'productsModal2.html',
                controller: function ($scope, $modalInstance, egg) {
                    $scope.egg1 = egg;
//                    $scope.getEggDetails = function (nest) {
//                        $scope.nest.eggs = nest.getEggs();
//                        console.log("call from get egg details", $scope.nest.eggs);
//
//                    };
//                    $scope.nest.eggs = nest.getEggs();
//                    console.log("call from modal", $scope.nest.eggs, $scope.nest);

                    // /                    nest.getEggs(function(Eggs){
//            console.log("anything")
//            $scope.eggs = eggs
//        });
//                    $scope.Eggs = function (nest) {
//                        $scope.Eggs = nest.getEgg();
//                    };
                    console.log("anything2", $scope.egg)

                    $scope.ok = function () {
                        $modalInstance.close($scope.egg);
                        console.log("am i here", $scope.egg);

                    };

                    $scope.updateEgg = function(egg) {
                        $scope.egg.update(egg)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyEgg = function(egg) {
                        $scope.egg.delete(egg)
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
                    egg: function () {
                        return selectedEgg;
                    }
                }
            });

        };

        $scope.display = function (size, selectedNest) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, nest) {
                    $scope.nest = nest;
//                    $scope.getEggDetails = function (nest) {
//                        $scope.nest.eggs = nest.getEggs();
//                        console.log("call from get egg details", $scope.nest.eggs);
//
//                    };
                    $scope.nest.eggs = nest.getEggs();
                    console.log("call from modal", $scope.nest.eggs, $scope.nest);

                    // /                    nest.getEggs(function(Eggs){
//            console.log("anything")
//            $scope.eggs = eggs
//        });
//                    $scope.Eggs = function (nest) {
//                        $scope.Eggs = nest.getEgg();
//                    };
                    console.log("anything2", $scope.nest, $scope.nest.eggs)

                    $scope.ok = function () {
                        $modalInstance.close($scope.nest);
                        console.log("am i here", $scope.nest, $scope.nest.eggs);

                    };


                },
                size: size,
                resolve: {
                    nest: function () {
                        return selectedNest;
                    }
                }
            });

        };

    }])



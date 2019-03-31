'use strict';


angular.module('clientApp')
    .controller('SearchMerchController', ['$scope', '$rootScope', '$resource', '$route', '$state', '$location', '$anchorScroll', '$window', '$routeParams', '$timeout', 'Stick', 'Doctor', 'Consumer', 'Merchandise', 'Bid', 'Ticket', 'Category' , 'Wish', '$modal', '$q', '$log', 'userService', 'Auth', 'ServiceMerchandises', function ($scope, $rootScope, $resource, $route, $state, $location, $anchorScroll, $window, $routeParams, $timeout, Stick, Doctor, Consumer, Merchandise, Bid, Ticket, Category, Wish, $modal, $q, $log, userService, Auth, ServiceMerchandises) {

        $scope.isPopUpVisible1 = true;

        $scope.stick = new Stick();


        Stick.query().then(function(sticks){
            $scope.sticks = sticks;
        });

        $scope.doctor = new Doctor();

        Doctor.query().then(function(doctors) {
            $scope.doctors = doctors;
        });

        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });

        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.pendingMerchandises = [];

            angular.forEach(merchandises, function() {
            });
            $scope.merchandises = merchandises;
            angular.forEach(merchandises, function(merchandise) {
                if (merchandise.complete != true) {
                    $scope.pendingMerchandises.push(merchandise);
                    debugger;
                }
                console.log("Call from merchandise.query", merchandise, $scope.pendingMerchandises);
            });
            $scope.filteredSearchMerchandises = $scope.pendingMerchandises;
            $scope.merchandises = $scope.pendingMerchandises;
        });
        $scope.bid = new Bid();

        Bid.query().then(function(bids){
            $scope.bids = bids;
        });
        $scope.ticket = new Ticket();

        Ticket.query().then(function(tickets){
            $scope.tickets = tickets;
            if (angular.isUndefined($rootScope.filter)) {
                $rootScope.filter = [];
                console.log("Filter undefined")
            }
            else {console.log("NOT NEEDED")};
        });

        $scope.wish = new Wish();

        Wish.query().then(function(wishes){
            $scope.wishes = wishes;
        });

        $scope.category = new Category();

        Category.query().then(function(categories) {
            $scope.categories = categories;
            if (angular.isUndefined($rootScope.categoryFilter)) {
                $rootScope.categoryFilter = [];
                console.log("IS THIS FIRED")
            }
            else {console.log("NOT NEEDED")};
//            $rootScope.categoryFilter = []
        });


        console.log($scope.filteredSearchMerchandises);


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
        $scope.payments_total = function () {
            var total = 0.00
            angular.forEach($scope.merchandise.bids, function(bid) {
                total += (bid.value * 1);
            });
            total += $scope.bid.value;
            return total
        };
        $scope.filterAfterFilterIds = [];
        $scope.testId = testId;
//        $rootScope.categoryFilter = function() {
//            if ($scope.filterAfterFilterIds) {
//              $rootScope.categoryFilter = $scope.filterAfterFilterIds;
//              debugger;
//          }
//          else {
//              $rootScope.categoryFilter = []
//              debugger;
//          }
//        }
//      $scope.categoryFilter = function() {
//          if (callback) {
//              $rootScope.categoryFilter = $scope.filterAfterFilterIds;
//              debugger;
//          }
//          else {
//              $rootScope.categoryFilter = []
//              debugger;
//          }
//      };
//        $rootScope.categoryFilter = [];
//        $scope.testCategoryFilter = function() {
//            if (callback) {
//                $rootScope.categoryFilter = $scope.filterAfterFilterId;
//                console.log($rootScope.categoryFilter, "FOUND CALLBACK")
//                debugger;
//            }
//            else {
//                $rootScope.categoryFilter = [];
//                console.log($rootScope.categoryFilter, "NO CALLBACK FOUND")
//
//            }
//        };

//        *NOTE NEED TO FIX THIS ON PAGE LOAD NOT RESET $rootScope.categoryFilter*
        $scope.searchFilter = function (testText, testSelect, callback, filter, selectedItem, searchText, name, text, input) {
            debugger;
            $window.location.href = "/#/sticks";
            $state.reload();
            $rootScope.filter = filter;
            $scope.filter = $rootScope.filter;
            console.log($rootScope.filter, "filter");
            debugger;
            if (callback) {
                $scope.filterAfterFilterIds = [];
                $scope.selectedCategory = callback;
                $scope.selectedCategory.id = callback.id;
//            $scope.category = category;
//            $scope.categoryId = categoryId.id;
                debugger;
                $scope.filterAfterFilterIds.push(callback.id);

                $rootScope.categoryFilter = $scope.filterAfterFilterIds
            } else {
                console.log("IM HERE SHOWING YOU CALLBACK IS NOT WORKING");
                $rootScope.categoryFilter = [];
            }
            $scope.selectedItem = testSelect;
            $scope.searchText = testText;
            $scope.name = $scope.searchTextChange;
            $scope.returnArray = [];
            $scope.searchTextSplit = testText.toLowerCase().split(' ');
            debugger;
            for(var x = 0; x < $scope.searchText.length; x++){
                var count = 0;
                for(var y = 0; y < $scope.searchTextSplit.length; y++){
                    if(testText[x].toLowerCase().indexOf($scope.searchTextSplit[y]) !== -1){
                        count++;
                        debugger;
                    }
                }
                if(count == $scope.searchTextSplit.length){
                    $scope.returnArray.push(testText[x]);
                    debugger;
                }
            }
            console.log($scope.returnArray, "returnArray");
            debugger;
            $scope.isPopup3Visible = false;
            $scope.isPopUpVisible1 = true;
            $rootScope.filteredSearchMerchandises1 = [];
            debugger;
            angular.forEach($scope.merchandises, function(merchandise) {
//                $scope.merchandise = merchandise;
//                merchandise.title = name;
                var nameStringify = JSON.stringify(merchandise.title).toLowerCase();
                debugger;
                if ($scope.selectedItem) {
                    $scope.searchText = $scope.selectedItem.title;
                    debugger;
                }
                angular.forEach($scope.searchTextSplit, function (value, key) {
                    if (nameStringify.indexOf(value) !== -1 && $rootScope.filteredSearchMerchandises1.indexOf(merchandise) == -1 && merchandise.complete != true) {
//                    (nameStringify.indexOf($scope.searchText) !== -1)
                        debugger;

                        return $rootScope.filteredSearchMerchandises1.push(merchandise);

                    }
//                if (nameStringify.search($scope.selectedItem.title) == 1) {
//                    debugger;
//                    return $rootScope.filteredSearchMerchandises1.push(merchandise);
//
//                }
                    $rootScope.filteredSearchMerchandises = $rootScope.filteredSearchMerchandises1;
                })


            });
            console.log($rootScope.filteredSearchMerchandises1);
            $rootScope.filteredSearchMerchandises = $rootScope.filteredSearchmerchandises1;
            console.log("search merchandise from call", $rootScope.filteredSearchMerchandises, $scope.searchText);
            debugger;

        };
//        *THIS ONE DOES ROOTSCOPE*
        $scope.$watch('filteredSearchMerchandises1', function (newVal, testSearch) {
            console.log($rootScope.filteredSearchMerchandises1, "filtered list watch");
//            $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
            $scope.filteredSearchMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {
                if ($rootScope.filteredSearchMerchandises1.length == 0) {
                    $rootScope.filteredSearchMerchandises = $scope.pendingMerchandises;
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

//        *THIS ONE DOES NORMAL SCOPE*
        $scope.$watch('filteredSearchMerchandises1', function (newVal, testSearch) {
            console.log($scope.filteredSearchMerchandises1, "filtered list watch");
//            $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
            $scope.filteredSearchMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {
                if ($scope.filteredSearchMerchandises1.length == 0) {
                    $scope.filteredSearchMerchandises = $scope.pendingMerchandises;
                    debugger;
                    console.log("All merchandise", $scope.filteredSearchMerchandises);
                    debugger;

                }
                else {
                    $scope.filteredSearchMerchandises = [];
                    $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
                    console.log("filtered search merchandises", $scope.filteredSearchMerchandises)

                }
            })
        }, true);

        $scope.categoryId = null;
        $scope.testfilter7 = function(callback, category) {
            $state.reload();
            $window.location.href = "/#/sticks";
            $scope.category = callback;
//            $scope.categoryId = categoryId.id;
            debugger;
            $scope.filterAfterFilterIds = [];
            $scope.filterAfterFilterIds.push(callback.id);
            debugger;
            $rootScope.categoryFilter = $scope.filterAfterFilterIds;
            $rootScope.filteredSearchMerchandises1 = [];
            callback = null;
            debugger;
        };

        $scope.testfilter4 = function(callback, category, categoryId, selectedCategory) {
            $scope.filterAfterFilterIds = [];
            $scope.selectedCategory = callback;
            $scope.selectedCategory.id = callback.id;
//            $scope.category = category;
//            $scope.categoryId = categoryId.id;
            debugger;
            $scope.filterAfterFilterIds.push(callback.id);

            $rootScope.categoryFilter = $scope.filterAfterFilterIds
            debugger;
        };
        $scope.testfilter5 = function (callback, categories) {
            debugger;
            $scope.selection = [];
            var idx = $scope.selection.true;
            $scope.useFilterIds = {};
            var uniqueItems = function (data, key) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var value = data[i][key];
                    if (result.indexOf(value) == -1) {
                        result.push(value);
                    }

                }
                return result;
            };
            $scope.$watch(function () {
                return {
                    useFilterIds: $scope.useFilterIds
                }}, function (value) {
                debugger;
                $scope.filterIdsGroup = uniqueItems(callback, 'filterId');
                var selected;
                debugger;
                selected = false;
                var p = callback.id;
//

                console.log($scope.filterAfterFilterIds);
                debugger;

                if ($scope.filterAfterFilterIds.length == 0) {
                    $scope.filterAfterFilterIds.push(p);
                    console.log("This being fired?");
                    debugger;
                }else{
                    for (var i = 0; i < $scope.filterAfterFilterIds.length; i++) {
                        debugger;
                        if ($scope.filterAfterFilterIds.indexOf(p) === -1) {
                            return  $scope.filterAfterFilterIds.push(p);
                            console.log('New veggies collection is : ' + p);
                        } else if ($scope.filterAfterFilterIds.indexOf(p)  > -1) {
                            $scope.filterAfterFilterIds.splice($scope.filterAfterFilterIds.indexOf(p), 1);
                            debugger
                            console.log(p + ' already exists in the veggies collection.');
                        }
//
                    }
                };

                $rootScope.categoryFilter = $scope.filterAfterFilterIds;

                debugger;
//
                console.log($rootScope.categoryFilter, $scope.filterAfterFilterIds);
//
                debugger;
//
            }, true)
            $scope.$watch('filtered', function (newValue) {
                    if (angular.isArray(newValue)) {
                        console.log(newValue.length);
                    }
                },
                true);
        };
        var testId = null;
        var filterValue = null;
//        $scope.$watch('categoryFilter', function (newVal) {
//            testId = $scope.categoryFilter;
//            $scope.filteredMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {
//                if(testId){
//                    $scope.filteredMerchandises = [];
//                    debugger;
//                    for (var i = 0; i < testId.length; i++) {
//                        angular.forEach($scope.merchandises, function(merchandise) {
//                            $scope.merchandise = merchandise;
//                            debugger;
//                            if (testId[i] == merchandise.categoryId) {
//                                return $scope.filteredMerchandises.push(merchandise);
//                                debugger;
//
//                            }
//                        });
//                        debugger;
//                    };
//                }else if(testId == null){
//                    $scope.filteredMerchandises = merchandises;
//                    debugger;
//                    console.log("None selected", testId)
//                    debugger;
//                }
//                console.log("Test", $scope.filteredMerchandises, testId)
//            });
//            debugger;
//            console.log("doctor filter", $scope.filteredMerchandises, testId);
////
//        }, true);
//        $scope.$watch('categoryFilter' , function (newVal) {

        $scope.$watchGroup(['filteredSearchMerchandises1', 'categoryFilter'] , function (filter, newValues, oldValues) {
//            *NOTE THAT NEED TO USE THE ABOVE SINGLE WATCH TO ENABLE CLICK AND UNCLICK FUNCTION, NOT SURE WHY!!*
            filterValue = $rootScope.filter;
            testId = $rootScope.categoryFilter;
            debugger;
            $scope.filteredMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {

                if(testId.length == 0){
                    $rootScope.filteredMerchandises = $scope.filteredSearchMerchandises;
                    debugger;
                    console.log("None selected", testId)
                    debugger;
                }
                else if(testId){
                    $rootScope.filteredMerchandises = [];
                    debugger;
                    for (var i = 0; i < testId.length; i++) {
                        angular.forEach($scope.filteredSearchMerchandises, function(merchandise) {
                            $scope.merchandise = merchandise;
                            debugger;
                            if (testId[i] == merchandise.categoryId) {
                                return $rootScope.filteredMerchandises.push(merchandise);
                                debugger;

                            }
                        });
                        debugger;
                    };
                }else{
                    $rootScope.filteredMerchandises = $scope.filteredSearchMerchandises;
                    console.log("did this fix it?")
                }
                console.log("Test", $rootScope.filteredMerchandises, testId, filterValue)
                $scope.makeTodos();

            });
            debugger;
            console.log("doctor filter", $scope.filteredMerchandises, testId);
//
        }, true);
        $scope.$watchGroup(['categoryFilter', 'filter'], function() {
//            console.log($rootScope.filter, $rootScope.categoryFilter, "Group watch for min-max");
            filterValue = $rootScope.filter;

            $scope.minMaxFilter = Merchandise.query().then(function(){
                if(filterValue.maxValue > 0) {
                    debugger;
                    $rootScope.filteredValueMerchandises = [];
                    angular.forEach($rootScope.filteredMerchandises, function(merchandise){
                        $scope.merchandise = merchandise;
                        if (merchandise.value >= filterValue.minValue && merchandise.value <= filterValue.maxValue ) {
                            console.log($rootScope.filteredValueMerchandises, "Filtered by value")

                            return $rootScope.filteredValueMerchandises.push(merchandise);

                            debugger;
                        }
                    })
                } else{
                    $rootScope.filteredValueMerchandises = $rootScope.filteredMerchandises
                    console.log($rootScope.filteredValueMerchandises, "No min-max selected")
                }
                console.log($rootScope.filter, $rootScope.categoryFilter, $rootScope.filteredMerchandises, "Group watch for min-max");
                $scope.makeTodos();
            })
        });
        $scope.testOpen = function (merchandise) {
            $window.scrollTo(0, angular.element('aa-catg-head-banner').offsetTop);

            // call $anchorScroll()
            $scope.merchandise = merchandise;

            $scope.isPopup3Visible = true;
            $scope.isPopUpVisible1 = false;

        }
        $scope.open1 = function(merchandise) {
            $scope.isPopup8Visible = true;
            $scope.isPopUpVisible1 = false;
            $scope.merchandise = merchandise;
            $scope.ctrlFlavor = merchandise.id;
            $anchorScroll(0, 0);

            debugger;


        };
        $scope.login = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'loginModal.html',
                controller: function ($scope, $modalInstance) {
                    $scope.test = function() {
                        console.log("logged in")
                    }

                },
                size: size,
                resolve: {
                    widget: function () {
                        return ;
                    }
                }
            });

        };
        $scope.filter = [];
        $scope.filteredTodos = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 9
            ,$scope.maxSize = 5;

        $scope.makeTodos = function() {
//            $scope.todos = $rootScope.filteredMerchandises;
            $scope.todos = $rootScope.filteredValueMerchandises;
            $scope.testFollow = [];
            console.log("makeTodos")
//            ServiceMerchandises = [];
//            $scope.ServiceMerchandises = ServiceMerchandises;
//
//            console.log("test: ", ServiceMerchandises, $scope.ServiceMerchandises.array);
//            debugger;
//            angular.forEach($scope.todos, function(value, key) {
//                $scope.ServiceMerchandises.push(value);
//                console.log("Added", ServiceMerchandises)
//            })
//            $scope.ServiceTests.push($scope.todos);
//            console.log("Added", ServiceTests)
//            debugger;

        };
        $scope.$watch('currentPage + numPerPage + testFollow', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
            $scope.filteredTodos = $scope.todos.slice(begin, end);
            console.log("Filtered Todos", $scope.filteredTodos)
            debugger;
        });
        $scope.testPriceFilter = function(){
            console.log($scope.filter.minValue, $scope.filter.maxValue);
            debugger;
            angular.forEach($scope.todos, function(value,key){
                console.log($scope.merchandise, value)
                if (value.value >= $scope.filter.minValue && value.value <= $scope.filter.maxValue ) {
                    debugger;
                    console.log(value, "Filtered by value")
                }
            })
        }

    }])



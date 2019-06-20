'use strict';


angular.module('clientApp')
    .controller('SticksController', ['$scope', '$rootScope', '$resource', '$route', '$state', '$location', '$anchorScroll', '$window', '$routeParams', '$timeout', 'Stick', 'Doctor', 'Consumer', 'Merchandise', 'Bid', 'Ticket', 'Category' , 'Wish', '$modal', '$q', '$log', 'userService', 'Auth', 'ServiceMerchandises', function ($scope, $rootScope, $resource, $route, $state, $location, $anchorScroll, $window, $routeParams, $timeout, Stick, Doctor, Consumer, Merchandise, Bid, Ticket, Category, Wish, $modal, $q, $log, userService, Auth, ServiceMerchandises) {
        $scope.myDefaultImage = 'images/polo-shirt-1.png';
        $scope.realImage = 'http://itsolutionstuff.com/upload/Laravel-mailchimp.png';
        $scope.noImage = 'http://itsolutionstuff.com/upload/no-image-available.png';

        $scope.isPopUpVisible1 = true;

        $scope.stick = new Stick();

        $scope.isPopupvisible70 = false;

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

        $scope.wonMerchandise = [];

        Merchandise.query().then(function(merchandises){
            $scope.pendingMerchandises = [];

            angular.forEach(merchandises, function() {
            });
            $scope.merchandises = merchandises;
            angular.forEach(merchandises, function(merchandise) {
                if (merchandise.complete != true) {
                    $scope.pendingMerchandises.push(merchandise);
                    debugger;
                } else {
                   $scope.wonMerchandise.push(merchandise);
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
            $scope.isPopupvisible70 = false;
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
                var nameStringify = JSON.stringify(merchandise.title);
                debugger;
                if ($scope.selectedItem) {
                    $scope.searchText = $scope.selectedItem.title;
                    debugger;
                }
                angular.forEach($scope.searchTextSplit, function (value, key) {
                    if (nameStringify.indexOf(value) !== -1 && $rootScope.filteredSearchMerchandises1.indexOf(merchandise) == -1) {
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
        $scope.$watch('filteredSearchMerchandises1', function (newVal, testSearch, size) {
            console.log($rootScope.filteredSearchMerchandises1, "filtered list watch");
//            $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;

            $scope.filteredSearchMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {
                if ($rootScope.filteredSearchMerchandises1.length == 0) {
                    $rootScope.filteredSearchMerchandises = $scope.pendingMerchandises;
                    debugger;
                    console.log("All merchandise", $scope.noResults, $rootScope.filteredSearchMerchandises);
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
        $scope.$watch('filteredSearchMerchandises1', function (newVal, testSearch, size) {
            console.log($scope.filteredSearchMerchandises1, "filtered list watch");
//            $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
            $scope.noResults = [];
            $scope.filteredSearchMerchandisesTest = Merchandise.query().then(function(merchandises, merchandise) {
                if ($scope.filteredSearchMerchandises1.length == 0) {
                    $scope.isPopupvisible70 = true;

                    $scope.filteredSearchMerchandises = $scope.pendingMerchandises;
                    debugger;
                    console.log("All merchandise", $scope.filteredSearchMerchandises);
                    debugger;

                }
                else {
                    $scope.isPopupvisible70 = false;
                    $scope.filteredSearchMerchandises = [];
                    $scope.filteredSearchMerchandises = $scope.filteredSearchMerchandises1;
                    console.log("filtered search merchandises", $scope.filteredSearchMerchandises)

                }
            })
//                .then(function() {
//                    if($scope.noResults == 1) {
//                        debugger;
//                        var modalInstance = $modal.open({
//                            templateUrl: 'noResultsModal.html',
//                            controller: function ($scope, $modalInstance) {
//                                $scope.test = function() {
//                                    console.log("logged in")
//                                }
//
//                            },
//                            size: size,
//                            resolve: {
//                                widget: function () {
//                                    return ;
//                                }
//                            }
//                        })} else {
//                        console.log("have results in filter")
//
//                    }
//                });
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
                    $scope.isPopupvisible70 = false;
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
//        $scope.open = function (merchandise, category, bid, ticket, wish) {
////            $window.scrollTo(0, angular.element('aa-catg-head-banner').offsetTop);
//
//
//            $scope.merchandise = merchandise;
//            debugger;
//            $scope.reset = true;
//            $scope.merchandise.bids = merchandise.getBids();
//            console.log($scope.merchandise.bids);
//            $scope.bid = bid;
//            $scope.wish = wish;
//            $scope.merchandise.tickets = merchandise.getTickets();
//            $scope.createBid = function() {
//                $scope.bid = new Bid;
//                console.log($scope.bid)
//                $scope.bid.merchandiseId = merchandise.id;
//                $scope.bid.consumerId = $scope.new.bidConsumerId;
//                $scope.bid.value = $scope.new.bidValue;
//                $scope.bid.comment = $scope.new.bidComment;
//                debugger;
//                $scope.bid.create()
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//                $scope.merchandise.bids.push($scope.bid);
//                debugger;
////                $scope.reset = false;
////                $timeout(function(){$scope.reset=true;},500);
//            };
//            $scope.addToWishlist = function() {
//                $scope.wish = new Wish;
//                debugger;z
//                $scope.wish.merchandiseId = merchandise.id;
//                console.log("wish create fired");
//                $scope.wish.create()
//                    .then(function(response) {
//                        console.log("SUCCESS", response);
//                    })
//                    .catch(function(response) {
//                        console.log("FAILURE!", response);
//                    });
//            };
//            $scope.updateMerchandise = function (category){
//                Category.get({id:merchandise.categoryId}).then(function(category){
//                    $scope.category = category;
//                    $scope.merchandise.categoryName = category.name;
//                    $scope.merchandise.bid = $scope.payments_total();
//                    $scope.merchandise.difference = $scope.value_remaining();
//                    $scope.merchandise.update()
//                        .then(function(response) {
//                            console.log("SUCCESS", response);
//                        })
//                        .catch(function(response) {
//                            console.log("FAILURE!", response);
//                        });                    debugger;
//                })
////                debugger;
////                $scope.merchandise.categoryName = category.name;
//
//            };
//            console.log($scope.merchandise.tickets);
//            $scope.ticket = ticket;
//            debugger;
//            $scope.isPopup3Visible = true;
//            $scope.isPopUpVisible1 = false;
//            $scope.back = function() {
//                $scope.isPopup3Visible = false;
//                $scope.isPopUpVisible1 = true;
//
//                // call $anchorScroll()
//                $anchorScroll(0, 0);
//            };
//            $scope.bidOpen = function() {
//                $scope.isPopUp4Visible = true;
//            };
//                // set the location.hash to the id of
//                // the element you wish to scroll to.
//
//            $scope.payments_total = function () {
//                var total = 0.00
//                angular.forEach($scope.merchandise.bids, function(bid) {
//                    total += (bid.value * 1);
//                });
//                return total
//            };
//            $scope.value_remaining = function () {
////            var total = 0.00;
//                return ($scope.merchandise.value - $scope.payments_total());
//                $scope.valueRemaining = value;
//            };
//            $scope.ticketCreate = function (merchandise, bid) {
////                $scope.merchandise = merchandise;
////                $scope.merchandise.bids = merchandise.getBids();
////                for (var i = 0; i<$scope.merchandise.bids.length; i++){
////                    console.log(bid, $scope.bid, "test")
////                    debugger;
////                };
//                angular.forEach(merchandise.bids, function(value, key, ticket){
//                    console.log(value);
//                    $scope.bid = value;
////                    $scope.bid.value * 10 = ticketValue;
//
//                    debugger;
//                    console.log("Am i here?", $scope.bid, $scope.bid.value);
//                    $scope.ticket = new Ticket;
//                    $scope.ticket.bidId = $scope.bid.id;
//                    $scope.ticket.merchandiseId = $scope.bid.merchandiseId;
//                    $scope.ticket.consumerId = $scope.bid.consumerId;
//                    for (var i = 0; i < $scope.bid.value; i++){
//                        $scope.ticket.create()
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
////                        console.log("Number");
//
//                        debugger;
//                    }
////                    ($scope.ticket.create()
////                        .then(function(response) {
////                            console.log("SUCCESS", response);
////                        })
////                        .catch(function(response) {
////                            console.log("FAILURE!", response);
////                        }));
//
//                });
////                debugger;
////            $scope.bid = bid;
////            $scope.ticket.bidId = $scope.bid.id;
////            $scope.ticket.merchandiseId = $scope.merchandise.id;
//                console.log("test", merchandise.bids)
//                debugger;
//
//            };
//            $scope.ticketSimulate1 = function(merchandise, bid, ticket) {
//                angular.forEach($scope.merchandise.tickets, function(value, key){
//                    Bid.get({id:value.bidId}).then(function(bid){
//                        $scope.bid = bid;
//
//                    })
//                    if (value.win == 1) {
//                        new Bid({id:value.bidId, success:value.win}).update()
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//
//                        console.log("win", value);
//                        debugger;
//                    }
//                    else {
//                        console.log("losers", value)
//                    }
//                    debugger
//
//                })
//            };
//            $scope.ticketSimulate2 = function() {
//                console.log($scope.tickets);
//                debugger;
//                angular.forEach($scope.tickets, function(value, key) {
//                        new Ticket({id:value.id, win:value.win}).update()
//                            .then(function(response) {
//                            console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    debugger;
//
//                })
//                console.log($scope.tickets);
//            };
//            $scope.ticketSimulate = function(merchandise, bid, ticket) {
//                $scope.number = [];
//                angular.forEach($scope.merchandise.tickets, function(value, key) {
//                    $scope.number.push(key);
//                    console.log($scope.number);
//                    console.log($scope.number.length);
//                    debugger;
//                })
//                var randomNumber = Math.floor(Math.random() * ($scope.number.length - 1));
//                console.log(randomNumber)
//                var x = Math.floor(Math.random() * ($scope.number.length - 1));
//                console.log(x);
//                angular.forEach(merchandise.tickets, function(value, key) {
//
//
//                    if (key == x) {
//                        $scope.ticket = ticket;
//                        $scope.ticket = value;
//                        debugger;
//                        $scope.ticket.win = 1;
////                        $scope.ticket.update(ticket);
//                        debugger;
////                        new Ticket({win:$scope.ticket.win}).update(ticket)
////                            .then(function(response) {
////                                console.log("SUCCESS", response);
////                            })
////                            .catch(function(response) {
////                                console .log("FAILURE!", response);
////                            });
//                         debugger;
////                        new Ticket({win:$scope.ticket.win}).update;
////                        $scope.ticket.update(ticket)
////                            .then(function(response) {
////                                console.log("SUCCESS", response);
////                            })
////                            .catch(function(response) {
////                                console.log("FAILURE!", response);
////                               });
//                        debugger;
//                        console.log("here", value)
//                    }
//                    else {
//                        $scope.ticket = ticket;
//                        $scope.ticket = value;
//                        debugger;
//                        $scope.ticket.win = 0;
////                        new Ticket({win:$scope.ticket.win}).update();
//                        console.log("all other", value);
//                    };
////                    new Ticket({win:ticket.win}).update();
//
////                    $scope.ticket.update(ticket);
//                    debugger;
////                    for (var i = 0; i < merchandise.tickets.length; i++) {
////                        debugger;
////                        var x = 3;
////                        if (merchandise.tickets[key] == x){
////                            debugger;
////                            console.log("HERE", value)
////                        }
////                    }
//                });
//                $scope.tickets = [];
//
//                angular.forEach(merchandise.tickets, function(value, ket){
//                    $scope.tickets.push(value);
//                    console.log($scope.tickets);
//                    debugger;
//
//                })
//                console.log("simulate")
//            };
//            $location.hash('top');
//
//            // call $anchorScroll()
//            $anchorScroll();
//        };
        $scope.generateNumber = function(merchandise) {
            $scope.number = [];
            angular.forEach($scope.merchandise.tickets, function(value, key) {
                         $scope.number.push(key);
                console.log($scope.number);
                console.log($scope.number.length);
                debugger;
            })
            var randomNumber = Math.floor(Math.random() * ($scope.number.length - 1));
            console.log(randomNumber)
        }
        $scope.testRandom = function() {
            var randomNumber = Math.floor(Math.random() * ($scope.number.length - 1));
            console.log(randomNumber)
        }


        $scope.view = function (size, selectedMerchandise, merchandise, ctrlFlavor) {
            $scope.merchandise = selectedMerchandise;
            $scope.ctrlFlavor = $scope.merchandise.id;

            debugger;
            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, merchandise, Wish) {

                    $scope.merchandise = merchandise;
                    $scope.ctrlFlavor = merchandise.id;

                    debugger;

                    console.log($scope.merchandise);

//                    $scope.concession_type = new Concession_type();



                    $scope.ok = function () {
                        $scope.isPopup8Visible = true;
                        $scope.isPopup5Visible = false;

                        $modalInstance.close($scope.merchandise);
                        console.log("SUCCESS", $scope.merchandise);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.openSelected = function () {
                        $scope.isPopup3Visible = true;
                        $scope.isPopUp1Visible = false;
                        $scope.merchandise = merchandise;
                        $scope.ctrlFlavor = merchandise.id;
                        debugger;
                    };
                    $scope.addToWishlist = function() {
                        $scope.wish = new Wish;
                        Auth.currentUser().then(function(user) {
                            console.log(user);
                        });
                        debugger;
                        $scope.wish.merchandiseId = merchandise.id;
                        $scope.wish.merchandiseId = user.id;

                        debugger;
                        console.log("wish create fired");
                        $scope.wish.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                        $modalInstance.dismiss('cancel');

                    };
//                    $scope.updatePatient = function(patient) {
//                        $scope.patient.update(patient)
//                            .then(function(response) {
//                                debugger;
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
//
//                    $scope.destroyPatient = function(patient) {
//                        $scope.patient.delete(patient)
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
                    merchandise: function () {
                        return selectedMerchandise;
                    }


                }
            });



            modalInstance.result.then(function (selectedMerchandise) {
                $scope.selected = selectedMerchandise;
                $scope.merchandise = selectedMerchandise;
                merchandise = selectedMerchandise;
                $scope.ctrlFlavor = merchandise.id;
                $scope.isPopup8Visible = true;
                $scope.isPopup5Visible = false;
                $scope.open(merchandise);
                $anchorScroll(0, 0);

                debugger;

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
//                $scope.isPopup8Visible = true;
//                $scope.isPopup5Visible = false;
                debugger;


            });
        };


//        $scope.formData = {
//            stickName: '',
//            stickNestId: ''
//        };
//        $scope.createstick = function() {
//            $scope.stick.create()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };
//
//        $scope.updatestick = function() {
//            $scope.stick.update()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };
//
//        $scope.destroyStick = function() {
//            $scope.stick.delete()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//        };
//
////        $scope.create = function (size) {
////
////            var modalInstance = $modal.open({
////                templateUrl: 'createModal.html',
////                controller: function ($scope, $modalInstance, Tax) {
////                    $scope.tax = new Tax();
////
////                    $scope.ok = function () {
////                        $modalInstance.close($scope.tax);
////                    };
////
////                    $scope.cancel = function () {
////                        $modalInstance.dismiss('cancel');
////                    };
////
////                    $scope.createTax = function() {
////                        $scope.tax.create()
////                            .then(function(response) {
////                                console.log("SUCCESS", response);
////                            })
////                            .catch(function(response) {
////                                console.log("FAILURE!", response);
////                            });
////                    };
////
////                },
////                size: size,
////                resolve: {
////                    tax: function () {
////                        return;
////                    }
////                }
////            });
////
////            modalInstance.result.then(function () {
////            }, function () {
////                $log.info('Modal dismissed at: ' + new Date());
////            });
////        };
//        $scope.update = function (size, selectedStick) {
//
//            var modalInstance = $modal.open({
//                templateUrl: 'updateModal.html',
//                controller: function ($scope, $modalInstance, stick) {
//                    $scope.stick = stick;
//
//                    $scope.ok = function () {
//                        $modalInstance.close($scope.stick);
//                    };
//
//                    $scope.cancel = function () {
//                        $modalInstance.dismiss('cancel');
//                    };
//
//                    $scope.updateStick = function(stick) {
//                        $scope.stick.update(stick)
//                            .then(function(response) {
//                                console.log("SUCCESS", response);
//                            })
//                            .catch(function(response) {
//                                console.log("FAILURE!", response);
//                            });
//                    };
//
//                    $scope.destroyStick = function(stick) {
//                        $scope.stick.delete(stick)
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
//                    stick: function () {
//                        return selectedStick;
//                    }
//                }
//            });
//
//            modalInstance.result.then(function (selectedStick) {
//                $scope.selected = selectedStick;
//                $scope.stick = selectedStick;
//            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            });
//        };
        $scope.addToWishlist = function(selectedMerchandise, merchandise, user, size) {
            $scope.merchandise = selectedMerchandise;
            merchandise = $scope.merchandise;

            Auth.currentUser().then(function(user) {
                console.log(user);
                $scope.loggedIn = []
                angular.forEach($scope.consumers, function(consumer) {
                    console.log("consumer", consumer)
                    if(consumer.userId == user.id){
                        $scope.loggedIn = 1;
                        console.log("SUCCESS", consumer)
                        $scope.consumer = consumer;
                        $scope.consumer2 = consumer;
                        $scope.wish = new Wish;
                        debugger;
                        $scope.wish.merchandiseId = merchandise.id;
                        $scope.wish.consumerId = consumer.id;
                        debugger;
                        console.log("wish create fired");
                        $scope.wish.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    } else{
                        console.log("no one is logged in!")



                    }

                })


            }).then(function(response) {
                    if($scope.loggedIn == 1) {
                    var modalInstance = $modal.open({
                        templateUrl: 'successModal.html',
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
                    })} else {
                        var modalInstance = $modal.open({
                            templateUrl: 'failModal.html',
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
                        })};
                });
        };

}])



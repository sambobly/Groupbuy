var clientDirectives = angular.module('clientDirectives', []) ;


clientDirectives.directive("myResize", function() {
    return {
        restrict: "E, A",
        scope: {myResize: '=',
        notes: '='},
        link: function(scope, element, attributes) {

            var resizeValue = element.find('#notes, #images'); {


                    $(resizeValue).on("click", function() {
                        $(this).css({ "min-height": "800px",
                            "width": "1000"});
                    })};
        }
    };
});

clientDirectives.directive("datepicker", function() {
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
    });
})
clientDirectives.directive("datepickertest", function() {
    $('.datepickertest').datepicker({
//        format: 'yyyy-mm-dd',
        changeMonth: true,
        changeYear: true
    });
});
clientDirectives.directive("timepicker", function() {
    $('.timepicker').timepicker({

    });
});
clientDirectives.directive("smartmenu", function() {
    $('#main-menu').smartmenus();
});
clientDirectives.directive("simpleLens", function() {
    $('#simpleLens').simpleLens();
});
clientDirectives.directive("simpleGallery", function() {
    $('#simpleGallery').simpleGallery();
});
clientDirectives.directive("slick", function() {
    $('#multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});
//
//clientDirectives.directive("your-class", function() {
//    $('.your-class').slick({
//        useTransform: true
//    });});
clientDirectives.directive('slickSlider',function($timeout){
    return {
        restrict: 'A',
        link: function(scope,element,attrs) {
            $timeout(function() {
                $('.your-class').slick(scope.$eval(attrs.slickSlider));
            });
        }
    }
});
clientDirectives.directive("myCutsize", function() {
    return {
        restrict: "E, A",
        scope: {myCutsize: '=',
            notes: '='},
        link: function(scope, element, attributes) {
            var cutsizeValue = element.find('#notes, #images'); {
                    $(cutsizeValue).on("dblclick", function() {
                        $(this).css({ "min-height": "800px",
                            "width": "1"});
                     })};
        }
    };
});



clientDirectives.directive('drawing', function(){
    return {
        restrict: "A, E",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var lastX;
            var lastY;

            element.bind('mousedown', function(event){
                if(event.offsetX!==undefined){
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else {
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                // begins new line
                ctx.beginPath();

                drawing = true;
            });
            element.bind('mousemove', function(event){
                if(drawing){
                    // get current mouse position
                    if(event.offsetX!==undefined){
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }

            });
            element.bind('mouseup', function(event){
                // stop drawing
                drawing = false;
            });

            // canvas reset
            function reset(){
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY){
                // line from
                ctx.moveTo(lX,lY);
                // to
                ctx.lineTo(cX,cY);
                // color
                ctx.strokeStyle = "#4bf";
                // draw it
                ctx.stroke();
            }
        }
    };
});
clientDirectives.directive("myDownsize", function() {
    var linkFunction = function(scope, element, attributes) {
        var paragraph = element.children()[0];
        $(paragraph).on("click", function() {
            $(this).css({ "min-height": "800px",
                "width": "1 "});
        });
    };
    return {
        restrict: "E, A",
        scope: {value: "=myDownsize",
            },
        template: '<button ng-click="click()">Downsize</button>',
       link: linkFunction
    };
});
clientDirectives.directive ('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);

            if (!ngModel) return;

            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});
clientDirectives.directive('uniquetemplateName', function(istemplateNameAvailable) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.unique = istemplateNameAvailable;
        }
    };
});
clientDirectives.directive ('datepicker', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = datepicker.replace(elm[0]);

            if (!ngModel) return;

            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});

clientDirectives.directive('csSelect', function () {
    return {
        require: '^stTable',
        template: '<input type="checkbox"/>',
        scope: {
            row: '=csSelect'
        },
        link: function (scope, element, attr, ctrl) {

            element.bind('change', function (evt) {
                scope.$apply(function () {
                    ctrl.select(scope.row, 'multiple');
                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                } else {
                    element.parent().removeClass('st-selected');
                }
            });
        }
    };
});
clientDirectives.filter('count', function() {
    return function(collection, key) {
        var out = "test";
        for (var i = 0; i < collection.length; i++) {
            //console.log(collection[i].pants);
            //var out = myApp.filter('filter')(collection[i].pants, "42", true);
        }
        return out;
    }
});


clientDirectives.filter('groupBy',
    function () {
        return function (collection, key) {
            if (collection === null) return;
            return uniqueItems(collection, key);
        };
    });

clientDirectives.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];
        console.log(items, props);
        debugger;
        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                        debugger;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
clientDirectives.filter('removeSpacesThenLowercase', function () {
    return function (text) {
        var str = text.replace(/\s+/g, '');
        return str.toLowerCase();
    };
});
clientDirectives.directive('lowercase', function() {
//    NOTE: Need to make conditional ie if undefined = spaces, also need to make chaining more repeatable
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel, patient) {
            function fromUser(text, patient) {
                var replace = text.replace(/{{patient.id}}/gi, scope.patient.id);
                var replace1 = text.replace(/{{patient.firstName}}/gi, scope.patient.firstName);
                return (replace + replace1 || '' );
            }

            function toUser(text) {
//                var replace = [text.replace(/{{patient.id}}/gi, scope.patient.id),
                var replace = [text.replace(/{{patient.id}}/gi, scope.patient.id).replace(/{{patient.firstName}}/gi, scope.patient.firstName).replace(/{{doctor.name}}/gi, scope.doctor.name),

//      text.replace(/{{patient.firstName}}/gi, scope.patient.firstName)
                ]
//                var replace1 = text.replace(/{{patient.firstName}}/gi, scope.patient.firstName);

                return (replace)}
            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});
clientDirectives.directive('replaceThing', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel, patient) {
            function fromUser(text, patient) {
                var replace = text.replace(/{{patient.id}}/gi, scope.patient.id);
                var replace1 = text.replace(/{{patient.firstName}}/gi, scope.patient.firstName);
                return (replace + replace1 || '' );
            }

            function toUser(text) {
                var mapObj = {
                    patientId: scope.patient.id,
                    patientfirstName: scope.patient.firstName
                };
            str = text.replace(/patient.id|patient.name/gi, function(matched){
                return mapObj[matched];
            });
                return (replace)}
            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});
clientDirectives.directive('testAppointmentFilter', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel, appointment) {
            if($scope.filterAfterFilterIds){
//
                for (var i = 0; i < $scope.filterAfterFilterIds.length; i++) {
                    if ($scope.filterAfterFilterIds[i] == appointment.doctor_id) {
                        return appointment;

                    }
                    debugger;
                }
//
            }else{
                return Appointments;
            }
        }
    };
});
clientDirectives.directive('test', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function fromUser(text) {
                return (text || '').toUpperCase();
            }

            function toUser(text) {
                return (text || '').toLowerCase();
            }
            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});
clientDirectives.directive('currency', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (elem, $scope, attrs, ngModel) {
            ngModel.$formatters.push(function (val) {
                return $filter('currency')(val)
            });
            ngModel.$parsers.push(function (val) {
                return val.replace(/[\$,]/, '')
            });
        }
    }
}]);
clientDirectives.directive('capitalizeFirst', function(uppercaseFilter, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

//            var capitalize = function(inputValue) {
//                var capitalized = inputValue.charAt(0).toUpperCase() +
//                    inputValue.substring(1);
//                if(capitalized !== inputValue) {
//                    modelCtrl.$setViewValue(capitalized);
//                    modelCtrl.$render();
//                }
//                return capitalized;
//            }
            var curly = function(inputValue) {
                var curlys = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if(curlys !== inputValue) {
                    modelCtrl.$setViewValue(curlys);
                    modelCtrl.$render();
                }
                return curlys;
            }
            var model = $parse(attrs.ngModel);
            modelCtrl.$parsers.push(curly);
            capitalize(model(scope));
        }
    };
});
clientDirectives.directive('mySearchBox', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'views/search.html',
        controller: 'SearchMerchController'
//

    };
});
clientDirectives.directive('myLogin', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'views/login.html',
        controller: 'UsersController'
//

    };
});
clientDirectives.directive('selectMerchandiseBox', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            flavor: "@"
        },
        templateUrl: 'views/select.html',
        controller: 'TwigsController'
//        link: function (scope, elem, attrs) {
////            scope.merchandise = JSON.parse(attrs.merchandise);
//            console.log(scope.merchandise, "console log in directive");
//        },
//        link: function (scope, element, attrs) {
//            // wait until after $apply
//            $timeout(function(){
//                console.log(scope.selectMerchandiseBox);
//                // use scope.$emit to pass it to controller
//                scope.$emit('notification', scope.yourDirective);
//            });
//        },

    };
});

clientDirectives.directive('selectUser', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            user: "@"
        },
        templateUrl: 'views/selectUser.html',
        controller: 'ConsumersController'

    }
});
clientDirectives.directive("drink", function () {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        controller: 'TwigsController',
        templateUrl: 'views/flavordirective.html',
        link: function($scope, element, attrs) {
            $scope.clickMe= function() {
                alert('inside click');
            }}

    };
});
clientDirectives.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true,
        templateUrl: 'views/loginmodal.html',
        // we want to insert custom content inside the directive

    };
});

clientDirectives.directive('xngFocus', function() {
    return function(scope, element, attrs) {
        return scope.$watch(attrs.xngFocus, function(newValue) {
            console.log(newValue);
            return newValue && element[0].focus();
        });
    };
});
clientDirectives.directive('exampleDirective', function() {
    return {
        restrict: 'A',
        replace: true,
        template: '<textarea ck-editor  ng-model="egg.name" placeholder="Template Content" type="text"></textarea> ',
        controller: function ($scope, Egg) {
            $scope.egg1 = new Egg();
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
            console.log("anything2", $scope.egg1)

            $scope.ok = function () {
                $modalInstance.close($scope.egg1);
                console.log("am i here", $scope.egg1);

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


        }
    }

});
clientDirectives.directive('searchBar', function() {
    return {
        restrict: 'A',
//        replace: true,
//        template: '<textarea ck-editor  ng-model="egg.name" placeholder="Template Content" type="text"></textarea> ',
        controller: function ($scope, merchandise) {
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
        }
    }

});

clientDirectives.directive('formAutofillFix', function() {
    return function(scope, elem, attrs) {
        // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
        elem.prop('method', 'POST');

        // Fix autofill issues where Angular doesn't know about autofilled inputs
        if(attrs.ngClick) {
            setTimeout(function() {
                elem.unbind('submit').submit(function(e) {
                    e.preventDefault();
                    elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
                    scope.$apply(attrs.ngClick);
                });
            }, 0);
        }
    };
});

clientDirectives.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });

            attrs.$observe('ngSrc', function(value) {
                if (!value && attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});
clientDirectives.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('blur', function(event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };
}]);
clientDirectives.directive('restrictInput', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var options = scope.$eval(attr.restrictInput);
                if (!options.regex && options.type) {
                    switch (options.type) {
                        case 'digitsOnly': options.regex = '^[0-9]*$'; break;
                        case 'lettersOnly': options.regex = '^[a-zA-Z]*$'; break;
                        case 'lowercaseLettersOnly': options.regex = '^[a-z]*$'; break;
                        case 'uppercaseLettersOnly': options.regex = '^[A-Z]*$'; break;
                        case 'lettersAndDigitsOnly': options.regex = '^[a-zA-Z0-9]*$'; break;
                        case 'validPhoneCharsOnly': options.regex = '^[0-9 ()/-]*$'; break;
                        default: options.regex = '';
                    }
                }
                var reg = new RegExp(options.regex);
                if (reg.test(viewValue)) { //if valid view value, return it
                    return viewValue;
                } else { //if not valid view value, use the model value (or empty string if that's also invalid)
                    var overrideValue = (reg.test(ctrl.$modelValue) ? ctrl.$modelValue : '');
                    element.val(overrideValue);
                    return overrideValue;
                }
            });
        }
    };
});


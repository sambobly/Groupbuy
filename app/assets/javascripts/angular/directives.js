var opthoDirectives = angular.module('opthoDirectives', []) ;

opthoDirectives.directive("myResize", function() {
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



opthoDirectives.directive("myCutsize", function() {
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


opthoDirectives.directive('drawing', function(){
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
opthoDirectives.directive("myDownsize", function() {
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
opthoDirectives.directive ('facebook', function ($location, facebook) {
    var template = "<div id='fb-root'></div>";

    var script = document.createElement('script');
    script.src = "//connect.facebook.net/en_US/all.js'"
    script.id = 'facebook-jssdk'
    script.async = true

    return {
        restrict:'EA',
        template: template,

        scope: {
            appId: '@',
            parameters: '='
        },

        link: function (scope, element, attrs) {
            if (!facebook.initialized ()) {
                document.body.appendChild(script);
                var parameters = scope.parameters || {};

                angular.extend (parameters, {appId: scope.appId});
                facebook.init (parameters);
            }
        }
    }
});
opthoDirectives.directive ('facebookLogin', function () {
    var template =
        '<div class="fb-login-button" ' +
            'data-max-rows="1" ' +
            'data-size="{{size||\'medium\'}}" ' +
            'data-show-faces="{{!!showFaces}}" ' +
            'data-auto-logout-link="{{!!autoLogout}}" ' +
            'data-scope="{{scope || \'basic_info\'}}"' +
            '></div>';

    return {
        restrict: 'E',
        scope: {
            'autoLogout': '@',
            'size': '@',
            'showFaces': '@',
            'scope': '@'
        },
        template: template
    }
});
opthoDirectives.directive('facebookLike', function ($location) {
    var template = '<div class="fb-like" ' +
        'data-href="{{href || currentPage}}" ' +
        'data-colorscheme="{{colorScheme || \'light\'}}" ' +
        'data-layout="{{layout || \'standard\'}}" ' +
        'data-action="{{ action || \'like\'}}" ' +
        'data-show-faces="{{!!showFaces}}" ' +
        'data-share="{{!!share}}"' +
        'data-action="{{action || \'like\'}}"' +
        'data-send="false"></div>';

    return {
        restrict:'E',
        scope: {
            'colorScheme': '@',
            'layout':      '@',
            'showFaces':   '@',
            'href':        '@',
            'action':      '@',
            'share':       '@',
        },
        template: template,
        link: function(scope, element, attrs) {
            scope.currentPage = $location.absUrl();
        },
    }
}
opthoDirectives.directive('makeUppercase', function () {
    return function (item) {
        return item.toUpperCase();
    };
})  ;

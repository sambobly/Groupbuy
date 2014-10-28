var opthoDirectives = angular.module('opthoDirectives', []) ;

opthoDirectives.directive("myResize", function() {
    return {
        restrict: "E, A",
        scope: {myResize: '=',
        notes: '='},
        link: function(scope, element, attributes) {
            element.val(scope.notes);
            element.data('old-value', scope.notes);
            var resizeValue = element.children()[0];

            scope.$watch('notes', function(newval, oldval, scope) {
                element.val(scope.notes);
                if (element.data('old-value') == element.val()) {
                    $(resizeValue).on("click", function() {
                        $(this).css({ "min-height": "4px",
                            "width": "10000"});
                    })}
                else {
                    $(resizeValue).on("click", function() {
                        $(this).css({ "min-height": "800px",
                            "width": "1000"});
                    })}});
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
    return {
        restrict: "E, A",
        scope: {value: "=myDownsize",
            },
        template: '<button ng-click="click()">Downsize</button>',
       link: function(scope, element, attributes) {
            scope.click = function(){
                $(this).css({ "min-height": "800px",
                    "width": "10"});
            }
        }

    };
});
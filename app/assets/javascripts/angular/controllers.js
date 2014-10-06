var opthoControllers = angular.module('opthoControllers', []);

opthoControllers.controller('CalendarListCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Appointments = $resource('/appointments/findByDate');
    today = new Date();
    yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    $scope.appointments = Appointments.query({start: today.getTime(), end: yesterday.getTime()});
}]);


opthoControllers.controller('ImageCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
            $http.get('/assets/sampleimages.json').success(function(data) {
                $scope.images = data.images;
                $scope.mainImageUrl = data.images[0];
            });
}]);

opthoControllers.controller('PtntInfoCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/assets/samplepatients.json').success(function(data) {
            $scope.patients = data.patients;
    });
}]);

opthoControllers.directive("drawing", function(){
    return {
        restrict: "A",
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

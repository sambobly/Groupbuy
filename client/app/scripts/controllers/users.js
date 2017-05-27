angular.module('clientApp')
    .controller('UsersController', ['$scope', 'userService', 'Auth', '$http', '$window', '$resource', '$location', '$routeParams', '$state', 'Consumer', 'Merchandise', 'Bid', 'Wish', 'User', '$modal', function ($scope, userService, Auth, $window, $http, $resource, $location, $routeParams, $state, Consumer, Merchandise, Bid, Wish, User, $modal) {
        $scope.userService = userService;
        $scope.user = userService.user
        $scope.isPopup1Visible = false;
        $scope.isPopup2Visible = true;


//        $scope.testUserService = function() {
//            $location.go('/#/eggs');
////            if ($scope.user.id > 0) {
////                $scope.isPopup1Visible = true;
////            } else {
////                console.log("No user logged in")
////            };
//            debugger;
//        };
        $scope.$on('devise:login', function(e, user) {
            $scope.isAuthenticated = true;
            $scope.user = user;

            if ($scope.user.id > 0) {
                $scope.isPopup1Visible = true;
                $scope.isPopup2Visible = false;
            } else {
                console.log("No user logged in")
            };
            debugger;
            // You can get data of current user (getting user's name and etc.)
            console.log(user);
        });
        $scope.logout = function() {

//            user.email = 'test@test.com'
            debugger;
//            $http.get('/api/devise/sessions', credentials);
//
//            debugger;
//            debugger;
            Auth.logout().then(function(oldUser) {
                console.log(oldUser); // => {id: 1, ect: '...'}
                debugger;
            }, function(error) {
                // Authentication failed...
            });
            $scope.isPopup1Visible = false;
            $scope.isPopup2Visible = true;

        };
        $scope.user = new User();

        User.query().then(function(users){
            $scope.users = users;
        });
        $scope.consumer = new Consumer();

        Consumer.query().then(function(consumers){
            $scope.consumers = consumers;
        });
        $scope.merchandise = new Merchandise();

        Merchandise.query().then(function(merchandises){
            $scope.merchandises = merchandises;
        });

        $scope.bid = new Bid();

        Bid.query().then(function(bids){
            $scope.bids = bids;
        });

        $scope.wish = new Wish();

        Wish.query().then(function(wishes){
            $scope.wishes = wishes;
        });
    $scope.openLogin = function (size) {
    var modalInstance = $modal.open({
        templateUrl: 'loginModal.html',
        controller: function ($scope, $modalInstance) {
            $scope.signIn = function () {
                var credentials = {
                    name: $scope.credentials.name,
                    email: $scope.credentials.email,
                    password: $scope.credentials.password
                };
                console.log("fired", credentials);
                var user = {};
                var currentUser = {};
                Auth.login(credentials).then(function(user) {
                    $scope.user = user;
                    $scope.ctrlUser = user;
                    console.log(user, currentUser, user.name);
                    console.log(Auth._currentUser);// => {id: 1, ect: '...'}
                    debugger;
                }, function(error) {
                    // Authentication failed...
                });
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };


        },
        size: size,
        resolve: {
            widget: function () {
                return ;
            }
        }
    });

};
    }])

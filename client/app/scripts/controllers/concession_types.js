'use strict';


angular.module('clientApp')
    .controller('ConcessiontypesController', ['$scope', '$resource', '$location', '$routeParams', 'Concession_type', '$modal', function ($scope, $resource, $location, $routeParams, Concession_type, $modal) {

        $scope.concession_type = new Concession_type();


        Concession_type.query().then(function(concession_types){
            $scope.concession_types = concession_types;
        });
        angular.extend ($scope.concession_type, {
            name: '',
            percentage: Number(),
        });
        $scope.createConcession_type = function() {
            $scope.concession_type.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateConcession_type = function() {
            $scope.concession_type.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyConcession_type = function() {
            $scope.concession_type.delete()
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
                controller: function ($scope, $modalInstance, Concession_type) {
                    $scope.concession_type = new Concession_type();

                    $scope.ok = function () {
                        $modalInstance.close($scope.concession_type);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createConcession_type = function() {
                        $scope.concession_type.create()
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
                    concession_type: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedConcession_type) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, concession_type) {
                    $scope.concession_type = concession_type;

                    $scope.ok = function () {
                        $modalInstance.close($scope.concession_type);
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

                    $scope.updateConcession_type = function(concession_type) {
                        $scope.concession_type.update(concession_type)
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

                    $scope.destroyConcession_type = function(concession_type) {
                        $scope.concession_type.delete(concession_type)
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
                    concession_type: function () {
                        return selectedConcession_type;
                    }
                }
            });

            modalInstance.result.then(function (selectedConcession_type) {
                $scope.selected = selectedConcession_type;
                $scope.concession_type = selectedConcession_type;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



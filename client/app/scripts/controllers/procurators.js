'use strict';


angular.module('clientApp')
    .controller('ProcuratorsController', ['$scope', '$resource', '$location', '$routeParams', 'Procurator', '$modal', function ($scope, $resource, $location, $routeParams, Procurator, $modal) {

        $scope.procurator = new Procurator();

        Procurator.query().then(function(procurators){
            $scope.procurators = procurators;
        });


        angular.extend ($scope.procurator, {
            invoiceId: '',
            invoice_id: Number,
            name: ''



        });

        $scope.createProcurator = function() {
            $scope.procurator.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateProcurator = function() {
            $scope.procurator.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyProcurator = function() {
            $scope.procurator.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.update = function (size, selectedProcurator) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, procurator) {
                    $scope.procurator = procurator;

                    $scope.ok = function () {
                        $modalInstance.close($scope.procurator);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateProcurator = function() {
                        console.log(JSON.stringify($scope.procurator))

                        $scope.procurator.update()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyProcurator = function(procurator) {
                        $scope.procurator.delete(procurator)
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
                    procurator: function () {
                        return selectedProcurator;
                    }
                }
            });

        };
    }])



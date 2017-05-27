'use strict';


angular.module('clientApp')
    .controller('ContactsController', ['$scope', '$resource', '$location', '$routeParams', 'Contact', '$modal', function ($scope, $resource, $location, $routeParams, Contact, $modal) {

        $scope.contact = new Contact();


        Contact.query().then(function(contacts){
            $scope.contacts = contacts;
        });
//        $scope.formData = {
//            contactFirstName: '',
//            contactLastName: '',
//            contactPhone: '',
//            contactOccupation: '',
//            contactCompany: '',
//            contactEmail: '',
//            contactAddress: '',
//            contactState: '',
//            contactPostcode: '',
//            contactNote: ''
//
//        };

        angular.extend ($scope.contact, {
            firstname: '',
            lastname: '',
            phone: Number(),
            occupation: '',
            company: '',
            email: '',
            address: '',
            state: '',
            postcode: Number(),
            note: ''
        })
        $scope.createContact = function() {
            $scope.contact.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateContact = function() {
            $scope.contact.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyContact = function() {
            $scope.contact.delete()
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
                controller: function ($scope, $modalInstance, Contact) {
                    $scope.contact = new Contact();

                    $scope.ok = function () {
                        $modalInstance.close($scope.contact);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createContact = function() {
                        $scope.contact.create()
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
                    contact: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.update = function (size, selectedContact) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, contact) {
                    $scope.contact = contact;
                    console.log(contact);
                    $scope.ok = function () {
                        $modalInstance.close($scope.contact);
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

                    $scope.updateContact = function(contact) {
                        $scope.contact.update(contact)
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

                    $scope.destroyContact = function(contact) {
                        $scope.contact.delete(contact)
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
                    contact: function () {
                        return selectedContact;
                    }
                }
            });

            modalInstance.result.then(function (selectedContact) {
                $scope.selected = selectedContact;
                $scope.contact = selectedContact;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])



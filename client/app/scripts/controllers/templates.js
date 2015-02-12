'use strict';


angular.module('clientApp')
    .controller('TemplatesController', ['$scope', '$resource', '$location', '$routeParams', 'Template', function ($scope, $resource, $location, $routeParams, Template) {
        $scope.isPopupVisible = false;
        $scope.showPopup = function() {
            $scope.isPopupVisible = true
        };
        $scope.closePopup = function(){
            $scope.isPopupVisible = false
        };
        $scope.template = new Template();

        $scope.formData = {
            newTemplateName: '',
            newTemplateContent: ''
        };
        $scope.createTemplate = function() {
            $scope.template.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
    }])
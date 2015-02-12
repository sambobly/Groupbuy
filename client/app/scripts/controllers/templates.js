'use strict';


angular.module('clientApp')
    .controller('TemplatesController', ['$scope', '$resource', '$location', '$routeParams', 'Template', function ($scope, $resource, $location, $routeParams, Template) {
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
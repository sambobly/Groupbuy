'use strict';

angular.module('clientApp')
    .controller('ConsultTemplatesController', ['$scope', '$resource', '$location', '$routeParams', 'ConsultTemplate', function ($scope, $resource, $location, $routeParams, ConsultTemplate) {
        $scope.consulttemplate = new ConsultTemplate();

        $scope.formData = {
            newConsultTemplateName: '',
            newConsultTemplateContent: ''
        };
        $scope.createConsultTemplate = function() {
            $scope.consulttemplate.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                })  ;
        };

    }])

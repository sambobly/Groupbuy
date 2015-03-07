'use strict';


angular.module('clientApp')
    .controller('TemplatesController', ['$scope', '$resource', '$location', '$routeParams', 'Template', '$modal', function ($scope, $resource, $location, $routeParams, Template, $modal    ) {

        $scope.template = new Template();


        Template.query().then(function(templates){
            $scope.templates = templates;
        });
        $scope.formData = {
            templateName: '',
            templateContent: ''
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
        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'templatesModal.html',
                controller: function ($scope, $modalInstance, templates) {
                    $scope.templates = templates;


                    $scope.selected = {
                        template: $scope.templates[0],
                    };

                    $scope.template = {
                        template: $scope.templates[0],
                    };
                    $scope.ok = function () {
                        $scope.formData = {
                            templateName: $scope.selected.name,
                            templateContent: $scope.selected.content,
                        };
                        $modalInstance.close($scope.selected.template);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    templates: function () {
                        return $scope.templates;
                    }
                }
            });

            modalInstance.result.then(function (selectedTemplate) {
                $scope.selected = selectedTemplate;
                $scope.template = selectedTemplate;
            });
        };


    }])
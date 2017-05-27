'use strict';


angular.module('clientApp')
    .controller('TemplatesController', ['$scope', '$resource', '$location', '$routeParams', 'Template', 'Consult', '$modal', function ($scope, $resource, $location, $routeParams, Template, Consult, $modal    ) {

        $scope.template = new Template();


        Template.query().then(function(templates){
            $scope.templates = templates;
        });

        $scope.consult = new Consult();

        Consult.query().then(function(Consults) {
            $scope.consults = Consults;
        });

        $scope.formData = {
            templateName: '',
            templateContent: ''
        };

        $scope.createConsult = function(template) {
            console.log($scope.template, "HELP", $scope.consult, "ME", $scope.template_name, "IM", $scope.template.name);
//            $scope.template = template;
            $scope.consult.note = $scope.template.name;
//            console.log($scope.template, "HELP", $scope.consult, "ME", $scope.template_name, "IM", $scope.template.name);
//            $scope.consult.push($scope.template).create()
//                .then(function(response) {
//                    console.log("SUCCESS", response);
//                })
//                .catch(function(response) {
//                    console.log("FAILURE!", response);
//                });
//            var consult = new Consult({patient_id: 23456, note:"HERE"});
//            consult.create().then(function (result) {
//                // creation was successful
//            });
            $scope.consult.create();
//            $scope.template = template;
////            $scope.consult = consult;
////            $scope.template = new Template();
//
//            console.log(template, Template, consult);
//            new Consult({patient_id: 23456, note:consult.name}).create();
//            new Item({id: 1, storeId: 123}).update()
        };


        $scope.createTemplate = function() {
            $scope.template.create()
                .then(function(response) {
                    c.$setValidity('unique', formData.isUnique);
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    c.$setValidity('unique', false)
                    console.log("FAILURE!", response);
                });
        };

        $scope.updateTemplate = function() {
            $scope.template.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyTemplate = function() {
            $scope.template.delete()
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
                console.log("AM I FIRING??")
            });
        };


    }])
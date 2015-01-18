'use strict'

###*
 # @ngdoc overview
 # @name clientApp
 # @description
 # # clientApp
 #
 # Main module of the application.
###
Client = angular.module('Client', [])

angular
.module("clientApp", [
  "ngAnimate"
  "ngCookies"
  "ngMessages"
  "ngRoute"
  "ngSanitize"
  "ngTouch"
  "ui.router"
  "rails"
  "clientControllers"
  "clientDirectives"
  "clientServices"
]).config([
  "$stateProvider"
  "$urlRouterProvider"
  ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise "index"
    $stateProvider.state("index",
      url: "/index"
      templateUrl: "views/home.html"
      controller: "MainCtrl"
    ).state("consultations",
      url: "/consultations"
      templateUrl: "views/consultations.html"
      controller: "MainCtrl"
    ).state("patients",
      url: "/patients"
      templateUrl: "views/patients.html"
      controller: "PatientsController"
    ).state("consulttemplates",
      url: "/consulttemplates"
      templateUrl: "views/consulttemplates.html"
      controller: "ConsultTemplatesController"
    )])
.config(["$httpProvider", (provider) ->
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/patient/new', { templateUrl: '../api/patients.html', controller: 'PatientsController' } )
  .when('/patient/:patientId', { templateUrl: '../api/patients.html', controller: 'PatientsController' } )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/consulttemplates/new', { templateUrl: '../api/consulttemplates.html', controller: 'ConsultTemplatesController' } )
  ])
#.when('/post/:postId/edit', { templateUrl: '../assets/mainEditPost.html', controller: 'EditPostCtrl' } )


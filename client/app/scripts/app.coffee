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
  "ui.bootstrap"
  "ui.bootstrap.tpls"
  "ui.calendar"
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
    ).state("products",
      url: "/products"
      templateUrl: "views/products.html"
      controller: "ProductsController"
    ).state("templates",
      url: "/templates",
      templateUrl: "views/templates.html"
      controller: "TemplatesController"
    ).state("appointments",
      url: "/appointments",
      templateUrl: "views/appointments.html"
      controller: "AppointmentsController"
    ).state("taxes",
      url: "/taxes",
      templateUrl: "views/taxes.html"
      controller: "TaxesController"
)])
.config(["$httpProvider", (provider) ->
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  ])
Client.config(  ['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/patient/new', { templateUrl: '../api/patients.html', controller: 'PatientsController' } )
  .when('/patient/:patientId', { templateUrl: '../api/patients.html', controller: 'PatientsController' } )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/consulttemplates/new', { templateUrl: '../api/consulttemplates.html', controller: 'ConsultTemplatesController' } )
  .when('/consulttemplates/:consulttemplateId', { templateUrl: '../api/consulttemplates.html', controller: 'ConsultTemplatesController' } )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/product/new', { templateUrl: '../api/products.html', controller: 'ProductsController' } )
  .when('/product/:productId', { templateUrl: '../api/products.html', controller: 'ProductsController' } )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/template/new', { templateUrl: '../api/templates.html', controller: 'TemplatesController' } )
  .when('/template/:templateId', { templateUrl: '../api/templates.html', controller: 'TemplatesController'} )
  ])
Client.config(  ['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/appointment/new', { templateUrl: '../api/appointments.html', controller: 'AppointmentsController' } )
  .when('/appointment/:appointmentId', { templateUrl: '../api/appointments.html', controller: 'AppointmentsController' } )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/tax/new', { templateUrl: '../api/taxes.html', controller: 'TaxController' } )
  .when('/tax/:templateId', { templateUrl: '../api/taxes.html', controller: 'TaxController'} )
  ])
#.when('/post/:postId/edit', { templateUrl: '../assets/mainEditPost.html', controller: 'EditPostCtrl' } )


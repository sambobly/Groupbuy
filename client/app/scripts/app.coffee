'use strict'

###*
 # @ngdoc overview
 # @name clientApp
 # @description
 # # clientApp
 #
 # Main module of the application.
###
angular
.module("clientApp", [
  "ngAnimate"
  "ngCookies"
  "ngMessages"
  "ngResource"
  "ngRoute"
  "ngSanitize"
  "ngTouch"
  "ui.router"
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
    ).state "patients",
      url: "/patients"
      templateUrl: "views/patients.html"
      controller: "PatientsController"

    return ""
])
.factory "Patient", [
  "$resource"
  ($resource) ->
    return $resource("/api/patients/:id.json", null,
      update:
        method: "PUT"
    )
]


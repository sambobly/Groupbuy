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
  "acute.select"
  "clientControllers"
  "clientDirectives"
  "clientServices"
  "angularMoment"
  "ezfb"
  "daypilot"
  "mwl.calendar"
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
      url: "/products",
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
    ).state("expenses",
      url: "/expenses",
      templateUrl: "views/expenses.html"
      controller: "ExpensesController"
    ).state("contacts",
      url: "/contacts",
      templateUrl: "views/contacts.html"
      controller: "ContactsController"
    ).state("paymenttypes",
      url: "/paymenttypes",
      templateUrl: "views/payment_types.html"
      controller: "PaymenttypesController"
    ).state("concessiontypes",
      url: "/concessiontypes",
      templateUrl: "views/concession_types.html"
      controller: "ConcessiontypesController"
    ).state("businesses",
      url: "/businesses",
      templateUrl: "views/business.html"
      controller: "BusinessController"
    ).state("billableitems",
      url: "/billableitems",
      templateUrl: "views/billable_items.html"
      controller: "BillableitemsController"
    ).state("consults",
      url: "/consults",
      templateUrl: "views/consults.html"
      controller: "ConsultsController"
    ).state("invoices",
      url: "/invoices",
      templateUrl: "views/invoices.html"
      controller: "InvoicesController"
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
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/appointment/new', { templateUrl: '../api/appointments.html', controller: 'AppointmentsController' } )
  .when('/appointment/:appointmentId', { templateUrl: '../api/appointments.html', controller: 'AppointmentsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/tax/new', { templateUrl: '../api/taxes.html', controller: 'TaxesController' } )
  .when('/tax/:taxId', { templateUrl: '../api/taxes.html', controller: 'TaxesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/expense/new', { templateUrl: '../api/expenses.html', controller: 'ExpensesController' } )
  .when('/expense/:expenseId', { templateUrl: '../api/expenses.html', controller: 'ExpensesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/contact/new', { templateUrl: '../api/contacts.html', controller: 'ContactsController' } )
  .when('/contact/:contactId', { templateUrl: '../api/contacts.html', controller: 'ContactsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/paymenttype/new', { templateUrl: '../api/payment_types.html', controller: 'PaymenttypesController' } )
  .when('/paymenttype/:paymenttypeId', { templateUrl: '../api/payment_types.html', controller: 'PaymenttypesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/concessiontype/new', { templateUrl: '../api/concession_types.html', controller: 'ConcessiontypesController' } )
  .when('/concessiontype/:concessiontypeId', { templateUrl: '../api/concession_types.html', controller: 'ConcessiontypesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/business/new', { templateUrl: '../api/business.html', controller: 'BusinessController' } )
  .when('/business/:businessId', { templateUrl: '../api/business.html', controller: 'BusinessController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/billableitem/new', { templateUrl: '../api/billableitem.html', controller: 'BillableitemsController' } )
  .when('/billableitem/:billableitemId', { templateUrl: '../api/billableitem.html', controller: 'BillableitemsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/consult/new', { templateUrl: '../api/consult.html', controller: 'ConsultsController' } )
  .when('/consult/:consultId', { templateUrl: '../api/consult.html', controller: 'ConsultsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/invoice/new', { templateUrl: '../api/invoice.html', controller: 'InvoicesController' } )
  .when('/invoice/:invoiceId', { templateUrl: '../api/invoice.html', controller: 'InvoicesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/acute.select/acute.select.htm', { templateUrl: '../api/acute.select.htm', controller: 'ConsultsController' } )
  .when('/consult/:billableitemId', { templateUrl: '../api/consult.html', controller: 'ConsultsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/example/new', { templateUrl: '../api/example.html', controller: 'Example' } )
  .when('/example/:exampleId', { templateUrl: '../api/example.html', controller: 'ExampleController'} )
  ])
Client.config(['$esfbProvider', (ezfbProvider) ->
  ezfbProvider.setLocale 'zh_TW'
  ])
Client.config(['$esfbProvider', (ezfbProvider) ->
  ezfbProvider.setLocale 'zh_TW',
  ezfbProvider.setInitParams
      appId: '386469651480295'
      version: 'v2.0'
  ])
#.when('/post/:postId/edit', { templateUrl: '../assets/mainEditPost.html', controller: 'EditPostCtrl' } )


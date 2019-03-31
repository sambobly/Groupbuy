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
  "ngResource"
  "ngSanitize"
  "ngPassword"
  "ngTouch"
  "ngTable"
  "ui.router"
  "ui.bootstrap"
  "ui.calendar"
  "ui.select"
  "rails"
  "acute.select"
  "clientControllers"
  "clientDirectives"
  "clientServices"
  "angularMoment"
  "ezfb"
  "Devise"
#  "daypilot"
  "mwl.calendar"
  "smart-table"
  "slickCarousel"
  "ngMaterial"
  "ngAnimate"
  "ngMessages"
  "ng-token-auth"
  "angularPayments"
  "ngFileUpload"
#  "angular-advanced-searchbox"
]).config([
  '$stateProvider'
  '$urlRouterProvider'
  'AuthProvider'
  '$httpProvider'
  '$windowProvider'
  ($stateProvider, $urlRouterProvider, AuthProvider, $httpProvider, $routeProvider, $windowProvider) ->

    AuthProvider.loginMethod 'POST'
    AuthProvider.loginPath '/api/users/sign_in.json',
    AuthProvider.resourceName('user');
    AuthProvider.registerPath('api/users/show.json');
    AuthProvider.registerMethod('GET');
    AuthProvider.logoutMethod 'DELETE'
    AuthProvider.logoutPath '/api/users/sign_out.json',
    AuthProvider.sendResetPasswordInstructionsPath 'api/users/confirmation.json',
    AuthProvider.sendResetPasswordInstructionsMethod 'POST',
    AuthProvider.resetPasswordPath('api/users/password.json'),
    AuthProvider.resetPasswordMethod('POST'),
    $httpProvider.defaults.withCredentials = true,

    $urlRouterProvider.otherwise "index",
#    $window = $windowProvider.$get();
#    $window.Stripe.setPublishableKey 'pk_test_nTvr3OV0TnAiWUdi8Mxcf3dM',

    $stateProvider.state("index",
      url: "/index"
      templateUrl: "views/home.html"
      controller: "MainCtrl"
    ).state("consultations",
      url: "/consultations"
      templateUrl: "views/consultations.html"
      controller: "MainCtrl"
    ).state("patients",
      url: "/patients",
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
    ).state("doctors",
      url: "/doctors",
      templateUrl: "views/doctors.html"
      controller: "DoctorsController"
    ).state("taxes",
      url: "/taxes",
      templateUrl: "views/taxes.html"
      controller: "TaxesController"
    ).state("consumers",
      url: "/consumers",
      templateUrl: "views/consumers.html"
      controller: "ConsumersController"
    ).state("update",
      url: "/update",
      templateUrl: "views/update.html"
      controller: "ConsumersController"
    ).state("merchandises",
      url: "/merchandises",
      templateUrl: "views/merchandises.html"
      controller: "MerchandisesController"
    ).state("merchandises-detail",
      url: "/merchandises/:merchandiseId",
      templateUrl: "views/select.html",
      controller: "TwigsController"
    ).state("claims",
      url: "/claims",
      templateUrl: "views/claims.html"
      controller: "ClaimsController"
    ).state("claims-detail",
      url: "/claims/:merchandiseId",
      templateUrl: "views/claims.html"
      controller: "ClaimsController"
    ).state("categories",
      url: "/categories",
      templateUrl: "views/categories.html"
      controller: "CategoriesController"
    ).state("bids",
      url: "/bids",
      templateUrl: "views/bids.html"
      controller: "BidsController"
    ).state("bids-detail",
      url: "/bids/:merchandiseId",
      templateUrl: "views/biddetail.html"
      controller: "BidsController"
    ).state("tickets",
      url: "/tickets",
      templateUrl: "views/tickets.html"
      controller: "TicketsController"
    ).state("sticks",
      url: "/sticks",
      templateUrl: "views/sticks.html"
      controller: "SticksController"
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
    ).state("tests",
      url: "/tests",
      templateUrl: "views/test.html"
      controller: "TestsController"
    ).state("eggs",
      url: "/eggs",
      templateUrl: "views/eggs.html"
      controller: "EggsController"
    ).state("meetings",
      url: "/meetings",
      templateUrl: "views/meetings.html"
      controller: "MeetingsController"
    ).state("letters",
      url: "/letters",
      templateUrl: "views/letters.html"
      controller: "LettersController"
    ).state("payments",
      url: "/payments",
      templateUrl: "views/payments.html"
      controller: "PaymentsController"
    ).state("twigs",
      url: "/twigs",
      templateUrl: "views/twigs.html"
      controller: "TwigsController"
    ).state("birds",
      url: "/birds",
      templateUrl: "views/birds.html"
      controller: "BirdsController"
    ).state("widgets",
      url: "/widgets",
      templateUrl: "views/widgets.html"
      controller: "WidgetsController"
    ).state("procurators",
      url: "/procurators",
      templateUrl: "views/procurators.html"
      controller: "ProcuratorsController"
    ).state("nests",
      url: "/nests",
      templateUrl: "views/nests.html"
      controller: "NestsController"
    ).state("lines",
      url: "/lines",
      templateUrl: "views/lines.html"
      controller: "LinesController"
    ).state("recipients",
      url: "/recipients",
      templateUrl: "views/recipients.html"
      controller: "RecipientsController"
    ).state("wishes",
      url: "/wishes",
      templateUrl: "views/wishes.html"
      controller: "WishesController"
    ).state("login",
      url: "/login",
      templateUrl: "views/login.html",
      controller: "ConsumersController",
#      onEnter: (Auth, $state) ->
#      Auth.currentUser().then ->
#        $state.go 'home'
    ).state('recover',
      url: '/recover',
      templateUrl: 'views/recover.html',
      controller: 'RecoversController',
#      onEnter: (Auth, $state) ->
#        Auth.currentUser().then ->
#          $state.go 'home'
    ).state('consumercreate',
      url: '/consumercreate',
      templateUrl: 'views/consumercreate.html',
      controller: 'ConsumersController',
#      onEnter: (Auth, $state) ->
#        Auth.currentUser().then ->
#          $state.go 'home'
    ).state("calendar",
      url: "/calendar",
      templateUrl: "views/calendar.html"
      controller: "CalendarController"
)])
Client.config(["$httpProvider", (provider) ->
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  ])
Client.config(["$httpProvider", (provider) ->
    $httpProvider.defaults.withCredentials = true;
])
Client.config(["AuthProvider", (AuthProvider) ->
  AuthProvider.loginMethod 'GET'
  AuthProvider.loginRedirect = '/profile'
  ])
Client.config(['$routeProvider',  ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/sign_in', {
      templateUrl: 'api/sign_in.html'
    });

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/patient/new', { templateUrl: '../api/patient.html', controller: 'PatientsController' } )
  .when('/patient/:patientId', { templateUrl: '../api/patient.html', controller: 'PatientsController'} )
  .when('/patients/:patientId/invoices', { templateUrl: '../api/patient.html', controller: 'PatientsController'} )
  .when('/patients/:patientId/appointments', { templateUrl: '../api/patient.html', controller: 'PatientsController'} )

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
  .when('/doctor/new', { templateUrl: '../api/doctors.html', controller: 'DoctorsController' } )
  .when('/doctor/:doctorId', { templateUrl: '../api/doctors.html', controller: 'DoctorsController'} )
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
  .when('/stick/new', { templateUrl: '../api/sticks.html', controller: 'SticksController' } )
  .when('/stick/:stickId', { templateUrl: '../api/sticks.html', controller: 'SticksController'} )
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
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/calendar/new', { templateUrl: '../api/calendar.html', controller: 'CalendarController' } )
  .when('/calendar/:calendarId', { templateUrl: '../api/calendar.html', controller: 'CalendarController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/test/new', { templateUrl: '../api/test.html', controller: 'TestsController' } )
  .when('/test/:testId', { templateUrl: '../api/test.html', controller: 'TestsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/line/new', { templateUrl: '../api/lines.html', controller: 'LinesController' } )
  .when('/line/:lineId', { templateUrl: '../api/lines.html', controller: 'LinesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/egg/new', { templateUrl: '../api/eggs.html', controller: 'EggsController' } )
  .when('/egg/:eggId', { templateUrl: '../api/eggs.html', controller: 'EggsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/meeting/new', { templateUrl: '../api/meetings.html', controller: 'MeetingsController' } )
  .when('/meeting/:meetingId', { templateUrl: '../api/meetings.html', controller: 'MeetingsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/meeting/new', { templateUrl: '../api/letters.html', controller: 'LettersController' } )
  .when('/meeting/:meetingId', { templateUrl: '../api/letters.html', controller: 'LettersController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/payment/new', { templateUrl: '../api/payments.html', controller: 'PaymentsController' } )
  .when('/payment/:paymentId', { templateUrl: '../api/payments.html', controller: 'PaymentsController'} )

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/twig/new', { templateUrl: '../api/twigs.html', controller: 'TwigsController' } )
  .when('/twigs/test', { templateUrl: '../api/twig.html', controller: 'TwigsController' } )
  .when('/twig/:taxId', { templateUrl: '../api/twigs.html', controller: 'TwigsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/bird/new', { templateUrl: '../api/birds.html', controller: 'BirdsController' } )
  .when('/bird/:birdId', { templateUrl: '../api/birds.html', controller: 'BirdsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/recipient/new', { templateUrl: '../api/recipients.html', controller: 'RecipientsController' } )
  .when('/recipient/:recipientId', { templateUrl: '../api/recipients.html', controller: 'RecipientsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/widget/new', { templateUrl: '../api/widgets.html', controller: 'WidgetsController' } )
  .when('/widget/:widgetId', { templateUrl: '../api/widgets.html', controller: 'WidgetsController'} )
  .when('/widget/:widgetId/products', { templateUrl: '../api/widgets.html', controller: 'WidgetsController'} )

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/procurator/new', { templateUrl: '../api/procurators.html', controller: 'ProcuratorsController' } )
  .when('/procurator/:procuratorId', { templateUrl: '../api/procurators.html', controller: 'ProcuratorsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/nest/new', { templateUrl: '../api/nest.html', controller: 'NestsController' } )
  .when('/nest/:nestId', { templateUrl: '../api/nest.html', controller: 'NestsController'} )
  .when('/nests/:nestId/eggs', { templateUrl: '../api/nest.html', controller: 'NestsController'} )

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/consumer/new', { templateUrl: '../api/consumers.html', controller: 'ConsumersController' } )
  .when('/consumer/:consumerId', { templateUrl: '../api/consumers.html', controller: 'ConsumersController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/user/new', { templateUrl: '../api/users.html', controller: 'ConsumersController' } )
  .when('/user/:userId', { templateUrl: '../api/users.html', controller: 'ConsumersController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/merchandise/new', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController' } )
  .when('/merchandise/:merchandiseId', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )
  .when('/merchandise/.merchandiseId', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )
  .when('/merchandise/.id', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )
  .when('/merchandise/:id', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )

  .when('/merchandise/:merchandiseId/bids', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )
  .when('/merchandise/:merchandiseId/wishes', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )
  .when('/merchandise/:merchandiseId/claims', { templateUrl: '../api/merchandises.html', controller: 'MerchandisesController'} )

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/category/new', { templateUrl: '../api/categories.html', controller: 'CategoriesController' } )
  .when('/category/:categoyId', { templateUrl: '../api/categories.html', controller: 'CategoriesController'} )

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/bid/new', { templateUrl: '../api/bids.html', controller: 'BidsController' } )
  .when('/bid/:bidId', { templateUrl: '../api/bids.html', controller: 'BidsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/claim/new', { templateUrl: '../api/claims.html', controller: 'ClaimsController' } )
  .when('/claim/:claimId', { templateUrl: '../api/claims.html', controller: 'ClaimsController'} )
  .when('/claim/:merchandiseId', { templateUrl: '../api/claims.html', controller: 'ClaimsController'} )
  .when('/claim/.merchandiseId', { templateUrl: '../api/claims.html', controller: 'ClaimsController'} )

  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/ticket/new', { templateUrl: '../api/tickets.html', controller: 'TicketsController' } )
  .when('/ticket/:ticketId', { templateUrl: '../api/tickets.html', controller: 'TicketsController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/wish/new', { templateUrl: '../api/wishes.html', controller: 'WishesController' } )
  .when('/wish/:wishId', { templateUrl: '../api/wishes.html', controller: 'WishesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/select/new', { templateUrl: '../api/select.html', controller: 'WishesController' } )
  .when('/select/:selectId', { templateUrl: '../api/select.html', controller: 'WishesController'} )
  ])
Client.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post/'
  $routeProvider
  .when('/selectUser/new', { templateUrl: '../api/selectUser.html', controller: 'stickscontroller' } )
  .when('/selectUser/:selectId', { templateUrl: '../api/selectUser.html', controller: 'stickscontroller'} )
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


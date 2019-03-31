var clientServices = angular.module('clientServices', ['ngResource']);

angular.module('clientApp').factory('filteredTests', function(){
    return function filteredTests(){
        var values = [];
        this.add = function(c){ values.push(c);};
        this.isfilteredTest = function(c){ return values.indexOf(c) >= 0;};
    };
});
angular.module('clientApp').service('ServiceMerchandises',function(){
    var array = ["1"]

    return array;
});
//opthoServices.factory('AppointmentService', function($http, $q) {
  //  var service = {
    //    getAppointments: function() {
      //      var d = $q.defer();
        //    $http.jsonp('Appointments/findbydate')
          //      .then(function(data, status) {
            //        if(data.status == 200)
              //          d.resolve(data.data.responseData.feed.entries);
                //    else
                  //      d.reject(data);
          //      });
       //     return d.promise
    //    }
  //  };
    // return service;
   // });

//clientServices.factory('Patient', ['railsResourceFactory', 'railsSerializer', '$http', 'Invoice', function (railsResourceFactory, railsSerializer, $http, Invoice) {
//   var resource = railsResourceFactory({
//       url: '/api/patients',
//       name: 'patient',
//       serializer: railsSerializer(function () {
//           this.resource('appointments', 'Appointment');
//           this.nestedAttribute('appointments');
//
//       })
//   });
//    resource.prototype.getAppointments = function () {
//        return Appointment.query({patientId: this.id})
//    };
//    resource.prototype.getInvoices = function () {
//        var self = this;
//        return resource.$get(self.$url('invoices')).then(function (invoices) {
//            self.invoices = invoices;
//            return self.invoices;
//
//        });
//
//    };
//    return resource;
//}]);

clientServices.factory('userService', ['Auth', function (Auth) {
    var userService = {};
    Auth.currentUser().then(function(user){
        userService.user = user;
        debugger;
    }, function(error){
    });
    return userService;
}]);



clientServices.factory('Patient', ['railsResourceFactory', 'railsSerializer', '$http', 'Invoice', 'Meeting', 'Appointment', 'Letter', function (railsResourceFactory, railsSerializer, $http, Invoice, Meeting, Appointment, Letter, Consult) {
    var resource = railsResourceFactory({
        url: '/api/patients',
        name: 'patient',
        serializer: railsSerializer(function () {
            this.resource('invoices', 'Invoice');
            this.nestedAttribute('invoices');
            this.resource('payments', 'Payment');
            this.nestedAttribute('payments');
            this.resource('meetings', 'Meeting');
            this.nestedAttribute('meetings');
            this.resource('appointments', 'Appointment');
            this.nestedAttribute('appointments');
            this.resource('letters', 'Letter');
            this.nestedAttribute('letters');

        })




    });

    resource.prototype.getInvoices = function () {
        var self = this;
        return resource.$get(self.$url('invoices')).then(function (invoices) {
            self.invoices = invoices;
            return self.invoices;

        });
    };
    resource.prototype.getPayments = function () {
        var self = this;
        return resource.$get(self.$url('payments')).then(function (payments) {
            self.payments = payments;
            return self.payments;

        });
    };
    resource.prototype.getMeetings = function () {
        var self = this;
        return resource.$get(self.$url('meetings')).then(function (meetings) {
            self.meetings = meetings;
            return self.meetings;

        });
    };
    resource.prototype.getAppointments = function () {
        var self = this;
        return resource.$get(self.$url('appointments')).then(function (appointments) {
            self.appointments = appointments;
            return self.appointments;

        });
    };
    resource.prototype.getLetters = function () {
        var self = this;
        return resource.$get(self.$url('letters')).then(function (letters) {
            self.letters = letters;
            return self.letters;

        });
    };

    return resource;
}]);
//clientServices.factory('Doctor', ['railsResourceFactory', 'railsSerializer', function (railsResourceFactory, railsSerializer) {
//    var resource = railsResourceFactory({
//        url: '/api/doctors',
//        name: 'doctor'
//
//    });
//
//}]);



clientServices.factory('Appointment', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/api/appointments',
        name: 'appointment'
    });
    resource.prototype.getPatientId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.patientId);
        //  return  Nest.get(this.nestId)
        return this.patientId;
    };
    return resource;
}]);

clientServices.factory('Doctor', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/doctors',
        name: 'doctor'
    });
}]);

clientServices.factory('Consult_Template', ['railsResourceFactory', 'railsSerializer', function (railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        url: '/api/consult_templates',
        name: 'consult_template'
    });
}]);



clientServices.factory('Template', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/templates',
        name: 'template'
    });
}]);


clientServices.factory('Tax', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/taxes',
        name: 'tax'
    });
}]);

clientServices.factory('Product', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/products',
        name: 'product'
    });
}]);

clientServices.factory('Line', ['railsResourceFactory','Product', function (railsResourceFactory, Product) {
    var resource = railsResourceFactory({
        url: '/api/lines',
        name: 'line'
    });
    resource.prototype.getProduct = function () {
        return Product.get(this.productId)
    };
    return resource;
}]);

clientServices.factory('Bird', ['railsResourceFactory', 'railsSerializer', 'Nest', function (railsResourceFactory, railsSerializer, Nest) {
    var resource = railsResourceFactory({
        url: '/api/birds',
        name: 'bird',
        serializer: railsSerializer(function () {
            this.resource('nest', 'Nest');
        })
    });
    resource.prototype.getNest = function () {
        return Nest.get(this.nestId)
    };
    return resource;
}]);

clientServices.factory('Payment', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/api/payments',
        name: 'payment'
    });
//    resource.prototype.getInvoice = function () {
//        return Invoice.get(this.invoiceId)
//    };
    return resource;
}]);

clientServices.factory('Widget', ['railsResourceFactory', 'railsSerializer', 'Product', 'Tax', function (railsResourceFactory, railsSerializer, Product, Tax) {
    var resource = railsResourceFactory({
        url: '/api/widgets',
        name: 'widget',
        serializer: railsSerializer(function () {
            this.resource('products', 'Product');
            this.nestedAttribute('products');

        })
    });
    resource.prototype.getProduct = function () {
        return Product.get(this.productId)
    };
    resource.prototype.getTax = function () {
        return Tax.get(this.taxId)
    };
//    resource.prototype.getInvoice = function () {
//        return Invoice.get(this.invoiceId)
//    };
    return resource;
}]);

clientServices.factory('Procurator', ['railsResourceFactory', function (railsResourceFactory, Invoice) {
    var resource = railsResourceFactory({
        url: '/api/procurators',
        name: 'procurator'
    });

    return resource;
}]);



clientServices.factory('Stick', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/sticks',
        name: 'stick'
    });
}]);

clientServices.factory('Twig', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/twigs',
        name: 'twig'
    });
}]);


//clientServices.factory('Nest', ['railsResourceFactory', 'railsSerializer', function (railsResourceFactory, railsSerializer) {
//    return railsResourceFactory({
//        url: '/api/nests',
//        name: 'nest',
//        serializer: railsSerializer(function () {
//            this.resource('eggs', 'Egg');
//            this.nestedAttribute('eggs');
//
//        })
//    });
//    resource.prototype.getEggs = function () {
//        return Egg.get({nestId: this.id})
//    }
//    return resource;
//}]);
//  *** THIS ONE SHOWS YOU HOW TO ACCESS NEST BY BIRD!!!****



//clientServices.factory('Bird', ['railsResourceFactory', function (railsResourceFactory) {
//    var resource = railsResourceFactory({
//        url: '/api/birds',
//        name: 'bird'
//    });
//
//    return resource;
//}]);
clientServices.factory('Meeting', ['railsResourceFactory', 'Doctor', 'Appointment', function (railsResourceFactory, Doctor, Appointment) {
//    NOTE TO MAKE THIS WORK NEED TO REFERENCE NEST IN FACTORY ABOVE
    var resource = railsResourceFactory({
        url: '/api/meetings',
        name: 'meeting'
    });
//    resource.prototype.getPatient = function () {
//        return Patient.get(this.patientId)
//    };
    resource.prototype.getDoctor = function () {
        return Doctor.get(this.doctorId)
    };
    resource.prototype.getAppointment = function () {
        return Appointment.get(this.appointmentId)
    };
    return resource;
}]);
clientServices.factory('Letter', ['railsResourceFactory', function (railsResourceFactory) {
//    NOTE TO MAKE THIS WORK NEED TO REFERENCE NEST IN FACTORY ABOVE
    var resource = railsResourceFactory({
        url: '/api/letters',
        name: 'letter'
    });
   resource.prototype.getPatientId = function () {

    console.log("patient object =");
    console.log(this);
    console.log(this.patientId);
    //  return  Nest.get(this.nestId)
    return this.patientId;
};
//    resource.prototype.getDoctor = function () {
//        return Doctor.get(this.doctorId)
//    };
//    resource.prototype.getAppointment = function () {
//        return Appointment.get(this.appointmentId)
//    };
    return resource;
}]);
clientServices.factory('Egg', ['railsResourceFactory', function (railsResourceFactory) {
//    NOTE TO MAKE THIS WORK NEED TO REFERENCE NEST IN FACTORY ABOVE
    var resource = railsResourceFactory({
        url: '/api/eggs',
        name: 'egg'
    });
    resource.prototype.getNestId = function () {

        console.log("egg object =");
        console.log(this);
       console.log(this.nestId);
      //  return  Nest.get(this.nestId)
             return this.nestId;
    };
    return resource;
}]);
//clientServices.factory('Egg', ['railsResourceFactory', 'railsSerializer', 'Nest', function (railsResourceFactory, railsSerializer, Nest) {
////    NOTE TO MAKE THIS WORK NEED TO REFERENCE NEST IN FACTORY ABOVE
//    var resource = railsResourceFactory({
//        url: '/api/eggs',
//        name: 'egg',
//        serializer: railsSerializer(function () {
//            this.resource('nest', 'Nest');
//            this.nestedAttribute('nest');
//
//        })
//    });
//    resource.prototype.getNest = function () {
//        return Nest.get(this.nestId)
//    };
//    resource.prototype.getEggs = function () {
//      return Egg.get(this.nestId);
//        console.log(this.nestId);
//    };
//    return resource;
//}]);
clientServices.factory('Nest', ['railsResourceFactory', 'railsSerializer', '$http', 'Egg', function (railsResourceFactory, railsSerializer, $http, Egg) {
    var resource = railsResourceFactory({
        url: '/api/nests',
        name: 'nest',
        serializer: railsSerializer(function () {
            this.resource('eggs', 'Egg');
            this.nestedAttribute('eggs');

        }),

//        serializer: railsSerializer(function () {
//            this.resource('birds', 'Bird');
//            this.nestedAttribute('birds');
//
//        })
    });
//    resource.findByTraineeId = function (employeeId) {
//           return resource.query({trainee_id: employeeId});
//        };
//    resource.prototype.getEggs = function (eggId) {
//        return resource.query({nest_id: eggId});
//        };
//    resource.prototype.getReferences = function () {
//        var self = this;
//        return resource.processResponse($http.get(resource.resourceUrl(this.id) + '/references')).then(function (references) {
//            self.references = references;
//            return self.references;
//        });
//    };
//    resource.prototype.getEggs = function () {
//        var self = this;
//        return resource.processResponse($http.get(resource.resourceUrl(this.id) + '/eggs/')).then(function (eggs) {
//            self.eggs = eggs;
//            return self.eggs;
//        });
//    };
//    resource.prototype.getEggs = function () {
//        return Egg.get(this.nestId);
//        console.log(this.nestId);
//    };
//    resource.prototype.getEggs = function () {
//        return Egg.query();
//        console.log(this.nestId);
//    };

//    resource.prototype.getEggs = function () {
//        var self = this;
//        return resource.processResponse($http.get(resource.resourceUrl(this.id) + '/eggs')).then(function (eggs) {
//            self.eggs = eggs;
//            return self.eggs;
//        });
//    };
    // continue from angularjs rails resource query call bit
    resource.prototype.getEggs = function () {
        var self = this;
        return resource.$get(self.$url('eggs')).then(function (eggs) {
            self.eggs = eggs;
            return self.eggs;

        });
    };

    resource.prototype.getNestObject = function() {
        var nestObject =  this;
        return nestObject;
    };
return resource;
}]);

//clientServices.factory('Nest', ['railsResourceFactory', 'railsSerializer', '$http', function (railsResourceFactory, railsSerializer, $http) {
//    var resource = railsResourceFactory({
//        url: '/api/a',
//        name: 'nest',
//        serializer: railsSerializer(function () {
//            this.resource('eggs', 'Egg');
//            this.nestedAttribute('eggs');
//
//        })
//    });
////    resource.findByTraineeId = function (employeeId) {
////           return resource.query({trainee_id: employeeId});
////        };
////    resource.prototype.getEggs = function (eggId) {
////        return resource.query({nest_id: eggId});
////        };
////    resource.prototype.getReferences = function () {
////        var self = this;
////        return resource.processResponse($http.get(resource.resourceUrl(this.id) + '/references')).then(function (references) {
////            self.references = references;
////            return self.references;
////        });
////    };
////    resource.prototype.getEggs = function () {
////        var self = this;
////        return resource.processResponse($http.get(resource.resourceUrl(this.id))).then(function (eggs) {
////            self.eggs = eggs;
////            return self.eggs;
////        });
////    };
////    resource.prototype.getEggs = function () {
////        return Egg.get(this.nestId);
////        console.log(this.nestId);
////    };
////    resource.prototype.getEggs = function () {
////        return Egg.query();
////        console.log(this.nestId);
////    };
//    // continue from angularjs rails resource query call bit
//    return resource;
//}]);



clientServices.factory('Expense', ['railsResourceFactory', 'railsSerializer', function (railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        url: '/api/expenses',
        name: 'expense',
        serializer: railsSerializer(function () {
            this.resource('taxes', 'Tax');
        }),
        serializer: railsSerializer(function () {
            this.resource('concession_types', 'Concession_type');
        })
    });
}]);

clientServices.factory('Contact', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/contacts',
        name: 'contact'
    });
}]);
clientServices.factory('Payment_type', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/payment_types',
        name: 'payment_type'
    });
}]);
clientServices.factory('Concession_type', ['railsResourceFactory', 'railsSerializer', function (railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        url: '/api/concession_types',
        name: 'concession_type',
        serializer: railsSerializer(function () {
            this.nestedAttribute('Invoice');
        })
    });
}]);
clientServices.factory('Business', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/businesses',
        name: 'business'
    });
}]);
clientServices.factory('Billable_item', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/billable_items',
        name: 'billable_item'
    });
}]);
clientServices.factory('Consult', ['railsResourceFactory', 'Patient', 'Appointment', function (railsResourceFactory, Patient, Appointment) {
    var resource = railsResourceFactory({
        url: '/api/consults',
        name: 'consult'
    });
    resource.prototype.getPatient = function () {
        return Patient.get(this.patientId)
    };
    resource.prototype.getAppointment = function () {
        return Appointment.get(this.appointmentId)
    };
    return resource;
}]);

clientServices.factory('Test', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/tests',
        name: 'test'
    });
}]);
//clientServices.factory('Invoice', ['railsResourceFactory', 'railsSerializer', '$http', 'Line', function (railsResourceFactory, railsSerializer, $http, Line) {
//    var resource = railsResourceFactory({
//        url: '/api/invoices',
//        name: 'invoice',
//        serializer: railsSerializer(function () {
//            this.resource('lines', 'Line');
//            this.nestedAttribute('lines');
//
//        }),
//
//    });
//
//    resource.prototype.getLines = function () {
//        var self = this;
//        return resource.$get(self.$url('lines')).then(function (lines) {
//            self.lines = lines;
//            return self.lines;
//
//        });
//    };
//    return resource;
//}]);
clientServices.factory('Invoice', ['railsResourceFactory', 'railsSerializer', '$http', 'Procurator', 'Widget', function (railsResourceFactory, railsSerializer, $http, Procurator, Widget) {
    var resource = railsResourceFactory({
        url: '/api/invoices',
        name: 'invoice',
        serializer: railsSerializer(function () {
            this.resource('procurators', 'Procurator');
            this.nestedAttribute('procurators');

        }),

    });

    resource.prototype.getProcurators = function () {
        var self = this;
        return resource.$get(self.$url('procurators')).then(function (procurators) {
            self.procurators = procurators;
            return self.procurators;

        });
    };
    resource.prototype.getWidgets = function () {
        var self = this;
        return resource.$get(self.$url('widgets')).then(function (widgets) {
            self.widgets = widgets;
            return self.widgets;

        });

    };
    resource.prototype.getPayments = function () {
        var self = this;
        return resource.$get(self.$url('payments')).then(function (payments) {
            self.payments = payments;
            return self.payments;

        });

    };
    return resource;
}]);
clientServices.factory('Recipient', ['railsResourceFactory', function (railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/recipients',
        name: 'recipient'
    });
}]);
clientServices.factory('Consumer', ['railsResourceFactory', 'railsSerializer', '$http', 'Merchandise', 'Bid', 'Ticket', 'Wish', 'Claim', function (railsResourceFactory, railsSerializer, $http, Merchandise, Bid, Ticket, Wish, Claim) {
//    return railsResourceFactory({
//        url: '/api/consumers',
//        name: 'consumer'
//    });
    var resource = railsResourceFactory({
        url: '/api/consumers',
        name: 'consumer',
        serializer: railsSerializer(function () {
            this.resource('merchandises', 'Merchandise');
            this.nestedAttribute('merchandises');
            this.resource('bids', 'Bid');
            this.nestedAttribute('bids');
            this.resource('tickets', 'Ticket');
            this.nestedAttribute('tickets');
            this.resource('wishes', 'Wish');
            this.nestedAttribute('wishes');
            this.resource('claims', 'Claim');
            this.nestedAttribute('claims');

        })
    });
    resource.prototype.getMerchandises = function () {
        var self = this;
        return resource.$get(self.$url('merchandises')).then(function (merchandises) {
            self.merchandises = merchandises;
            return self.merchandises;

        });
    };
    resource.prototype.getBids = function () {
        var self = this;
        return resource.$get(self.$url('bids')).then(function (bids) {
            self.bids = bids;
            return self.bids;

        });
    };
    resource.prototype.getTickets = function () {
        var self = this;
        return resource.$get(self.$url('tickets')).then(function (tickets) {
            self.tickets = tickets;
            return self.tickets;

        });
    };
    resource.prototype.getWishes = function () {
        var self = this;
        return resource.$get(self.$url('wishes')).then(function (wishes) {
            self.wishes = wishes;
            return self.wishes;

        });
    };
    resource.prototype.getClaims = function () {
        var self = this;
        return resource.$get(self.$url('claims')).then(function (claims) {
            self.claims = claims;
            return self.claims;

        });
    };
    resource.prototype.getUserId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.userId);
        //  return  Nest.get(this.nestId)
        return this.userId;
    };
    return resource;

}]);
clientServices.factory('Category', ['railsResourceFactory', 'railsSerializer', '$http', 'Merchandise', function (railsResourceFactory, railsSerializer, $http, Merchandise) {
//    return railsResourceFactory({
//        url: '/api/consumers',
//        name: 'consumer'
//    });
    var resource = railsResourceFactory({
        url: '/api/categories',
        name: 'category',
        serializer: railsSerializer(function () {
            this.resource('merchandises', 'Merchandise');
            this.nestedAttribute('merchandises');

        })
    });
    resource.prototype.getMerchandises = function () {
        var self = this;
        return resource.$get(self.$url('merchandises')).then(function (merchandises) {
            self.merchandises = merchandises;
            return self.merchandises;

        });
    };

    return resource;

}]);
clientServices.factory('Merchandise', ['railsResourceFactory', 'railsSerializer', '$http', 'Bid', 'Ticket', 'Wish', 'Claim', function (railsResourceFactory, railsSerializer, $http, Bid, Ticket, Wish, Claim) {
    var resource = railsResourceFactory({
        url: '/api/merchandises',
        name: 'merchandise',
        serializer: railsSerializer(function () {
            this.resource('bids', 'Bid');
            this.nestedAttribute('bids');
            this.resource('tickets', 'Ticket');
            this.nestedAttribute('tickets');
            this.resource('wishes', 'Wish');
            this.nestedAttribute('wishes');
            this.resource('claims', 'Claim');
            this.nestedAttribute('claims');
        })
    });
    resource.prototype.getConsumerId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.consumerId);
        //  return  Nest.get(this.nestId)
        return this.consumerId;
    };
    resource.prototype.getCategoryId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.categoryId);
        //  return  Nest.get(this.nestId)
        return this.categoryId;
    };
    resource.prototype.getBids = function () {
        var self = this;
        return resource.$get(self.$url('bids')).then(function (bids) {
            self.bids = bids;
            return self.bids;

        });
    };
    resource.prototype.getTickets = function () {
        var self = this;
        return resource.$get(self.$url('tickets')).then(function (tickets) {
            self.tickets = tickets;
            return self.tickets;

        });
    };
    resource.prototype.getWishes = function () {
        var self = this;
        return resource.$get(self.$url('wishes')).then(function (wishes) {
            self.wishes = wishes;
            return self.wishes;

        });
    };
    resource.prototype.getClaims = function () {
        var self = this;
        return resource.$get(self.$url('claims')).then(function (claims) {
            self.claims = claims;
            return self.claims;

        });
    };
    return resource;
}]);
//clientServices.factory('User', ['railsResourceFactory', 'railsSerializer', 'Consumer', '$http', function (railsResourceFactory, railsSerializer, Consumer, $http) {
//    var resource = railsResourceFactory({
//        url: '/api/users',
//        name: 'user',
//        serializer: railsSerializer(function () {
//            this.resource('consumers', 'Consumer');
//            this.nestedAttribute('consumers');
//        })
//    });
//    resource.prototype.getConsumers = function () {
//        var self = this;
//        return resource.$get(self.$url('consumers')).then(function (consumers) {
//            self.consumers = consumers;
//            return self.consumers;
//
//        });
//    };
//    return resource;
//}]);

clientServices.factory('User', ['railsResourceFactory', 'railsSerializer', '$http', 'Consumer', function (railsResourceFactory, railsSerializer, $http, Consumer) {
//    return railsResourceFactory({
//        url: '/api/consumers',
//        name: 'consumer'
//    });
    var resource = railsResourceFactory({
        url: '/api/users',
        name: 'user',
        serializer: railsSerializer(function () {
            this.resource('consumers', 'Consumer');
            this.nestedAttribute('consumers');

        })
    });
    resource.prototype.getConsumers = function () {
        var self = this;
        return resource.$get(self.$url('consumers')).then(function (consumers) {
            self.consumers = consumers;
            return self.consumers;

        });
    };

    return resource;

}]);
clientServices.factory('Bid', ['railsResourceFactory', 'railsSerializer', '$http', 'Ticket', function (railsResourceFactory, railsSerializer, $http, Ticket) {
    var resource = railsResourceFactory({
        url: '/api/bids',
        name: 'bid',
        serializer: railsSerializer(function () {
            this.resource('tickets', 'Ticket');
            this.nestedAttribute('tickets');

        })
    });
    resource.prototype.getConsumerId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.consumerId);
        //  return  Nest.get(this.nestId)
        return this.consumerId;
    };
    resource.prototype.getMerchandiseId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.merchandiseId);
        //  return  Nest.get(this.nestId)
        return this.merchandiseId;
    };
    resource.prototype.getTickets = function () {
        var self = this;
        return resource.$get(self.$url('tickets')).then(function (tickets) {
            self.tickets = tickets;
            return self.tickets;

        });
    };
    return resource;
}]);
clientServices.factory('Claim', ['railsResourceFactory', 'railsSerializer', '$http', function (railsResourceFactory, railsSerializer, $http) {
    var resource = railsResourceFactory({
        url: '/api/claims',
        name: 'claim',

    });
    resource.prototype.getConsumerId = function () {

        console.log("consumer object =");
        console.log(this);
        console.log(this.consumerId);
        //  return  Nest.get(this.nestId)
        return this.consumerId;
    };
    resource.prototype.getMerchandiseId = function () {

        console.log("merchandise object =");
        console.log(this);
        console.log(this.merchandiseId);
        //  return  Nest.get(this.nestId)
        return this.merchandiseId;
    };

    return resource;
}]);
clientServices.factory('Ticket', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/api/tickets',
        name: 'ticket'
    });
    resource.prototype.getConsumerId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.consumerId);
        //  return  Nest.get(this.nestId)
        return this.consumerId;
    };
    resource.prototype.getMerchandiseId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.merchandiseId);
        //  return  Nest.get(this.nestId)
        return this.merchandiseId;
    };
    resource.prototype.getBidId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.bidId);
        //  return  Nest.get(this.nestId)
        return this.bidId;
    };
    return resource;
}]);
clientServices.factory('Wish', ['railsResourceFactory', function (railsResourceFactory) {
    var resource = railsResourceFactory({
        url: '/api/wishes',
        name: 'wish'
    });
    resource.prototype.getConsumerId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.consumerId);
        //  return  Nest.get(this.nestId)
        return this.consumerId;
    };
    resource.prototype.getMerchandiseId = function () {

        console.log("patient object =");
        console.log(this);
        console.log(this.merchandiseId);
        //  return  Nest.get(this.nestId)
        return this.merchandiseId;
    };
    return resource;
}]);
clientServices.factory('Session', function($location, $http, $q) {
    // Redirect to the given url (defaults to '/')

    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }
    var service = {
        login: function(email, password) {
            return $http.post('/login', {user: {email: email, password: password} })
                .then(function(response) {
                    service.currentUser = response.data.user;
                    if (service.isAuthenticated()) {
                        //TODO: Send them back to where they came from

                        //$location.path(response.data.redirect);

                        $location.path('/record');
                    }
                });
        },

        logout: function(redirectTo) {
            $http.post('/logout').then(function() {
                service.currentUser = null;
                redirect(redirectTo);
            });
        },

        register: function(email, password, confirm_password) {
            return $http.post('/users.json', {user: {email: email, password: password, password_confirmation: confirm_password} })
                .then(function(response) {
                    service.currentUser = response.data;
                    if (service.isAuthenticated()) {
                        $location.path('/record');
                    }
                });
        },
        requestCurrentUser: function() {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                return $http.get('/current_user').then(function(response) {
                    service.currentUser = response.data.user;
                    return service.currentUser;
                });
            }
        },

        currentUser: null,

        isAuthenticated: function(){
            return !!service.currentUser;
        }
    };
    return service;
});

//Create a rails resource factory for every model that needs to sync.
// Tells rails resource factory to automatically implemetn the RESTful routes
// dont have to manually set urls
//clientServices.factory('AppointmentService', ['$resource',
//  function($resource){
//    return $resource('Appointments/:appointmentId.json', {}, {
//      query: {method:'GET', params:{appointmentId:'appointments'}, isArray:true}
//        });
//    }]);

//clientServices.factory('patientData', ['$http',
//    function($http) {
//        var patientData;
//        patientData = {
//            data: {
//                  patients: [
//                    {
//                        FirstName: 'Loading',
//                        LastName: ''
//                    }
//                ]
//            },
//            isLoaded: false
//        };
//        patientData.loadPatients = function(deferred) {
//            if (!patientData.isLoaded) {
//                return $http.get('/api/patients.json').success(function(data) {
//                    patientData.data.patients = data;
//                    patientData.isLoaded = true;
//                    console.log('Successfully loaded patients.');
//                    if (deferred) {
//                        return deferred.resolve();
//                    }
//                }).error(function() {
//                        console.error('Failed to load patients.');
//                        if (deferred) {
//                            return deferred.resolve();
//                        }
//                    });
//            } else {
//                if (deferred) {
//                    return deferred.resolve();
//                }
//            }
//        };
//
//        patientData.createPatient = function(newPatient) {
//            var data;
//            if (newPatient.newPatientFirstName === '' || newPatient.newPatientLastName === '') {
//                alert('Neither the Title nor the Body are allowed to be left blank.');
//                return false;
//            }
//            data = {
//                new_patient: {
//                    FirstName: newPatient.newPatientFirstName,
//                    LastName: newPatient.newPatientLastName
//                }
//            };
//            $http.post('./api/patients', data).success(function(data) {
//                patientData.data.patients.push(data);
//                return console.log('Successfully created patient.');
//            }).error(function() {
//                    return console.error('Failed to create new patient.');
//                });
//            return true;
//        };
//    return patientData;
//    }])
//clientServices.factory('istemplateNameAvailable', function($q, $http) {
//    return function(templateName) {
//        var deferred = $q.defer();
//
//        $http.get('/api/templates/' + templateName).then(function() {
//            // Found the user, therefore not unique.
//            deferred.reject();
//        }, function() {
//            // User not found, therefore unique!
//            deferred.resolve();
//        });
//
//        return deferred.promise;
//    }
//});

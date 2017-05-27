angular.module('clientApp')
    .controller('AppointmentsController', ['$scope', '$timeout', '$http', '$resource', '$location', '$routeParams', 'uiCalendarConfig', 'Appointment', 'Doctor', 'Patient', '$modal', function ($scope, $timeout, $http, $resource, $location, $routeParams, uiCalendarConfig, Appointment, Doctor, Patient, $modal) {


        $scope.doctor2Id = {};
        $scope.doctor = new Doctor();
        Doctor.query().then(function (doctors) {
            $scope.doctors = doctors;
        });
        $scope.patient = new Patient();
        Patient.query().then(function (patients) {
            $scope.patients = patients;
        });
        $scope.appointment = new Appointment();
        $scope.appointments = [];

        Appointment.query().then(function (Appointments) {
            $scope.appointments = Appointments;
//            $scope.eventSources.events = [Appointments];
//            $scope.appts.fullCalendar('refetchEvents');
        });

        $scope.trial = function (Appointment) {
            Appointment.query().then(function (Appointments) {
                $scope.appointments = Appointments;
            });
            console.log(Appointments);
        };
//        $scope.formData = {
//            appointmentStartTime: '',
//            appointmentEndTime: '',
//            appointmentPatientName: '',
//            appointmentDoctorName: '',
//            appointmentStartDate: '',
//            appointmentEndDate: '',
//            appointmentId: ''
//        };
        angular.extend($scope.appointment, {
            startTime: "",
            endTime: "",
            patient_id: Number(),
            doctor_id: Number(),
            patient_name: "",
            startDate: "",
            endDate: "",
            attended: Boolean(),
            fail: Boolean(),
            name: ""



        });
        $scope.createAppointment = function () {
//            $scope.appointment.doctor_id = $scope.appointment.doctor.id;
            $scope.appointment.doctor_id = $scope.doctor.test.id;
            $scope.appointment.doctor_name = $scope.doctor.test.name
            $scope.appointment.patient_id = $scope.patient.test.id;
//            $scope.appointment.patient_name = $scope.patient.test.firstName;

    //            console.log($scope.appointment.test.name, $scope.doctor.test.firstName, $scope.doctor.test, $scope.doctor.test.id, $scope.patient.test.id);
            debugger;
            $scope.appointment.end_date = $scope.appointment.start_date;
            debugger;
            $scope.appointment.create()
                .then(function (response) {
                    debugger;
                    console.log("SUCCESS", response);
                })
                .catch(function (response) {
                    console.log("FAILURE!", response);
                });
        };
        // would generate a PUT to /stores/123/items/1

        // NOTE: TRY DOING A scope.update FUNCTION LIKE PRODUCTS.JS

        $scope.updateAppointment = function (appointment) {
            var updatedAppointment = _.find($scope.appointments, {'id': selectedAppointment.id});
            $scope.appointment.update(appointment)
                .then(function (response) {
                    console.log("SUCCESS", response);
                })
                .catch(function (response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.destroyAppointment = function () {
            $scope.appointment.delete()
                .then(function (response) {
                    console.log("SUCCESS", response);
                })
                .catch(function (response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.createAppointmentModal = function (size) {

            var modalInstance = $modal.open({

                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, appointment) {
//                    $('#timepicker2').timepicker();
                    $('#createModal #timepicker2').timepicker({
                        minuteStep: 1,
                        template: 'modal',
                        appendWidgetTo: 'body',
                        showSeconds: true,
                        showMeridian: false,
                        defaultTime: false
                    });
                    $scope.my = {
                        time: new Date()
                    };
                    $scope.ismeridian = false;
                    $scope.hstep = 1;
                    $scope.mstep = 5;


                    $scope.appointment = new Appointment();
                    $scope.doctor = new Doctor();
                    Doctor.query().then(function (doctors) {
                        $scope.doctors = doctors;
                    });

                    $scope.ok = function () {
                        $modalInstance.close($scope.appointment);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createAppointment = function () {
                        $scope.appointment.doctor_id = $scope.appointment.doctor.id;
                        $scope.appointment.end_date = $scope.appointment.start_date;
                        debugger;
                        $scope.appointment.create()
                            .then(function (response) {
                                debugger;
                                console.log("SUCCESS", response);
                            })
                            .catch(function (response) {
                                console.log("FAILURE!", response);
                            });
                    };

                },
                size: size,
                resolve: {
                    appointment: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        /* event source that contains custom events on the scope */
        $scope.events = [

            {
                title: 'Event 1',
                start: '2016-09-16',
                end: '2016-09-16',

                school: '1',
                rendering: 'background',

                color: 'green'

            },
            {
                title: 'background',
                id:    'available_hours',
                start: '2016-09-12T09:00:00',
                end:   '2016-09-12T16:00:00',
                rendering: 'background',
                backgroundColor: 'red'
//                color: 'green'

            },
            {
                title: 'Event 2',
                start: '2016-09-14',
                end: '2016-09-14',

                school: '2',
                rendering: 'background'

            },
            {
                title: 'Event 3',
                start: '2016-09-13',
                end: '2016-09-13',

                school: '1'
            },
            {
                title: 'Event 4',
                start: '2016-09-15',
                end: '2016-09-15',

            school: '2'
            },
//            console.log("$scope.events", $scope.events)

        ];

        $scope.myEvents = [
            {id: '23617', title: 'Tom Test event 22222', start: '2016-09-11'},
            {id: '1111', title: 'Filter test', start: '2016-09-11'}

        ];

//        $scope.yourEvents = [
//            {title: 'Practice', start: new Date(2016, 02, 21)}
//
//        ]

//        $scope.eventSource = function (start, end, callback) {
//            Appointment.query().then(function (Appointments) {
//                var events = [];
//                _.forEach(Appointments, function(appointment){
//                    var startTime = new Date(appointment.start_time);
//                    var endTime = new Date(appointment.end_time);
//                    var id = appointment.id;
//
//                    appointment.start = new Date(appointment.start_date);
//                    appointment.start = '2016-04-29';
//
////                    appointment.start.setHours(startTime.getHours(), startTime.getMinutes());
//                    appointment.end = new Date(appointment.end_date);
//                    appointment.end.setHours(endTime.getHours(), endTime.getMinutes());
//                    appointment.title = "appointment.id";
//                    appointment.allDay = false;
//
//                    events.push(appointment);
//                });
//
//                $scope.appointments = Appointments;
//                callback(events);
////            $scope.eventSources.events = [Appointments];
////            $scope.appts.fullCalendar('refetchEvents');
//            });
//        }

        $scope.bookingEvents = {

            url: 'api/appointments',
//            events: $scope.appointments,

            eventDataTransform: function (eventData, appointment) {

                $scope.appointment = new Appointment(appointment);
//                debugger;
                var startTime = new Date(eventData.start_time);
                var endTime = new Date(eventData.end_time);
                var id = eventData.id;
//                    var id = eventData.id;

                eventData.start = new Date(eventData.start_date);
                eventData.start.setHours(startTime.getHours(), startTime.getMinutes());
                eventData.end = new Date(eventData.end_date);
                eventData.end.setHours(endTime.getHours(), endTime.getMinutes());
                eventData.title = JSON.stringify(eventData.id);
//                eventData.title =  "JSON.stringify(eventData.id)";

//                debugger;
                eventData.allDay = false;
                timezone = 'local'


//                 if($scope.doctorId){
//                      console.log("hi", $scope.appointmentId, eventData.doctor_id)
//                if($scope.doctorId === eventData.doctor_id){
//                    console.log(eventData);
//                    debugger;
//                    return eventData;
//                }
//            }else{
//                return eventData;
//    }
//                if($scope.doctorId){
//                    // console.log("hi", $scope.appointmentId, eventData.doctor_id)
//                    if($scope.doctorId_.includes(eventData)){
//                        debugger;
//                        console.log(eventData);
//                        debugger;
//                        return eventData;
//                    }
//                }else{
//                    return eventData;
//                }
//                var inventory = [
//                    {name: 'apples', quantity: 2},
//                    {name: 'bananas', quantity: 0},
//                    {name: 'cherries', quantity: 5}
//                ];
//
//                function findCherries(fruit) {
//                    return fruit.name === 'cherries';
//                }

//                console.log(inventory.find(findCherries));
                // { name: 'cherries', quantity: 5 }
//                if($scope.testId){
//                    // console.log("hi", $scope.appointmentId, eventData.doctor_id)
////                     Reefactor doctorId to doctor because it can contain doctorId or array
//
//                    if($scope.testId == eventData.doctor_id){
//                        console.log(eventData);
//                        debugger;
//                        return eventData;
//                    }else{
//                    return eventData;
//                }

                if(testId){
//                    console.log($scope.bookingEvents);

//                    debugger;
                    // console.log("hi", $scope.appointmentId, eventData.doctor_id)
//                     Reefactor doctorId to doctor because it can contain doctorId or array
//                    var doctorHasEvents =
//                        $scope.doctorId.find(function(doctor) {
////                            debugger;
//                            return doctor == eventData.doctor_id
//                        });
//                    debugger;
                    for (var i = 0; i < testId.length; i++) {
                        if (testId[i] == eventData.doctor_id) {
                            return eventData;

                        }
//                        console.log($scope.doctorId);
                        debugger;
                    };
//                    if(result){
//                        debugger;
////                        console.log(eventData);
////                        debugger;
////                        return eventData;
////                    }
////                    else{
//
//                        return eventData;
//                    }
                }else{
                    return eventData;
                    debugger;
                }
//                if($scope.doctorId){
//                    // console.log("hi", $scope.appointmentId, eventData.doctor_id)
//                    $scope.containsObject = function(obj, list) {
//                        var i;
//                        for (i = 0; i < list.length; i++) {
//                            if (angular.equals(list[i], obj)) {
//                                return true;
//                            }
//                        }
//
//                        return false;
//                    };
//                    if(eventData.doctor_id == $scope.containsObject()){
//                        console.log(eventData);
//                        debugger;
//                        return eventData;
//                    }
//                }else{
//                    return eventData;
//                }

                //            NOTE LIMIT RETURN NUMBER!
            }
        };




        var testId = null;
        //$scope.doctorFilter = '126';
        $scope.$watch('doctorFilter', function (newVal) {
            uiCalendarConfig.calendars['appts'].fullCalendar( 'refetchEvents' );
            testId = $scope.doctorFilter;
            console.log("doctor filter", testId);
//            for (var i = 0; i < $scope.doctorId; i++) {
//                if ($scope.testId[i] == eventData.doctor_id) {
//                    return eventData;
//
//                }
//                console.log($scope.testId);
////                debugger;
//            };
        }, true);
//        $scope.doctorId = null;
//        //$scope.doctorFilter = '126';
//        $scope.$watch('doctorFilter', function (newVal) {
//            uiCalendarConfig.calendars['appts'].fullCalendar( 'refetchEvents' );
//           var newVal1 = (newVal.replace(/['"]+/g, ''))
//            $scope.doctorId = newVal1;
//            debugger;
//            console.log((newVal.replace(/['"]+/g, '')), newVal1)
//        }, true);


        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [
                {title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed']}
            ];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false},
                {type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false},
                {type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
                console.log('render was called, calendar is visible?', uiCalendarConfig.calendars[calendar].is(':visible'));
                setTimeout(function(){
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                    console.log('render was called, calendar is visible?', uiCalendarConfig.calendars[calendar].is(':visible'));
                }, 2000)
            } else {
                console.log('render was called but it did not exist in uiCalendarConfig');
            }
        };


        /* Render Tooltip */
//        $scope.eventRender = function( event, element, view ) {
//            element.attr({'tooltip': event.title,
//                'tooltip-append-to-body': true});
//            $compile(element)($scope);
//        };
//        $scope.eventRender = function eventRender(event, element, view) {
//            console.log("Test");
//            event = $scope.appointments;
//            console.log("appointments", $scope.appointments);
//            debugger;
//            return ['all', event.school].indexOf($('#school_selector').val()) >= 0;
//
//        };
        $scope.eventRender = function eventRender(event, element, view) {
            console.log("Test");
//            event = $scope.appointments;
            console.log("appointments", $scope.appointments);
//            if event.render = background then element.class(fc-bgevent)
//            jquery docs for syntax classname setting
            return element;
//            return ['all', event.school].indexOf($('#school_selector').val()) >= 0;

        };
        $scope.testfilter = function (callback) {
            console.log("AM I EVEN HERE");
            $scope.schoolFilter = '2';
            $scope.$watch('schoolFilter', function (newVal) {
                var filteredEvents;
                if (newVal === 'all') {
                    filteredEvents = $scope.events;
                } else {
                    filteredEvents = $scope.events.filter(function (event) {
                        return newVal === event.school;
                        console.log(event.school);
                        debugger;
                    });
                }
//                $scope.eventSources = [filteredEvents];
//                $scope.events = filteredEvents;
                $scope.events.splice(0, $scope.events.length);
//                for (var i = 0; i < filteredEvents.length; i++){
//                    $scope.events.push(filteredEvents[i])
//                }
                $scope.events.splice.apply($scope.events, [0,0].concat(filteredEvents));
                console.log($scope.events, event, filteredEvents);
                debugger;
                console.log(filteredEvents,"Here as well");
//                uiCalendarConfig.calendars['appts'].fullCalendar('rerenderEvents');
                debugger;
            }, true);

        };
        $scope.testfilter2 = function (callback) {
            console.log("Appointment filter", $scope.myEvents);
            debugger;
            $scope.doctorFilter = '23617';
            $scope.$watch('doctorFilter', function (newVal) {
                var filteredEvents;
                if (newVal === 'all') {
                    filteredEvents = $scope.myEvents;
                    debugger;
                } else {
                    filteredEvents = $scope.myEvents.filter(function (myEvent) {
                        return newVal === myEvent.id;
//                        console.log(appointment.doctor_id, appointment.doctorId, appointment.id,   appointment.doctorId);
                        debugger;
                    });
                }
//                $scope.eventSources = [filteredEvents];
//                $scope.events = filteredEvents;
                $scope.myEvents.splice(0, $scope.myEvents.length);
//                for (var i = 0; i < filteredEvents.length; i++){
//                    $scope.events.push(filteredEvents[i])
//                }
                $scope.myEvents.splice.apply($scope.myEvents, [0,0].concat(filteredEvents));
                console.log($scope.myEvents, filteredEvents);
                debugger;
                console.log(filteredEvents,"Here as well");
                uiCalendarConfig.calendars['appts'].fullCalendar('rerenderEvents');
                debugger;
            }, true);

        };
        $scope.testfilter3 = function (callback) {
            debugger;
            console.log("Appointment filter", $scope.appointments);
            debugger;
            for (var i in $scope.useDoctorIds) {

                $scope.useDoctorIds[i];
                i = (i.replace(/['"]+/g, ''));
                console.log(i.replace(/['"]+/g, ''), i);
                debugger;

            };
            $scope.doctorFilter = (i.replace(/['"]+/g, ''));

//            $scope.$watch('doctorFilter', function (newVal) {
//                var filteredEvents;
//                if (newVal === 'all') {
//                    filteredEvents = $scope.appointments;
//                    debugger;
//                } else {
//                    filteredEvents = $scope.appointments.filter(function (appointment) {
//                        return newVal === appointment.doctorId;
//
//                        console.log(appointment.doctorId, (newVal.replace(/['"]+/g, '')));
//
//                        debugger;
//                    });
//                }
////                $scope.eventSources = [filteredEvents];
////                $scope.events = filteredEvents;
//                console.log($scope.appointments, filteredEvents);
//                debugger;
//                $scope.appointments.splice(0, $scope.appointments.length);
////                for (var i = 0; i < filteredEvents.length; i++){
////                    $scope.events.push(filteredEvents[i])
////                }
//                $scope.appointments.splice.apply($scope.appointments, [0,0].concat(filteredEvents));
//                console.log($scope.appointments, filteredEvents);
//                debugger;
//                console.log(filteredEvents,"Here as well");
//                uiCalendarConfig.calendars['appts'].fullCalendar('refetchEvents');
//                debugger;
//            }, true);

        };
        $scope.testfilter5 = function (callback) {
            $scope.useFilterIds = {};

            $scope.$watch(function () {
                return {
                  useFilterIds: $scope.useFilterIds
                }}, function (value) {
                debugger;
                $scope.filterIdsGroup = uniqueItems(callback, 'filterId');
//                $scope.filterAfterFilterIds.test = [];

//                var filterAfterFilterIds = [];
                selected = false;
                var p = callback.id;
//                console.log($scope.useDoctorIds, p);
//                debugger;
                  $scope.filterAfterFilterIds.push(p);

//                var selected;
//                $scope.filterIdsGroup = uniqueItems(callback, 'filterId');
//                 debugger;
//                selected = false;
//
//                $scope.filterAfterFilterIds.push(callback.id);
//                debugger;



                $scope.doctorFilter = $scope.filterAfterFilterIds;
                debugger;
//
                console.log($scope.doctorFilter, $scope.filterAfterFilterIds);
//
            debugger;
//            $scope.doctorFilter = callback.id;
//            console.log($scope.doctorFilter, $scope.doctor, $scope.doctor.id)
//            debugger;
                }, true)
            $scope.$watch('filtered', function (newValue) {
                    if (angular.isArray(newValue)) {
                        console.log(newValue.length);
                    }
                },
                true);
        };
        $scope.testfilter6 = function (callback) {
            $scope.doctorFilter = callback.id;
            debugger;
            console.log($scope.doctorFilter, $scope.doctor, $scope.doctor.id)
            debugger;
        };

        $scope.testfilter4 = function (callback) {
            console.log("Appointment filter", $scope.appointments);
            debugger;
            $scope.doctorFilter = 125;
//            $scope.$watch('doctorFilter', function (newVal) {
//                var filteredEvents;
//                if (newVal === 'all') {
//                    filteredEvents = $scope.appointments;
//                    debugger;
//                } else {
//                    filteredEvents = $scope.appointments.filter(function (appointment) {
//                        return newVal === appointment.doctorId;
//                        console.log(appointment.doctorId);
//
//                        debugger;
//                    });
//                }
////                $scope.eventSources = [filteredEvents];
////                $scope.events = filteredEvents;
//                console.log($scope.appointments, filteredEvents);
//                 debugger;
//                $scope.appointments.splice(0, $scope.appointments.length);
////                for (var i = 0; i < filteredEvents.length; i++){
////                    $scope.events.push(filteredEvents[i])
////                }
//                $scope.appointments.splice.apply($scope.appointments, [0,0].concat(filteredEvents));
//                console.log($scope.appointments, filteredEvents);
//                debugger;
//                console.log(filteredEvents,"Here as well");
//                uiCalendarConfig.calendars['appts'].fullCalendar('refetchEvents');
//                debugger;
//            }, true);

        };
        $scope.test = function (appts) {
            uiCalendarConfig.calendars['appts'].fullCalendar('rerenderEvents');
            debugger;
            console.log("event render test")
        };
        /* config object */
        var t = '<div class="modal-header">' +
            '<h1>This is the title</h1>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>Enter a value to pass to <code>close</code> as the result: <input ng-model="result" /></p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button ng-click="close(result)" class="btn btn-primary" >Close</button>' +
            '</div>';

//        $scope.showEditVisitDialog = function (event) {
//            console.log("entered function");
//            var editVisitDialogOpts = {
//                template: t,
//                controller: 'AppointmentsController'
//            };
//            var editVisitDialog = $modal.dialog(editVisitDialogOpts);
//            editVisitDialog.open().then(function () {
//                console.log("closed")
//            });
//        };

        $scope.update = function (size, selectedAppointment, selectedEvent, appointment, Appointment,selectedX) {
            $scope.appointment = selectedAppointment;
            console.log("Hello", Appointment, appointment, selectedAppointment);
            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                resolve: {
                    appt: function () {
                        return selectedAppointment;
                    },
                    Appointment: function () {
                        return selectedAppointment;
                    },
                    X: function() {
                        return selectedX;
                    }

//                    appointmentPatientName: function () {
//                        return selectedAppointment.patient_name;
//                    },
//                    appointmentId: function () {
//                        return selectedAppointment.id;
//                    },
//                    appointmentStartTime: function () {
//                        return selectedAppointment.start_time;
//                    }
                },

                controller: function ($scope, $modalInstance, Appointment, appt) {
                    $scope.appointment = appointment;
                    $scope.appointment = Appointment;

                    console.log($scope.event);
                    console.log($scope.appointment, Appointment, Appointment.id);


                    $scope.ok = function () {
                        $modalInstance.close($scope.appointment);
                        console.log("SUCCESS", $scope.appointment);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.updateAppointment = function (Appointment) {
                        $scope.x = "1";
                        X = $scope.x;
                        x = $scope.x;
                        $modalInstance.close(Appointment, {x:"1"}, x, X, {updateAppointment:true});
                        debugger;

                    };
                    $scope.testUpdate = function () {
//                        console.log(Appointment, $scope.appointment);
////                        Appointment.get(Appointment).then(function (appointment) {
////                            appointment.update();
////                        });
//                        $scope.appointment.get({id: Appointment.id}).update();
//                        console.log(Appointment.id)
//                        $scope.appointment,
//                            Appointment,
                            console.log($scope.appointment, Appointment, Appointment.id);
                        debugger;
                    };
                    $scope.updateAll = function () {
                        console.log($scope.appointment);

                        angular.forEach($scope.appointment, function (appointment) {
//                            $scope.appointment = Appointment;
                            $scope.appointment = appointment;

//                    $scope.procurator.$$hashkey = "object:5";
//                console.log('SPLIT', $scope.invoice.procurators);
                            console.log(JSON.stringify(appointment, $scope.appointment));
//                    $scope.procurator.update(procurator)
//                        .then(function(response) {
//                            console.log("SUCCESS", response);
//                        })
//                        .catch(function(response) {
//                            console.log("FAILURE!", response);
//                        });
                            new Appointment({id: appointment.id}).update();
//                    Widget.get({id: 1})

                        })
                    };

                    $scope.destroyAppointment = function () {
                        console.log(Appointment)
                        // Handle update
                        var updatedAppointment = _.find($scope.appointments, {'id': Appointment});
                debugger;
                        // 1)  angular.extend() or angular.merge()
                        // 2) Get rid of the full calendar request
                        console.log($scope.appointment);
                debugger;
                        updatedAppointment.delete()
                            .then(function (response) {
                                console.log($scope.appointment);
                                console.log("SUCCESS", response);
                            })
                            .catch(function (response) {
                                console.log("FAILURE!", response);
                            });
                        }
                },
                size: size
            });

            modalInstance.result.then(function (selectedAppointment, opts, x, selectedX) {
                debugger;

                // Handle update
                var updatedAppointment = _.find($scope.appointments, {'id': selectedAppointment.id});
                x = $scope.x;
                debugger;
                // 1)  angular.extend() or angular.merge()
                // 2) Get rid of the full calendar request
                console.log($scope.appointment);
//                debugger;
                updatedAppointment.endTime = $scope.appointment.end_time;
                updatedAppointment.update()
                    .then(function (response) {
                        console.log($scope.appointment);
                        console.log("SUCCESS", response);
                    })
                    .catch(function (response) {
                        console.log("FAILURE!", response);
                    });
                debugger;
                $scope.selected = selectedAppointment;
                $scope.appointment = selectedAppointment;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.update2 = function (appointment) {
            $scope.isPopup2Visible = true;
            $scope.isPopup3Visible = false;
            $scope.appointment = appointment;
            Patient.get({id:$scope.appointment.patientId}).then(function(patient){
              debugger;
               $scope.patient = patient;
                console.log(patient)
            });
        };

        $scope.create2 = function () {
            $scope.appointment = new Appointment;
            $scope.isPopup3Visible = true;
            $scope.isPopup2Visible = false;
        };

        $scope.update3 = function(size, selectedAppointment, selectedEvent, appointment, Appointment) {
            $scope.isPopup2Visible = true;
            $scope.isPopup4Visible = true;
            $scope.isPopup5Visible = false;
            $scope.isPopup7Visible = true;
            $scope.isPopup3Visible = false;
            $scope.appointment = appointment;
            $scope.appointment = selectedAppointment;
//            $scope.doctor.test = $scope.appointment.doctor_name;
            debugger;
            $scope.changedoctor = function() {
                $scope.isPopup5Visible = true;
                $scope.isPopup4Visible = false;

            };
            $scope.revertdoctor = function() {
                $scope.isPopup5Visible = false;
                $scope.isPopup4Visible = true;

            };
            $scope.changepatient = function() {
                $scope.isPopup6Visible = true;
                $scope.isPopup7Visible = false;

            };
            $scope.revertpatient = function() {
                $scope.isPopup6Visible = false;
                $scope.isPopup7Visible = true;

            };
            Patient.get({id:$scope.appointment.patient_id}).then(function(patient){
                $scope.patient = patient;
                console.log(patient);
                debugger;

            });
            var updatedAppointment = _.find($scope.appointments, {'id': selectedAppointment.id});

//            debugger;
            $scope.testupdateAppointment3 = function (appointment) {

                    if (angular.isUndefined($scope.doctor.test)){
                        $scope.doctor.test = [];
                        $scope.doctor.test.id = $scope.appointment.doctor_id;
                        $scope.doctor.test.name = $scope.appointment.doctor_name};
                    if (angular.isUndefined($scope.patient.test)){
                    $scope.patient.test = [];
                    $scope.patient.test.id = $scope.appointment.patient_id;
                    $scope.patient.test.firstName = $scope.appointment.patientName}
//                }
//                function goToResults() {
//                    if($scope.doctor.test === undefined) {
//                      $scope.doctor.test = appointment
//                    }
//                }
                console.log($scope.doctor.test);
                debugger;
//                $scope.doctor.test = {};

//                debugger;
                updatedAppointment.startTime = $scope.appointment.start_time;
                updatedAppointment.endTime = $scope.appointment.end_time;
                updatedAppointment.startDate = $scope.appointment.start_date;
                updatedAppointment.endDate = $scope.appointment.start_date;
                updatedAppointment.doctorId = $scope.doctor.test.id;
                updatedAppointment.doctorName = $scope.doctor.test.name;
                updatedAppointment.doctor_name = $scope.doctor.test.name;
                updatedAppointment.patientId = $scope.patient.test.id;
                updatedAppointment.patientName = $scope.patient.test.firstName;
                updatedAppointment.patient_name = $scope.patient.test.firstName;
                updatedAppointment:doctorFirst = $scope.patient.test.firstName;
                console.log($scope.patient.test.firstName, updatedAppointment.patientName, updatedAppointment.patient_name);
                debugger;
                updatedAppointment.attended = $scope.appointment.attended;
                updatedAppointment.fail = $scope.appointment.fail;

                updatedAppointment.update()
                    .then(function (response) {
                        console.log($scope.appointment);
                        console.log("SUCCESS", response);
                    })
                    .catch(function (response) {
                        console.log("FAILURE!", response);
                    });
//                debugger;
            };
            $scope.testupdateAppointment2 = function () {
                updatedAppointment.startTime = $scope.appointment.start_time;
                updatedAppointment.endTime = $scope.appointment.end_time;
                updatedAppointment.startDate = $scope.appointment.start_date;
                updatedAppointment.endDate = $scope.appointment.start_date;
//                updatedAppointment.doctor_name = $scope.appointment.doctor_name;

                updatedAppointment.attended = $scope.appointment.attended;
                updatedAppointment.fail = $scope.appointment.fail;

                updatedAppointment.update()
                    .then(function (response) {
                        console.log($scope.appointment);
                        console.log("SUCCESS", response);
                    })
                    .catch(function (response) {
                        console.log("FAILURE!", response);
                    });
//                debugger;
            };
            $scope.testdeleteAppointment = function () {
                updatedAppointment.delete()
                    .then(function (response) {
                        console.log($scope.appointment);
                        console.log("SUCCESS", response);
                    })
                    .catch(function (response) {
                        console.log("FAILURE!", response);
                    });
            }
        }
        $scope.showCreateVisitDialog = function (size, selectedAppointment, eventData) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Appointment) {

                    $scope.appointment = new Appointment();

                    $scope.ok = function () {
                        $modalInstance.close($scope.appointment);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createAppointment = function () {
                        debugger;
                        $scope.appointment.create()
                            .then(function (response) {
                                debugger;
                                console.log("SUCCESS", response);
                            })
                            .catch(function (response) {
                                console.log("FAILURE!", response);
                            });
                    };

                },
                size: size,
                resolve: {
                    appointment: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

//            var editVisitDialogOpts = {
//                template: t,
//                controller: 'TestDialogController'
//            };
//            var editVisitDialog = $dialog.dialog(editVisitDialogOpts);
//            editVisitDialog.open().then(function () {
//                console.log("closed")
//            });
//        };
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
//                eventClick: function(event) {
//                    $scope.update('sm', event)},

                eventClick: function (appointment) {
                    $scope.isPopup3visible = false;
                    $scope.update3('sm', appointment, Appointment)
                    console.log(appointment, Appointment)
                },

//                eventClick:  function(event, jsEvent, calEvent, view, start, end, allDay, appointment) {
//                    var appointment = event;
//                    var id = event['id'];
//                    endtime = $.fullCalendar.formatDate(event.end,'h:mm tt');
//                    starttime = $.fullCalendar.formatDate(event.start,'hh:mm tt');
////                    appointment = $.fullCalendar(data);
//                    var mywhen = starttime + ' - ' + endtime;
//
//                    $('#modalTitle').html(event.start, event.end);
//                    $('#modalBody').html(event.description);
//                    $('#fullCalModal #appointmentId').val(calEvent.title);
//                    $('#fullCalModal #eventUrl').val(id);
//                    $('#fullCalModal #appointmentStartTime').val(starttime);
//                    $('#fullCalModal #apptEndTime').val(endtime);
//                    $('#fullCalModal #apptAllDay').val(allDay);
//                    $('#fullCalModal #when').text(mywhen);
//                    $('#fullCalModal #dialog').html(event.end);
//                    $('#fullCalModal #update').html({buttons: {
//
//                        UPDATE: function(data) {
//                            $(this).load('/appointments/'+calEvent.id+'/edit');
//                            console.log("hi", eventData)
//                        }
//
//                    }});
//
//
//                        $('#fullCalModal').modal('show', appointment);
//                    $('#calendar').fullCalendar('update', appointment);
//
//
//                },
//                eventClick: function(appointment, calEvent, view, start, end, event){
//                    endtime = $.fullCalendar.formatDate(end,'h:mm tt');
//                    starttime = $.fullCalendar.formatDate(start,'hh:mm tt');
//                    $('#updateModal.html #appointmentStartTime').val(starttime);
//                    $scope.$apply(function(appointment){
//                            $scope.update(appointment)
//                        }
//                    );
//
//                },
//                select: function(start, end, allDay) {
//                    endtime = $.fullCalendar.formatDate(end,'hh:mm tt');
//                    starttime = $.fullCalendar.formatDate(start,'hh:mm tt');
//                    datetime = $.fullCalendar.formatDate(start,'yyyy-MM-dd');
//
//                    var mywhen = starttime + ' - ' + endtime;
//                    $('#createEventModal #appointmentStartTime').val(starttime);
//                    $('#createEventModal #appointmenttEndTime').val(endtime);
//                    $('#createEventModal #apptEndTime').val(endtime);
//
//                    $('#createEventModal #apptAllDay').val(datetime);
//                    $('#createEventModal #when').text(mywhen);
//                    $('#createEventModal').modal('show');
//                    console.log(endtime, starttime, datetime);
//
//                },
                select: function () {
//                    $scope.createAppointmentModal('sm');
//                    starttime = $.fullCalendar.formatDate(start, 'h:mm tt');
//                    endtime = $.fullCalendar.formatDate(end, 'h:mm tt');
                    $scope.create2();
                },

//                Note that the below one kind of works to display data, but not in a modal
//                Use as example for how to get data into modal
//                eventClick: function(event){
//                $("<div>").dialog({ modal: true, title: event.start, width:350});
//                },
//                eventClick: function(event){
//                    $('<div>' +
//                        '<h1>This is the title</h1>' +
//                        '</div>' +
//                        '<div class="modal-body">' +
//                        '<p>Enter a value to pass to <code>close</code> as the result: <input ng-model="result" /></p>' +
//                        '<p>{{event.start}}/p>' +
//                        '</div>' +
//                        '<div class="modal-footer">' +
//                        '<button ng-click="close(result)" class="btn btn-primary" >Close</button>' +
//                        '</div>').dialog({
//                            resizable: false,
//                            height:300,
//                            width:500,
//                            modal: true,
//                            position: top,
//                            title: 'Appointment',
//                            start: event.start,
//                            buttons: {
//                                CLOSE: function() {
//                                    $("#dialog").dialog( "close" );
//                                },
//                                DELETE: function(data) {
//                                    $.post('/appointments/'+calEvent.id+'/destroy', {"appointment_id": calEvent.id},
//                                        $("#appointment_id").id,
//                                        function(data){
//                                            $('#calendar').fullCalendar("removeEvents", (data));
//                                            $('#calendar').fullCalendar("rerenderEvents");
//                                        });
//                                },
//                                CHECKIN: function(data) {
//                                    $.post('/line_items/'+calEvent.id+'/create', {"appointment_id": calEvent.id},
//                                        $("#line_item_id").id,
//                                        function(data){
//                                            $('#calendar').fullCalendar("removeEvents", (data));
//                                            $('#calendar').fullCalendar("rerenderEvents");
//                                        });
//                                },
//                                UPDATE: function(data) {
//                                    $(this).load('/appointments/'+calEvent.id+'/edit');
//                                }
//                            }
//                        });

                // change the border color just for fun
//                    $(this).css('border-color', 'red');
//                },
//                dayClick: function(){
//                    $scope.$apply(function(){
//                            $scope.showCreateVisitDialog()
//                        }
//                    );
//                },

                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                defaultView: 'agendaWeek',
                doctorsSource: '/api/doctors',
                resource: '/api/appointments',
                businessHours:[
                    {
                        start: '09:00',
                        end: '13:00',
                        dow: [1, 2]
                    },
                    {
                        start: '14:00',
                        end: '16:00',
                        dow: [1, 2]
                    },
                    {
                        start: '10:00',
                        end: '19:00',
                        dow: [4]
                    },
                    {
                        start: '06:00',
                        end: '10:30',
                        dow: [6]
                    },
                    {
                        start: '13:00',
                        end: '17:00',
                        dow: [6]
                    },
                    {
                        start: '20:00',
                        end: '23:00',
                        dow: [6]
                    }
                ],

//                doctorsSource: '/doctors/list',
//                eventSources: [
//                    {url: '/api/appointments'
//                    }
//                ],
//                eventDataTransform: function( eventData ) {
//                    var startTime = new Date(eventData.start_time);
//                    var endTime = new Date(eventData.end_time);
//
//
//                    eventData.start = new Date(eventData.start_date);
//                    eventData.start.setHours(startTime.getHours(), startTime.getMinutes());
//                    eventData.end = new Date(eventData.end_date);
//                    eventData.end.setHours(endTime.getHours(), endTime.getMinutes());
//                    eventData.title = "string"
//
//                    console.log("hi", eventData)
//                    return eventData;
//                  NOTE LIMIT RETURN NUMBER!
//                },
//                allDaySlot: true,
                allDayDefault: false,
//                timezone: 'local',
//                minTime: '7:30am',
//                maxTime: '6:00pm',
                minTime: '12:00am',
                maxTime: '11:00pm',
                slotMinutes: 10,
                selectable: true,
                selectHelper: true,
                eventRender: $scope.eventRender,
                lazyFetching: true


            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétf?", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
       $scope.eventSources = [$scope.events, $scope.bookingEvents, $scope.myEvents];
                                    debugger;
//       $scope.events.splice.apply($scope.events, [0,0].concat($scope.appointments));
//        $scope.eventSources = [$scope.appointments];

        // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
        var uniqueItems = function (data, key) {
            var result = [];

            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];

                if (result.indexOf(value) == -1) {
                    result.push(value);
                }

            }
            return result;
        };

//
        $scope.useDoctorIds = {};
        $scope.useSubjects = {};

//

        // Watch the pants that are selected
        $scope.$watch(function () {
            return {
//                players: $scope.players,
                letters: $scope.appointments,
//                usePants: $scope.usePants,
//                useShirts: $scope.useShirts,
//                useShoes: $scope.useShoes,
                useDoctorIds: $scope.useDoctorIds,
                useDoctorIds: $scope.useDoctorIds,
                useSubjects: $scope.useSubjects

            }
        }, function (value) {
            var selected;

            $scope.count = function (prop, value) {
                return function (el) {
                    return el[prop] == value;
                };
            };
            $scope.doctorIdsGroup = uniqueItems($scope.appointments, 'doctorId', 'subject');
            var filterAfterDoctorIds = [];
            selected = false;
            for (var j in $scope.appointments) {
                var p = $scope.appointments[j];
//                console.log($scope.useDoctorIds, p);
//                debugger;
                for (var i in $scope.useDoctorIds) {

                    if ($scope.useDoctorIds[i]) {
                        selected = true;
                        if (i == p.doctorId) {
                            filterAfterDoctorIds.push(p);
                            break;
                        }
                    }
                }
            }
            console.log(p, i, $scope.appointments, $scope.doctors, $scope.doctorIdsGroup, "useDoctorIds", $scope.useDoctorIds, filterAfterDoctorIds, $scope.appointment.doctorId)
//          THIS WILL RETRIEVE THE DOCTORS USING THE FILTER ID Though im not sure why we would
//            $scope.doctorId = i;
//            Doctor.get({id:$scope.doctorId}).then(function(doctor){
//                $scope.doctor = doctor;
//                console.log("HELLO", $scope.doctor, doctor);
//                debugger;
//            });
//            debugger;
            if (!selected) {
                filterAfterDoctorIds = $scope.appointments;
            }
            debugger;

            $scope.filteredAppointments = filterAfterDoctorIds;
//            $scope.bookingEvents = filterAfterDoctorIds;
            debugger;
//            $scope.events.splice(0, $scope.events.length);
////                for (var i = 0; i < filteredEvents.length; i++){
////                    $scope.events.push(filteredEvents[i])
////                }
////            $scope.events.splice.apply($scope.events, [0,0].concat($scope.filteredAppointments));
//            console.log("clear array", $scope.events, $scope.filteredAppointments);
//            debugger;
            console.log($scope.filteredAppointments, $scope.bookingEvents);
        }, true);
//


        $scope.$watch('filtered', function (newValue) {
                if (angular.isArray(newValue)) {
                    console.log(newValue.length);
                }
            },
            true);
    }])

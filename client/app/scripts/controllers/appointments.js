angular.module('clientApp')
    .controller('AppointmentsController', ['$scope', '$timeout', '$http', '$resource', '$location', '$routeParams', 'uiCalendarConfig', 'Appointment', '$modal', function ($scope, $timeout, $http, $resource, $location, $routeParams, uiCalendarConfig, Appointment, $modal) {

        $scope.appointment = new Appointment();
        $scope.appointments = [];

        Appointment.query().then(function(appointments){
            $scope.appointments = appointments;
        });
        $scope.formData = {
            appointmentStartTime: '',
            appointmentEndTime: '',
            appointmentPatientName: '',
            appointmentDoctorName: '',
            appointmentStartDate: '',
            appointmentEndDate: ''
        };
        $scope.createAppointment = function() {
            $scope.appointment.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                })};
        $scope.updateAppointment = function() {
            $scope.appointment.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };
        $scope.destroyAppointment = function() {
            $scope.appointment.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
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
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];
        $scope.eventSource = function(start, end, date, timezone, callback, appointment) {

                    $( '#calendar' ).fullCalendar({
                        defaultView: 'agendaWeek',
                        doctorsSource: '/doctors/list',
                        eventSources: [
                            {url: '/api/appointments'}
                        ],
                        data: 'eventsBy=' + type + '&start=' + formatDate(start_) + '&end=' + formatDate(end_) + '&selectedId=' + cmb,
                        success: function (data) {
                            var events = [];
                            $.each(data, function (appointment) {
                                events.push({
                                    id: appointment.id,
                                    start: Date.new(appointment.start_date.year, appointment.start_date.month, appointment.start_date.day, appointment.start_time.hour, appointment.start_time.min),
                                    end: Date.new(appointment.end_date.year, appointment.end_date.month, appointment.end_date.day, appointment.end_time.hour, appointment.end_time.min),
                                });
                            });
                            callback(events);
                        },
                        allDaySlot: false,
                        id: 'appointment.id',
                        start: 'Date.new(appointment.start_date.year, appointment.start_date.month, appointment.start_date.day, appointment.start_time.hour, appointment.start_time.min)',
                        end: 'Date.new(appointment.end_date.year, appointment.end_date.month, appointment.end_date.day, appointment.end_time.hour, appointment.end_time.min)',
                        minTime: '7:30am',
                        maxTime: '6:00pm',
                        slotMinutes: 10,
                        selectable: true,
                        selectHelper: true
                })
        };

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                defaultView: 'agendaWeek',
                doctorsSource: '/doctors/list',
                eventSources: [
                    {url: '/api/appointments',
                        data: 'eventsBy=' + '&start=' + '&end=' + '&selectedId=',
                        success: function (data, callback, event) {
                            var events = [];
                            $(event).each(function (appointment, start, end) {
                                events.push({
                                    "id": appointment.id,
                                    "start": moment(start).format('YYYY/MM/DD hh:mm'),
                                    "end": moment(end).format('YYYY/MM/DD hh:mm')
                                });
                            });
                            callback(events);
                        },
                        error: function () { alert('Failed!'); },
                    }
                ],
                allDaySlot: false,
                minTime: '7:30am',
                maxTime: '6:00pm',
                slotMinutes: 10,
                selectable: true,
                selectHelper: true
            }
        };

        $scope.changeLang = function() {
            if($scope.changeTo === 'Hungarian'){
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo= 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

    }]);

'use strict';


angular.module('clientApp')
    .controller('LettersController', ['$scope', '$http', '$resource', '$location', '$routeParams', 'Letter', 'Patient', 'Doctor', 'Consult_Template', '$modal', function ($scope, $http, $resource, $location, $routeParams, Letter, Patient, Doctor, Consult_Template, $modal) {


        $scope.rowCollection = [
            {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
            {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
            {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
        ];

        $scope.letter = new Letter();

        Letter.query().then(function(letters){
            $scope.letters = letters;
        });

        $scope.patient = new Patient();

        Patient.query().then(function(patients){
            $scope.patients = patients;
        });

        $scope.doctor = new Doctor();

        Doctor.query().then(function(doctors) {
            $scope.doctors = doctors;
        });
        $scope.consult_template = new Consult_Template();

        Consult_Template.query().then(function(consult_templates) {
            $scope.consult_templates = consult_templates;
        });

        angular.extend ($scope.letter, {
            subject: '',
            content: '',
            patient_Id: Number(),
            doctor_Id: Number(),
            appointment_Id: Number(),
            email: ''

        });
//        $scope.test = function() {
//
//            $scope.letterId = "2";
//            $scope.patientId = "2747";
////          debugger;
//            Letter.get({id:$scope.letterId}).then(function(letter){
////              debugger;
////                $scope.myNest = myNest;
//                $scope.letter = letter;
//                console.log(letter)
//            });
//            Patient.get({id:$scope.patientId}).then(function(patient){
////              debugger;
////                $scope.myNest = myNest;
//                $scope.patient = patient;
//                console.log(patient)
//            });
//            var data = ({
//                contactName : "CONTACT NAME",
//                letter : $scope.letterId,
//                patient : $scope.patientId
//            });
////              debugger;
////            debugger;
//
////            data = ({
////                contactName : this.contactName
////            })
//            console.log("TEST 212121");
//            $http.post('/api/letters/test', data);
////            debugger;
////                success(function(data){
////                    console.log("TEST")
////                });
//        };
        $scope.createLetter = function(doctor) {
            $scope.letter1 = new Letter();
//            $scope.letter1.email = (angular.forEach($scope.tests.email, function(email, name){
//                JSON.stringify(name);
//                $scope.letter1.
//                console.log(email, name);
//                debugger;
//            }));
//            $scope.letter1.email = JSON.stringify($scope.tests.email.name);
            $scope.array1 = [];
            $scope.array = (angular.forEach($scope.recipients.test, function(recipient, name){
//                $scope.array = email;
                JSON.stringify(name);
                debugger;
                $scope.name = recipient.name;
                console.log(recipient, recipient.name);
                debugger;
            }));
            console.log($scope.array, $scope.array.name, $scope.recipients.test.names, $scope.array_name, $scope.array.names, $scope.array_names, $scope.array.recipients, $scope.array.recipients_name, $scope.array["name"]);
            for (var i = 0; i < $scope.recipients.test.length; i++) {
                debugger
                 $scope.testArray = $scope.recipients.test[i];
                 $scope.array1.push($scope.testArray)
                }
            $scope.letter1.email = $scope.recipients.test.toString();
            debugger;
            console.log($scope.array, $scope.array_name, $scope.arrayName, $scope.array.name);
            debugger;
            $scope.letter1.doctor_id = $scope.doctor.test.id;
            $scope.letter1.patient_id = $scope.patient_id;
//            $scope.letter1.email = $scope.email;
            $scope.letter1.appointment_id = $scope.appointment_id;
            $scope.letter1.subject = $scope.subject;
            $scope.letter1.content = $scope.consult_template.content;
            console.log($scope.letter1.doctor_id, $scope.doctor, $scope.doctorId, $scope.doctor_id, $scope.doctor.id);
            debugger;

            $scope.letter1.create()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });

//                        new Letter({doctor_id:$scope.letter.doctor_id});
            debugger;
            $scope.isPopupVisible3 = true;
        };
        $scope.test2 = function(letter1) {
            $scope.letter = letter1;
            debugger;
            console.log("Hello", $scope.letter, $scope.letter.id, $scope.letter_id, $scope.letter_Id);
            $scope.patientId = letter1.getPatientId();
            Patient.get({id:$scope.patientId}).then(function(patient){
//                $scope.myNest = myNest;
                $scope.patient = patient;

                console.log("Patient", patient);

//            debugger;
            });
            $scope.doctorId = letter1.doctorId;
            Doctor.get({id:$scope.doctorId}).then(function(doctor){
                $scope.doctor = doctor;
                console.log("HELLO", $scope.doctor, doctor);
                debugger;
            });
            console.log("ensure function fired", $scope.letter1)
            debugger;
//                $scope.letter = letter;
//                debugger;
//                $scope.patientId = "2747";
//                console.log("test", $scope.letter.id, $scope.letter, $scope.patient)
//                Letter.get({id:$scope.letter.id}).then(function(letter){
//                    $scope.letter = letter;
//                    console.log("Second call",letter, $scope.letterId)
//
//                });
//                Patient.get({id:$scope.patientId}).then(function(patient){
////
//                    $scope.patient = patient;
//                    console.log(patient)
//                });
            var data = ({
                contactName : "CONTACT NAME",
                letter : $scope.letter.id,
                patient : $scope.patientId
            });
            console.log("TEST 212121", data, $scope.letter.id);
            $http.post('/api/letters/test', data);
//            debugger;
//                success(function(data){
//                    console.log("TEST")
//                });
        };

        $scope.updateLetter = function() {
            $scope.letter.update()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.destroyLetter = function() {
            $scope.letter.delete()
                .then(function(response) {
                    console.log("SUCCESS", response);
                })
                .catch(function(response) {
                    console.log("FAILURE!", response);
                });
        };

        $scope.create = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'createModal.html',
                controller: function ($scope, $modalInstance, Letter, Doctor) {
                    $scope.letter = new Letter();

                    $scope.doctor = new Doctor();

                    Doctor.query().then(function(doctors) {
                        $scope.doctors = doctors;
                    });

                    $scope.letter.doctorId = $scope.doctor.id;

                    $scope.ok = function () {
                        $modalInstance.close($scope.letter);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.createLetter = function(doctor) {

                        $scope.letter.doctor_id = $scope.doctor.id;

                        console.log($scope.letter.doctor_id, $scope.doctor, $scope.doctorId, $scope.doctor_id, $scope.doctor.id);
                        debugger;
                        $scope.letter.create()
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });

//                        new Letter({doctor_id:$scope.letter.doctor_id});
                        debugger;
                    };

                },
                size: size,
                resolve: {
                    letter: function () {
                        return;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.new = function() {
            $scope.isPopupVisible2 = true;
            $scope.recipients = [];
            $scope.recipients.test = [];
            $scope.addPayment1 = function(){
                console.log("HERE", $scope.recipients.test);
                $scope.recipients.test.push({name:"test"});
            };
            $scope.removePayment1 = function(recipient) {
                $scope.recipients.test.splice($scope.recipients.test.indexOf(recipient), 1);
            };
        };
        $scope.showPopup = function (letter, patient) {
            $scope.isPopupVisible = true;
            $scope.letter = letter;
            debugger;
            console.log("Hello", $scope.letter, $scope.letter.id, $scope.letter_id, $scope.letter_Id);
            $scope.patientId = letter.getPatientId();
            Patient.get({id:$scope.patientId}).then(function(patient){
//                $scope.myNest = myNest;
                $scope.patient = patient;

                console.log("Patient", patient);

//            debugger;
            });
            $scope.doctorId = letter.doctorId;
            Doctor.get({id:$scope.doctorId}).then(function(doctor){
                $scope.doctor = doctor;
                console.log("HELLO", $scope.doctor, doctor);
                debugger;
            });
            $scope.test = function() {
//                $scope.letter = letter;
//                debugger;
//                $scope.patientId = "2747";
//                console.log("test", $scope.letter.id, $scope.letter, $scope.patient)
//                Letter.get({id:$scope.letter.id}).then(function(letter){
//                    $scope.letter = letter;
//                    console.log("Second call",letter, $scope.letterId)
//
//                });
//                Patient.get({id:$scope.patientId}).then(function(patient){
////
//                    $scope.patient = patient;
//                    console.log(patient)
//                });
                var data = ({
                    contactName : "CONTACT NAME",
                    letter : $scope.letter.id,
                    patient : $scope.patientId
                });
                console.log("TEST 212121", data, $scope.letter.id);
                $http.post('/api/letters/test', data);
//            debugger;
//                success(function(data){
//                    console.log("TEST")
//                });
            };
            $scope.ok = function () {
                $modalInstance.close($scope.letter);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

//            $scope.showPopup = function () {
//                $scope.isPopupVisible = true;
//            };

//            $scope.showPopup2 = function () {
//                $scope.isPopupVisible2 = true;
//            };

            $scope.updateLetter = function(letter) {
                $scope.letter.update(letter)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                        $scope.isPopupVisible = false;

                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
            };

            $scope.destroyLetter = function(letter) {
                $scope.letter.delete(letter)
                    .then(function(response) {
                        console.log("SUCCESS", response);
                    })
                    .catch(function(response) {
                        console.log("FAILURE!", response);
                    });
            };
        };
        $scope.update = function (size, selectedLetter) {

            var modalInstance = $modal.open({
                templateUrl: 'updateModal.html',
                controller: function ($scope, $modalInstance, letter, Patient) {
                    $scope.letter = letter;
                    console.log($scope.letterId);
                    $scope.patientId = letter.getPatientId();
                    Patient.get({id:$scope.patientId}).then(function(patient){
//                $scope.myNest = myNest;
                        $scope.patient = patient;

                        console.log(patient);


                    });
                    $scope.test = function(letter) {
                        $scope.letter = letter;
                        $scope.patientId = "2747";
                        console.log("test", $scope.letterId, $scope.letter, $scope.patient)
                        Letter.get({id:$scope.letterId}).then(function(letter){
                            $scope.letter = letter;
                            console.log(letter)
                        });
                        Patient.get({id:$scope.patientId}).then(function(patient){
//
                            $scope.patient = patient;
                            console.log(patient)
                        });
                        var data = ({
                            contactName : "CONTACT NAME",
                            letter : $scope.letterId,
                            patient : $scope.patientId
                        });
                        console.log("TEST 212121");
                        $http.post('/api/letters/test', data);
//            debugger;
//                success(function(data){
//                    console.log("TEST")
//                });
                    };
                    $scope.ok = function () {
                        $modalInstance.close($scope.letter);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.showPopup = function () {
                        $scope.isPopupVisible = true;
                    };

                    $scope.showPopup2 = function () {
                        $scope.isPopupVisible2 = true;
                    };

                    $scope.updateLetter = function(letter) {
                        $scope.letter.update(letter)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                                $scope.isPopupVisible = false;

                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };

                    $scope.destroyLetter = function(letter) {
                        $scope.letter.delete(letter)
                            .then(function(response) {
                                console.log("SUCCESS", response);
                            })
                            .catch(function(response) {
                                console.log("FAILURE!", response);
                            });
                    };
                },
                size: size,
                resolve: {
                    letter: function () {
                        return selectedLetter;
                    }
                }
            });

            modalInstance.result.then(function (selectedLetter) {
                $scope.selected = selectedLetter;
                $scope.letter = selectedLetter;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
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
        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'templatesModal.html',
                controller: function ($scope, $modalInstance, Consult_Templates) {
                    $scope.consult_templates = Consult_Templates;


                    $scope.selected = {
                        Consult_Template: $scope.consult_templates[0],
                    };

                    $scope.consult_template = {
                        Consult_Template: $scope.consult_templates[0],
                    };
                    $scope.ok = function () {
                        console.log($scope.consult_template, $scope.selected);
                        debugger;
                        $scope.formData = {
                            Consult_TemplateName: $scope.selected.name,
                            Consult_TemplateContent: $scope.selected.content
                        };
                        $modalInstance.close($scope.selected.consult_template);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    Consult_Templates: function () {
                        return $scope.consult_templates;
                        debugger;
                    }
                }
            });
            modalInstance.result.then(function (selectedConsult_Template) {
                debugger;
                $scope.selected = selectedConsult_Template;
                $scope.consult_template = selectedConsult_Template;
            });
        };
//
        $scope.useDoctorIds = {};
        $scope.useSubjects = {};

//

        // Watch the pants that are selected
        $scope.$watch(function () {
            return {
//                players: $scope.players,
                letters: $scope.letters,
//                usePants: $scope.usePants,
//                useShirts: $scope.useShirts,
//                useShoes: $scope.useShoes,
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
            $scope.doctorIdsGroup = uniqueItems($scope.letters, 'doctorId', 'subject');
            var filterAfterDoctorIds = [];
            selected = false;
            for (var j in $scope.letters) {
                var p = $scope.letters[j];
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
            console.log(p, i, $scope.letters, $scope.doctors, $scope.doctorIdsGroup, "useDoctorIds", $scope.useDoctorIds, $scope.letter.doctorId)
//          THIS WILL RETRIEVE THE DOCTORS USING THE FILTER ID Though im not sure why we would
//            $scope.doctorId = i;
//            Doctor.get({id:$scope.doctorId}).then(function(doctor){
//                $scope.doctor = doctor;
//                console.log("HELLO", $scope.doctor, doctor);
//                debugger;
//            });
//            debugger;
            if (!selected) {
                filterAfterDoctorIds = $scope.letters;
            }


            $scope.filteredLetters = filterAfterDoctorIds;
            console.log($scope.filteredLetters);
        }, true);
//            $scope.subjectsGroup = uniqueItems($scope.letters, 'subject');
//            var filterAfterSubjects = [];
//            selected = false;
//            for (var j in $scope.letters) {
//                var p = $scope.letters[j];
//                console.log($scope.useSubjects, p);
//                debugger;
//                for (var i in $scope.useSubjects) {
//                    if ($scope.useSubjects[i]) {
//                        selected = true;
//                        if (i == p.subject) {
//                            filterAfterSubjects.push(p);
//                            break;
//                        }
//                    }
//                }
//            }
//            console.log($scope.letters, $scope.subjectsGroup, $scope.useSubjects, $scope.letter.subject)
//            debugger;
//            if (!selected) {
//                filterAfterSubjects = $scope.letters;
//            }
//
//
//            $scope.filteredLetters = filterAfterSubjects;
//            console.log($scope.filteredLetters);
//        }, true);


        $scope.$watch('filtered', function (newValue) {
                if (angular.isArray(newValue)) {
                    console.log(newValue.length);
                }
            },
            true);

    }])



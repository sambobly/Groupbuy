namespace :db do
  desc "Erase database and fill with sample data"
  task :populate => :environment do
    require 'ffaker'
    
    STDOUT.puts "WARNING: This will delete all existing data. Please confirm that you want to continue (y/n)"
    input = STDIN.gets.chomp
    
    if input != 'y' then
      return
    end
    
    [Doctor, Appointment, Patient].map(&:delete_all)
        
    # create doctors
    10.times do |i|
      Doctor.create!(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        position: ['Partner', 'Contractor', 'Employee', 'Locum' ].sample
      )
    end
    
    # create some patients
    # TODO: create doctor / patient associations
    patientsCount = 200 + rand( 100 )
    patientsCount.times do |i|
      doctor = Doctor.offset(rand(Doctor.count)).first
      patient = Patient.create!(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name
      )
      patient.doctors << doctor
    end
    
    # create appointments for c. 3 months either side of the current date
    createAppointments( 90 )
    createAppointments( 30, false )
    
    puts "Database wiped and populated"
  end
end

# Creates a random number of appointments for x days from (and including) today
# 
# If createForwards is set to false, appointments are create for x days prior to today
def createAppointments( numberOfDays, createForwards = true, maxAppointmentsPerDayPerDoctor = 25 )
  weekend = [0, 6]
  
  numberOfDays.times do |i|
    date = createForwards ? Date.today + i .days : Date.today - (i + 1).days # i starts at 0
    next if weekend.include? date.wday

    Doctor.all.each do |doctor|
      next unless ['Partner', 'Employee' ].include?( doctor.position ) or rand(1..5) == 1
      maxAppointments = rand( 15..25 )
      startTime = DateTime.parse( "#{date.to_s} 08:00")

      maxAppointments.times do |y|
        endTime = startTime + [ 10, 10, 10, 10, 10, 10, 20, 20, 30, 45 ].sample.minutes
        patient = Patient.offset(rand(Patient.count)).first

        doctor.appointments.create!(
          start_date: startTime.strftime("%Y-%m-%d"),
          start_time: startTime.strftime("%H:%M"),
          end_date: endTime.strftime("%Y-%m-%d"),
          end_time: endTime.strftime("%H:%M"),
          patient_id: patient.id,
          doctor: patient.doctors.sample
        )
        
        startTime = endTime + [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 20, 30 ].sample.minutes
      end
      
    end
  end
  
end
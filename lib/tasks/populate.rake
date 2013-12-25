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
    
    10.times do |i|
      Doctor.create!(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        position: ['Partner', 'Contractor', 'Employee', 'Locum' ].sample
      )
    end
    
    puts "Database wiped and populated"
  end
end
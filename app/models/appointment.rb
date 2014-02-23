class Appointment < ActiveRecord::Base

  belongs_to    :doctor
  belongs_to    :patient

  attr_accessible :start_time, :end_time, :patient_id

  ransacker :start_time do |parent|
    Arel::Nodes::SqlLiteral.new("date(appointments.start_time)")
  end
end

 # validates :start_time, :presence => true
 # validates :doctor_id, :presence => true
 # validates :patient_id, :presence => true
 # validates :start_time, :uniqueness => true  #(note that start_time includes the date)
  # {message: "Appointment clash. Do you wish to continue?"}

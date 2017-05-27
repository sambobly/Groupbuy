class Meeting < ActiveRecord::Base
  attr_accessible :doctor_id, :patient_id, :appointment_id, :content, :date, :time
  belongs_to :doctor
  belongs_to :patient
  belongs_to :appointment
end

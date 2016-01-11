class Consult < ActiveRecord::Base
  attr_accessible :patient, :doctor, :appointment, :date, :time, :note, :patient_id, :doctor_id, :appointment_id
  belongs_to :patient
  belongs_to :doctor
  belongs_to :appointment

end

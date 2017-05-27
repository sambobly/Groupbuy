class Letter < ActiveRecord::Base
  attr_accessible :doctor_id, :patient_id, :appointment_id, :content, :subject, :email

  #serialize :emails, Array
  belongs_to :patient
  belongs_to :doctor
  belongs_to :appointment
  has_many :recipients
end

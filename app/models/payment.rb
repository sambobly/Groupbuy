class Payment < ActiveRecord::Base
  attr_accessible :patient_id, :doctor_id, :invoice_id, :paymentType_id, :appointment_id, :date, :note, :total


  belongs_to :patient
  belongs_to :doctor
  belongs_to :invoice
  belongs_to :paymentType
  belongs_to :appointment
end

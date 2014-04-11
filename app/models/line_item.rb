class LineItem < ActiveRecord::Base

  attr_accessible :checkin_id, :appointment_id, :appointment
  belongs_to :appointment
  belongs_to :checkin
  validates :appointment_id, presence: true
end

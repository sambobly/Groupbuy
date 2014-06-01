class LineItem < ActiveRecord::Base

  attr_accessible :checkin_id, :appointment_id, :appointment
  belongs_to :appointment
  belongs_to :checkin
  validates :appointment_id, presence: true
  before_create :set_check_in_time
  
  def check_in_time
    self.check_in_time = Time.now
  end
end

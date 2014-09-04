class Checkout < ActiveRecord::Base
  has_many :line_items, dependent: :destroy
  attr_accessor :checked_out_patients

  def add_appointment(appointment_id)
    current_item = line_items.find_by_appointment_id(appointment_id)
    if current_item
      current_item.quantity+=1
    else
      current_item = line_items.build(:appointment_id => appointment_id)
    end
    return current_item
  end

  def checked_out_patients
    line_items.where( 'checked_out = TRUE')
  end

  def self.current
    self.order( "created_at DESC" ).first
    # TODO check if the most recent checkin is correct
  end
end
end

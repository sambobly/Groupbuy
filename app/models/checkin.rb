class Checkin < ActiveRecord::Base
  has_many :line_items, dependent: :destroy

  def add_appointment(appointment_id)
    current_item = line_items.find_by_appointment_id(appointment_id)
    if current_item
      current_item.quantity+=1
    else
      current_item = line_items.build(:appointment_id => appointment_id)
    end
    return current_item
  end
end

class LineItem < ActiveRecord::Base
  belongs_to :patient
  belongs_to :checkin
end

class Recipient < ActiveRecord::Base
  attr_accessible :letter_id, :email, :first_name, :last_name, :name, :type

  belongs_to :letter
end

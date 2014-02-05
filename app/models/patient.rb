class Patient < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  has_and_belongs_to_many :doctors
  has_many :appointments
  attr_accessible :first_name, :last_name, :UR_number

  def name
    first_name + " " + last_name
  end

end

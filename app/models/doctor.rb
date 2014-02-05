class Doctor < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  attr_accessible :first_name, :last_name, :position
  has_and_belongs_to_many  :patients
  has_many :appointments

  def name
    first_name + " " + last_name
  end

end

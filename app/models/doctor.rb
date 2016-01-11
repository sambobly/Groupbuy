class Doctor < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  attr_accessible :first_name, :last_name, :position, :id
  has_and_belongs_to_many  :patients
  has_many :appointments
  has_many :meetings
  accepts_nested_attributes_for :meetings

  def name
    first_name + " " + last_name
  end

end

class Doctor < ActiveRecord::Base
  validates :first_name, presence: true
  has_many  :patients
  has_many :appointments
end

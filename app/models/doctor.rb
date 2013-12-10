class Doctor < ActiveRecord::Base
  validates :name, presence: true
  has_many  :patients
  has_many :appointments
end

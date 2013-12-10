class Patient < ActiveRecord::Base
  validates :name, presence: true
  has_many :doctors
  has_many :appointments

end

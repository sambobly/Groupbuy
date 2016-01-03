class Business < ActiveRecord::Base
  attr_accessible :name, :address, :city, :state, :postcode, :country, :registrationname, :registrationnumber, :website, :contact, :online

  validates :name, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :postcode, presence: true
  validates :country, presence: true
  validates :registrationname, presence: true
  validates :registrationnumber, presence: true
  validates :website, presence: true
  validates :contact, presence: true
  validates :online, presence: true

end

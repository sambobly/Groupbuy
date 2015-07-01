class Business < ActiveRecord::Base
  attr_accessible :name, :address, :city, :state, :postcode, :country, :registrationname, :registrationnumber, :website, :contact, :online

end

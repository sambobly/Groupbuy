class Account < ActiveRecord::Base
  attr_accessible :companyname, :firstname, :lastname, :email, :country

end

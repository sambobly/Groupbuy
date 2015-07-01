class Contact < ActiveRecord::Base
attr_accessible :firstname, :lastname, :phone, :occupation, :company, :email, :address, :string, :state, :postcode, :note

end

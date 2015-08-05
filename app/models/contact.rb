class Contact < ActiveRecord::Base
  validates :firstname, presence: true
  validates :lastname, presence: true
  attr_accessible :firstname, :lastname, :phone, :occupation, :company, :email, :address, :string, :state, :postcode, :note

end

class Contact < ActiveRecord::Base
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :phone, presence: true
  attr_accessible :title, :firstname, :lastname, :phone, :occupation, :company, :email, :address, :string, :state, :postcode, :note

end

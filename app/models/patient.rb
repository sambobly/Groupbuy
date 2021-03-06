class Patient < ActiveRecord::Base

  attr_accessible  :first_name, :last_name, :UR_number, :email,
                  :patient_title, :date_of_birth, :gender, :concession_type, :address, :emergency_contact, :medicare_number,:referral_type, :referring_doctor
  has_many :invoices
  has_many :payments

  has_many :appointments
  has_many :consults
  has_many :meetings
  has_many :letters


  has_and_belongs_to_many :doctors
  accepts_nested_attributes_for :invoices
  accepts_nested_attributes_for :payments

  accepts_nested_attributes_for :appointments
  accepts_nested_attributes_for :consults
  accepts_nested_attributes_for :meetings
  accepts_nested_attributes_for :letters




end


#class Patient < ActiveRecord::Base
#  validates :first_name, presence: true
#  validates :last_name, presence: true
#
#  has_and_belongs_to_many :doctors
#
#  has_many :appointments
#  has_many :invoices
#  accepts_nested_attributes_for :invoices
#
#  attr_accessible  :first_name, :last_name, :UR_number, :email, :id, :patient_title, :date_of_birth, :gender, :concession_type, :address, :emergency_contact, :medicare_number,:referral_type, :referring_doctor
#  #has_many :line_items
#
#  #has_many :concession_types
#  #accepts_nested_attributes_for :concession_type
#
#  #def name
#  #  first_name + " " + last_name
#  #end
#  #
#  #private
#  #def ensure_not_referenced_by_any_line_item
#  #  if line_items.empty?
#  #    return true
#  #  else
#  #    errors.add(:base, 'Line Items Present')
#  #    return false
#  #  end
#  #end
#end

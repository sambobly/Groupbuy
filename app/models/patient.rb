class Patient < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  has_and_belongs_to_many :doctors
  has_many :appointments
  has_many :line_items
  attr_accessible :first_name, :last_name, :UR_number, :email, :id, :patient_title, :date_of_birth, :gender, :concession_type, :address, :emergency_contact, :medicare_number,:referral_type, :referring_doctor

  def name
    first_name + " " + last_name
  end

  private
  def ensure_not_referenced_by_any_line_item
    if line_items.empty?
      return true
    else
      errors.add(:base, 'Line Items Present')
      return false
    end
  end
end

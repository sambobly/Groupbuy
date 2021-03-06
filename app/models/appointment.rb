class Appointment < ActiveRecord::Base


  attr_accessible :id, :start_time, :end_time, :start_date, :end_date, :patient_id, :doctor_id, :name, :doctor_name, :patient_name, :appointment_id, :attended, :fail
  belongs_to    :doctor
  belongs_to    :patient
=begin

  has_many :line_items
  before_destroy :ensure_not_referenced_by_any_line_item
  private
  def ensure_not_referenced_by_any_line_item
    if line_items.empty?
      return true
    else
      errors.add(:base, 'Line Items Present')
      return false

    end
  end
  ransacker :start_time do |parent|
    Arel::Nodes::SqlLiteral.new("date(appointments.start_time)")
  end

  ransacker :start_date do |parent|
    Arel::Nodes::SqlLiteral.new("date(appointments.start_date)")
  end
  #todo fix validations
 validates :start_time, :presence => true
 validates :start_date, :presence => true
 validates :end_time, :presence => true
 validates :end_date, :presence => true
 #validates_uniqueness_of :start_time, :scope => [:start_date, :doctor_name]#(note that start_time includes the date)
 # {message: "Appointment clash. Do you wish to continue?"}
=end
end
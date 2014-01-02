class Appointment < ActiveRecord::Base

  belongs_to    :doctor
  belongs_to    :patient
def self.search(search)
  if search
    find(:all, :conditions => ['name LIKE ?', "%#{search}%"] )
  else
    find(:all)
  end
end
  attr_accessible :start_time, :end_time, :patient_id

  validates :start_time, :presence => true
  validates :start_time, :uniqueness => true  #(note that start_time includes the date)
    {message: "Appointment clash. Do you wish to continue?"}
end
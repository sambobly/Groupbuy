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
end

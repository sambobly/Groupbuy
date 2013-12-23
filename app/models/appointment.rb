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
attr_accessible :date, :hour

  validates :date, :presence => true
  validates :hour, :presence => true,
                   :uniqueness => {:scope => :date}
end
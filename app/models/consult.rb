class Consult < ActiveRecord::Base
  attr_accessible :patient, :doctor, :appointment, :date, :time, :note

end

class Stick < ActiveRecord::Base
  attr_accessible :name, :nest_id
  belongs_to :nest
end

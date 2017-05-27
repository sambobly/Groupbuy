class Egg < ActiveRecord::Base

  attr_accessible :name, :nest_id, :id, :content
  belongs_to :nest
end

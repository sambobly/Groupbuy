class Bird < ActiveRecord::Base

  attr_accessible :name, :nest_id, :id
  belongs_to :nest
  validates :name, presence: true
  validates :nest_id, presence: true
end

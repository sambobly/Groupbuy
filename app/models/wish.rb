class Wish < ActiveRecord::Base
  attr_accessible :consumer_id, :merchandise_id

  belongs_to :consumer
  belongs_to :merchandise
end

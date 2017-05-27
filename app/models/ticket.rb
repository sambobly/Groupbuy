class Ticket < ActiveRecord::Base
  attr_accessible :consumer_id, :bid_id, :merchandise_id, :win, :value

  belongs_to :consumer
  belongs_to :bid
  belongs_to :merchandise
end

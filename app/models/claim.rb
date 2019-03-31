class Claim < ActiveRecord::Base
  attr_accessible :merchandise_id,:consumer_id, :email, :mobile, :account, :bsb, :complete, :created_at, :updated_at
  belongs_to :consumer
  belongs_to :merchandise
end

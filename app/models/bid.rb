class Bid < ActiveRecord::Base
  attr_accessible :consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete
  belongs_to :consumer
  belongs_to :merchandise
  has_many :tickets

  accepts_nested_attributes_for :tickets
end

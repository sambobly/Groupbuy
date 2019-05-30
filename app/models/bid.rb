class Bid < ActiveRecord::Base
  attr_accessible :consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete, :merchandise_image, :merchandise_value, :merchandise_title, :combination_id, :answer, :score
  belongs_to :consumer
  belongs_to :merchandise
  belongs_to :combination

  has_many :tickets

  accepts_nested_attributes_for :tickets



end

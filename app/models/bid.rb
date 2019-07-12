class Bid < ActiveRecord::Base
  attr_accessible :consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete, :merchandise_image, :merchandise_value, :merchandise_title, :combination_id, :answer, :score, :answer_one, :answer_two, :answer_three, :answer_four, :answer_five, :answer_six, :answer_seven, :answer_eight, :answer_nine, :answer_ten
  belongs_to :consumer
  belongs_to :merchandise
  belongs_to :combination

  has_many :tickets

  accepts_nested_attributes_for :tickets



end

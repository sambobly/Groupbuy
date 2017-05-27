class Consumer < ActiveRecord::Base
  attr_accessible :name, :first_name, :last_name, :date_of_birth, :payment_method_id, :public, :gender, :pronoun, :email, :number, :password, :user_id

  belongs_to :payment_method
  belongs_to :user
  has_many :merchandises
  has_many :bids
  has_many :tickets
  has_many :wishes

  accepts_nested_attributes_for :bids
  accepts_nested_attributes_for :merchandises
  accepts_nested_attributes_for :tickets
  accepts_nested_attributes_for :wishes


end

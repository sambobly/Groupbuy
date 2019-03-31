class Merchandise < ActiveRecord::Base

  attr_accessible  :value, :category_id, :consumer_id, :title, :description, :start, :end, :bid, :category_name, :difference, :consumer_name, :complete, :email, :received, :paid, :rescue, :images
  validates :value, :category_id, :title, presence: true

  belongs_to :category
  belongs_to :consumer
  has_many :bids
  has_many :tickets
  has_many :wishes
  has_many :claims


  accepts_nested_attributes_for :bids
  accepts_nested_attributes_for :claims

  accepts_nested_attributes_for :tickets
  accepts_nested_attributes_for :wishes
  mount_uploader :images, ImageUploader
  serialize :images, JSON


end

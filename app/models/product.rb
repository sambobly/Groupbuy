class Product < ActiveRecord::Base
  validates :name, presence: true
  validates :price, presence: true

  attr_accessible :name, :price, :id
  has_many :lines
  accepts_nested_attributes_for :lines
  #has_many :widgets
  #accepts_nested_attributes_for :widgets
  #

end

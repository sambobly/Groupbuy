class Category < ActiveRecord::Base

  attr_accessible  :name, :description
  has_many :merchandises
  accepts_nested_attributes_for :merchandises

end

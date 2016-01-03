class BillableItem < ActiveRecord::Base
  attr_accessible :name, :type, :price, :tax, :total

  validates :name, presence: true
  validates :price, presence: true

  end
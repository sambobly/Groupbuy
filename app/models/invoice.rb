class Invoice < ActiveRecord::Base
  attr_accessible :date, :patient, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name, :product, :concession_type
  has_many :lines
  accepts_nested_attributes_for :lines

end

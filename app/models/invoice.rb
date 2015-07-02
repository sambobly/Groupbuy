class Invoice < ActiveRecord::Base
  attr_accessible :date, :patient, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name
end

class Invoice < ActiveRecord::Base
  attr_accessible :date, :patient, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name, :product, :concession_type, :patient_id
  has_many :lines
  accepts_nested_attributes_for :lines
  has_many :procurators
  accepts_nested_attributes_for :procurators
  has_many :widgets
  accepts_nested_attributes_for :widgets
end

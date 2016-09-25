class Invoice < ActiveRecord::Base

  attr_accessible :id, :date, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name, :product, :concession_type, :patient_id
    has_many :lines
    accepts_nested_attributes_for :lines
    has_many :procurators
    accepts_nested_attributes_for :procurators
    has_many :widgets
    accepts_nested_attributes_for :widgets
    has_many :payments
    accepts_nested_attributes_for :payments
  belongs_to :patient

  validates :total, presence: true
  #validates :quantity, presence: true
end


#class Invoice < ActiveRecord::Base
#  attr_accessible :id, :date, :patient, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name, :product, :concession_type, :patient_id
#  has_many :lines
#  accepts_nested_attributes_for :lines
#  has_many :procurators
#  accepts_nested_attributes_for :procurators
#  has_many :widgets
#  accepts_nested_attributes_for :widgets
#end
#

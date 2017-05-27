class Widget < ActiveRecord::Base
  attr_accessible :name, :invoice_id, :item, :price, :quantity, :tax, :discount, :total, :product, :product_id, :tax_id

  #belongs_to :product
  belongs_to :invoice
  validates :price, presence: true
  validates :quantity, presence: true
end

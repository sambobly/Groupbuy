class Line < ActiveRecord::Base
  attr_accessible :invoice_id, :item, :price, :quantity, :tax, :discount, :total, :product, :product_id
  belongs_to :invoice
  belongs_to :products
end


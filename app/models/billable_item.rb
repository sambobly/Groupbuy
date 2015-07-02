class BillableItem < ActiveRecord::Base
  attr_accessible :name, :type, :price, :tax, :total

end

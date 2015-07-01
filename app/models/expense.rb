class Expense < ActiveRecord::Base
  attr_accessible :date, :vendor, :category, :amount, :tax, :taxamount, :note, :product
end

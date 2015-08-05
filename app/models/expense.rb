class Expense < ActiveRecord::Base
  attr_accessible :date, :vendor, :category, :amount, :tax, :taxamount, :note, :product, :concession_type
end

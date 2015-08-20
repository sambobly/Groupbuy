class Expense < ActiveRecord::Base
  attr_accessible :date, :vendor, :category, :amount, :tax, :taxamount, :test, :note, :product, :concession_type, :tax_name
end

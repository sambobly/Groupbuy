json.array!(@expenses) do |expense|
  json.extract! expense, :id, :date, :vendor, :category, :amount, :tax, :taxamount, :note, :product
  json.url expense_url(expense, format: :json)
end

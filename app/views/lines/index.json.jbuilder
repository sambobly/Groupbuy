json.array!(@lines) do |line|
  json.extract! line, :id, :invoice_id, :item, :price, :quantity, :tax, :discount, :total, :product
  json.url line_url(line, format: :json)
end

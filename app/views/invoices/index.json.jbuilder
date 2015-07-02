json.array!(@invoices) do |invoice|
  json.extract! invoice, :id, :date, :patient, :doctor, :appointment, :item, :price, :quantity, :tax, :discount, :total, :note
  json.url invoice_url(invoice, format: :json)
end

json.array!(@inovices) do |inovice|
  json.extract! inovice, :id, :date, :patient, :doctor, :appointment, :item, :price, :quantity, :tax, :discount, :total, :note
  json.url inovice_url(inovice, format: :json)
end

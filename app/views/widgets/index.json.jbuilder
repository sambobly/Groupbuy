json.array!(@widgets) do |widget|
  json.extract! widget, :id, :product_id, :invoice_id, :item, :price, :quantity, :tax, :discount, :total, :product
  json.url widget_url(widget, format: :json)
end

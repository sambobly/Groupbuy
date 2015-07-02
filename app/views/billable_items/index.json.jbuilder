json.array!(@billable_items) do |billable_item|
  json.extract! billable_item, :id, :name, :type, :price, :tax, :total
  json.url billable_item_url(billable_item, format: :json)
end

json.array!(@merchandises) do |merchandise|
  json.extract! merchandise, :id, :value, :category_id, :consumer_id, :title, :description, :start, :end, :category_name, :bid, :difference, :consumer_name, :complete, :email, :received, :paid, :rescue
  json.url merchandise_url(merchandise, format: :json)
end

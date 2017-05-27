json.array!(@nests) do |nest|
  json.extract! nest, :id, :name
  json.url nest_url(nest, format: :json)
end

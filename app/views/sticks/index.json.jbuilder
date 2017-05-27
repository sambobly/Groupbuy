json.array!(@sticks) do |stick|
  json.extract! stick, :id, :name, :nest_id
  json.url stick_url(stick, format: :json)
end

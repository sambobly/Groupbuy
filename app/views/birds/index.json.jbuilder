json.array!(@birds) do |bird|
  json.extract! bird, :id, :name, :nest_id
  json.url bird_url(bird, format: :json)
end

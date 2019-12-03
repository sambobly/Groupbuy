json.array!(@birds) do |bird|
  json.extract! bird, :id, :name, :nest_id, :photo, :latitude, :longitude
  json.url bird_url(bird, format: :json)
end

json.array!(@eggs) do |egg|
  json.extract! egg, :id, :name, :nest_id
  json.url egg_url(egg, format: :json)
end

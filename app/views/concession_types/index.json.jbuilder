json.array!(@concession_types) do |concession_type|
  json.extract! concession_type, :id, :name, :percentage
  json.url concession_type_url(concession_type, format: :json)
end

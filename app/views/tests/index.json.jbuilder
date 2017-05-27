json.array!(@tests) do |test|
  json.extract! test, :id, :name, :concession_type
  json.url test_url(test, format: :json)
end

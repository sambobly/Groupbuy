json.array!(@doctors) do |doctor|
  json.extract! doctor, :name, :position
  json.url doctor_url(doctor, format: :json)
end

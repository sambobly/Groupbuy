json.array!(@doctors) do |doctor|
  json.extract! doctor, :first_name, :position
  json.url doctor_url(doctor, format: :json)
end

json.array!(@doctors) do |doctor|
  json.extract! doctor, :id, :name, :first_name, :last_name, :position
  json.url doctor_url(doctor, format: :json)
end

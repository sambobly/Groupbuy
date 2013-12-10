json.array!(@patients) do |patient|
  json.extract! patient, :name, :UR_number
  json.url patient_url(patient, format: :json)
end

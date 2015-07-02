json.array!(@consults) do |consult|
  json.extract! consult, :id, :patient, :doctor, :appointment, :date, :time, :note
  json.url consult_url(consult, format: :json)
end

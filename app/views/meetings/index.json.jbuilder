json.array!(@meetings) do |meeting|
  json.extract! meeting, :id, :doctor_id, :patient_id, :appointment_id, :content, :date, :time
  json.url meeting_url(meeting, format: :json)
end

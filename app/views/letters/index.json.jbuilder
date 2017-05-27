json.array!(@letters) do |letter|
  json.extract! letter, :id, :subject, :content, :patient_id, :doctor_id, :appointment_id, :email
  json.url letter_url(letter, format: :json)
end

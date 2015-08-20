json.array!(@patients) do |patient|
  json.extract! patient, :first_name, :last_name, :email, :title, :UR_number, :date_of_birth, :gender, :concession_type, :address, :emergency_contact, :medicare_number, :referral_type, :referring_doctor, :phone_number
  json.url patient_url(patient, format: :json)
end

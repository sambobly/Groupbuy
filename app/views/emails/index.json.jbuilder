json.array!(@emails) do |email|
  json.extract! email, :id, :subject, :content, :patient_id, :docto_id
  json.url email_url(email, format: :json)
end

json.array!(@recipients) do |recipient|
  json.extract! recipient, :id, :letter_id, :email, :name, :first_name, :last_name, :type
  json.url recipient_url(recipient, format: :json)
end

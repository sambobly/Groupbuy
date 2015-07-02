json.array!(@contacts) do |contact|
  json.extract! contact, :id, :firstname, :lastname, :phone, :occupation, :company, :email, :address, :city, :state, :postcode, :note
  json.url contact_url(contact, format: :json)
end

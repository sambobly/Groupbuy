json.array!(@businesses) do |business|
  json.extract! business, :id, :name, :address, :city, :state, :postcode, :country, :registrationname, :registrationnumber, :website, :contact, :online
  json.url business_url(business, format: :json)
end

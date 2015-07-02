json.array!(@accounts) do |account|
  json.extract! account, :id, :companyname, :firstname, :lastname, :email, :country
  json.url account_url(account, format: :json)
end

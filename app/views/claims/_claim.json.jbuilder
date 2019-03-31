json.extract! claim, :id, :consumer_id, :merchandise_id, :email, :mobile, :account, :bsb, :complete, :created_at, :updated_at
json.url claim_url(claim, format: :json)

json.array!(@wishes) do |wish|
  json.extract! wish, :id, :consumer_id, :merchandise_id
  json.url wish_url(wish, format: :json)
end

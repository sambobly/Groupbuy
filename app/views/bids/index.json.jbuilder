json.array!(@bids) do |bid|
  json.extract! bid, :id, :consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete
  json.url bid_url(bid, format: :json)
end

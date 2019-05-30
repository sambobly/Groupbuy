json.array!(@bids) do |bid|
  json.extract! bid, :id, :consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete, :merchandise_image, :merchandise_value, :merchandise_title, :combination_id, :answer, :score
  json.url bid_url(bid, format: :json)
end

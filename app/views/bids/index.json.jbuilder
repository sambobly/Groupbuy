json.array!(@bids) do |bid|
  json.extract! bid, :id, :consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete, :merchandise_image, :merchandise_value, :merchandise_title, :combination_id, :answer, :score, :answer_one, :answer_two, :answer_three, :answer_four, :answer_five, :answer_six, :answer_seven, :answer_eight, :answer_nine, :answer_ten
  json.url bid_url(bid, format: :json)
end

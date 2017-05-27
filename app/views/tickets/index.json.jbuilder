json.array!(@tickets) do |ticket|
  json.extract! ticket, :id, :consumer_id, :bid_id, :merchandise_id, :win, :value
  json.url ticket_url(ticket, format: :json)
end

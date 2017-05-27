json.array!(@consumers) do |consumer|
  json.extract! consumer, :id, :name, :first_name, :last_name, :date_of_birth, :payment_method_id, :public, :gender, :pronoun, :email, :number, :password, :user_id
  json.url consumer_url(consumer, format: :json)
end

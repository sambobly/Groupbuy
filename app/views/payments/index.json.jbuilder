json.array!(@payments) do |payment|
  json.extract! payment, :id, :patient_id, :doctor_id, :invoice_id, :paymentType_id, :appointment_id, :date, :note, :total
  json.url payment_url(payment, format: :json)
end

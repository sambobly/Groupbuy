json.array!(@procurators) do |procurator|
  json.extract! procurator, :id, :name, :invoice_id
  json.url procurator_url(procurator, format: :json)
end

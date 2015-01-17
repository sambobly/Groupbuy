json.array!(@consult_templates) do |consult_template|
  json.extract! consult_template, :id, :name, :content
  json.url consult_template_url(consult_template, format: :json)
end

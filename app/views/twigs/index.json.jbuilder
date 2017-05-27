json.array!(@twigs) do |twig|
  json.extract! twig, :id, :name, :nest_id
  json.url twig_url(twig, format: :json)
end

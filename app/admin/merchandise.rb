ActiveAdmin.register Merchandise do
  permit_params :title, :consumer_id, :value, :category_id,  :description, :bid, :difference, :complete, :email, :received, :paid, :rescue
  action_item :view_site do
    link_to "Run merchandise", "/"
  end

end

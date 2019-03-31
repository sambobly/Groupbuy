class AddDetailsToBids < ActiveRecord::Migration
  def change
    add_column :bids, :merchandise_image, :string
    add_column :bids, :merchandise_value, :decimal
    add_column :bids, :merchandise_title, :string
  end
end

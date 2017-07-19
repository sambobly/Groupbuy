class AddRescueToMerchandise < ActiveRecord::Migration
  def change
    add_column :merchandises, :rescue, :string
  end
end

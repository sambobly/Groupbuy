class AddProductIdToLines < ActiveRecord::Migration
  def change
    add_column :lines, :product_id, :integer
    add_index :lines, :product_id
  end
end

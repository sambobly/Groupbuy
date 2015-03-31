class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.text :name
      t.decimal :price

      t.timestamps
    end
  end
end